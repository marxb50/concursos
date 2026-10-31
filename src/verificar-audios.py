"""Confere integridade, decodificação e marcas de todos os MP3 usados pela professora."""
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys

root=Path(__file__).resolve().parent
source=(root/'professor-audios.js').read_text(encoding='utf-8')
manifest=json.loads(source.split('const PROFESSOR_AUDIO = ',1)[1].strip().removesuffix(';'))
probe=shutil.which('ffprobe')
if not probe:
    raise SystemExit('Instale FFmpeg/ffprobe para a verificação de decodificação. O aplicativo não precisa dele.')

def verify(item):
    fingerprint,track=item
    path=root/'dist'/track['file']
    data=path.read_bytes()
    assert hashlib.sha256(data).hexdigest()==track['sha256'],f'Hash diferente: {path.name}'
    result=subprocess.run([probe,'-v','error','-show_entries','stream=codec_name,sample_rate,channels:format=duration','-of','json',str(path)],capture_output=True,text=True,check=True,timeout=30)
    parsed=json.loads(result.stdout)
    assert parsed['streams'][0]['codec_name']=='mp3',path.name
    duration=float(parsed['format']['duration'])
    assert duration>0,path.name
    assert track['segments'][-1]['end']<=duration+.1,f'Marca após o fim do áudio: {path.name}'
    assert all(s['end']>s['start']>=0 for s in track['segments']),path.name
    return {'fingerprint':fingerprint,'seconds':duration,'bytes':len(data),'parts':len(track['segments'])}

results=[]
errors=[]
with ThreadPoolExecutor(max_workers=4) as pool:
    jobs={pool.submit(verify,item):item[0] for item in manifest['tracks'].items()}
    for job,fingerprint in jobs.items():
        try:results.append(job.result())
        except Exception as exc:errors.append({'fingerprint':fingerprint,'error':str(exc)})
report={'voice':manifest['voice'],'lessons':len(manifest['lessons']),'checked_tracks':len(results),'parts':sum(x['parts'] for x in results),'duration_seconds':round(sum(x['seconds'] for x in results),2),'bytes':sum(x['bytes'] for x in results),'errors':errors}
(root/'output/verificacao-audio.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(bool(errors))
