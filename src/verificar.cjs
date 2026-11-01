/* Verifica o conteúdo, todas as figuras e a retomada das histórias. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const context={URL};
vm.runInNewContext(Object.values(require('./build-manifest.json').scripts).map(name=>fs.readFileSync(path.join(__dirname,name),'utf8')).join('\n')+'\nthis.material={JOURNEYS,CONTESTS,ContestCore,INFOGRAPHICS,InfographicUI,Catalog,Art,LessonCore,ReviewCore,ReviewUI,GeneralScenes,SearchCore,CustomContestCore,RouteCore,LabCore,LabUI,ProfessorCore,PROFESSOR_AUDIO,ScoringCore,ActivityBank,ActivityCore,ThemeCore,StoryExpansion};',context);
const {JOURNEYS,CONTESTS,ContestCore,INFOGRAPHICS,InfographicUI,Catalog,Art,LessonCore,ReviewCore,ReviewUI,GeneralScenes,SearchCore,CustomContestCore,RouteCore,LabCore,LabUI,ProfessorCore,PROFESSOR_AUDIO}=context.material;
assert.equal(JOURNEYS.length,41);
assert.equal(JOURNEYS.reduce((n,topic)=>n+topic.steps.length,0),1230);
assert(JOURNEYS.every(topic=>topic.steps.length===30&&topic.baseCount>=5&&topic.baseCount<=7),'Cada história deve ter 30 cenas e preservar sua introdução');
const keys=new Set(),frames=[],maps=[];
for(const topic of JOURNEYS){
  assert(!keys.has(topic.id));keys.add(topic.id);
  const stepKeys=new Set();
  for(const [index,step]of topic.steps.entries()){
    assert(!stepKeys.has(step.id));stepKeys.add(step.id);
    for(const field of ['title','map','speech','explain','observe','term','meaning','remember'])assert(step[field]?.trim(),`${topic.id}/${step.id}: ${field}`);
    const svg=Art.scene(topic,index);
    assert(!/\b(?:NaN|Infinity|undefined)\b/.test(svg)&&!/<script|\bonclick=/i.test(svg));
    assert(svg.includes('<title>')&&svg.includes('<desc>'));
    frames.push({id:`${topic.id}-${step.id}`,svg});
  }
  const interactive=Art.mindMap(topic),staticMap=Art.mindMap(topic,false);
  assert.equal((interactive.match(/data-map-step=/g)||[]).length,6,'O mapa deve abrir cada uma das seis partes da história');
  assert(!staticMap.includes('data-map-step=')&&!staticMap.includes('Toque em um ramo'));
  assert.equal(LessonCore.move(topic,0,-1),0);
  assert.equal(LessonCore.move(topic,topic.steps.length-1,1),topic.steps.length-1);
  maps.push({id:topic.id,svg:staticMap});
}
assert.equal(LessonCore.normalize(null).topic,'sql');
assert.equal(LessonCore.normalize({topic:'invalid',positions:{sql:100,java:-3,web:'4'},motion:'yes'}).topic,'sql');
const normalized=LessonCore.normalize({topic:'java',positions:{sql:100,java:-3,web:'4'},motion:false});
assert.equal(normalized.positions.sql,29);assert.equal(normalized.positions.java,0);assert.equal(normalized.positions.web,0);assert.equal(normalized.motion,false);
assert.equal(LessonCore.normalize({topic:'java',positions:{java:3}}).positions.java,3);
const sql=JOURNEYS.find(topic=>topic.id==='sql');
assert.equal((Art.scene(sql,5,'ana').match(/class="scene-highlight"/g)||[]).length,2,'Os dois pedidos da Ana recebem destaque');
assert.equal((Art.scene(sql,5,'caio').match(/class="scene-highlight"/g)||[]).length,1,'Caio tem uma linha preservada');
assert.equal(CONTESTS.find(c=>c.id==='parnamirim-guarda-2024').subjects.reduce((n,s)=>n+s.count,0),50);
for(const id of ['nisia-prefeitura','nisia-guarda'])assert.equal(CONTESTS.find(c=>c.id===id).subjects.reduce((n,s)=>n+s.count,0),60);
const abdi=CONTESTS.find(c=>c.id==='abdi-dev-2026');assert.equal(abdi.subjects.reduce((n,s)=>n+s.count,0),60);assert(Catalog.catalog('Nacional').includes(abdi.name));assert(Catalog.subject(abdi,abdi.subjects.find(s=>s.id==='tecnologia')).includes('data-infographic="formas-normais"'));
for(const c of CONTESTS.filter(c=>c.evidence)){
assert.equal(c.subjects.reduce((n,s)=>n+s.count,0),c.evidence.total);
 const all=[];for(const s of c.subjects){const nums=s.observed.flatMap(o=>o.questions);assert.equal(nums.length,s.count);assert.equal(new Set(nums).size,s.count);all.push(...nums);}
 assert.equal(new Set(all).size,c.evidence.total);assert.equal(Math.min(...all),1);assert.equal(Math.max(...all),c.evidence.total);
}
const natal=CONTESTS.find(c=>c.id==='natal-camara-2023');assert(Catalog.subject(natal,natal.subjects[1]).includes('42/90 = 7/15'));assert.equal((6/10)*(5/9)+(4/10)*(3/9),42/90);
assert.equal(INFOGRAPHICS.length,56);
assert.equal(new Set(INFOGRAPHICS.map(m=>m.id)).size,INFOGRAPHICS.length);
for(const id of ['cascata','iterativo','incremental'])assert(INFOGRAPHICS.some(m=>m.id===id));
for(const [contestId,subjectId,topicId,mapId] of [['abdi-dev-2026','tecnologia','programacao','java-objetos'],['abdi-dev-2026','tecnologia','apis','rest-http'],['abdi-dev-2026','tecnologia','agil','scrum-fundamentos'],['cgu-dev-2026','entrega','entrega-3','git-ci'],['cgu-dev-2026','entrega','entrega-2','testes-software']]){
 const c=CONTESTS.find(c=>c.id===contestId),s=c.subjects.find(s=>s.id===subjectId),t=s.topics.find(t=>t.id===topicId);
 assert.equal(t.infographic,mapId);assert(Catalog.subject(c,s).includes(`data-infographic="${mapId}"`));
}
for(const m of INFOGRAPHICS){assert(keys.has(m.beginner));assert(m.groups.length>=3);assert(m.sources.length>=2);for(const [,url]of m.sources)assert(ContestCore.validSource(url));const html=InfographicUI.render(m.id);assert(html.includes(m.title)&&html.includes('O que é?')&&html.includes('Para que serve?'));assert(html.includes('Entenda um pouco mais'));}
for(const area of ['Português','Matemática e lógica','Direito','Administração','Informática','Tecnologia']){const m=INFOGRAPHICS.find(x=>x.area===area);assert(m);const html=InfographicUI.render(m.id,area);assert(html.includes(`data-info="${m.id}"`));}
const nisiaAdmin=CONTESTS.find(c=>c.id==='nisia-prefeitura');assert(Catalog.subject(nisiaAdmin,nisiaAdmin.subjects.find(s=>s.id==='especifico')).includes('data-infographic="ato-administrativo"'));
const nisiaSpecific=nisiaAdmin.subjects.find(s=>s.id==='especifico'),nisiaSpecificHtml=Catalog.subject(nisiaAdmin,nisiaSpecific);
assert.equal(nisiaSpecific.count,30);assert(nisiaSpecific.topics.some(t=>t.id==='contabilidade'));
for(const [topic,map] of [['Noções de contabilidade básica','contabilidade-patrimonio'],['Correspondência, redação e comunicação oficial','redacao-oficial'],['Atendimento ao público presencial, telefônico e virtual','atendimento-publico']])assert(nisiaSpecificHtml.includes(`${topic}</span><button type="button" data-infographic="${map}"`));
for(const [topic,map] of [['Termos latinos na linguagem administrativa','expressoes-latinas'],['Secretariado e organização de reuniões','reunioes-ata'],['Eventos: passagens, hospedagem, reembolsos e infraestrutura','eventos-logistica']])assert(nisiaSpecificHtml.includes(`${topic}</span><button type="button" data-infographic="${map}"`));
assert.equal(3000-800,2200);
const nisiaLogic=nisiaAdmin.subjects.find(s=>s.id==='raciocinio');for(const id of ['conjuntos-mapa','regra-tres','equacao-primeiro-grau','media-mapa'])assert(Catalog.subject(nisiaAdmin,nisiaLogic).includes(`data-infographic="${id}"`));
const sao=CONTESTS.find(c=>c.id==='sao-agente-2021');assert(Catalog.subject(sao,sao.subjects.find(s=>s.id==='logica')).includes('data-infographic="conjuntos-mapa"'));
const saoPort=Catalog.subject(sao,sao.subjects.find(s=>s.id==='portugues'));assert(saoPort.includes('Acentuação</span><button type="button" data-infographic="acentuacao-mapa"'));assert(saoPort.includes('Concordância e formas verbais</span><button type="button" data-infographic="verbos-tempos"'));
const natalPort=Catalog.subject(natal,natal.subjects.find(s=>s.id==='portugues'));assert(natalPort.includes('Sintaxe e referência dos pronomes</span><button type="button" data-infographic="coesao-pronomes"'));
assert.equal((6*1+8*3)/(1+3),7.5);assert.equal(2+2-1,3);assert.equal(4/2*3,6);
let reviews=ReviewCore.add([], 'mapa','conjuntos-mapa','2026-10-28');reviews=ReviewCore.add(reviews,'mapa','conjuntos-mapa','2026-10-28');assert.equal(reviews.length,1);
reviews=ReviewCore.add(reviews,'historia','java','2026-10-28');reviews=ReviewCore.schedule(reviews,'mapa','conjuntos-mapa','2026-11-01');assert.equal(reviews[0].due,'2026-11-01');
assert.throws(()=>ReviewCore.schedule(reviews,'mapa','conjuntos-mapa','2026-02-30'));assert.equal(ReviewCore.ordered(reviews,'2026-11-02')[0].id,'conjuntos-mapa');
assert(ReviewUI.render(reviews,'2026-11-02').includes('01/11/2026'));reviews=ReviewCore.done(reviews,'mapa','conjuntos-mapa','2026-11-02');assert.equal(reviews[0].due,null);assert.equal(reviews[0].reviewed,'2026-11-02');
reviews=ReviewCore.remove(reviews,'mapa','conjuntos-mapa');assert.equal(reviews.length,1);assert.equal(ReviewCore.normalize([{type:'mapa',id:'nao-existe',due:'2026-11-01'}]).length,0);
const gcm=CONTESTS.find(c=>c.id==='parnamirim-guarda-2024');assert(!Catalog.subject(gcm,gcm.subjects.find(s=>s.id==='penal')).includes('data-infographic="ato-administrativo"'));
for(const c of CONTESTS.filter(c=>/^(ufrn|ifrn)-/.test(c.id))){
  assert(!Catalog.subject(c,c.subjects.find(s=>s.id==='legislacao')).includes('data-infographic="legislacao-especial-guarda"'),'Legislação federal não recomenda legislação de guardas');
  assert(!Catalog.subject(c,c.subjects.find(s=>s.id==='especificos')).includes('data-infographic="gestao-documental"'),'TI não recebe recomendações administrativas genéricas');
}
assert(!Catalog.contest(CONTESTS.find(c=>c.id==='ufrn-ati-dev-2025')).includes('0,23 pontos por acerto'),'Pontuação normalizada não usa arredondamento como valor exato');
assert(Catalog.subject(CONTESTS.find(c=>c.id==='cgu-dev-2026'),CONTESTS.find(c=>c.id==='cgu-dev-2026').subjects.find(s=>s.id==='persistencia')).includes('data-infographic="sql-linguagens"'));
assert(Catalog.strategy().includes('A relação foi invertida'));assert(Catalog.strategy().includes('não é uma conclusão necessária'));
assert.equal(ContestCore.guess(4,2,1,0).probability,.5);
assert.equal(ContestCore.guess(2,0,1,-1).expected,0);
assert.equal(ContestCore.guess(4,0,1,-1).expected,-.5);
assert.throws(()=>ContestCore.guess(4,4,1,0));
assert.equal(ContestCore.validSource('javascript:alert(1)'),'');
for(const c of CONTESTS){assert(ContestCore.validSource(c.source));assert(Catalog.contest(c).includes(c.name));for(const s of c.subjects){assert(s.journey&&keys.has(s.journey),`${c.id}/${s.id} sem journey`);assert(s.worked?.length>=1,`${c.id}/${s.id} sem exemplo resolvido`);for(const ex of s.worked||[])assert(keys.has(ex.lesson),`${c.id}/${s.id} worked lesson inválida: ${ex.lesson}`);for(const t of s.topics){assert(t.journey&&keys.has(t.journey),`${c.id}/${s.id}/${t.id} sem journey`);if(t.infographic)assert(INFOGRAPHICS.some(m=>m.id===t.infographic));}const subjectHtml=Catalog.subject(c,s);assert(subjectHtml.includes(s.name));assert(subjectHtml.includes('Entendendo o raciocínio'),`${c.id}/${s.id} sem seção de exemplo resolvido`);assert(!subjectHtml.includes('Introdução em preparação'),`${c.id}/${s.id} com introdução em preparação`);assert(!subjectHtml.includes('Explicação em preparação'),`${c.id}/${s.id} com explicação em preparação`);}}
for(const place of ['Natal','São Gonçalo','Nísia Floresta','Parnamirim','Nacional'])assert(Catalog.catalog(place).includes('contest-card'));
require('./verificar-novidades.cjs')(context.material);
require('./verificar-pontuacao.cjs')(context.material);
require('./verificar-atividades.cjs')(context.material);
require('./verificar-historias.cjs')(context.material);
require('./verificar-professor.cjs')(context.material);
if(process.argv.includes('--export')){
  const folder=path.join(__dirname,'mapas-ilustrados');fs.mkdirSync(folder,{recursive:true});
  for(const map of maps)fs.writeFileSync(path.join(folder,`${map.id}.svg`),map.svg);
}
if(process.argv.includes('--json'))process.stdout.write(JSON.stringify({frames,maps}));
else console.log(`OK: ${JOURNEYS.length} histórias, ${frames.length} cenas, ${maps.length} mapas ilustrados, ${INFOGRAPHICS.length} infográficos, ${CONTESTS.length} concursos, ${CONTESTS.filter(c=>c.evidence).length} provas completas (${CONTESTS.reduce((n,c)=>n+(c.evidence?.total||0),0)} questões).`);
if(process.argv.includes('--build'))console.log('Aplicativo gerado: '+require('./build.cjs').build());
