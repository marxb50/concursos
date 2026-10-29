"""Gera o HTML autônomo usando o mesmo manifesto do build Node."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent
manifest = json.loads((root / 'build-manifest.json').read_text(encoding='utf-8'))
template = (root / 'index.template.html').read_text(encoding='utf-8')
for marker, filename in {**manifest['styles'], **manifest['scripts']}.items():
    if template.count(marker) != 1:
        raise ValueError(f'Marcador ausente ou repetido: {marker}')
    template = template.replace(marker, (root / filename).read_text(encoding='utf-8'))
if re.search(r'/\*__[A-Z_]+__\*/', template):
    raise ValueError('Há marcadores não resolvidos no HTML.')
destination = root / 'dist' / 'index.html'
destination.parent.mkdir(exist_ok=True)
temporary = destination.with_suffix('.html.tmp')
temporary.write_bytes(template.encode('utf-8'))
temporary.replace(destination)
print(f'Aplicativo gerado: {destination} ({destination.stat().st_size:,} bytes)')
