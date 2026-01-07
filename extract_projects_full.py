import pandas as pd
import json
import re
import os
from difflib import SequenceMatcher

EXCEL_FILE = "BLPL BALANCE WORK & EXISTING COMMITMENT 25122025.xlsx"
OUTPUT_FILE = "data/projects-full.json"

def clean_text(text):
    if pd.isna(text): return ""
    return str(text).strip()

def strict_slug(text):
    s = str(text).lower()
    return re.sub(r'[^a-z0-9]', '', s)

def generate_slug(name):
    s = clean_text(name).lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'\s+', '-', s)
    return s

def similarity(a, b):
    # Use just the first 50 chars for better matching on prefixes if titles are super long
    return SequenceMatcher(None, a[:100], b[:100]).ratio()

def find_header_row(df, keywords):
    for i, row in df.iterrows():
        row_str = " ".join([str(x) for x in row if pd.notna(x)]).upper()
        if all(k in row_str for k in keywords):
            return i
    return None

def extract_projects():
    if not os.path.exists(EXCEL_FILE):
        print(f"Error: File {EXCEL_FILE} not found.")
        return

    print("Loading Excel file...")
    try:
        xl = pd.ExcelFile(EXCEL_FILE)
    except Exception as e:
        print(f"Error loading Excel: {e}")
        return

    # --- 1. QUALIFICATION INFORMATION ---
    qual_sheet_name = next((s for s in xl.sheet_names if "QUALIFICATION" in s.upper()), None)
    if not qual_sheet_name: return

    print(f"Reading {qual_sheet_name}...")
    temp_df = pd.read_excel(xl, sheet_name=qual_sheet_name, nrows=30, header=None)
    header_row = find_header_row(temp_df, ["PROJECT NAME", "EMPLOYER"])
    
    qual_df = pd.read_excel(xl, sheet_name=qual_sheet_name, header=header_row)
    qual_df.columns = [str(c).replace('\n', ' ').strip().upper() for c in qual_df.columns]
    
    col_map = {
        'NAME': next((c for c in qual_df.columns if "PROJECT NAME" in c), None),
        'EMPLOYER': next((c for c in qual_df.columns if "EMPLOYER" in c), None),
        'DESC': next((c for c in qual_df.columns if "DESCRIPTION" in c), None),
        'VALUE': next((c for c in qual_df.columns if "VALUE" in c and "CONTRACT" in c), None),
        'DATE_START': next((c for c in qual_df.columns if "DATE OF ISSUE" in c), None),
        'DATE_END': next((c for c in qual_df.columns if "ACTUAL DATE" in c), None),
        'REMARKS': next((c for c in qual_df.columns if "REMARKS" in c), None)
    }

    projects = []
    
    current_section = "Main"
    valid_project_count = 0
    
    for idx, row in qual_df.iterrows():
        # Check for section switch (Under Bidding)
        row_str = " ".join([str(x) for x in row if pd.notna(x)]).lower()
        if "bids already submitted" in row_str:
            current_section = "Bidding"
            continue

        name = clean_text(row.get(col_map['NAME']))
        if not name or name.lower() in ['total', 'grand total', 'nan', '0', '1', '2', '3']: continue
            
        slug = generate_slug(name)
        if not slug or len(slug) < 5: continue 
        
        # Skip weird rows extracted previously
        if slug in ["a", "b", "n", "description-of-works", "assessed-bid-capacity", "works-for-which-bids-already-submitted"]: continue

        # Determine Status based on User's explicit counts:
        # First 19 -> Completed
        # Next 14 -> Ongoing
        # Explicit Bidding Section -> Under Bidding
        
        status = "Ongoing" # Fallback
        
        if current_section == "Bidding":
            status = "Under Bidding"
        else:
            valid_project_count += 1
            if valid_project_count <= 19:
                status = "Completed"
            elif valid_project_count <= (19 + 14): # 33
                status = "Ongoing"
            else:
                # Any breakdown overflowing 33 in main section?
                # User said "next 14 are ongoing". If there are more, we assume ongoing or bidding?
                # Let's assume Ongoing for now if it's in the main list.
                status = "Ongoing"

        project = {
            "id": slug,
            "title": name,
            "client": clean_text(row.get(col_map['EMPLOYER'])),
            "description": clean_text(row.get(col_map['DESC'])),
            "contract_value": str(row.get(col_map['VALUE'])),
            "start_date": str(row.get(col_map['DATE_START'])),
            "completion_date": str(row.get(col_map['DATE_END'])),
            "status_text": clean_text(row.get(col_map['REMARKS'])),
            "location": "Bihar",
            "quantities": {},
            "status": status
        }
        
        if "jharkhand" in project['client'].lower() or "jharkhand" in project['title'].lower():
            project['location'] = "Jharkhand"
        elif "barauni" in project['title'].lower():
            project['location'] = "Barauni, Bihar"
        elif "samastipur" in project['title'].lower():
             project['location'] = "Samastipur, Bihar"
        elif "gopalganj" in project['title'].lower():
             project['location'] = "Gopalganj, Bihar"
        
        projects.append(project)

    print(f"Base Projects: {len(projects)}")

    # --- 2. BLPL QTY SHEET ---
    qty_sheet_name = next((s for s in xl.sheet_names if "BLPL QTY" in s.upper()), None)
    if not qty_sheet_name:
         qty_sheet_name = next((s for s in xl.sheet_names if "QTY" in s.upper()), None)

    if qty_sheet_name:
        print(f"Reading QTY Sheet: {qty_sheet_name}")
        
        temp_qty = pd.read_excel(xl, sheet_name=qty_sheet_name, nrows=10, header=None)
        qty_header_row = find_header_row(temp_qty, ["NAME OF THE WORK"])
        
        if qty_header_row is not None:
            qty_df = pd.read_excel(xl, sheet_name=qty_sheet_name, header=qty_header_row)
        else:
            qty_df = pd.read_excel(xl, sheet_name=qty_sheet_name)

        qty_cols_map = {}
        project_name_col = None
        
        for col in qty_df.columns:
            u_col = str(col).replace('\n', ' ').strip().upper()
            
            if "NAME OF THE WORK" in u_col: project_name_col = col
            
            if "TOTAL CONCRETE" in u_col: qty_cols_map['Concrete Work'] = col
            elif "STEEL" in u_col and "STRUCTURAL" not in u_col: qty_cols_map['Steel (Reinforcement)'] = col
            elif "BRICK MASON" in u_col or "BRICK WORK" in u_col: qty_cols_map['Brick Masonry'] = col
            elif "PLASTER" in u_col: qty_cols_map['Plaster'] = col
            elif "EARTH WORK" in u_col: qty_cols_map['Earth Work'] = col
            elif "SAND FILLING" in u_col: qty_cols_map['Sand Filling'] = col
            elif "BRICK SOLING" in u_col: qty_cols_map['Brick Soling'] = col
            elif "GSB" in u_col and "+" not in u_col: qty_cols_map['GSB'] = col
            elif "WMM" in u_col and "+" not in u_col: qty_cols_map['WMM'] = col
            elif "TOTAL BITUMINOUS" in u_col: qty_cols_map['Bituminous Work'] = col
            elif "RCC PILING" in u_col or "PILING" in u_col: qty_cols_map['Piling'] = col
            elif "BOULDER PITCH" in u_col: qty_cols_map['Boulder Pitching'] = col
            elif "BACKFILL" in u_col: qty_cols_map['Backfilling'] = col

        if not project_name_col: project_name_col = qty_df.columns[1]
        print(f"Using QTY Name Column: {project_name_col}")
        
        # --- MATCHING LOGIC ---
        matches_count = 0
        
        for idx, row in qty_df.iterrows():
            q_name = clean_text(row.get(project_name_col))
            if not q_name or len(q_name) < 10 or q_name.lower() == 'nan': continue
            
            q_slug = strict_slug(q_name)
            
            # Find Best Match among Base Projects
            best_match = None
            best_score = 0
            
            for p in projects:
                p_slug = strict_slug(p['title'])
                score = similarity(p_slug, q_slug)
                
                if score > best_score:
                    best_score = score
                    best_match = p
            
            # Threshold Check (0.8 is usually safe for this)
            if best_match and best_score > 0.8:
                # Extract Data
                q_data = {}
                for label, col_name in qty_cols_map.items():
                    val = row.get(col_name)
                    if pd.notna(val) and val != 0 and str(val).lower() != 'nan' and str(val).strip() != "":
                        try:
                            f_val = float(val)
                            if f_val > 0.01:
                                q_data[label] = f"{f_val:,.2f}"
                        except:
                            q_data[label] = str(val)
                
                if q_data:
                    best_match['quantities'] = {**best_match['quantities'], **q_data}
                    matches_count += 1
                    print(f"Matched ({best_score:.2f}): {q_name[:30]}... -> {best_match['title'][:30]}...")

        print(f"Total Matches: {matches_count}")

    # Save
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(projects, f, indent=4)
        
    print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    extract_projects()
