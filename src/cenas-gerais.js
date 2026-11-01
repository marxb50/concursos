/* Cada desenho representa o conceito da cena; a legenda mantém o exemplo completo. */
const GeneralScenes = (() => {
  const {ink,cream,yellow,purple,teal,peach,text,lines,paper,arrow,enter,move,sparkle,wrap,human,device,notebook,lock,envelope}=Art.primitives;
  const palette=[purple,teal,yellow,peach,'#b6d6f1'];
  const at=(x,y,shape,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})">${shape}</g>`;
  const icon=(name,x,y,size=60)=>at(x,y,Art.symbol(name,size));
  const rect=(x,y,w,h,fill=cream,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${ink}" stroke-width="2" ${extra}/>`;
  const circle=(x,y,r,fill=teal,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${ink}" stroke-width="2" ${extra}/>`;
  const path=(d,color=ink,width=2,extra='')=>`<path d="${d}" stroke="${color}" stroke-width="${width}" fill="none" ${extra}/>`;
  const words=(x,y,value,size=21,max=22)=>lines(x,y,wrap(value,max),size);
  const badge=(x,y,value,color=yellow,w=180)=>rect(x-w/2,y-28,w,44,color)+text(x,y,value,19);
  const person=(x,y,shirt=purple,name='')=>human(x,y,.68,shirt,'#c88a65','#443129',name);
  function caption(step){const values=step.visual.flatMap(v=>wrap(v,62));const size=Math.min(19,94/(values.length*1.32));return paper(30,335,700,111,'#fffaf0')+lines(380,361,values,size);}
  function flow(values,icons=['plan','arrows','shield'],active=-1){
    const n=values.length,w=n===4?155:202,gap=n===4?26:30,start=(760-n*w-(n-1)*gap)/2;
    return values.map((v,i)=>{const x=start+i*(w+gap);return (i?arrow(x-gap+2,189,x-7,189,purple,0,i*.2):'')+enter(rect(x,102,w,178,active===i?yellow:palette[i%palette.length])+icon(icons[i%icons.length],x+w/2-24,116,48)+words(x+w/2,191,v,n===4?18:21,n===4?14:17),i*.2);}).join('');
  }
  function venn(index,focus){
    const mode=['groups','intersection','union','count','difference'][index];
    const current=['intersection','union','difference'].includes(focus)?focus:mode;
    // Os arcos delimitam a interseção, sem IDs duplicados entre a cena e o modal.
    const lens='M380 116.733924A100 100 0 0 1 380 293.266076A100 100 0 0 1 380 116.733924Z';
    const selectedA=current==='union'||current==='difference',selectedB=current==='union';
    return circle(333,205,100,selectedA?yellow:'#e6ddf0')+circle(427,205,100,selectedB?yellow:'#dceee4')+
      `<path d="${lens}" fill="${current==='intersection'||current==='union'?yellow:current==='difference'?'#dceee4':'#c7d6da'}" stroke="${ink}" stroke-width="1.5"/>`+
      text(280,95,'Conjunto A',22)+text(486,95,'Conjunto B',22)+text(280,211,'Ana',24)+text(380,211,'Bia',24)+text(482,211,'Caio',24)+
      (current==='count'?badge(380,320,'2 + 2 − 1 = 3',yellow,220):'');
  }
  function logic(index,focus){
    const falseCase=focus==='false',p=true,q=index===4?!falseCase:true;
    const left=index===4?'Chove':index===3?'De manhã':'Loja aberta',right=index===4?(q?'Rua molhada':'Rua seca'):index===3?'À tarde':'Lia presente';
    if(index===0)return rect(165,110,430,105,'#eee5f7')+text(380,171,'A loja está aberta.',29)+badge(270,285,'Verdadeiro',teal)+badge(490,285,'Falso',peach);
    if(index===1)return flow(['Está aberta · V','NÃO está aberta · F'],['plan','arrows']);
    const op=['','','∧','∨','→'][index],result=index===4?!p||q:index===2?p&&q:p||q;
    return rect(72,112,245,117,purple)+rect(443,112,245,117,teal)+text(194,149,'P',22)+words(194,192,left,24,18)+text(565,149,'Q',22)+words(565,192,right,24,18)+text(380,183,op,48)+badge(380,295,result?'Resultado: V':'Resultado: F',result?teal:peach,260);
  }
  function fractions(index){
    const active=[8,2,5,5,6][index];
    return rect(161,97,438,197,'#ead9bb')+Array.from({length:8},(_,i)=>enter(rect(180+(i%4)*100,115+Math.floor(i/4)*83,88,70,i<active?(index===2&&i>=2?teal:purple):cream)+text(224+(i%4)*100,160+Math.floor(i/4)*83,index===3?'6':'⅛',23),i*.07)).join('');
  }
  function percent(index){
    if(index<2)return Array.from({length:100},(_,i)=>rect(263+i%10*23,80+Math.floor(i/10)*23,19,19,i<(index===0?100:25)?purple:cream)).join('');
    if(index===2||index===3)return flow(['Preço R$ 80','Desconto R$ 20','Final R$ 60'],['plan','chart','heart'],index===2?1:2);
    return rect(120,130,200,95,purple)+text(220,185,'20% de 50 = 10',22)+rect(396,103,245,149,teal)+text(518,185,'20% de 100 = 20',22);
  }
  function mean(index,focus){
    const level=focus==='original'?false:index===2||focus==='level';
    const values=level?[5,5,5,5]:[2,4,6,8];
    return path('M130 283H635',ink,3)+values.map((v,i)=>enter(rect(166+i*115,283-v*22,76,v*22,palette[i],'class="scene-bar"')+text(204+i*115,273-v*22,v,24)+text(204+i*115,312,'Dia '+(i+1),18),i*.15)).join('')+(index>=2?path('M143 173H625',ink,2,'stroke-dasharray="6 6"')+text(665,180,'média 5',18):index===1?badge(380,78,'Total: 20',yellow,220):'');
  }
  function probability(index,focus){
    const removed=index===4||focus==='removed';
    return `<path d="M225 100h310l25 175q-177 60-360 0Z" fill="#eaf4f5" stroke="${ink}" stroke-width="3"/>`+
      path('M225 100q155 50 310 0',ink,2)+circle(280,230,27,'#94bde6')+circle(356,240,27,yellow)+circle(434,227,27,yellow)+
      (removed?move(circle(630,130,27,yellow),-132,104,.3)+text(630,181,'retirada',18):circle(505,233,27,yellow))+
      badge(380,78,removed?'1 azul em 3':'1 azul em 4',cream,225)+(index===3?text(380,167,'25%',40):'');
  }
  function ratio(index){
    if(index===3)return flow(['2 máquinas','6 horas','Mesmo lote'],['blocks','cycle','plan'])+text(380,314,'4 máquinas → 3 horas',22);
    const portions=index===2?3:index===1?1:2;
    return Array.from({length:portions},(_,i)=>{const x=380-(portions-1)*100+i*200;return enter(rect(x-65,167,130,92,teal)+text(x,222,'1 porção',22)+[x-24,x+24].map(sx=>circle(sx,117,13,yellow)+path(`M${sx} 130v29`,ink,5)).join(''),i*.2);}).join('')+badge(380,302,`${portions*2} colheres`,yellow,220);
  }
  function equations(index){
    const pair=[['3 + 2','5'],['x + 3','7'],['x','4'],['2x ÷ 2','8 ÷ 2'],['4 + 3','7']][index];
    return path('M380 101V300M300 300h160M146 134h468',ink,5)+circle(380,127,15,teal)+[220,540].map((x,i)=>path(`M${x-65} 135v100M${x+65} 135v100`,ink,2)+`<path d="M${x-84} 236h168q-17 45-84 45t-84-45" fill="${i?teal:purple}" stroke="${ink}" stroke-width="3"/>`+text(x,217,pair[i],30)).join('')+(index===2?badge(220,87,'−3',peach,100)+badge(540,87,'−3',peach,100):'');
  }
  function geometry(index){
    if(index<2)return rect(230,87,300,225,'#dceee4')+(index===1?Array.from({length:12},(_,i)=>rect(233+i%4*74,90+Math.floor(i/4)*74,69,69,teal)).join(''):path('M230 87H530V312H230Z',purple,5,'class="scene-line" pathLength="1"'))+text(380,75,'4 m',22)+text(193,205,'3 m',22);
    if(index===2){const px=x=>380+x*27,py=y=>178-y*22;return path('M200 178H615M380 64V302',ink,3)+text(632,186,'x',22)+text(380,54,'y',22)+text(366,197,'0',16)+path(`M${px(-3)} ${py(2)}L${px(5)} ${py(-4)}`,purple,4,'class="scene-line" pathLength="1"')+circle(px(-3),py(2),7,yellow)+circle(px(5),py(-4),7,teal)+text(px(-3)-10,py(2)-17,'A(−3, 2)',21)+text(px(5),py(-4)+28,'B(5, −4)',21);}
    if(index===3)return [10,20,40,80].map((n,i)=>rect(150+i*125,300-n*2.5,85,n*2.5,palette[i],'class="scene-bar"')+text(192+i*125,285-n*2.5,n,25)+(i?text(127+i*125,78,'×2',19):'')).join('');
    return flow(['1 caderno','f(x) = 8x','R$ 8'],['plan','arrows','chart'])+text(380,315,'2 cadernos → R$ 16',22);
  }
  function counting(index,focus){
    if(index===0)return [4,6].map((n,r)=>text(98,147+r*100,`de ${n}`,21)+Array.from({length:12/n},(_,i)=>{const x=160+(i+1)*n*34;return circle(x,140+r*100,26,(i+1)*n===12?yellow:palette[r])+text(x,148+r*100,(i+1)*n,22);}).join('')).join('')+path('M568 167V212',purple,4);
    if(index===1)return [0,1,2].map((i)=>{const y=107+i*84;return badge(174,y+20,'Camisa '+(i+1),palette[i],160)+[0,1].map(j=>arrow(262,y+4,470,y-16+j*42,ink,0,j*.15)+badge(568,y-4+j*42,'Calça '+(j+1),cream,160)).join('');}).join('');
    if(index===2)return person(174,110,purple,'Ana')+person(276,110,teal,'Bia')+text(380,190,'≠ fila',29)+person(482,110,teal,'Bia')+person(584,110,purple,'Ana');
    if(index===3)return [0,1].map(r=>[0,1,2].map(c=>rect(215+c*110,110+r*93,104,86,(focus==='column'?c===1:r===0)?yellow:cream)+text(267+c*110,163+r*93,`${r+1}, ${c+1}`,25)).join('')).join('')+text(380,83,focus==='column'?'Coluna 2':'Linha 1',22);
    return flow(['2 × 2 × 2','2³ = 8','log₂(8) = 3'],['blocks','chart','arrows']);
  }
  function accents(index){
    const wordsByScene=[[['ca','fé'],1],[['ca','FÉ'],1],[['ca','FÉ'],1],[['LI','vro'],0],[['MÚ','si','ca'],0]];
    const [syllables,stress]=wordsByScene[index];
    return syllables.map((s,i)=>{const x=380-(syllables.length-1)*80+i*160;return enter(rect(x-65,i===stress?100:145,130,105,i===stress?yellow:cream)+text(x,i===stress?167:212,s,38),i*.18);}).join('')+(index===2?badge(380,295,'pa · PEL → papel',teal,270):index===3?badge(380,295,'FÁ · cil → fácil',teal,270):'');
  }
  function crasis(index){
    if(index===2)return move(circle(220,174,65,purple)+text(220,191,'a',54),-80,0,.1)+text(320,191,'+',40)+move(circle(420,174,65,teal)+text(420,191,'a',54),-45,0,.3)+arrow(501,177,558,177)+enter(circle(634,174,66,yellow)+text(634,193,'à',60)+sparkle(675,97,.8),.6)+text(220,279,'preposição',21)+text(420,279,'artigo',21);
    if(index===3)return flow(['Vou ao mercado','Vou à biblioteca'],['arrows','plan']);
    if(index===4)return person(280,100)+arrow(343,208,497,208)+badge(557,207,'a pé',yellow,150);
    return flow(index===0?['Vou','a','um lugar']:['a','biblioteca'],index===0?['heart','arrows','globe']:['plan','plan'],index===0?1:0);
  }
  function verbs(index){
    if(index===4)return flow(['Se Lia estudar','ela entenderá'],['plan','link']);
    const selected=[1,1,0,2][index];
    return path('M100 195H660',ink,4)+[0,1,2].map(i=>enter(circle(170+i*210,195,15,i===selected?yellow:cream)+text(170+i*210,143,['Ontem','Hoje','Amanhã'][i],25)+badge(170+i*210,265,['estudou','estuda','estudará'][i],i===selected?yellow:cream,180),i*.2)).join('');
  }
  function language(topic,index){
    const id=topic.id;
    if(id==='port_texto'){
      if(index<2)return paper(190,82,380,211,'#e0eddf')+text(380,132,'BIBLIOTECA',32)+text(380,193,'segunda a sexta',25)+text(380,243,'9h às 17h',30)+path('M245 294v31M515 294v31',ink,5);
      if(index===2)return `<path d="M182 154a91 91 0 0 1 182 0Z" fill="${purple}" stroke="${ink}" stroke-width="3"/>`+path('M273 154v100q0 30-24 30',ink,4)+[205,250,301,344].map(x=>path(`M${x} 174l-5 14`,teal,4)).join('')+icon('search',470,127,100)+text(519,278,'Uma pista',24);
      return index===3?flow(['Queria sair','MAS','Chovia'],['heart','link','cloud']):flow(['Lia','Ela'],['heart','link'])+text(380,315,'O pronome retoma a pessoa',22);
    }
    if(id==='port_pontuacao'){
      if(index===1)return flow(['pães,','bolos','e sucos'],['cake','cake','heart']);
      if(index===2||index===4)return person(166,115)+paper(285,90,390,184,cream)+words(480,151,index===2?'Lia, guarde o caderno.':'Lia disse: “A loja abre às nove.”',27,23)+path('M285 236l-50 30 65-5',ink,2);
      return flow(index===0?['A loja abriu','.']:['Os clientes','chegaram.'],['plan','link']);
    }
    if(id==='port_concordancia'){
      if(index===2)return flow(['duas','encomendas','prontas'],['blocks','plan','shield']);
      if(index===4)return flow(['Sujeito','Verbo','Relação'],['search','search','link']);
      const plural=index!==0;return person(140,100)+(plural?person(230,100,teal):'')+arrow(300,174,375,174)+rect(395,98,300,180,'#e6ddf0')+words(545,155,plural?'Os clientes chegaram':'O cliente chegou',26,19)+(index===3?text(545,246,'da loja',20):'');
    }
    if(id==='port_sujeito'){
      if(index===4)return flow(['Lia chegou','Choveu'],['heart','cloud'])+text(380,315,'com sujeito / sem sujeito',22);
      return rect(70,111,180,170,purple)+text(160,180,'Lia',36)+rect(280,111,410,170,teal)+words(485,168,'organizou os livros',31,20)+text(160,255,'sujeito',20)+text(485,255,index===1?'organizou → verbo':'predicado',20)+arrow(252,183,279,183);
    }
    if(id==='ingles_leitura')return flow([
      ['Title','Repeated words','Text'],['system = sistema','actually = na verdade','pretend = fingir'],['The system','it'],['however: contraste','therefore: conclusão','moreover: adição'],['non-','hack','-able']
    ][index],index===2?['screen','link']:['search','link','plan']);
    return '';
  }
  function hardware(index){
    if(index<3)return icon('blocks',80,113,94)+text(127,255,'teclado',20)+arrow(194,179,294,179)+device(299,100,.75,'browser','Computador')+arrow(521,179,577,179)+icon('plan',600,125,80)+text(640,255,'impressora',20)+(index===1?move(circle(253,179,8,yellow),-45,0,.4):index===2?move(circle(555,179,8,yellow),-45,0,.4):'');
    return rect(90,103,250,174,purple)+icon('blocks',180,119,70)+text(215,239,'RAM · em uso',25)+arrow(352,190,407,190)+rect(421,103,250,174,teal)+icon(index===4?'lock':'database',510,119,70)+text(546,239,index===4?'SSD · salvo':'Armazenamento',23);
  }
  const file=(x,y,title,fill=cream)=>paper(x,y,130,106,fill)+icon('plan',x+45,y+9,42)+text(x+65,y+83,title,16);
  function files(index,focus){
    if(index===0||index===2)return file(308,105,index===0?'relatorio.docx':'.docx',yellow)+file(110,147,index===0?'dados':'.jpg',cream)+file(508,147,index===0?'conteúdo':'.pdf',cream);
    if(index===1)return rect(103,83,211,65,yellow)+text(208,125,'Estudos/',27)+path('M207 148v90h122',ink,3)+file(343,183,'relatorio.docx');
    const moving=focus==='move';
    return rect(65,90,280,206,'#e6ddf0')+text(205,124,index===4?'Original':'Estudos/',23)+rect(417,90,280,206,'#dceee4')+text(557,124,index===4?'Cópia separada':'Destino/',23)+(moving?'':file(139,157,'relatorio.docx'))+move(file(490,157,'relatorio.docx',yellow),-160,0,.3)+arrow(351,197,406,197,ink)+(index===4?icon('shield',645,260,55):'');
  }
  function sheet(index,focus){
    const alternate=['range','isolated'].includes(focus),values=alternate?[10,20,30]:[2,4,6];
    const selected=index===0?[1]:index===1?[0,1]:focus==='isolated'?[0,2]:[0,1,2];
    return rect(150,81,460,221,cream)+text(279,113,'A',22)+text(476,113,'B',22)+path('M150 128H610M196 81V302M370 81V302',ink,2)+values.map((v,i)=>text(172,169+i*63,i+1,21)+rect(204,134+i*55,156,49,selected.includes(i)?yellow:cream)+text(281,168+i*55,v,25)+path(`M375 ${183+i*55}H600`,ink,1)).join('')+words(480,171,index===4?'A1 ≥ 7? Revisar':index===3?'MÉDIA = 4':alternate?(focus==='isolated'?'SOMA = 40':'SOMA = 60'):index===1?'=A1+A2 → 6':'A2: coluna A, linha 2',21,15);
  }
  function documents(index){
    return paper(102,77,264,234,cream)+text(234,119,'Relatório',27)+rect(122,137,222,35,index>=2?yellow:cream)+text(234,162,'1. Introdução',22)+[0,1,2].map(i=>path(`M124 ${196+i*28}h214`,'#8c9996',2)).join('')+arrow(379,193,424,193)+paper(443,103,235,198,'#e3ecdf')+text(560,146,index<3?'Estilo':'Sumário',25)+(index<3?text(560,215,index===1?'Negrito':'Título 1',26):text(560,199,'Introdução ··· 1',19)+text(560,242,'Resultados ··· 3',19))+(index===4?icon('cycle',633,260,50):'');
  }
  function constitution(index){
    if(index===0)return `<path d="M380 77 564 299H196Z" fill="${purple}" stroke="${ink}" stroke-width="3"/>`+text(380,194,'Constituição',26)+text(380,235,'1988',32)+path('M246 240H514',ink,2);
    if(index===1)return person(240,95)+person(380,95,teal)+person(520,95,peach)+icon('shield',347,236,67);
    if(index===2)return flow(['Legislativo','Executivo','Judiciário'],['plan','board','shield']);
    if(index===3)return flow(['União','RN','Parnamirim'],['globe','globe','globe'])+text(380,315,'Entes autônomos na federação',21);
    return paper(175,83,409,224,cream)+text(380,130,'Texto da Constituição',27)+text(380,185,'artigo · condições',23)+text(380,232,'exceções · contexto',23)+icon('search',522,237,77);
  }
  function budget(index,focus){
    if(index===0)return flow(['PPA · 4 anos','LDO · prioridades','LOA · orçamento'],['plan','link','chart']);
    if(index===1)return flow(['Universalidade','Anualidade','Orçamento bruto'],['globe','cycle','chart']);
    if(index===2)return flow(['Previsão','Lançamento','Arrecadação','Recolhimento'],['plan','plan','database','arrows']);
    if(index===3)return flow(['1. Empenho','2. Liquidação','3. Pagamento'],['plan','search','arrows'],['commit','verify','pay'].indexOf(focus));
    return flow(['Metas fiscais','Limites','Transparência'],['chart','shield','search']);
  }
  function assets(index){
    return rect(77,91,281,218,'#dceee4')+text(217,132,'ATIVO',27)+text(217,182,'Caixa: R$ 1.000',22)+text(217,222,'Bens: R$ 2.000',22)+text(217,278,'R$ 3.000',30)+text(380,211,'=',30)+rect(408,91,280,218,'#e6ddf0')+text(548,136,'PASSIVO + PL',24)+rect(429,154,238,58,index===1?yellow:cream)+text(548,191,'Dívida: R$ 800',23)+rect(429,227,238,58,index>=2?yellow:cream)+text(548,264,'PL: R$ 2.200',23);
  }
  function administration(topic,index){
    if(topic.id==='adm_redacao'){
      if(index===1)return icon('plan',105,125,90)+text(150,255,'Unidade A',23)+move(envelope(335,150,1.1),-95,0,.3)+arrow(430,179,516,179)+icon('plan',569,125,90)+text(614,255,'Unidade B',23);
      return paper(185,80,391,233,cream)+text(380,122,['Informar uma reunião','','03 de novembro · 14h','OFÍCIO','Conferência final'][index],25)+[0,1,2].map(i=>rect(215,144+i*49,330,41,index===4?teal:palette[i])+text(380,172+i*49,[['Assunto','Destinatário','Objetivo'],[],['Data','Horário','Sala 2'],['Identificação','Destinatário e assunto','Texto e assinatura'],['Dados corretos','Clareza','Encaminhamento']][index][i],21)).join('');
    }
    if(topic.id==='adm_atendimento')return person(145,99,teal)+person(602,99,purple)+rect(245,173,270,106,'#e5d4b5')+icon(index===0?'heart':index===1?'search':index===3?'globe':'arrows',340,83,80)+text(380,239,['Acolher','Ouvir','Orientar','Acesso','Encaminhar'][index],27);
    if(topic.id==='adm_reunioes'){
      if(index===3)return paper(192,82,376,229,cream)+text(380,126,'ATA DA REUNIÃO',25)+lines(380,180,['Decisão: nova escala','Responsável: equipe','Prazo: combinado'],23);
      return person(155,111)+person(605,111,teal)+rect(230,195,300,95,'#d7c4a4')+icon(['search','plan','message','plan','cycle'][index],345,93,70)+text(380,253,['Objetivo','Pauta','Convocação','Ata','Acompanhar'][index],24);
    }
    if(topic.id==='adm_eventos'){
      if(index===1)return rect(182,76,396,231,cream)+rect(291,91,178,47,teal)+text(380,122,'Oficina',23)+Array.from({length:12},(_,i)=>rect(220+(i%4)*84,168+Math.floor(i/4)*42,47,28,purple)).join('');
      return flow([['Oficina','30 pessoas','Orientações'],[],['Reservar','Testar','Conferir'],['Prever','Autorizar','Comprovar'],['Presença','Resultados','Melhorias']][index],['plan','board','shield']);
    }
    if(topic.id==='adm_latim'){
      if(index===2)return rect(249,95,265,194,'#dceee4')+text(380,143,'LOCAL DO EVENTO',22)+icon('search',343,177,75);
      if(index===3)return paper(171,77,418,235,cream)+rect(192,104,375,54,yellow)+text(380,139,'Caput: enunciado principal',23)+text(380,207,'§ · parágrafos',24)+text(380,265,'I, II… · incisos',24);
      return flow(index===4?['Autora original','Obra consultada','Citado por · apud']:['Comissão ad hoc','Tarefa específica'],['plan','link','search']);
    }
    return '';
  }
  function law(topic,index){
    if(topic.id==='penal_fundamentos')return flow([
      ['Lei anterior','Fato posterior'],['Agressão injusta','Atual ou iminente','Meios moderados'],['Furto','Apropriação','Peculato'],['Apurar fatos','Autoria','Materialidade'],['Flagrante','Ordem judicial']
    ][index],['plan','shield','search']);
    if(topic.id==='legis_especial')return flow([
      ['Prevenir','Proteger','Preservar direitos'],['Unidade doméstica','Família','Relação de afeto'],['Crianças e jovens','Pessoas idosas'],['Hediondos','Abuso de autoridade','Tortura'],['Armas','Drogas','Trânsito']
    ][index],['shield','heart','plan']);
    return flow([
      ['Interesse público','Probidade','Respeito'],['Dever público','Interesse privado'],['Planejar','Selecionar','Fiscalizar'],['Critério','Evidência','Conclusão'],['Diagnóstico','Implementação','Avaliação']
    ][index],['plan','search','shield']);
  }
  const renderers={mat_frac:fractions,mat_porcento:percent,mat_media:mean,mat_probabilidade:probability,mat_razao:ratio,mat_equacoes:equations,mat_geometria:geometry,mat_combinatoria:counting,logic_conjuntos:venn,logic_proposicoes:logic,port_crase:crasis,port_acentos:accents,port_verbos:verbs,info_hardware:hardware,info_arquivos:files,info_planilhas:sheet,info_documentos:documents,const_fundamentos:constitution,afo_orcamento:budget,adm_patrimonio:assets};
  const languageIds=['port_texto','port_pontuacao','port_concordancia','port_sujeito','ingles_leitura'];
  const adminIds=['adm_redacao','adm_atendimento','adm_reunioes','adm_eventos','adm_latim'];
  const lawIds=['penal_fundamentos','legis_especial','etica_servico'];
  const supported=[...Object.keys(renderers),...languageIds,...adminIds,...lawIds];
  function render(topic,index,focus){
    if(!supported.includes(topic.id))throw new Error('História sem ilustração: '+topic.id);
    const drawing=renderers[topic.id]?renderers[topic.id](index,focus):languageIds.includes(topic.id)?language(topic,index):adminIds.includes(topic.id)?administration(topic,index):law(topic,index);
    return `<g data-scene-kind="${Art.e(topic.id)}-${index}">${text(380,44,topic.steps[index].map,25)}${enter(drawing)}${caption(topic.steps[index])}</g>`;
  }
  function actions(id,index){
    const story=JOURNEYS.find(topic=>topic.id===id);
    if(story&&index>=story.baseCount)return [];
    if(id==='logic_conjuntos'&&[2,3,4].includes(index)){const options=[['union','União · A ∪ B'],['intersection','Interseção · A ∩ B'],['difference','Diferença · A − B']];return index===4?[options[2],options[0],options[1]]:options;}
    if(id==='logic_proposicoes'&&index===4)return [['true','Chove e rua molhada · V'],['false','Chove e rua seca · F']];
    if(id==='info_planilhas'&&index===2)return [['range','SOMA(A1:A3) · 60'],['isolated','SOMA(A1;A3) · 40']];
    if(id==='afo_orcamento'&&index===3)return [['commit','1. Empenho'],['verify','2. Liquidação'],['pay','3. Pagamento']];
    if(id==='mat_media'&&index>=2){const options=[['level','Repartir igualmente'],['original','Ver valores originais']];return index===2?options:options.reverse();}
    if(id==='info_arquivos'&&index===3)return [['copy','Copiar · manter original'],['move','Mover · mudar de local']];
    if(id==='mat_combinatoria'&&index===3)return [['row','Destacar linha 1'],['column','Destacar coluna 2']];
    return [];
  }
  return {render,actions,supported};
})();
