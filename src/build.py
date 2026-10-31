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
    source = (root / filename).read_text(encoding='utf-8')
    if filename in manifest['scripts'].values() and re.search(r'</script\b|<!--', source, re.I):
        raise ValueError(f'Texto inseguro em script inline: {filename}. Escape < nos dados.')
    template = template.replace(marker, source)
if re.search(r'/\*__[A-Z_]+__\*/', template):
    raise ValueError('Há marcadores não resolvidos no HTML.')
if len(re.findall(r'<script\b', template, re.I)) != len(re.findall(r'</script>', template, re.I)):
    raise ValueError('Contagem desigual de tags de script no HTML.')
destination = root / 'dist' / 'index.html'
destination.parent.mkdir(exist_ok=True)
temporary = destination.with_suffix('.html.tmp')
temporary.write_bytes(template.encode('utf-8'))
temporary.replace(destination)
print(f'Aplicativo gerado: {destination} ({destination.stat().st_size:,} bytes)')
