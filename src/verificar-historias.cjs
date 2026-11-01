'use strict';
const assert=require('node:assert/strict');
module.exports=m=>{
 const {JOURNEYS,ProfessorCore,ContestCore,INFOGRAPHICS,StoryExpansion}=m;
 let originals=0,concepts=0,applications=0,reviews=0,withSource=0,reusedMap=0,reusedQuestion=0;
 for(const topic of JOURNEYS){
  assert.equal(topic.steps.length,30,topic.id);originals+=topic.baseCount;
  const ids=new Set(topic.steps.map(s=>s.id));assert.equal(ids.size,30,topic.id+' IDs únicos');
  const sections=StoryExpansion.sections(topic);let cursor=0;
  for(const section of sections){assert.equal(section.start,cursor);assert(section.end>section.start);cursor=section.end;}
  assert.equal(cursor,30);assert.equal(sections.length,6);
  for(let i=0;i<10;i++){
   const a=topic.steps[topic.baseCount+i],b=topic.steps[topic.baseCount+10+i];
   assert.equal(a.mode,'conceito');assert.equal(b.mode,'aplicacao');concepts++;applications++;
   assert(a.teacher&&b.teacher&&a.teacher.term===b.teacher.term);
   assert.equal(ProfessorCore.fingerprint(ProfessorCore.scene(topic.id,topic.baseCount+i)),ProfessorCore.fingerprint(ProfessorCore.scene(topic.id,topic.baseCount+10+i)),'O mesmo conceito e seu exemplo compartilham explicação');
   for(const step of [a,b])if(step.source){assert(ContestCore.validSource(step.source[1]));withSource++;}
   if(a.teacher.mapId){
    const lesson=ProfessorCore.scene(topic.id,topic.baseCount+i),map=INFOGRAPHICS.find(x=>x.id===a.teacher.mapId);
    assert(map);assert.equal(ProfessorCore.fingerprint(lesson),ProfessorCore.fingerprint(ProfessorCore.infographic(map.id)));
    assert(lesson.parts[lesson.startPart].label.startsWith(`Bloco ${a.teacher.mapGroup+1} ·`));reusedMap++;
   }
   if(a.teacher.canonical){assert.equal(ProfessorCore.fingerprint(ProfessorCore.scene(topic.id,topic.baseCount+i)),ProfessorCore.fingerprint(ProfessorCore.question(a.teacher.canonical)));reusedQuestion++;}
  }
  for(let i=topic.baseCount+20;i<30;i++){
   const step=topic.steps[i],l=ProfessorCore.scene(topic.id,i);reviews++;
   assert(step.recall?.answer&&step.recall.question);assert.equal(l.parts[l.startPart].kind,'question','Professora começa na pergunta da revisão');
  }
 }
 const p=JOURNEYS.find(x=>x.id==='adm_patrimonio').steps.find(s=>s.term==='Inventário físico');
 assert(p.exam?.[0].includes('questão 44'));assert(ContestCore.validSource(p.exam[1]));
 if(!process.argv.includes('--json'))console.log(`Histórias: ${JOURNEYS.length} × 30 cenas; ${originals} cenas originais preservadas, ${concepts} conceitos, ${applications} aplicações e ${reviews} revisões. ${withSource} cenas com fonte; ${reusedMap} explicações de mapas e ${reusedQuestion} de atividades reutilizadas.`);
};
