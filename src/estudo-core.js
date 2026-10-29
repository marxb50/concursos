/* Funções puras compartilhadas pela interface e pelas verificações. */
const SearchCore = (() => {
  const fold = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const matches = (value, query) => fold(query).split(/\s+/).filter(Boolean).every(word => fold(value).includes(word));
  const area = topic => /^(port_|ingles_)/.test(topic.id) ? 'Português e Inglês'
    : /^(mat_|logic_)/.test(topic.id) ? 'Matemática e lógica'
    : topic.id.startsWith('info_') ? 'Informática'
    : /^(const_|penal_|legis_)/.test(topic.id) ? 'Direito'
    : /^(adm_|afo_|etica_)/.test(topic.id) ? 'Administração e AFO' : 'Tecnologia';
  const areas = ['Todas','Português e Inglês','Matemática e lógica','Informática','Direito','Administração e AFO','Tecnologia'];
  const journeys = (selected='Todas', query='') => JOURNEYS.filter(t => (selected==='Todas'||area(t)===selected) && matches([t.name,t.description,...t.steps.flatMap(s=>[s.title,s.term,s.meaning,s.explain])].join(' '), query));
  const maps = (selected='Todas', query='') => INFOGRAPHICS.filter(m => (selected==='Todas'||m.area===selected) && matches([m.label,m.title,m.subtitle,m.definition,m.purpose,m.example,...m.groups.flatMap(g=>[g.title,g.summary,g.detail,...g.facts,...(g.visual?.rows.flat()||[])]),...m.notes.flatMap(n=>[n.title,n.text])].join(' '), query));
  const contests = (items, query='') => items.filter(c=>matches([c.name,c.role,c.organizer,c.location,c.kind,...c.subjects.flatMap(s=>[s.name,...s.topics.map(t=>t.name)])].join(' '),query));
  return {fold,matches,area,areas,journeys,maps,contests};
})();

const CustomContestCore = (() => {
  function make(data) {
    if(!data || !/^manual-[a-z0-9]+$/.test(data.id) || typeof data.name!=='string' || typeof data.place!=='string' || !ContestCore.validSource(data.source) || !Array.isArray(data.subjects)) return null;
    const names=[...new Set(data.subjects.filter(x=>typeof x==='string'&&x.trim()).map(x=>x.trim().slice(0,120)))].slice(0,30);
    if(!data.name.trim()||!data.place.trim()||!names.length) return null;
    const baseFor = name => {
      const text=SearchCore.fold(name), all=CONTESTS.filter(c=>!c.manual).flatMap(c=>c.subjects);
      const byJourney=id=>all.find(s=>s.journey===id) || {journey:id,topics:JOURNEYS.find(t=>t.id===id).steps.map(s=>({id:s.id,name:s.title,journey:id})),worked:[{title:'Do exemplo à ideia',reference:'Exemplo introdutório autoral',intro:JOURNEYS.find(t=>t.id===id).description,steps:JOURNEYS.find(t=>t.id===id).steps.slice(0,3).map(s=>s.explain),lesson:id,lessonLabel:'Entender os fundamentos'}]};
      if(/ingles/.test(text)) return byJourney('ingles_leitura');
      if(/contabil|patrimonio/.test(text)) return byJourney('adm_patrimonio');
      if(/orcamento|\bafo\b|financas/.test(text)) return byJourney('afo_orcamento');
      if(/etica|auditoria|licitac|integridade/.test(text)) return byJourney('etica_servico');
      if(/direito administrativo/.test(text)) return all.find(s=>!s.optional&&/direito administrativo/.test(SearchCore.fold(s.name)))||byJourney('const_fundamentos');
      if(/administracao|arquivologia|secretari|redacao oficial/.test(text)) return byJourney('adm_redacao');
      if(/penal/.test(text)) return GCM_SUBJECTS[3];
      if(/legislacao|guarda|transito/.test(text)) return GCM_SUBJECTS[4];
      if(/constitucional|direito/.test(text)) return GCM_SUBJECTS[1];
      if(/matematica|raciocinio|logica/.test(text)) return provisionalSubjects[1];
      if(/informatica|computacao|sistemas|tecnologia/.test(text)) return provisionalSubjects[2];
      return provisionalSubjects[0];
    };
    const subjects=names.map((name,i)=>{const b=baseFor(name);return {id:`manual-${i}`,name,count:null,journey:b.journey,topics:b.topics.map(t=>({...t})),worked:b.worked.map(x=>({...x,steps:[...x.steps]}))};});
    return {id:data.id,name:data.name.trim().slice(0,120),role:'Concurso adicionado por você',organizer:'Confira o edital',kind:'lista pessoal',location:data.place.trim().slice(0,100),note:'Matérias cadastradas por você. As sugestões de fundamentos não substituem o programa do edital.',source:ContestCore.validSource(data.source),subjects,scoring:{type:'unknown'},coverage:'lista pessoal · sugestões relacionadas',manual:true};
  }
  return {make};
})();

const RouteCore = (() => {
  const views=['historia','mapa','fontes','concursos','concurso','materia','estrategia','infograficos','revisao'];
  function parse(hash) {
    let parts;try{parts=String(hash).replace(/^#/,'').split('/').map(decodeURIComponent);}catch(_){return {view:'concursos',invalid:true};}
    const [view,id,subject]=parts;
    if(!views.includes(view)) return {view:'concursos',invalid:true};
    if(['historia','mapa'].includes(view)&&id&&!JOURNEYS.some(t=>t.id===id)) return {view:'historia',invalid:true};
    if(view==='infograficos'&&id&&!INFOGRAPHICS.some(m=>m.id===id)) return {view:'infograficos',invalid:true};
    if(['concurso','materia'].includes(view)&&id){const c=CONTESTS.find(c=>c.id===id);if(!c)return {view:'concursos',invalid:true};if(view==='materia'&&subject&&!c.subjects.some(s=>s.id===subject))return {view:'concurso',id,invalid:true};}
    return {view,id,subject};
  }
  const hash=(view,id,subject)=>'#'+[view,...(id?[id]:[]),...(view==='materia'&&subject?[subject]:[])].map(encodeURIComponent).join('/');
  return {views,parse,hash};
})();

const LabCore = (() => {
  const clients=[{id:1,name:'Ana'},{id:2,name:'Bia'},{id:3,name:'Caio'}];
  const orders=[{id:101,client:1},{id:102,client:1},{id:103,client:2},{id:104,client:null}];
  function joinRows(kind){
    if(!['INNER','LEFT','RIGHT','FULL'].includes(kind))throw new Error('JOIN inválido');
    const rows=[];
    for(const client of clients){const matches=orders.filter(o=>o.client===client.id);for(const o of matches)rows.push({client:client.name,order:o.id});if(!matches.length&&['LEFT','FULL'].includes(kind))rows.push({client:client.name,order:null});}
    if(['RIGHT','FULL'].includes(kind))for(const o of orders)if(!clients.some(c=>c.id===o.client))rows.push({client:null,order:o.id});
    return rows;
  }
  const truth=(p,q)=>({not:!p,and:p&&q,or:p||q,implies:!p||q,iff:p===q});
  function sheet(values){if(!Array.isArray(values)||values.length!==3||values.some(x=>!Number.isFinite(x)))throw new Error('Informe três números válidos.');const sum=values.reduce((a,b)=>a+b,0);return {sum,isolated:values[0]+values[2],mean:sum/3,condition:values[0]>=7?'Aprovado':'Revisar'};}
  return {clients,orders,joinRows,truth,sheet};
})();
