"""Gera áudios Thalita com marcação dos trechos; execução retomável, sem chave no HTML.

Pré-requisito: edge-tts==7.3.1. Execute node exportar-professor.cjs antes.
Use --limit 2 para uma amostra ou --jobs 2 para limitar a concorrência.
"""
import argparse
import asyncio
import bisect
import hashlib
import html
import json
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LOCAL_RUNTIME = ROOT / 'output' / 'tts-runtime'
if LOCAL_RUNTIME.exists():
    sys.path.insert(0, str(LOCAL_RUNTIME))
import edge_tts

VOICE = 'pt-BR-ThalitaMultilingualNeural'
RATE = '-8%'

def canonical(text):
    return ''.join(c for c in unicodedata.normalize('NFC', html.unescape(text)).casefold() if c.isalnum())

def align(parts, marks):
    texts = [canonical(p['spoken']) for p in parts]
    ends, total = [], 0
    for text in texts:
        total += len(text)
        ends.append(total)
    combined = ''.join(texts)
    times = [[] for _ in parts]
    cursor = 0
    for mark in marks:
        token = canonical(mark['text'])
        if not token:
            continue
        pos = combined.find(token, cursor)
        if pos < 0 or pos - cursor > 20:
            raise ValueError(f'Marca de fala não alinhada perto do caractere {cursor}')
        index = bisect.bisect_right(ends, pos)
        times[index].append((mark['offset']/10_000_000, (mark['offset']+mark['duration'])/10_000_000))
        cursor = pos + len(token)
    if any(not t for t in times) or total-cursor > 10:
        raise ValueError('Áudio incompleto: há trechos sem marcação')
    segments = [{'start':round(max(0,t[0][0]-.035),3),'end':round(t[-1][1]+.035,3)} for t in times]
    for i, item in enumerate(segments[:-1]):
        item['end'] = min(item['end'], segments[i+1]['start'])
    return segments

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--limit', type=int, default=0)
    parser.add_argument('--jobs', type=int, default=2)
    parser.add_argument('--only', action='append', default=[], help='Gerar somente estes IDs de aula')
    parser.add_argument('--prefix', default='', help='Gerar somente IDs que começam com este prefixo')
    parser.add_argument('--manifest-only', action='store_true', help='Atualizar manifesto somente com gravações válidas já em cache, sem requisição de voz')
    parser.add_argument('--cache-only', action='store_true', help='Preparar gravações sem alterar o manifesto de reprodução')
    args = parser.parse_args()
    lessons = json.loads((ROOT/'output/speech/roteiros.json').read_text(encoding='utf-8'))
    unique = {l['fingerprint']:l for l in lessons}
    folder = ROOT/'dist/audio/professor'
    folder.mkdir(parents=True, exist_ok=True)
    cache = ROOT/'output/speech/cache'
    cache.mkdir(parents=True, exist_ok=True)
    available, failures = {}, []
    pending = []
    for fingerprint, item in unique.items():
        text = '\n\n'.join(p['spoken'] for p in item['parts'])
        digest = hashlib.sha256((VOICE+'|'+RATE+'|'+text).encode('utf-8')).hexdigest()
        filename = digest[:24]+'.mp3'
        meta = cache/(digest+'.json')
        target = folder/filename
        if meta.exists() and target.exists():
            saved = json.loads(meta.read_text(encoding='utf-8'))
            if saved.get('sha256') == hashlib.sha256(target.read_bytes()).hexdigest():
                available[fingerprint] = saved
                continue
        pending.append((fingerprint,item,text,target,meta))
    if args.only:
        pending = [job for job in pending if job[1]['id'] in args.only]
    if args.prefix:
        pending = [job for job in pending if job[1]['id'].startswith(args.prefix)]
    if args.limit:
        pending = pending[:args.limit]
    if args.manifest_only:
        pending = []
    print(f'{len(available)} em cache; {len(pending)} áudios a gerar.', flush=True)
    semaphore = asyncio.Semaphore(max(1,min(args.jobs,8)))
    completed = 0
    async def generate(job):
        nonlocal completed
        fingerprint,item,text,target,meta = job
        async with semaphore:
            error = None
            for attempt in range(3):
                try:
                    data = bytearray()
                    marks = []
                    communicate = edge_tts.Communicate(text,VOICE,rate=RATE,boundary='WordBoundary',connect_timeout=20,receive_timeout=120)
                    async with asyncio.timeout(180+len(text)//40):
                        async for chunk in communicate.stream():
                            if chunk['type']=='audio':data.extend(chunk['data'])
                            elif chunk['type']=='WordBoundary':marks.append(chunk)
                    if len(data)<1000:raise ValueError('Arquivo de áudio vazio ou inválido')
                    segments = align(item['parts'], marks)
                    record = {'file':'audio/professor/'+target.name,'voice':VOICE,'rate':RATE,'segments':segments,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)}
                    temporary=target.with_suffix('.tmp')
                    temporary.write_bytes(data)
                    temporary.replace(target)
                    meta.write_text(json.dumps(record,ensure_ascii=False),encoding='utf-8')
                    available[fingerprint]=record
                    completed += 1
                    if completed%5==0 or completed==len(pending):print(f'{completed}/{len(pending)} gerados; último: {item["id"]}',flush=True)
                    return
                except Exception as exc:
                    error=type(exc).__name__+': '+str(exc).split('url=')[0][:140]
                    if attempt<2:await asyncio.sleep(2*(attempt+1))
            failures.append({'id':item['id'],'error':error})
            print(f'Falhou: {item["id"]}: {error}',flush=True)
    await asyncio.gather(*(generate(job) for job in pending))
    if args.cache_only:
        print(json.dumps({'cache_only':True,'generated':completed,'failures':failures},ensure_ascii=False),flush=True)
        return bool(failures)
    # Manifesto só referencia áudios completos, verificados e com todos os trechos.
    manifest={'voice':VOICE,'rate':RATE,'lessons':{l['id']:l['fingerprint'] for l in lessons if l['fingerprint'] in available},'tracks':available}
    source='/* Áudios locais Thalita Neural; gerado por gerar-audios-professor.py. */\nconst PROFESSOR_AUDIO = '+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n'
    (ROOT/'professor-audios.js.tmp').write_text(source,encoding='utf-8')
    (ROOT/'professor-audios.js.tmp').replace(ROOT/'professor-audios.js')
    report={'voice':VOICE,'lessons':len(lessons),'covered':len(manifest['lessons']),'unique_tracks':len(available),'bytes':sum(v['bytes'] for v in available.values()),'failures':failures}
    (ROOT/'output/speech/geracao.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False),flush=True)
    return bool(failures)

if __name__=='__main__':
    sys.exit(asyncio.run(main()))
