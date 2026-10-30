/* Regras documentadas por cargo. Pontos máximos não são previsão de cobrança. */
const ScoringCore=(()=>{
  const byId=id=>CONTESTS.find(c=>c.id===id);
  const update=(id,data)=>{const c=byId(id);if(c)c.scoring={...c.scoring,...data,verified:'2026-10-29',source:c.source};};
  for(const [id,source] of [
    ['dataprev-dev-2024','https://conhecimento.fgv.br/sites/default/files/concursos/dataprev_edital_0.pdf'],
    ['dataprev-dev-2026','https://conhecimento.fgv.br/sites/default/files/concursos/edital-retificado-dataprev.pdf']
  ])update(id,{
    correct:null,correctBySubject:{portugues:1,ingles:1,raciocinio:1,atualidades:1,'legislacao-ti':1,especificos:2.5},
    source,minimumSummary:'Mínimo de 57,5 pontos na objetiva e não zerar nenhuma disciplina. Os específicos valem 75 dos 115 pontos; as demais matérias continuam obrigatórias.'
  });
  update('abdi-dev-2026',{
    correct:null,correctBySubject:{portugues:.3,raciocinio:.3,informatica:.3,institucional:.3,tecnologia:.65},
    minimumSummary:'É necessário acertar pelo menos 30 das 60 questões e não zerar nenhuma das três áreas: Gerais, Institucionais e Específicos. A exigência é de acertos, não de metade dos pontos ponderados.'
  });
  update('nisia-prefeitura',{
    type:'multiple',options:5,correct:2,wrong:0,blank:0,
    minimumSummary:'Mínimo de 50% dos pontos em cada disciplina: Português 18; Lógica 6; Informática 6; Específicos 30. Todas as matérias precisam de atenção.'
  });
  update('nisia-guarda',{
    type:'multiple',options:5,correct:null,correctBySubject:{portugues:1,raciocinio:1,informatica:1,'direito-legislacao':2},wrong:0,blank:0,
    minimumSummary:'Mínimo de 50% dos pontos em cada disciplina: Português 9; Matemática 3; Informática 3; Direito e Legislação 30. Há outras etapas além da prova objetiva.'
  });
  update('cgu-dev-2026',{
    type:'binary',options:2,correct:null,wrong:null,blank:0,
    blocks:[
      {id:'P1',name:'Conhecimentos básicos',count:40,correct:1,wrong:-1,minimum:8},
      {id:'P2',name:'Conhecimentos complementares',count:40,correct:1,wrong:-1,minimum:12},
      {id:'P3',name:'Conhecimentos específicos',count:90,correct:2,wrong:-2,minimum:54}
    ],
    minimumSummary:'Mínimos: P1 8 pontos; P2 12; P3 54; e 78 pontos na soma das objetivas. A prova discursiva é uma etapa adicional. O edital não fixa a quantidade de itens de cada matéria dentro dos blocos.'
  });
  update('camara-2026',{
    type:'binary',options:2,correct:1,wrong:-1,blank:0,
    blocks:[
      {id:'P1',name:'Conhecimentos básicos',count:90,correct:1,wrong:-1,minimum:18},
      {id:'P2',name:'Conhecimentos específicos',count:90,correct:1,wrong:-1,minimum:27}
    ],
    minimumSummary:'Mínimos: P1 18 pontos; P2 27; e 54 pontos na soma das objetivas. A prova discursiva é uma etapa adicional. Não há distribuição fixa dos 90 itens por matéria no quadro da prova.'
  });
  for(const id of ['ufrn-ati-dev-2025','ufrn-ati-dados-2025'])update(id,{
    type:'multiple',options:4,correct:1,wrong:0,blank:0,
    minimumSummary:'55 questões de múltipla escolha (A–D) sem desconto por erro, distribuídas em Língua Portuguesa (10), Legislação (15) e Conhecimentos Específicos (30), além de prova teórico-prática discursiva.'
  });
  update('ufrn-tti-2023',{
    type:'multiple',options:4,correct:1,wrong:0,blank:0,
    minimumSummary:'50 questões de múltipla escolha (A–D) sem desconto por erro, distribuídas em Língua Portuguesa (10), Legislação (10) e Conhecimentos Específicos (30), além de redação.'
  });
  for(const id of ['ifrn-ati-2024','ifrn-tti-2024'])update(id,{
    type:'multiple',options:4,correct:null,correctBySubject:{portugues:2,legislacao:2,especificos:3},wrong:0,blank:0,
    minimumSummary:'40 questões de múltipla escolha (A–D) somando 100 pontos: Conhecimentos Específicos valem 60 pontos (20 × 3), Língua Portuguesa 20 pontos (10 × 2) e Legislação 20 pontos (10 × 2).'
  });
  update('tce-rn-ti-2026',{
    type:'binary',options:2,correct:1,wrong:-1,blank:0,
    minimumSummary:'Padrão Cebraspe de itens Certo/Errado (+1 por acerto, −1 por erro) combinado com prova discursiva. Confira o quadro exato de itens e mínimos por cargo no edital do TCE-RN.'
  });
  const number=n=>Number(n).toLocaleString('pt-BR',{maximumFractionDigits:2});
  const correct=(c,s)=>c.scoring.correctBySubject?.[s.id]??c.scoring.correct;
  function distribution(c){
    const blocks=c.scoring.blocks;
    const rows=blocks?blocks.map(b=>({...b,points:Math.round(b.count*b.correct*100)/100})):c.subjects.map(s=>({id:s.id,name:s.name,count:s.count,correct:correct(c,s),wrong:c.scoring.wrong,points:Number.isFinite(s.count)&&Number.isFinite(correct(c,s))?Math.round(s.count*correct(c,s)*100)/100:null}));
    if(rows.some(r=>!Number.isFinite(r.points))||!rows.length)return {kind:'suggested',rows:[],total:null};
    const total=Math.round(rows.reduce((n,r)=>n+r.points,0)*100)/100;
    const ordered=rows.map((r,i)=>({...r,order:i})).sort((a,b)=>b.points-a.points||a.order-b.order);
    let last=null,rank=0;return {kind:blocks?'blocks':'subjects',total,rows:ordered.map((r,i)=>{if(r.points!==last)rank=i+1;last=r.points;return {...r,rank,share:r.points/total*100};})};
  }
  function subjects(c){
    const d=distribution(c);if(d.kind!=='subjects')return [...c.subjects];
    return d.rows.map(r=>c.subjects.find(s=>s.id===r.id));
  }
  function narration(c){
    const s=c.scoring,d=distribution(c);
    const format=s.type==='binary'?'A prova usa itens de certo ou errado.':`Cada questão tem ${s.options} alternativas.`;
    const rules=s.blocks?s.blocks.map(b=>`${b.id}, ${b.name}: ${b.count} itens. Acerto vale ${number(b.correct)} pontos. Erro desconta ${number(-b.wrong)} pontos.`).join(' '):s.correctBySubject?c.subjects.map(item=>`${item.name}: ${number(correct(c,item))} pontos por acerto.`).join(' '):`Acerto vale ${number(s.correct)} pontos.`;
    const wrong=s.blocks?'':s.wrong===0?'Erro e branco valem zero.':`Erro desconta ${number(-s.wrong)} pontos; branco vale zero.`;
    return `${format} ${rules} ${wrong} ${d.total?`As objetivas somam até ${number(d.total)} pontos.`:''} ${s.minimumSummary||''}`.replace(/\s+/g,' ').trim();
  }
  return {number,correct,distribution,subjects,narration};
})();
