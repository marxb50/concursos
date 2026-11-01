/* Conteúdo adicional em pares: uma ideia, uma aplicação e uma revisão sem resposta automática. */
const StoryExpansion = (()=>{
 const bankByStory={sql:'sql',engenharia:'software',web:'web',gestao:'governanca',dados:'dados',const_fundamentos:'constitucional',penal_fundamentos:'penal',legis_especial:'especial',etica_servico:'etica',afo_orcamento:'afo'};
 const selectedMap={sql:'sql-linguagens',engenharia:'iterativo',const_fundamentos:'direitos-constitucionais',info_arquivos:'sistemas-arquivos'};
 const directSource={adm_patrimonio:['Manual de Contabilidade Aplicada ao Setor Público · Tesouro','https://www.tesourotransparente.gov.br/publicacoes/manual-de-contabilidade-aplicada-ao-setor-publico-mcasp/2025/26']};
 const card=(term,definition,example,reason,source)=>({term,definition,example,reason,source});
 const sourceOf=(topic,map)=>directSource[topic.id]||map.sources?.[0]||null;
 function fromBank(id){
  const family=ActivityBank.find(x=>x.id===id);
  if(!family)throw new Error('Família de exercícios ausente: '+id);
  return family.questions.filter(q=>q.level==='conceito'&&q.teaching).slice(0,6).map(q=>({...card(q.teaching.term,q.teaching.definition,q.teaching.case,q.teaching.why,q.source?['Leitura complementar',q.source]:null),canonical:q.canonical}));
 }
 function stepFor(c,number,mode){
  const learn=mode==='conceito',s=STEP(`ampliacao-${String(number+1).padStart(2,'0')}-${mode}`,`${learn?'Entenda':'Veja na prática'}: ${c.term}`,c.term,
   learn?`Agora vamos entender ${c.term}.`:c.example,
   learn?c.definition:c.reason,
   learn?c.example:`${c.example} ${c.reason}`,
   c.term,c.definition,c.reason);
  s.expanded=true;s.mode=mode;s.teacher=c;s.source=c.source;s.exam=c.exam;
  return s;
 }
 function reviewFor(a,index){
  const question=`Como você explicaria ${a.term} com suas palavras?`;
  const answer=`${a.definition} Veja uma situação: ${a.example} ${a.reason}`;
  const s=STEP(`ampliacao-revisao-${index+1}`,`Sua vez: explique ${a.term}`,'Explicar com suas palavras',question,
   'Tente explicar sem consultar as anotações. Depois abra a explicação para comparar.',
   'Pense na característica principal e em uma situação concreta.',
   'Recuperar a ideia',answer,'Explique com suas palavras e volte ao conceito se precisar.');
  s.expanded=true;s.mode='revisao';s.recall={question,answer};s.teacher=a;s.source=a.source;s.exam=a.exam;
  return s;
 }
 for(const topic of JOURNEYS){
  topic.baseCount=topic.steps.length;
  const map=INFOGRAPHICS.find(m=>m.id===selectedMap[topic.id])||INFOGRAPHICS.find(m=>m.beginner===topic.id);
  if(!map||map.groups.length!==4)throw new Error('Mapa-base ausente ou inesperado: '+topic.id);
  const source=sourceOf(topic,map);
  const mapped=map.groups.map((g,i)=>({...card(g.title,g.summary,g.facts.join(' '),g.detail,source),mapId:map.id,mapGroup:i}));
  const extra=STORY_SEEDS[topic.id]?.map(([term,definition,example,reason,ref,exam])=>({...card(term,definition,example,reason,ref||source),exam}))||fromBank(bankByStory[topic.id]);
  const cards=[...mapped,...extra];
  if(cards.length!==10||cards.some(c=>![c.term,c.definition,c.example,c.reason].every(Boolean)))throw new Error('Sementes incompletas: '+topic.id);
  topic.steps.push(...cards.map((c,i)=>stepFor(c,i,'conceito')),...cards.map((c,i)=>stepFor(c,i,'aplicacao')));
  const remaining=30-topic.steps.length;
  if(remaining<0||remaining>5)throw new Error('Quantidade inicial inesperada: '+topic.id);
  for(let i=0;i<remaining;i++)topic.steps.push(reviewFor(cards[i+5],i));
 }
 function sections(topic){
  const n=topic.baseCount;
  return [
   {title:'Primeiros passos',start:0,end:n},
   {title:'Ideias principais',start:n,end:n+5},
   {title:'Aprofundar',start:n+5,end:n+10},
   {title:'Exemplos · parte 1',start:n+10,end:n+15},
   {title:'Exemplos · parte 2',start:n+15,end:n+20},
   {title:'Revisão ativa',start:n+20,end:topic.steps.length}
  ];
 }
 return {sections};
})();
