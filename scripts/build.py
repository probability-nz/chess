"""Build the current working tree's portable Play ZIP (never reads Git HEAD)."""
from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parent.parent
manifest_path = root / 'release.json'
manifest = json.loads(manifest_path.read_text())
for item in manifest['files']:
    data = (root / item['path']).read_bytes()
    item['bytes'] = len(data)
    item['sha256'] = hashlib.sha256(data).hexdigest()
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
output = root / 'dist' / 'mod.zip'
output.parent.mkdir(exist_ok=True)
paths = ['package.json', 'release.json', 'scripts/build.py'] + [item['path'] for item in manifest['files']]
paths += [name for name in ['README.md', 'LICENSE.md', 'screenshot.png'] if (root / name).is_file()]
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in sorted(set(paths)):
        archive.write(root / name, name)
print(output)
