/* Seleção fundamentada e progresso local. XP é avanço no jogo, não nota da prova. */
const ActivityCore=(()=>{
  const fold=SearchCore.fold,clone=value=>JSON.parse(JSON.stringify(value));
  const patterns={sql:/banco|sql|normaliza|persist|nosql/,java:/programa|java|objetos/,engenharia:/engenharia|requisito|software/,web:/api|http|internet|web/,seguranca:/seguranca|protecao|lgpd|privacidade|backup/,infra:/rede|windows|linux|infraestrutura|nuvem|sistema/,dados:/dados|estatistic|ia|aprendizado|inteligencia/,
    port_texto:/leitura|interpreta|compreens|texto/,port_crase:/crase|regencia/,port_concordancia:/concordancia/,port_pontuacao:/pontua|aspas/,port_sujeito:/classes|sintaxe|sujeito/,port_verbos:/verbo/,port_acentos:/acentua|ortogra/,
    mat_frac:/frac|parte de um total/,mat_porcento:/porcent|juros/,mat_probabilidade:/probabil|eventos/,mat_media:/media|estatistic/,mat_razao:/propor|razao/,mat_equacoes:/equa|funco|progress|sequenc/,mat_combinatoria:/contagem|combin|matriz|matrizes/,mat_geometria:/geometr|area|perimet/,
    logic_proposicoes:/logica|proposi|dedu|argument|condicion/,logic_conjuntos:/conjunto|diagrama|quantifica/,
    info_hardware:/hardware|memoria|dispositiv/,info_arquivos:/windows|linux|arquivo|sistema/,info_planilhas:/planilha|excel|media|funcao se/,info_documentos:/editor|word|documento/,
    const_fundamentos:/constituci|direito|principio|poder/,penal_fundamentos:/penal|crime|inquerito|prisao|acao penal/,legis_especial:/lei|estatuto|legislac|violencia/,
    etica_servico:/etica|controle|auditoria|integridade|politic|sociedade|sustentab/,afo_orcamento:/orcament|receita|despesa|lrf/,gestao:/administra|gestao|process|agil|scrum|kanban/,
    ingles_leitura:/compreens|vocab|ingles|linguagem/,adm_redacao:/redacao|comunica|documento/,adm_atendimento:/atendimento/,adm_patrimonio:/patrimonio|contabil/,adm_reunioes:/reuniao|ata|pauta/,adm_eventos:/evento|logistica/,adm_latim:/latina/};
  const get=(cid,sid)=>{const contest=CONTESTS.find(c=>c.id===cid);return {contest,subject:contest?.subjects.find(s=>s.id===sid)};};
  function evidence(contest,subject,mission){
    if(!contest.evidence||!subject.observed?.length)return null;
    const pattern=mission.pattern||patterns[mission.journey];if(!pattern)return null;
    const items=subject.observed.filter(o=>pattern.test(fold(o.name))).sort((a,b)=>b.questions.length-a.questions.length);
    if(!items.length)return null;
    const o=items[0];return {name:o.name,count:o.questions.length,total:subject.count,questions:[...o.questions],source:contest.exam,contest:contest.name};
  }
  function missions(cid,sid){
    const {contest:c,subject:s}=get(cid,sid);if(!c||!s)return [];
    if(c.manual&&!/portug|ingles|matem|racioc|logica|informat|tecnolog|sistema|direito|penal|legisla|administra|afo|orcament|contab|etica|auditoria|licitac|arquiv/.test(fold(s.name)))return [];
    const journeys=new Set([s.journey,...s.topics.map(t=>t.journey)].filter(Boolean));
    return ActivityBank.filter(m=>m.journeys.some(j=>journeys.has(j))).map(m=>({...m,evidence:evidence(c,s,m)})).sort((a,b)=>(b.evidence?.count??-1)-(a.evidence?.count??-1)||(a.kind==='author'?0:1)-(b.kind==='author'?0:1));
  }
  const mission=id=>ActivityBank.find(m=>m.id===id);
  const key=(cid,sid,mid)=>[cid,sid,mid].join('~');
  function valid(q,value){
    if(q.type==='number')return typeof value==='number'&&Number.isFinite(value)&&Math.abs(value)<=1e12;
    if(q.type==='logic')return Array.isArray(value)&&value.length===4&&value.every(v=>typeof v==='boolean');
    if(q.type==='order')return Array.isArray(value)&&value.length===q.pieces.length&&new Set(value).size===q.pieces.length&&value.every(v=>Number.isInteger(v)&&v>=0&&v<q.pieces.length);
    if(q.type==='sql')return ['INNER','LEFT','RIGHT','FULL'].includes(value);
    return Number.isInteger(value)&&value>=0&&value<q.options.length;
  }
  function grade(q,value){
    if(!valid(q,value))return false;
    if(q.type==='number')return Math.abs(value-q.answer)<1e-8;
    return Array.isArray(q.answer)?q.answer.every((v,i)=>v===value[i]):value===q.answer;
  }
  const settled=(q,answer)=>!!answer?.revealed||!!answer?.values?.some(v=>grade(q,v));
  function normalize(raw){
    const state={version:1,runs:{},awards:{}};
    for(const [k,r] of Object.entries(raw?.runs||{}).slice(-2000)){
      if(!r||typeof r!=='object')continue;
      const [cid,sid,mid]=k.split('~'),m=mission(mid);if(!m||!missions(cid,sid).some(x=>x.id===mid))continue;
      const answers=m.questions.map((q,i)=>{const a=r.answers?.[i];return {values:Array.isArray(a?.values)?a.values.filter(v=>valid(q,v)).slice(-12):[],hint:a?.hint===true,revealed:a?.revealed===true};});
      let cursor=Math.max(0,Math.min(m.questions.length,Number.isInteger(r.cursor)?r.cursor:0));
      for(let i=0;i<cursor;i++)if(!settled(m.questions[i],answers[i])){cursor=i;break;}
      state.runs[k]={cursor,answers};
    }
    for(const m of ActivityBank){const n=raw?.awards?.[m.id];if(Number.isInteger(n)&&n>0)state.awards[m.id]=Math.min(n,50+m.questions.length*5);}
    return state;
  }
  function run(state,cid,sid,mid){const m=mission(mid);return state.runs[key(cid,sid,mid)]||{cursor:0,answers:m.questions.map(()=>({values:[],hint:false,revealed:false}))};}
  function edit(raw,cid,sid,mid,action,value){
    const state=normalize(raw),m=missions(cid,sid).find(m=>m.id===mid);if(!m)return state;
    const k=key(cid,sid,mid);
    if(action==='reset'){delete state.runs[k];return state;}
    const r=clone(run(state,cid,sid,mid));state.runs[k]=r;
    const q=m.questions[r.cursor],a=r.answers[r.cursor];if(!q)return state;
    if(action==='hint'&&!settled(q,a))a.hint=true;
    if(action==='reveal'&&!settled(q,a)){a.hint=true;a.revealed=true;}
    if(action==='answer'&&!settled(q,a)&&valid(q,value))a.values=[...a.values,value].slice(-12);
    if(action==='next'&&settled(q,a)){
      r.cursor++;
      if(r.cursor===m.questions.length){const bonus=m.questions.filter((q,i)=>{const a=r.answers[i];return !a.hint&&!a.revealed&&a.values.length===1&&grade(q,a.values[0]);}).length*5;state.awards[mid]=Math.max(state.awards[mid]||0,50+bonus);}
    }
    return state;
  }
  function stats(state){return {xp:Object.values(state.awards).reduce((a,b)=>a+b,0),completed:Object.keys(state.awards).length};}
  function sourceGroups(cid,sid){const {subject}=get(cid,sid);return [...(subject?.observed||[])].sort((a,b)=>b.questions.length-a.questions.length);}
  const types={conexoes:'Conectar conceitos',evidencias:'Investigar pistas',calculo:'Resolver e conferir',circuitos:'Montar circuitos',dados:'Explorar junções',casos:'Decidir com critérios',sequencias:'Organizar ações'};
  return {get,missions,mission,evidence,sourceGroups,key,valid,grade,settled,normalize,run,edit,stats,types};
})();
