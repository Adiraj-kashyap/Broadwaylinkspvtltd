import json
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text[:80]  # Limit to 80 chars

data = json.load(open('data/projects-full.json', 'r', encoding='utf-8'))
seen_ids = set()

for p in data:
    new_id = slugify(p['title'])
    # Ensure uniqueness
    original_new_id = new_id
    counter = 1
    while new_id in seen_ids:
        new_id = f"{original_new_id}-{counter}"
        counter += 1
    
    p['id'] = new_id
    seen_ids.add(new_id)

json.dump(data, open('data/projects-full.json', 'w', encoding='utf-8'), indent=4, ensure_ascii=False)
print("Shortened IDs.")
