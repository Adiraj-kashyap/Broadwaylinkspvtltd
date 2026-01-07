import json
data = json.load(open('data/projects-full.json', 'r', encoding='utf-8'))
longest = max(data, key=lambda x: len(x.get('id', '')))
print(f"Longest ID: {len(longest['id'])}")
print(f"ID: {longest['id']}")
