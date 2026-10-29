/* Roteiros da professora: conteúdo local, exemplos e recuperação sem avaliação. */
const ProfessorCore = (() => {
  const clean = value => String(value ?? '').replace(/<\/?(?:strong|b|i|em|small|span|a|br|code)[^>]*>/gi,' ').replace(/&amp;/g,' e ').replace(/&(?:nbsp|#160);/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
  const spoken = value => clean(value)
    .replace(/\bSQL\b/g,'ésse quê éle').replace(/\bNULL\b/g,'nulo').replace(/\bLEFT JOIN\b/g,'léft jóin').replace(/\bRIGHT JOIN\b/g,'ráit jóin').replace(/\bINNER JOIN\b/g,'íner jóin').replace(/\bFULL JOIN\b/g,'fúl jóin').replace(/\bJOIN\b/g,'jóin')
    .replace(/\bA1:A3\b/g,'de A um até A três').replace(/\bA1;A3\b/g,'A um e A três').replace(/\bA([123])\b/g,(_,n)=>'A '+({1:'um',2:'dois',3:'três'}[n]))
    .replace(/\b([123])FN\b/g,(_,n)=>({1:'primeira',2:'segunda',3:'terceira'}[n])+' forma normal')
    .replace(/\bCPU\b/g,'cê pê u').replace(/\bRAM\b/g,'rãm').replace(/\bSSD\b/g,'ésse ésse dê').replace(/\bHTTP\b/g,'agá tê tê pê').replace(/\bHTTPS\b/g,'agá tê tê pê ésse').replace(/\bAPI\b/g,'a pê i').replace(/\bJSON\b/g,'jêison')
    .replace(/≥|>=/g,' maior ou igual a ').replace(/≤|<=/g,' menor ou igual a ').replace(/≠|!=/g,' diferente de ').replace(/↔/g,' se e somente se ').replace(/→/g,' implica ').replace(/∩/g,' interseção ').replace(/∪/g,' união ').replace(/∧/g,' e ').replace(/∨/g,' ou ').replace(/¬/g,' não ').replace(/×/g,' vezes ').replace(/÷/g,' dividido por ').replace(/=/g,' igual a ').replace(/;/g,', ').replace(/\s+/g,' ').trim();
  const part=(label,text,kind='explain')=>({label:clean(label),text:clean(text),kind});
  function split(text,max=650){
    const sentences=clean(text).split(/(?<=[.!?])\s+/);
    const chunks=[];let current='';
    for(const sentence of sentences){
      for(const word of sentence.trim().split(/\s+/)){
        if(current.length+word.length+1>max&&current){chunks.push(current);current='';}
        current+=(current?' ':'')+word;
      }
    }
    if(current)chunks.push(current);
    return chunks;
  }
  function lesson(id,title,parts,review=null){
    const segments=parts.filter(p=>p.text).flatMap(p=>split(p.text).map((text,i,a)=>({...p,label:p.label+(a.length>1?` · ${i+1}/${a.length}`:''),text,spoken:spoken((i===0?p.label+'. ':'')+text),hold:p.kind==='question'&&i===a.length-1})));
    return {id,title:clean(title),parts:segments,review};
  }
  const reflect=(question,answer)=>[part('Agora é sua vez',question+' Pense ou explique com suas palavras. Sem pressa. Quando terminar, toque em Conferir.','question'),part('Vamos conferir',answer,'answer')];
  const finish=()=>part('Leve para a próxima revisão','Depois, tente dar um exemplo diferente sem olhar. Se faltar uma parte, volte a ela. Guarde o assunto para revisar em outro dia. Você escolhe o intervalo; os atalhos são sugestões, não uma fórmula obrigatória.','review');
  const journey=id=>JOURNEYS.find(t=>t.id===id);
  function scene(id,index=0){
    const t=journey(id);if(!t)return null;
    const s=t.steps[Math.max(0,Math.min(t.steps.length-1,Number(index)||0))];
    return lesson(`historia/${id}/${s.id}`,s.title,[
      part('Vamos por partes',`Vamos entender ${s.term}. ${s.speech}`),
      part('A ideia em linguagem simples',s.explain),
      part('Acompanhe o desenho',s.observe),
      part('Dê um nome à ideia',`${s.term}. ${s.meaning}`),
      ...reflect(`Como você explicaria ${s.term} para alguém que nunca estudou este assunto?`,`${s.meaning} A ideia que vale guardar é: ${s.remember}`),finish()
    ],{type:'historia',id});
  }
  function mindmap(id){
    const t=journey(id);if(!t)return null;
    return lesson(`mapa/${id}`,`Mapa · ${t.name}`,[part('Enxergue o caminho',`${t.description} Vamos percorrer os ramos do mapa, uma ideia de cada vez.`),
      ...t.steps.map((s,i)=>part(`Ramo ${i+1} · ${s.map}`,`${s.speech} ${s.explain} ${s.remember}`)),
      ...reflect(`Sem olhar para o mapa, qual é a ligação entre ${t.steps[0].term} e ${t.steps[t.steps.length-1].term}?`,`${t.steps[0].remember} ${t.steps[t.steps.length-1].remember} Volte a cada ramo para reconstruir as etapas entre essas ideias.`),finish()
    ],{type:'historia',id});
  }
  function infographic(id){
    const m=INFOGRAPHICS.find(x=>x.id===id);if(!m)return null;
    const groups=m.groups.map((g,i)=>part(`Bloco ${i+1} · ${g.title}`,`${g.summary} ${g.facts.join(' ')} ${g.detail}${g.visual?` No exemplo, ${g.visual.caption}. ${g.visual.rows.map(row=>row.map((value,j)=>`${g.visual.head[j]}: ${value}`).join('; ')).join('. ')}.`:''}`));
    return lesson(`infograficos/${id}`,m.title,[part('Comece pela ideia',`Vamos entender ${m.title}. ${m.definition}`),part('Onde isso ajuda',m.purpose),...groups,part('Veja um exemplo',m.example),...m.notes.map(n=>part(n.title,n.text)),
      ...reflect(`Para que serve ${m.title}? Escolha um dos blocos do mapa e explique como ele participa do exemplo.`,`${m.purpose} No exemplo: ${m.example}`),finish()
    ],{type:'mapa',id});
  }
  function contest(id){
    const c=CONTESTS.find(x=>x.id===id);if(!c)return null;
    if(c.manual)return {...page('personalizado'),id:`concurso/${id}`,title:c.name};
    const scoring=c.scoring;
    const score=scoring.verified?ScoringCore.narration(c):scoring.type==='unknown'?'A regra de pontuação precisa ser conferida no edital.':`${scoring.options} alternativas por questão. ${scoring.correctBySubject?c.subjects.map(s=>`${s.name}: ${scoring.correctBySubject[s.id]?.toLocaleString('pt-BR')} pontos por acerto`).join('. '):`Acerto: ${scoring.correct} pontos`}. Erro: ${scoring.wrong} pontos. Em branco: ${scoring.blank??0}.`;
    return lesson(`concurso/${id}`,c.name,[part('Escolha um ponto de partida',`Vamos organizar o estudo para ${c.name}. ${c.role}. ${c.note}`),
      ...c.subjects.map(s=>part(s.name,`${s.name}. ${s.optional?'Esta é uma sugestão complementar, não confirmada no edital.':s.count!=null?`${s.count} questões ${c.evidence?'na prova histórica analisada':'previstas na referência do edital'}.`:''} Comece pela história ${journey(s.journey)?.name}. Depois, use os mapas para explorar: ${s.topics.map(t=>t.name).join('; ')}.`)),
      part('Leia a regra da prova',score),...(c.evidence?[part('Use os números com cuidado',`${c.evidence.note} Essa distribuição descreve uma prova anterior; não determina os assuntos da próxima prova.`)]:[]),
      ...reflect('Qual matéria você vai estudar primeiro, e onde vai conferir o programa completo?','Escolha uma matéria, abra a história inicial e compare os assuntos com o edital e suas retificações. A fonte principal está na página do concurso.')]);
  }
  function worked(contestId,subjectId,index){
    const c=CONTESTS.find(x=>x.id===contestId),s=c?.subjects.find(x=>x.id===subjectId),ex=s?.worked?.[Number(index)];if(!ex)return null;
    return lesson(`exemplo/${contestId}/${subjectId}/${index}`,ex.title,[part('Entenda a situação',ex.intro),...ex.steps.map((text,i)=>part(`Passo ${i+1}`,text)),...reflect('Qual foi a ideia decisiva para resolver este exemplo? Explique a ordem dos passos.',ex.steps.join(' ')),finish()],{type:'historia',id:ex.lesson});
  }
  function subject(contestId,subjectId){
    const c=CONTESTS.find(x=>x.id===contestId),s=c?.subjects.find(x=>x.id===subjectId);if(!s)return null;
    if(c.manual){
      const signature=x=>JSON.stringify({journey:x.journey,topics:x.topics,worked:x.worked});
      for(const original of CONTESTS.filter(x=>!x.manual)){
        const base=original.subjects.find(x=>signature(x)===signature(s));
        if(base)return {...subject(original.id,base.id),id:`materia/${contestId}/${subjectId}`,title:`Fundamentos relacionados · ${base.name}`};
      }
      return {...mindmap(s.journey),id:`materia/${contestId}/${subjectId}`,title:`Fundamentos relacionados · ${journey(s.journey).name}`};
    }
    const t=journey(s.journey);
    return lesson(`materia/${contestId}/${subjectId}`,s.name,[part('Primeiro, faça sentido',`Vamos estudar ${s.name}. ${s.optional?'Esta trilha é uma sugestão complementar. ':''}${t.description}`),part('Uma ideia para começar',`${t.steps[0].speech} ${t.steps[0].explain}`),
      part('Organize o percurso',`Os assuntos desta página são: ${s.topics.map(x=>x.name).join('; ')}. Cada assunto tem um caminho para sua história e para um mapa relacionado. Você pode estudar um por vez.`),
      ...s.worked.flatMap((ex,i)=>[part(`Exemplo ${i+1} · ${ex.title}`,ex.intro),...ex.steps.map((text,j)=>part(`Exemplo ${i+1} · passo ${j+1}`,text))]),
      ...(s.observed?[part('Entenda a análise da prova',`Nesta prova histórica, ${s.count} questões foram classificadas nesta matéria. ${s.observed.map(o=>`${o.name}: questões ${o.questions.join(', ')}`).join('. ')}. A classificação organiza os temas; não é um gabarito.`)]:[]),
      ...reflect('Escolha um dos exemplos. Por que cada passo foi necessário?',`Compare sua explicação com os passos do exemplo. ${t.steps[0].remember}`),finish()
    ],{type:'historia',id:s.journey});
  }
  function laboratory(id){
    const specs={
      'sql-linguagens':['SQL JOIN',[
        part('Imagine duas listas','Uma lista guarda clientes: Ana, Bia e Caio. Outra guarda pedidos. Ana tem os pedidos 101 e 102; Bia tem o 103. O pedido 104 não tem cliente associado. A junção procura pares pela condição de ligação.'),
        part('Experimente INNER e LEFT','INNER JOIN mostra somente os pares encontrados: duas linhas para Ana e uma para Bia. LEFT JOIN preserva todos os clientes. Por isso Caio aparece com NULL no pedido. NULL indica ausência de valor; não é zero.'),
        part('Experimente RIGHT e FULL','RIGHT JOIN preserva todos os pedidos, inclusive o 104, que aparece com NULL no cliente. FULL JOIN preserva os dois lados: entram Caio sem pedido e o pedido 104 sem cliente.'),
        ...reflect('Qual junção mostra todos os clientes, mesmo os que não fizeram pedidos? Por que Ana aparece duas vezes?','LEFT JOIN preserva os clientes da tabela da esquerda. Ana aparece duas vezes porque tem dois pedidos e cada par forma uma linha.')]],
      'proposicoes-mapa':['Tabela-verdade',[
        part('Comece com duas afirmações','P e Q representam afirmações que podem ser verdadeiras ou falsas. Toque nos botões para escolher os valores. Não P inverte o valor de P.'),
        part('Compare E e OU','P e Q só é verdadeiro quando os dois são verdadeiros. P ou Q é verdadeiro quando pelo menos um é verdadeiro; aqui o ou inclui a possibilidade dos dois.'),
        part('Entenda a condicional','Se P, então Q só é falso quando P é verdadeiro e Q é falso. A bicondicional, P se e somente se Q, é verdadeira quando os dois valores são iguais.'),
        ...reflect('Em qual combinação a condicional é falsa?','Quando P é verdadeiro e Q é falso. Troque os botões e confira as quatro combinações.')]],
      'planilhas-mapa':['Fórmulas da planilha',[
        part('Imagine três caixas numeradas','A1, A2 e A3 são endereços de células. Inicialmente elas contêm 10, 20 e 30. Altere os números para observar o efeito nas fórmulas.'),
        part('Dois-pontos inclui o caminho','SOMA de A1:A3 inclui todas as células de A1 até A3. Com 10, 20 e 30, o resultado é 60. SOMA de A1;A3 usa somente os dois argumentos indicados, 10 e 30: resultado 40.'),
        part('Média e condição','MÉDIA de A1:A3 soma os três números e divide por três. Neste exemplo, 60 dividido por três é 20. A fórmula SE pergunta se A1 é maior ou igual a 7: se for, mostra Aprovado; se não, mostra Revisar.'),
        ...reflect('Qual símbolo inclui o intervalo inteiro: dois-pontos ou ponto e vírgula?','Dois-pontos indica o intervalo. Ponto e vírgula separa argumentos. Mude o valor de A2: a soma do intervalo muda, mas a soma só de A1 e A3 permanece igual.')]]
    };
    const item=specs[id];return item?lesson(`laboratorio/${id}`,item[0],[...item[1],finish()],{type:'mapa',id}):null;
  }
  const htmlParagraphs=html=>[...html.matchAll(/<(h[1-3]|p|li)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)].map(x=>clean(x[2].replace(/<[^>]+>/g,' '))).filter(Boolean);
  function page(view){
    const config={
      personalizado:['Como estudar sua lista pessoal',[
        part('Uma lista que você organizou','Este concurso foi cadastrado por você. As matérias da lista apontam para fundamentos disponíveis no aplicativo. Eles ajudam a começar, mas podem cobrir só parte do conteúdo do seu edital.'),
        part('Escolha uma matéria','Entre em uma matéria e use Professor para ouvir os fundamentos relacionados. Abra também as histórias e os mapas dos tópicos. Os exemplos são pontos de partida para compreender o raciocínio.'),
        part('Compare com seu edital','Confira o nome da matéria, os tópicos e a regra de pontuação no documento oficial. Se o fundamento sugerido tratar de outro assunto, escolha um mapa mais adequado na busca. Seu cadastro continua guardado neste navegador.'),
        ...reflect('A sugestão automática substitui o programa do edital?','Não. Ela oferece fundamentos relacionados. Você precisa comparar os tópicos da lista com o edital e aprofundar o que ainda faltar.')]],
      concursos:['Escolha seu percurso',[
        part('Um começo possível','Vamos escolher um assunto pequeno para começar. Use a busca ou o filtro por local. Entre em um concurso e escolha uma matéria. Você não precisa conhecer tudo antes de começar.'),
        part('História, mapa e prática','Na matéria, comece pela história: ela apresenta uma ideia de cada vez. Depois abra o mapa para ligar as partes. Veja o exemplo resolvido e, quando quiser, experimente o laboratório.'),
        part('Leia a situação do concurso','A página distingue prova histórica, lista pessoal e referência provisória. Consulte o edital e as retificações para confirmar conteúdos, datas e regras. Um exemplo passado ajuda a estudar, mas não prevê a próxima prova.'),
        ...reflect('Quais são seus três primeiros passos no aplicativo?','Escolher um concurso, entrar em uma matéria e começar pela história. Depois use o mapa, o exemplo e a revisão.')]],
      revisao:['Lembrar é uma prática',[
        part('Antes de consultar','Escolha uma história ou mapa que você já estudou. Antes de abrir a explicação, tente dizer a ideia principal com suas palavras. Uma resposta incompleta também mostra o que precisa ser retomado.'),
        part('Confira e ajuste','Abra o material, compare e corrija o que faltou. Tente dar outro exemplo. A familiaridade ao ler não é a mesma coisa que conseguir explicar sem consultar.'),
        part('Retome em outro dia','Use a data livre ou os atalhos de 1, 3, 7 e 15 dias. Eles são sugestões. Se estiver difícil, volte antes; se estiver confortável, ajuste o intervalo. Registrar uma revisão não é uma medida automática de domínio.'),
        ...reflect('O que fazer antes de reler um assunto guardado?','Tentar lembrar e explicar. Depois conferir no material e corrigir. Por fim, escolher outra oportunidade para retomar.')]],
      fontes:['Por que a professora ensina assim',[
        part('Uma ideia por vez','Um exemplo concreto ajuda a começar. A explicação divide o conteúdo em partes, apresenta o significado dos termos e acompanha o desenho. Você controla o ritmo.'),
        part('A voz é um apoio','Esta é uma professora virtual com voz gerada por inteligência artificial. Ela apresenta roteiros preparados a partir do conteúdo do aplicativo. Você pode ler tudo, repetir trechos ou estudar sem som.'),
        part('Lembre, confira, retome','Depois de compreender, tente explicar sem consultar. Compare com a resposta e retome em outro dia. Pesquisas sobre recuperação e espaçamento apoiam essas práticas em contextos estudados; não existe uma técnica que garanta aprender qualquer conteúdo de imediato.'),
        ...LEARNING_SOURCES.map(s=>part(s.title,s.text)),
        ...reflect('Como usar a professora para participar da aprendizagem?','Acompanhe um exemplo, explique com suas palavras, confira a resposta e retome depois. Use as fontes da página para aprofundar e verificar os conceitos.')]]
    };
    if(view==='estrategia')return lesson('pagina/estrategia','Como organizar o estudo',[
      part('Estudar com intenção','Primeiro compreenda um exemplo. Depois tente explicar e aplicar a ideia. Vamos percorrer as orientações da página em pequenos trechos.'),
      ...htmlParagraphs(Catalog.strategy()).map(text=>part('Estratégia de estudo',text)),
      ...reflect('Qual ação ajuda a verificar se você consegue lembrar, além de apenas reconhecer o texto?','Fechar a explicação e tentar reconstruir a ideia com suas palavras. Depois conferir e corrigir. Essa tentativa orienta a próxima revisão.')]);
    const item=config[view]||config.concursos;return lesson('pagina/'+(config[view]?view:'concursos'),item[0],item[1]);
  }
  function resolve(kind,id='',extra=''){
    if(kind==='historia')return scene(id,extra);
    if(kind==='mapa')return mindmap(id);
    if(kind==='infograficos')return infographic(id);
    if(kind==='concurso')return contest(id);
    if(kind==='materia')return subject(id,extra);
    if(kind==='exemplo'){const [subjectId,index]=extra.split('/');return worked(id,subjectId,index);}
    if(kind==='laboratorio')return laboratory(id);
    return page(kind);
  }
  const signature=l=>l.parts.map(p=>p.spoken).join('\n\n');
  const fingerprint=l=>{const text=signature(l);let a=2166136261,b=5381;for(let i=0;i<text.length;i++){a=Math.imul(a^text.charCodeAt(i),16777619);b=Math.imul(b,33)^text.charCodeAt(i);}return `${(a>>>0).toString(16)}-${(b>>>0).toString(16)}-${text.length}`;};
  function all(){return [
    ...JOURNEYS.flatMap(t=>[...t.steps.map((_,i)=>scene(t.id,i)),mindmap(t.id)]),
    ...INFOGRAPHICS.map(m=>infographic(m.id)),
    ...CONTESTS.filter(c=>!c.manual).flatMap(c=>[contest(c.id),...c.subjects.flatMap(s=>[subject(c.id,s.id),...s.worked.map((_,i)=>worked(c.id,s.id,i))])]),
    ...['sql-linguagens','proposicoes-mapa','planilhas-mapa'].map(laboratory),
    ...['concursos','revisao','fontes','estrategia','personalizado'].map(page)
  ];}
  return {clean,spoken,split,scene,mindmap,infographic,contest,subject,worked,laboratory,page,resolve,signature,fingerprint,all};
})();
