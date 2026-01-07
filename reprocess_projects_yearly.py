
import pandas as pd
import json
import difflib
import re

# File Paths
EXCEL_PATH = "BLPL BALANCE WORK & EXISTING COMMITMENT 25122025.xlsx"
JSON_PATH = "data/projects-full.json"
QTY_SHEET_NAME = "BLPL QTY 25122025"

def normalize_name(name):
    """Normalize string: lowercase, remove special chars, keep only alpha"""
    if not isinstance(name, str): return ""
    return re.sub(r'[^a-z]', '', name.lower())

def main():
    print("Loading Excel...")
    xl = pd.ExcelFile(EXCEL_PATH)
    
    print(f"Reading Sheet: {QTY_SHEET_NAME}")
    # Read without header to handle the complex layout
    df = pd.read_excel(xl, sheet_name=QTY_SHEET_NAME, header=None)
    
    # Load JSON
    with open(JSON_PATH, 'r') as f:
        projects = json.load(f)
        
    print(f"Loaded {len(projects)} projects from JSON.")
    
    # Hardcoded Column Mapping based on persistent inspection
    # Year = Col 0 (Column A)
    # Name = Col 1 (Column B)
    COL_YEAR = 0
    COL_NAME = 1
    
    # Quantity Headers are in Row 3 (Index 3)
    QTY_HEADER_ROW = 3
    
    print(f"Mapping Quantity Columns from Row {QTY_HEADER_ROW}...")
    qty_cols = {}
    valid_headers = [
        "Concrete", "Brick Masonry", "Earth Work", "Sand Filling", "Brick Soling", 
        "GSB", "WMM", "Bituminous", "Backfilling", "Boulder Pitching", "Piling",
        "Steel", "Lining", "Turfing", "BM"
    ]
    
    # Check if row exists
    if QTY_HEADER_ROW < len(df):
        for col_idx, val in df.iloc[QTY_HEADER_ROW].items():
            if isinstance(val, str):
                clean_val = val.strip().replace('\n', ' ')
                low_val = clean_val.lower()
                
                for h in valid_headers:
                    if h.lower() in low_val:
                        # Normalize key for consistency
                        key = h
                        if h == "Concrete": key = "Concrete Work"
                        if h == "Bituminous": key = "Bituminous Work"
                        
                        qty_cols[col_idx] = key
                        break
    
    print("Identified Quantity Columns:", qty_cols)

    # Reset JSON data
    for p in projects:
        p['quantities'] = {}
        p['yearly_quantities'] = []
        
    count = 0
    
    # Iterate through rows starting AFTER header (Row 5 / Index 4)
    START_ROW = 4
    for idx, row in df.iterrows():
        if idx < START_ROW: continue
        
        year_val = row[COL_YEAR]
        raw_name = row[COL_NAME]
        
        if pd.isna(raw_name) or not isinstance(raw_name, str):
            continue

        # --- IMPORTANT FILTER: SKIP SUMMARY ROWS ---
        # Skip if name starts with "1" and contains "2" indicating a list
        # Example seen: "1RESTORATION..., 2CONSTRUCTION..."
        clean_check = raw_name.strip()
        is_summary = False
        
        # Check if starts with 1 (any char after) AND contains ",2" or ", 2" or " 2" followed by text
        if clean_check.startswith('1'):
             # Check for 2nd item
             if ',2' in clean_check or ', 2' in clean_check:
                 is_summary = True
             # Fallback: check matching '2' pattern
             elif re.search(r'[\s,]2[A-Z]', clean_check):
                 is_summary = True
        
        # Also skip if it explicitly says "MAX" or "Total" in year or name
        if str(year_val).lower().strip() in ['max', 'total']:
            is_summary = True
            
        if is_summary:
            # print(f"Skipping Summary Row {idx}: {clean_check[:30]}...")
            continue
        # -------------------------------------------
            
        name_clean = normalize_name(raw_name)
        
        # Find match in JSON
        best_match = None
        best_score = 0
        
        for p in projects:
            p_name_clean = normalize_name(p['title'])
            if len(p_name_clean) < 5: continue
            
            # SequenceMatcher
            score = difflib.SequenceMatcher(None, name_clean, p_name_clean).ratio()
            
            # Boost score if one is substring of other (very common in manual data)
            if name_clean in p_name_clean or p_name_clean in name_clean:
                score = max(score, 0.95) # High confidence for substring
                
            if score > best_score:
                best_match = p
                best_score = score
        
        # Threshold 0.85
        if best_match and best_score > 0.85:
            # Extract Quantities
            row_qtys = {}
            for col_idx, col_name in qty_cols.items():
                val = row[col_idx]
                try:
                    # Handle numbers and strings
                    if pd.notna(val) and val != '-':
                        val_str = str(val).replace(',', '').strip()
                        float_val = float(val_str)
                        if float_val > 0.01:
                            row_qtys[col_name] = f"{float_val:,.2f}"
                except:
                    pass
            
            if row_qtys:
                # Store Yearly Data
                # Ensure we handle year string properly (e.g. 2024-25)
                year_str = str(year_val).strip() if pd.notna(year_val) else "Unknown"
                
                entry = {
                    "year": year_str,
                    "original_name": raw_name.strip(),
                    "quantities": row_qtys
                }
                best_match['yearly_quantities'].append(entry)
                count += 1
                # print(f"[MATCH] '{raw_name[:20]}...' -> '{best_match['title'][:20]}...' ({year_str})")

    # Aggregate Totals
    print("Aggregating totals...")
    for p in projects:
        if p['yearly_quantities']:
            agg_qty = {}
            # Sort by year
            p['yearly_quantities'].sort(key=lambda x: x['year'])
            
            for y in p['yearly_quantities']:
                for k, v in y['quantities'].items():
                    val_float = float(v.replace(',', ''))
                    agg_qty[k] = agg_qty.get(k, 0.0) + val_float
            
            # Assign Total
            p['quantities'] = {k: f"{v:,.2f}" for k, v in agg_qty.items() if v > 0.01}
            
            # --- FIX CHOUSA VALUE ---
            if "Chousa" in p['title'] or "Chausa" in p['title']:
                 if p.get('contract_value') == 'Chousa, Buxar':
                     p['contract_value'] = '29.15'

    print(f"Matched {count} rows.")
    
    with open(JSON_PATH, 'w') as f:
        json.dump(projects, f, indent=4)
        
    print("Saved updated projects-full.json")

if __name__ == "__main__":
    main()
