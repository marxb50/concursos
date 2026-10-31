'use strict';
module.exports=({ActivityBank:bank,ActivityCore:core,CONTESTS,ProfessorCore,LabCore,ThemeCore,JOURNEYS})=>{
 const assert=require('node:assert/strict'),all=bank.flatMap(m=>m.questions),canonical=new Set(all.map(q=>q.canonical));
 assert.equal(canonical.size,all.length);assert(all.length>=1200);
 for(const m of bank){assert(JOURNEYS.some(j=>j.id===m.journey),'Fundamento válido: '+m.id);for(const q of m.questions){
  assert(core.grade(q,q.answer),q.canonical);assert(q.explain.trim()&&q.hint.trim(),q.canonical);
  if(q.options){assert.equal(new Set(q.options).size,q.options.length);for(let i=0;i<q.options.length;i++)assert.equal(core.grade(q,i),i===q.answer);}
  const l=ProfessorCore.question(q.canonical);assert(l&&l.id==='questao/'+q.canonical);const text=l.parts.map(p=>p.text).join(' ');
  assert(text.includes(ProfessorCore.clean(q.teaching?.why||q.explain)),'Professor explica a questão: '+q.canonical);
  assert(!/adm_principios/.test(JSON.stringify(q.ref)));
 }}
 const rows=[];
 const numeric=(family,id)=>bank.find(m=>m.id===family).questions.find(q=>q.id===id);
 assert.equal(numeric('chance-probabilidade','ponderada_24').answer,(8*3+6*2)/(3+2),'Média ponderada não arredonda sem pedido');
 assert.equal(numeric('recursos-porcentagem','conversao_35').answer,4096/1024);
 for(const id of ['dado_06','dado_26','dado_27']){const q=numeric('chance-probabilidade',id);assert.equal(q.answer,Math.round(2/6*100));assert(/Arredonde/.test(q.prompt));}
 for(const c of CONTESTS)for(const s of c.subjects){
  const ms=core.missions(c.id,s.id),qs=ms.flatMap(m=>m.questions);assert(qs.length>=40&&qs.length<=100,c.id+'/'+s.id+': '+qs.length);
  assert.equal(new Set(qs.map(q=>q.canonical)).size,qs.length,'Sem duplicatas dentro da matéria');
  assert.equal(qs.length,core.blueprint(c,s).reduce((n,b)=>n+b.count,0),'Sem grupo inexistente ou quantidade inflada');
  for(const m of ms){assert(m.questions.length<=10);assert.equal(core.mission(m.id),m);if(m.evidence){assert(m.evidence.questions.every(n=>s.observed.some(o=>o.name===m.evidence.name&&o.questions.includes(n))));assert.equal(m.evidence.total,s.count);}}
  for(const q of qs){assert(core.grade(q,q.answer));if(c.scoring.type==='binary'&&q.options){assert.equal(q.type,'judgment');assert.equal(q.options.length,2);}assert(canonical.has(q.canonical));}
  rows.push(qs.length);
 }
 assert.equal(rows.length,140);assert.equal(Math.min(...rows),40);assert.equal(Math.max(...rows),100);
 const families=(c,s)=>core.missions(c,s).map(m=>m.family);
 assert(families('abdi-dev-2026','institucional').every(id=>id==='abdi'));
 assert(families('camara-2026','politica').every(id=>id==='politica'));
 assert(!families('nisia-prefeitura','especifico').includes('federal'));
 assert(families('ufrn-ati-dados-2025','especificos').includes('dados'));
 assert(!families('ufrn-ati-dev-2025','legislacao').includes('educacao-ifrn'));
 assert.equal(core.missions('natal-suporte-2023','especificos')[0].evidence.count,6);
 const cid='cgu-dev-2026',sid='persistencia',m=core.missions(cid,sid).find(m=>m.family==='resgate-sql');let state=core.normalize(null);
 const edit=(a,v)=>state=core.edit(state,cid,sid,m.id,a,v);
 edit('next');assert.equal(core.run(state,cid,sid,m.id).cursor,0);
 edit('answer',null);assert.equal(core.run(state,cid,sid,m.id).answers[0].values.length,0);
 for(const q of m.questions){edit('answer',q.answer);edit('hint');edit('next');}
 assert.equal(core.stats(state).xp,40);assert.equal(core.run(core.normalize(JSON.parse(JSON.stringify(state))),cid,sid,m.id).cursor,4);
 edit('reset');for(const q of m.questions){edit('answer',q.answer);edit('next');}assert.equal(core.stats(state).xp,40,'Repetição não multiplica XP');
 const other=core.missions('cgu-ti-2022',sid).find(m=>m.family==='resgate-sql');for(const q of other.questions){state=core.edit(state,'cgu-ti-2022',sid,other.id,'answer',q.answer);state=core.edit(state,'cgu-ti-2022',sid,other.id,'next');}assert.equal(core.stats(state).xp,40,'Outro concurso não duplica a recompensa da mesma questão');
 edit('reset');edit('hint');edit('answer',m.questions[0].answer);edit('next');for(let i=1;i<m.questions.length;i++){edit('answer',m.questions[i].answer);edit('next');}edit('review');assert.equal(core.run(state,cid,sid,m.id).cursor,0);edit('answer',m.questions[0].answer);edit('next');assert.equal(core.run(state,cid,sid,m.id).cursor,4,'Revisão pula acertos anteriores');
 const changed=JSON.parse(JSON.stringify(state));changed.runs[core.key(cid,sid,m.id)].answers[0].revision='antiga';assert.equal(core.run(core.normalize(changed),cid,sid,m.id).cursor,0,'Revisão diferente invalida resposta antiga');
 assert.equal(Object.keys(core.normalize({version:1,runs:state.runs}).runs).length,0,'Índices antigos não se tornam respostas novas');
 assert.equal(core.missions('invalido','invalido').length,0);
 const counts={INNER:3,LEFT:4,RIGHT:4,FULL:5};for(const q of bank.find(m=>m.id==='resgate-sql').questions){const rows=LabCore.joinRows(q.answer);assert.equal(rows.length,counts[q.answer]);if(['LEFT','FULL'].includes(q.answer))assert(rows.some(r=>r.client==='Caio'&&r.order===null));if(['RIGHT','FULL'].includes(q.answer))assert(rows.some(r=>r.client===null&&r.order===104));}
 for(const q of all.filter(q=>q.type==='logic'))assert(core.grade(q,[[true,true],[true,false],[false,true],[false,false]].map(([p,r])=>LabCore.truth(p,r)[q.op])));
 assert.equal(ThemeCore.normalize('caderno'),'caderno');assert.equal(ThemeCore.normalize('<script>'),'circuitos');
 console.log(`Atividades: ${all.length} questões únicas; ${rows.reduce((a,b)=>a+b,0)} nas trilhas; 140 matérias entre 40 e 100.`);
};
