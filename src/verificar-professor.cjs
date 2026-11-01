'use strict';
module.exports=function verifyProfessor(m){
  const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
  const {ProfessorCore,PROFESSOR_AUDIO,JOURNEYS,INFOGRAPHICS,CONTESTS}=m;
  const all=ProfessorCore.all();
  assert.equal(new Set(all.map(l=>l.id)).size,all.length,'Aulas com IDs únicos');
  for(const l of all){
    assert(l.title&&l.parts.length>=3,l.id);
    assert(l.parts.some(p=>p.hold),l.id+' tem recuperação ativa');
    for(const [i,p] of l.parts.entries()){
      assert(p.text.length&&p.spoken.length&&p.label.length,l.id);
      assert(p.text.length<=650,l.id+' usa trechos curtos');
      assert(!/\b(?:undefined|NaN)\b/.test(p.spoken),l.id);
      if(p.hold)assert.equal(l.parts[i+1]?.kind,'answer',l.id+' confere depois de perguntar');
    }
    if(l.review)assert(l.review.type==='mapa'?INFOGRAPHICS.some(x=>x.id===l.review.id):JOURNEYS.some(x=>x.id===l.review.id));
    const track=PROFESSOR_AUDIO.tracks?.[ProfessorCore.fingerprint(l)];
    if(track){
      assert.equal(track.voice,'pt-BR-ThalitaMultilingualNeural');
      assert.equal(track.segments.length,l.parts.length);
      assert(/^audio\/professor\/[a-f0-9]{24}\.mp3$/.test(track.file));
      assert(fs.statSync(path.join(__dirname,'dist',track.file)).size>1000);
      for(const [i,p] of track.segments.entries()){
        assert(p.start>=0&&p.end>p.start,l.id+' marcação válida');
        if(i)assert(p.start>=track.segments[i-1].end,l.id+' marcações ordenadas');
      }
    }
  }
  assert.equal(all.filter(l=>l.id.startsWith('historia/')).length,1230);
  for(const t of JOURNEYS)for(const [i,s] of t.steps.entries()){
    const text=ProfessorCore.scene(t.id,i).parts.map(p=>p.text).join(' ');
    if(s.teacher){for(const field of ['definition','example','reason'])assert(text.includes(ProfessorCore.clean(s.teacher[field])),`${t.id}/${i}: conteúdo completo em ${field}`);}
    else for(const field of ['speech','explain','observe','meaning','remember'])assert(text.includes(ProfessorCore.clean(s[field])),`${t.id}/${i}: conteúdo completo em ${field}`);
  }
  assert.equal(all.filter(l=>l.id.startsWith('mapa/')).length,41);
  assert.equal(all.filter(l=>l.id.startsWith('infograficos/')).length,56);
  for(const map of INFOGRAPHICS){
    const text=ProfessorCore.infographic(map.id).parts.map(p=>p.text).join(' ');
    for(const field of [map.definition,map.purpose,map.example,...map.groups.flatMap(g=>[g.summary,g.detail,...g.facts]),...map.notes.map(n=>n.text)])assert(text.includes(ProfessorCore.clean(field)),map.id+': explicação completa do mapa');
  }
  assert.equal(all.filter(l=>l.id.startsWith('concurso/')).length,28);
  assert.equal(all.filter(l=>l.id.startsWith('materia/')).length,CONTESTS.reduce((n,c)=>n+c.subjects.length,0));
  for(const c of CONTESTS)for(const s of c.subjects)for(let i=0;i<s.worked.length;i++){
    const l=ProfessorCore.resolve('exemplo',c.id,s.id+'/'+i);assert(l);
    const text=l.parts.map(p=>p.text).join(' ');
    for(const original of [s.worked[i].intro,...s.worked[i].steps])assert(text.includes(ProfessorCore.clean(original)),c.id+'/'+s.id+': exemplo completo');
  }
  assert.equal(ProfessorCore.scene('invalido'),null);
  assert.equal(ProfessorCore.infographic('invalido'),null);
  assert.equal(ProfessorCore.subject('invalido','invalido'),null);
  assert.equal(ProfessorCore.spoken('SQL, NULL, A1:A3, P ∧ Q, 3FN.'),'ésse quê éle, nulo, de A um até A três, P e Q, terceira forma normal.');
  for(const text of ['Art. 74 da Lei 14.133/2021. Ex.: fornecedor exclusivo.','Versão 2.0; valor 3.14. Leia o art. 5º.', 'Use bolo.servir() e teste example.org.','Texto com ponto. '+('Uma explicação com números 14.133/2021 e 3.14. '.repeat(40))])assert.equal(ProfessorCore.split(text).join(' '),ProfessorCore.clean(text),'Dividir a fala preserva números, abreviações e todas as palavras');
  const custom=m.CustomContestCore.make({id:'manual-professorteste',name:'Minha lista',place:'Natal',source:'https://example.org/edital',subjects:['Português','AFO','Informática','Contabilidade','Direito Administrativo']});
  const known=new Set(all.map(ProfessorCore.fingerprint));
  CONTESTS.push(custom);
  try{
    assert(known.has(ProfessorCore.fingerprint(ProfessorCore.contest(custom.id))),'Lista pessoal usa orientação com áudio já incluído');
    for(const s of custom.subjects)assert(known.has(ProfessorCore.fingerprint(ProfessorCore.subject(custom.id,s.id))),'Fundamento pessoal reaproveita roteiro narrado: '+s.name);
  }finally{CONTESTS.pop();}
  if(process.argv.includes('--audio-completo')){
    const missing=all.filter(l=>!PROFESSOR_AUDIO.tracks?.[ProfessorCore.fingerprint(l)]).map(l=>l.id);
    assert.equal(missing.length,0,'Áudios ausentes: '+missing.join(', '));
  }
  if(process.argv.includes('--audio-pendente-autorizado')){
    const report=JSON.parse(fs.readFileSync(path.join(__dirname,'roteiros-thalita-pendentes.json'),'utf8'));
    const missing=all.filter(l=>!PROFESSOR_AUDIO.tracks?.[ProfessorCore.fingerprint(l)]);
    assert.deepEqual(Array.from(missing,l=>l.id).sort(),report.lessons.map(l=>l.id).sort(),'Cada pendência autorizada precisa de roteiro completo registrado');
    for(const l of missing)assert.equal(ProfessorCore.fingerprint(l),report.lessons.find(x=>x.id===l.id).fingerprint,'Roteiro pendente atualizado');
  }
  if(!process.argv.includes('--json'))console.log(`Professor: ${all.length} aulas; ${all.filter(l=>PROFESSOR_AUDIO.tracks?.[ProfessorCore.fingerprint(l)]).length} com áudio Thalita.`);
};
