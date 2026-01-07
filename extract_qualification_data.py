
import pandas as pd
import json
import re
import difflib
from datetime import datetime

EXCEL_PATH = "BLPL BALANCE WORK & EXISTING COMMITMENT 25122025.xlsx"
JSON_PATH = "data/projects-full.json"
SHEET_NAME = "QUALIFICATION INFORMATION"

def normalize_name(name):
    if not isinstance(name, str): return ""
    return re.sub(r'[^a-z0-9]', '', name.lower())

def parse_date(date_val):
    if pd.isna(date_val): return None
    date_str = str(date_val).strip()
    
    # Check for DD.MM.YYYY or DD/MM/YYYY
    match = re.search(r'(\d{2})[\./](\d{2})[\./](\d{4})', date_str)
    if match:
        return f"{match.group(1)}.{match.group(2)}.{match.group(3)}"
    return date_str # Return original if no clean parse

def parse_ongoing_dates(text):
    """
    Extracts dates from complex string like '05MBD/2018-19 DT. 20.02.2019 + ADD AGG DT. 04.10.2025'
    Returns text summary and potential start date.
    """
    if not isinstance(text, str): return text, None
    
    # Find all dates
    dates = re.findall(r'(\d{2}[\./]\d{2}[\./]\d{4})', text)
    
    # Heuristic: First date is usually start date, later dates are addendums
    start_date = dates[0] if dates else None
    
    return text, start_date

def safe_float(val):
    if pd.isna(val): return None
    try:
        clean_val = str(val).lower().replace('rs', '').replace('cr', '').replace(',', '').strip()
        return float(clean_val)
    except:
        return None


