'use strict';
/* Regressões de comportamento, dados, rotas e segurança do conteúdo local. */
module.exports = function verify(m) {
  const assert=require('node:assert/strict');
  const {JOURNEYS,CONTESTS,INFOGRAPHICS,Art,Catalog,GeneralScenes,SearchCore,CustomContestCore,RouteCore,ReviewCore,LabCore,InfographicUI}=m;
  assert.equal(CONTESTS.length,28);
  assert.equal(new Set(CONTESTS.map(c=>c.id)).size,CONTESTS.length);
  assert.equal(CONTESTS.filter(c=>c.evidence).length,12);
  assert.equal(CONTESTS.reduce((n,c)=>n+(c.evidence?.total||0),0),630);
  for(const t of JOURNEYS){
    assert(Art.symbol(t.symbol).includes(`data-symbol="${t.symbol}"`),`Ícone explícito: ${t.id}`);
    if(JOURNEYS.indexOf(t)>=8)assert(GeneralScenes.supported.includes(t.id));
    for(let i=0;i<t.steps.length;i++){
      const variants=GeneralScenes.actions(t.id,i).map(([focus])=>Art.scene(t,i,focus));
      assert.equal(new Set(variants).size,variants.length,`Ações precisam alterar o desenho: ${t.id}/${i}`);
      for(const svg of variants)assert(!/\b(?:NaN|Infinity|undefined)\b|<script|\bonclick=/i.test(svg));
    }
  }
  assert.equal(GeneralScenes.supported.length,33);
  assert.equal(SearchCore.journeys().length,41);
  assert.equal(SearchCore.journeys('Informática').length,4);
  assert(SearchCore.journeys('Todas','equacao').some(t=>t.id==='mat_equacoes'));
  for(const [query,id] of [['Liskov','solid'],['3FN','formas-normais'],['crase','uso-crase'],['habeas corpus','direitos-constitucionais'],['inexigibilidade','licitacoes-controle-etica'],['ARO','orcamento-publico-afo']])assert(SearchCore.maps('Todas',query).some(m=>m.id===id),`Busca: ${query}`);
  assert.equal(SearchCore.maps('Informática').length,5);
  assert.equal(SearchCore.maps('Todas','zxqconteudoinexistente').length,0);
  const empty=InfographicUI.render('tcpip','Todas','zxqconteudoinexistente');
  assert(empty.includes('Nenhum mapa encontrado.')&&!empty.includes('infographic-sheet'));
  assert(SearchCore.contests(CONTESTS,'natal suporte').some(c=>c.id==='natal-suporte-2023'));
  const custom=CustomContestCore.make({id:'manual-teste',name:'Meu <concurso>',place:'Natal',source:'https://example.org/edital',subjects:['Administração','Arquivologia','Contabilidade','AFO','Inglês','Ética','Auditoria','Licitações','Direito Administrativo','Informática','Matemática','Português']});
  assert(custom&&custom.subjects.length===12);
  const expected=['adm_redacao','adm_redacao','adm_patrimonio','afo_orcamento','ingles_leitura','etica_servico','etica_servico','etica_servico','const_fundamentos','infra','mat_frac','port_texto'];
  for(const [i,s] of custom.subjects.entries()){
    assert.equal(s.journey,expected[i],s.name);
    assert(s.worked.length>0);
    assert(Catalog.subject(custom,s).includes('Entendendo o raciocínio'));
  }
  assert(Catalog.contest(custom).includes('&lt;concurso&gt;'));
  assert(Catalog.contest(custom).includes('data-delete-contest="manual-teste"'));
  assert.equal(CustomContestCore.make({...custom,source:'javascript:alert(1)'}),null);
  assert.equal(CustomContestCore.make({id:'bad'}),null);
  for(const c of CONTESTS){
    assert.equal(new Set(c.subjects.map(s=>s.id)).size,c.subjects.length,`${c.id}: matérias repetidas`);
    for(const s of c.subjects){
      const html=Catalog.subject(c,s);
      for(const t of s.topics)assert(html.includes(`data-journey="${t.journey}"`),`${c.id}/${t.id}: história acessível`);
    }
    if(c.scoring.correctBySubject){
      assert([4,5].includes(c.scoring.options));assert.equal(c.scoring.wrong,0);
      const total=c.subjects.reduce((n,s)=>n+s.count*c.scoring.correctBySubject[s.id],0);
      assert(Math.abs(total-(({'sao-agente-2021':60,'abdi-dev-2026':25,'nisia-guarda':90,'dataprev-dev-2024':115,'dataprev-dev-2026':115,'ufrn-ati-dev-2025':10,'ufrn-ati-dados-2025':10})[c.id]??100))<1e-8);
    }
  }
  const guarda=CONTESTS.find(c=>c.id==='nisia-guarda').subjects.find(s=>s.id==='direito-legislacao');
  assert.equal(guarda.topics.length,27);
  assert(guarda.topics.some(t=>t.id==='susp'));
  assert(!guarda.topics.some(t=>t.id==='hediondos'),'Não copiar legislação de outro edital');
  for(const id of ['natal-sttu','sao-goncalo','parnamirim-futuro'])assert.equal(CONTESTS.find(c=>c.id===id).subjects.filter(s=>s.optional).length,2);
  for(const view of RouteCore.views)assert.equal(RouteCore.parse('#'+view).view,view);
  assert.equal(RouteCore.parse('#infograficos/formas-normais').id,'formas-normais');
  assert.equal(RouteCore.parse('#materia/cgu-dev-2026/persistencia').subject,'persistencia');
  assert.equal(RouteCore.parse('#materia/cgu-dev-2026/invalida').view,'concurso');
  assert.equal(RouteCore.parse('#concurso/invalido').view,'concursos');
  assert.equal(RouteCore.parse('#historia/%E0%A4%A').view,'concursos');
  assert.equal(RouteCore.hash('materia','cgu-dev-2026','persistencia'),'#materia/cgu-dev-2026/persistencia');
  assert.equal(ReviewCore.plusDays('2026-12-31',1),'2027-01-01');
  assert.equal(ReviewCore.plusDays('2028-02-28',1),'2028-02-29');
  assert.equal(ReviewCore.plusDays('2026-02-28',1),'2026-03-01');
  assert.throws(()=>ReviewCore.plusDays('2026-02-30',3));
  assert.throws(()=>ReviewCore.plusDays('2026-10-28',-1));
  for(const [kind,count] of [['INNER',3],['LEFT',4],['RIGHT',4],['FULL',5]])assert.equal(LabCore.joinRows(kind).length,count);
  assert.equal(LabCore.joinRows('LEFT').find(r=>r.client==='Caio').order,null);
  assert.equal(LabCore.joinRows('RIGHT').find(r=>r.order===104).client,null);
  assert.throws(()=>LabCore.joinRows('INVALID'));
  for(const [p,q,expected] of [[true,true,[false,true,true,true,true]],[true,false,[false,false,true,false,false]],[false,true,[true,false,true,true,false]],[false,false,[true,false,false,true,true]]])assert.deepEqual(Array.from(Object.values(LabCore.truth(p,q))),expected);
  const sheet=LabCore.sheet([10,20,30]);assert.equal(sheet.sum,60);assert.equal(sheet.isolated,40);assert.equal(sheet.mean,20);assert.equal(sheet.condition,'Aprovado');
  assert.equal(LabCore.sheet([6,4,2]).condition,'Revisar');assert.throws(()=>LabCore.sheet([NaN,2,3]));
};
