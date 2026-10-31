'use strict';
/* Regressões de pesos, descontos, empates e dados desconhecidos. */
module.exports=({CONTESTS,ScoringCore,Catalog,ProfessorCore})=>{
  const assert=require('node:assert/strict'),find=id=>CONTESTS.find(c=>c.id===id);
  const abdi=find('abdi-dev-2026'),cgu=find('cgu-dev-2026'),nisia=find('nisia-guarda');
  for(const id of ['ufrn-ati-dev-2025','ufrn-ati-dados-2025']){const d=ScoringCore.distribution(find(id));assert.equal(d.total,10);assert.equal(d.rows[0].share,70);assert.equal(d.rows[1].share,15);assert.equal(d.rows[2].share,15);}
  assert.equal(ScoringCore.distribution(find('ufrn-tti-2023')).total,10);
  assert(find('dataprev-dev-2024').scoring.source.includes('dataprev_edital_0.pdf'));
  const a=ScoringCore.distribution(abdi);
  assert.equal(a.total,25);assert.equal(a.rows[0].id,'tecnologia');assert.equal(a.rows[0].points,13);assert.equal(a.rows[0].share,52);
  assert.deepEqual(Array.from(ScoringCore.subjects(abdi),s=>s.id),['tecnologia','institucional','portugues','raciocinio','informatica']);
  assert.equal(a.rows[3].rank,a.rows[4].rank,'Mesma pontuação deve manter empate');
  assert.equal(a.rows[3].points,1.8,'Peso decimal deve produzir pontos sem resíduo de ponto flutuante');
  const g=ScoringCore.distribution(cgu);assert.equal(g.kind,'blocks');assert.equal(g.total,260);
  assert.equal(g.rows[0].id,'P3');assert.equal(g.rows[0].points,180);assert.equal(g.rows[0].wrong,-2);
  assert.equal(g.rows.find(r=>r.id==='P1').wrong,-1);assert.equal(g.rows[1].rank,g.rows[2].rank);
  assert.deepEqual(Array.from(ScoringCore.subjects(cgu),s=>s.id),Array.from(cgu.subjects,s=>s.id),'Sem dividir contagem de blocos arbitrariamente por matéria');
  assert.equal(ScoringCore.distribution(nisia).total,90);assert.equal(ScoringCore.distribution(nisia).rows[0].points,60);
  assert.equal(ScoringCore.distribution(find('nisia-prefeitura')).total,120);
  assert.equal(ScoringCore.distribution(find('camara-2026')).total,180);
  assert.equal(ScoringCore.distribution(find('natal-suporte-2023')).rows[0].share,60);
  assert.equal(ScoringCore.distribution(find('sao-agente-2021')).rows[0].share,45);
  for(const id of ['dataprev-dev-2024','dataprev-dev-2026']){
    const d=ScoringCore.distribution(find(id));assert.equal(d.total,115);assert.equal(d.rows[0].points,75);assert.equal(d.rows[0].correct,2.5);assert.equal(d.rows[1].rank,d.rows[2].rank);
    assert(ProfessorCore.contest(id).parts.some(p=>p.text.includes('57,5')));
  }
  for(const id of ['natal-sttu','sao-goncalo','parnamirim-futuro'])assert.equal(ScoringCore.distribution(find(id)).kind,'suggested');
  const partial={subjects:[{id:'x',count:null,name:'Sem contagem'}],scoring:{correct:1}};
  assert.equal(ScoringCore.distribution(partial).total,null,'Quantidade desconhecida não vira zero');
  assert(Catalog.contest(cgu).includes('Erro desconta 2 pontos'));assert(!Catalog.contest(cgu).includes('Acerto: null'));
  assert(Catalog.contest(abdi).includes('52% da objetiva'));assert(Catalog.contest(abdi).includes('30 das 60'));
  const voice=ProfessorCore.contest(cgu.id).parts.map(p=>p.text).join(' ');assert(voice.includes('Erro desconta 2 pontos'));assert(voice.includes('P3 54'));
  const subjectsBefore=abdi.subjects.map(s=>s.id).join();ScoringCore.subjects(abdi);assert.equal(abdi.subjects.map(s=>s.id).join(),subjectsBefore);
};