def main():
    print("Loading Excel...")
    df = pd.read_excel(EXCEL_PATH, sheet_name=SHEET_NAME, header=None)
    
    with open(JSON_PATH, 'r') as f:
        projects = json.load(f)
        
    print(f"Loaded {len(projects)} projects.")
    
    updates_count = 0
    
    # ---------------------------------------------------------
    # 1. EXTRACT COMPLETED PROJECTS (Rows 22 - 41 approx)
    # Header @ Row 21 (Index 21) => Data starts Ind 22
    # ---------------------------------------------------------
    print("\nProcessing COMPLETED Projects...")
    # Col Mapping (Verified via Row 22 print)
    C_NAME = 1
    C_EMPLOYER = 2
    C_DESC = 3
    C_CONTRACT = 4 
    C_VALUE = 6 # Index 5 appears empty
    C_WORK_ORDER_DATE = 7
    C_STIP_COMP = 8
    C_ACTUAL_COMP = 9
    C_REMARKS = 10
    
    start_comp = 22
    end_comp = 42
    
    for idx in range(start_comp, end_comp):
        row = df.iloc[idx]
        name = row[C_NAME]
        if pd.isna(name): continue
        
        norm_name = normalize_name(name)
        
        # Match with JSON
        best_match = None
        best_score = 0
        for p in projects:
            p_norm = normalize_name(p['title'])
            score = difflib.SequenceMatcher(None, norm_name, p_norm).ratio()
            if norm_name in p_norm or p_norm in norm_name:
                score = max(score, 0.95)
                
            if score > best_score:
                best_match = p
                best_score = score
        
        if best_match and best_score > 0.8:
            print(f"MATCH (Completed): {name[:30]}... -> {best_match['title'][:30]}...")
            
            # Update fields
            if pd.notna(row[C_EMPLOYER]): best_match['client'] = str(row[C_EMPLOYER]).strip()
            if pd.notna(row[C_DESC]): best_match['description'] = str(row[C_DESC]).strip()
            
            # Value
            val = row[C_VALUE]
            f_val = safe_float(val)
            if f_val is not None: best_match['contract_value'] = f"{f_val:.2f}"
            
            # Dates
            wo_date = parse_date(row[C_WORK_ORDER_DATE])
            if wo_date: best_match['start_date'] = wo_date
            
            act_date = parse_date(row[C_ACTUAL_COMP])
            if act_date: best_match['completion_date'] = act_date
            
            # Status
            best_match['status'] = "Completed"
            if pd.notna(row[C_REMARKS]):
                best_match['status_text'] = str(row[C_REMARKS]).strip()
                
            if pd.notna(row[C_CONTRACT]):
                best_match['contract_no'] = str(row[C_CONTRACT]).strip()

            updates_count += 1

    # ---------------------------------------------------------
    # 2. EXTRACT ONGOING PROJECTS (Rows 47 - 65 approx)
    # Header @ Row 46 (Index 46) => Data starts Ind 48 (Row 48 is first data)
    # ---------------------------------------------------------
    print("\nProcessing ONGOING Projects...")
    # Col Mapping (Verified via Row 48 print)
    O_DESC = 1 
    O_EMPLOYER = 5
    O_PLACE = 6
    O_CONTRACT_DATE_MIX = 8
    O_VALUE = 9
    O_VALUE_COMPLETED = 10
    O_ANTICIPATED_COMP = 12
    
    start_ongoing = 48
    end_ongoing = 66
    
    for idx in range(start_ongoing, end_ongoing):
        row = df.iloc[idx]
        name = row[O_DESC]
        if pd.isna(name): continue # Skip empty
        if str(name).strip() == "2": continue # Skip formatting rows
        
        norm_name = normalize_name(name)
        
        best_match = None
        best_score = 0
        for p in projects:
            p_norm = normalize_name(p['title'])
            score = difflib.SequenceMatcher(None, norm_name, p_norm).ratio()
            if norm_name in p_norm or p_norm in norm_name:
                score = max(score, 0.95)
                
            if score > best_score:
                best_match = p
                best_score = score
                
        if best_match and best_score > 0.8:
            print(f"MATCH (Ongoing): {name[:30]}... -> {best_match['title'][:30]}...")
            
            if pd.notna(row[O_EMPLOYER]): best_match['client'] = str(row[O_EMPLOYER]).strip()
            if pd.notna(row[O_PLACE]): best_match['location'] = str(row[O_PLACE]).strip()
            
            # Complex Date/Contract parsing
            mix_val = row[O_CONTRACT_DATE_MIX]
            full_text, start_date = parse_ongoing_dates(str(mix_val))
            
            if start_date: best_match['start_date'] = start_date
            best_match['contract_no'] = full_text # Clean later if needed
            
            # Completion
            comp_date = parse_date(row[O_ANTICIPATED_COMP])
            if comp_date: best_match['completion_date'] = comp_date
            
            # Value
            val = row[O_VALUE]
            f_val = safe_float(val)
            if f_val is not None: best_match['contract_value'] = f"{f_val:.2f}"
            
            best_match['status'] = "Ongoing"
            best_match['status_text'] = f"Value Completed: {row[O_VALUE_COMPLETED]} Cr"
            
            updates_count += 1
            
    # ---------------------------------------------------------
    # 3. EXTRACT BIDDING PROJECTS (Rows 68 - 75 approx)
    # ---------------------------------------------------------
    # Assuming similar columns to ONGOING or just finding them
    print("\nProcessing BIDDING Projects...")
    start_bid = 68
    end_bid = 76
    
    for idx in range(start_bid, end_bid):
        row = df.iloc[idx]
        name = row[O_DESC] # reusing ongoing cols
        if pd.isna(name): continue
        if isinstance(name, int): continue
        
        best_match = None
        best_score = 0
        norm_name = normalize_name(name)
        
        for p in projects:
            p_norm = normalize_name(p['title'])
            score = difflib.SequenceMatcher(None, norm_name, p_norm).ratio()
            if norm_name in p_norm or p_norm in norm_name:
                score = max(score, 0.95)
            if score > best_score:
                best_match = p
                best_score = score
                
        if best_match and best_score > 0.8:
            print(f"MATCH (Bidding): {name[:30]}... -> {best_match['title'][:30]}...")
            best_match['status'] = "Under Bidding"
            # Update other info if available
            updates_count += 1
            
    print(f"\nUpdated {updates_count} projects.")
    
    with open(JSON_PATH, 'w') as f:
        json.dump(projects, f, indent=4)
        
    print("Saved to projects-full.json")

if __name__ == "__main__":
    main()
