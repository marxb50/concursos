/* Desenhos vetoriais autorais: a forma e o movimento fazem parte da explicação. */
const Art = (() => {
  const ink='#293448',cream='#fffdf5',yellow='#f8cf65',purple='#ac94d5',teal='#79b8a5',peach='#efab7c';
  const e=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=(x,y,value,size=22,anchor='middle',weight=600,fill=ink)=>`<text x="${x}" y="${y}" fill="${fill}" stroke="none" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${e(value)}</text>`;
  const lines=(x,y,values,size=19,anchor='middle',weight=500)=>values.map((v,i)=>text(x,y+i*(size*1.4),v,size,anchor,weight)).join('');
  const enter=(shape,delay=0)=>`<g class="scene-enter" style="--delay:${delay}s">${shape}</g>`;
  const move=(shape,dx=-120,dy=0,delay=.4)=>`<g class="scene-move" style="--dx:${dx}px;--dy:${dy}px;--delay:${delay}s">${shape}</g>`;
  const paper=(x,y,w,h,fill=cream,rotate=0)=>`<g transform="rotate(${rotate} ${x+w/2} ${y+h/2})"><path d="M${x+15} ${y}Q${x+w/2} ${y-3} ${x+w-12} ${y+2}Q${x+w+3} ${y+1} ${x+w} ${y+17}L${x+w-1} ${y+h-12}Q${x+w} ${y+h+3} ${x+w-14} ${y+h}L${x+13} ${y+h-1}Q${x-2} ${y+h+1} ${x} ${y+h-14}L${x+2} ${y+13}Q${x-1} ${y} ${x+15} ${y}Z" fill="${fill}" stroke="${ink}" stroke-width="2.4"/></g>`;
  const arrow=(x1,y1,x2,y2,color=ink,bend=0,delay=.4)=>`<g stroke="${color}" stroke-width="3" fill="none"><path class="scene-line" pathLength="1" style="--delay:${delay}s" d="M${x1} ${y1}Q${(x1+x2)/2+bend} ${(y1+y2)/2-20} ${x2} ${y2}"/><path d="m${x2-9} ${y2-7} 9 7-10 5"/></g>`;
  const sparkle=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${yellow}" stroke="${ink}" stroke-width="2"><path d="m0-14 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z"/></g>`;
  const label=(x,y,words,color=yellow,w=180)=>paper(x-w/2,y-26,w,41,color,-2)+text(x,y,words,18);
  function human(x,y,s=1,shirt=purple,skin='#c88a65',hair='#443129',name='') {
    return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="0" cy="183" rx="53" ry="9" fill="#d8d8ca" stroke="none" opacity=".6"/><path d="m-18 135-6 38h23l4-37m13-1 8 38h-22l-5-37" fill="#5d6e92"/><path d="M-25 172h23v10h-30q-3-7 7-10Zm28 0h22q11 4 10 10H3Z" fill="${ink}"/><path d="M-32 83q32-17 64 0l9 59h-82Z" fill="${shirt}"/><path d="m-31 88-26 34 11 9 22-24m55-19 26 28-10 13-21-22" fill="${skin}"/><path d="M-18 77v15q18 12 36 0V77" fill="${skin}"/><path d="M-34 34q0-41 34-33 36-4 37 38l-5 27h-64Z" fill="${hair}"/><ellipse cx="-34" cy="53" rx="7" ry="11" fill="${skin}"/><ellipse cx="34" cy="53" rx="7" ry="11" fill="${skin}"/><path d="M-29 30q31 9 57-2v34q-2 25-28 25-27-1-29-25Z" fill="${skin}"/><g fill="${hair}"><circle cx="-27" cy="21" r="13"/><circle cx="-12" cy="12" r="15"/><circle cx="6" cy="10" r="14"/><circle cx="24" cy="19" r="14"/></g><g fill="${ink}" stroke="none"><ellipse cx="-12" cy="49" rx="2.8" ry="4"/><ellipse cx="12" cy="49" rx="2.8" ry="4"/></g><path d="m0 52-3 9h6m-12 8q9 10 18 0" fill="none"/><circle cx="-21" cy="61" r="5" fill="#e99580" stroke="none" opacity=".55"/><circle cx="21" cy="61" r="5" fill="#e99580" stroke="none" opacity=".55"/>${name?text(0,210,name,20):''}</g>`;
  }
  function lia(x,y,s=1) {
    return `<g>${human(x,y,s,purple,'#c88a65','#40302e')}<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.4"><path d="m-17 89-7 9-7 39h62l-7-39-7-9v19h-34Z" fill="${peach}"/><path d="M-10 117h20v13h-20Z" fill="#fff5dd"/><path d="M-23 1q-11-18 6-26 11-12 23-1 15-9 23 8 9 12-1 23Z" fill="${cream}"/></g></g>`;
  }
  function cake(x,y,s=1,color='#d7a780',slice=false) {
    return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.7" stroke-linejoin="round"><ellipse cx="0" cy="52" rx="83" ry="13" fill="#e6e2d9" stroke="none"/><ellipse cx="0" cy="44" rx="80" ry="13" fill="${cream}"/><path d="M-63-8v47q63 19 126 0V-8" fill="${color}"/><path d="M-63 17q63 16 126 0" fill="none"/><ellipse cx="0" cy="-8" rx="63" ry="18" fill="#fff1db"/><path d="M-63-8q12 18 20 7 9 19 19 8 10 19 23 4 10 19 23 3 12 10 22-7 11 9 19-15" fill="#fff1db"/><g fill="#e98d8d"><path d="m-28-20 10-13 11 13q-8 18-21 0Zm30-5 10-13 10 13q-8 18-20 0ZM25-15l10-13 10 13q-8 18-20 0Z"/></g>${slice?move(`<path d="m35-2 56 23-2 43-54-23Z" fill="${color}"/><path d="m35-2 37-13 19 36-56-23Z" fill="#fff1db"/>`, -35,0,.7):''}</g>`;
  }
  function shop(x=35,y=100,s=1) {
    return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.8" stroke-linejoin="round"><path d="M5 78h270v203H5Z" fill="#f9e5ba"/><path d="M20 8q120-15 240 0l31 64H-11Z" fill="${peach}"/>${[0,1,2,3,4,5].map(i=>`<path d="M${i*48-4} 72h48v19q-24 26-48 0Z" fill="${i%2?cream:peach}"/>`).join('')}<rect x="23" y="117" width="147" height="97" rx="7" fill="#bce1db"/><path d="M95 117v97"/><rect x="191" y="118" width="59" height="163" rx="6" fill="#b593d4"/><circle cx="238" cy="202" r="3" fill="${ink}"/><path d="M0 282h283"/><rect x="39" y="24" width="201" height="43" rx="12" fill="${cream}"/>${text(139,52,'Loja da Lia',23)}${cake(64,181,.42)}${cake(133,183,.35,'#e6a0ad')}<path d="M-11 282q-12-25 0-48 17 13 12 48m282 0q17-25 2-44-18 12-9 44" fill="${teal}"/></g>`;
  }
  function notebook(x,y,s=1) {
    return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.6"><path d="M0 0q80-14 160 0l5 201q-88-8-168 0Z" fill="#fff9e6"/><path d="M18 0v200" stroke="#d48c87"/>${[38,69,100,131,162].map(v=>`<path d="M32 ${v}h111" stroke="#cccbc3"/>`).join('')}${[18,55,92,129,166].map(v=>`<path d="M-9 ${v}q-17 0-10 11h23" fill="none"/>`).join('')}${text(91,31,'Meu caderno',16)}<path d="m125 146 37-94 10 4-37 94-13 9Z" fill="${yellow}"/></g>`;
  }
  function ticket(x,y,title,sub,fill=cream,w=160) {
    return paper(x,y,w,85,fill,0)+text(x+w/2,y+31,title,22)+`<path d="M${x+13} ${y+44}h${w-26}" stroke="${ink}" opacity=".25" stroke-dasharray="4 5"/>`+text(x+w/2,y+68,sub,18);
  }
  function table(x,y,title,rows,w=310,focus='') {
    const h=67+rows.length*54;
    return `<g>${paper(x,y,w,h,cream)}<path d="M${x+1} ${y+48}h${w-2}" stroke="${ink}" stroke-width="2"/><path d="M${x+94} ${y+49}v${h-49}" stroke="${ink}" opacity=".2"/>${text(x+w/2,y+31,title,22)}${focus==='column'?`<rect class="scene-highlight" x="${x+97}" y="${y+52}" width="${w-102}" height="${h-57}" rx="5" fill="#b6d6f1" opacity=".5"/>`:''}${rows.map((row,i)=>`${(focus==='row'&&i===0)||(focus==='ana'&&row[0]==='Ana')||(focus==='caio'&&row[0]==='Caio')?`<rect class="scene-highlight" x="${x+5}" y="${y+55+i*54}" width="${w-10}" height="48" rx="6" fill="${yellow}" opacity=".6"/>`:''}<path d="M${x+9} ${y+103+i*54}h${w-18}" stroke="${ink}" opacity=".1"/>${text(x+47,y+85+i*54,row[0],23)}${text(x+107,y+85+i*54,row[1],23,'start',500)}`).join('')}</g>`;
  }
  function device(x,y,s=1,kind='browser',heading='Loja da Lia',content='') {
    return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.7">${kind==='phone'?`<rect width="146" height="260" rx="23" fill="${purple}"/><rect x="10" y="25" width="126" height="209" rx="6" fill="${cream}"/><path d="M52 13h42"/>${text(73,61,heading,16)}${content||`<rect x="23" y="86" width="100" height="57" rx="9" fill="${yellow}"/>${text(73,119,'Cardápio',17)}${cake(73,190,.37)}`}`:`<rect width="284" height="205" rx="14" fill="${cream}"/><path d="M0 38h284"/><g fill="${peach}"><circle cx="21" cy="19" r="4"/><circle cx="38" cy="19" r="4"/><circle cx="55" cy="19" r="4"/></g>${text(170,25,heading,16)}${content||`<path d="M22 68h109M22 93h183M22 119h147" stroke="#a2aab1"/>${cake(211,145,.4)}`}<path d="M118 205v25h-46m94-25v25h46" fill="none"/><path d="M60 232h164"/>`}</g>`;
  }
  function envelope(x,y,s=1,fill=yellow) {return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.7"><rect width="83" height="55" rx="6" fill="${fill}"/><path d="m2 3 40 29L81 3M2 53l27-22m52 22L54 31" fill="none"/></g>`;}
  function lock(x,y,s=1,fill=yellow) {return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="3"><path d="M13 31V11q24-30 48 0v20" fill="none"/><rect x="0" y="31" width="74" height="67" rx="13" fill="${fill}"/><circle cx="37" cy="59" r="6" fill="${ink}"/><path d="M37 62v15"/></g>`;}
  function board(x,y,s=1,active=false) {return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.5">${paper(0,0,510,272,'#f9f4e9')}<path d="M170 48v207m170-207v207M0 48h510" opacity=".3"/>${text(85,31,'A fazer',22)}${text(255,31,'Fazendo',22)}${text(425,31,'Pronto',22)}${ticket(19,72,'Encomenda','Sábado',purple,132)}${active?move(ticket(359,154,'Encomenda','Concluída',teal,132),-340,-80,.4):ticket(189,127,'Separar','ingredientes',yellow,132)}${ticket(19,174,'Organizar','bancada',peach,132)}</g>`;}
  function bars(x,y,s=1) {return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${ink}" stroke-width="2.6"><path d="M0 0v240h365" fill="none"/>${[0,4,8,12].map((v,i)=>text(-17,247-i*70,v,18,'end',500)).join('')}${[0,1,2,3].map(i=>`<path d="M0 ${240-i*70}h365" opacity=".1"/>`).join('')}${[[38,210,teal,'Pães',12],[143,140,purple,'Bolos',8],[248,70,peach,'Sucos',4]].map(([bx,h,color,name,n],i)=>`<g><rect class="scene-bar" style="--delay:${i*.3}s" x="${bx}" y="${240-h}" width="65" height="${h}" rx="8" fill="${color}"/>${text(bx+32,223-h,n,23)}${text(bx+32,270,name,20)}</g>`).join('')}</g>`;}
  function symbol(name,size=58) {
    const shapes={
      database:`<ellipse cx="32" cy="14" rx="21" ry="8" fill="${purple}"/><path d="M11 14v34c0 12 42 12 42 0V14M11 29c0 11 42 11 42 0M11 43c0 11 42 11 42 0" fill="none"/>`,
      cake:`<path d="M9 26v25q23 12 46 0V26" fill="${peach}"/><ellipse cx="32" cy="26" rx="23" ry="8" fill="${cream}"/><path d="M10 28q8 17 15 5 8 18 16 0 8 11 14-5" fill="${cream}"/><path d="m25 16 7-12 8 12q-6 11-15 0Z" fill="#dc8f9e"/>`,
      plan:`<path d="M12 7h32l9 10v41H12Z" fill="${cream}"/><path d="M44 7v12h9M20 27h24M20 36h24M20 45h15"/><path d="m39 47 14-24 7 4-15 24-9 4Z" fill="${yellow}"/>`,
      message:`<rect x="5" y="15" width="53" height="36" rx="7" fill="${teal}"/><path d="m7 18 25 19 24-19M8 48l17-16m30 16L40 32" fill="none"/>`,
      shield:`<path d="m32 5 23 9v20c0 12-12 20-23 27C20 55 9 46 9 34V14Z" fill="${teal}"/><path d="m20 32 9 10 17-20" fill="none" stroke-width="4"/>`,
      cloud:`<path d="M15 48C0 48 0 24 16 23 15 3 45 1 47 24c20-1 21 24 2 24Z" fill="#c7baed"/><path d="M22 31h20m-20 8h20"/>`,
      board:`<rect x="5" y="9" width="54" height="46" rx="5" fill="${cream}"/><path d="M23 18v30m18-30v30"/><path d="M11 20h7v12h-7Z" fill="${purple}"/><path d="M28 29h8v13h-8Z" fill="${yellow}"/><path d="M46 20h7v12h-7Z" fill="${teal}"/>`,
      chart:`<path d="M8 8v47h49" fill="none"/><path d="M16 34h9v16h-9Z" fill="${peach}"/><path d="M30 22h9v28h-9Z" fill="${purple}"/><path d="M44 10h9v40h-9Z" fill="${teal}"/>`,
      blocks:`<rect x="7" y="7" width="21" height="21" rx="5" fill="${purple}"/><rect x="36" y="7" width="21" height="21" rx="5" fill="${yellow}"/><rect x="7" y="36" width="21" height="21" rx="5" fill="${teal}"/><rect x="36" y="36" width="21" height="21" rx="5" fill="${peach}"/>`,
      cycle:`<circle cx="32" cy="32" r="22" fill="${cream}" stroke="none"/><path d="M54 24A23 23 0 0 0 12 17M11 6v13h13M10 40a23 23 0 0 0 42 7m1 11V45H40" stroke="${purple}" stroke-width="4"/>`,
      heart:`<path d="M32 56S6 40 6 23a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 17-26 33-26 33Z" fill="${peach}"/><path d="m19 32 8 8 17-18"/>`,
      globe:`<circle cx="32" cy="32" r="25" fill="${teal}"/><path d="M7 32h50M32 7c-17 14-17 36 0 50M32 7c17 14 17 36 0 50M12 19h40M12 45h40"/>`,
      link:`<path d="m27 42-7 7a11 11 0 0 1-15-15l12-12a11 11 0 0 1 15 0m5 0 7-7a11 11 0 0 1 15 15L47 42a11 11 0 0 1-15 0" stroke="${purple}" stroke-width="5"/><path d="m22 42 20-20"/>`,
      lock:`<path d="M19 28V17a13 13 0 0 1 26 0v11"/><rect x="10" y="28" width="44" height="30" rx="8" fill="${yellow}"/><circle cx="32" cy="40" r="4" fill="${ink}"/><path d="M32 42v7"/>`,
      search:`<circle cx="27" cy="27" r="19" fill="${cream}"/><path d="m41 41 15 15" stroke-width="7" stroke="${teal}"/><path d="M19 27h16M27 19v16"/>`,
      arrows:`<path d="M7 20h47m-12-12 12 12-12 12M57 44H10m12-12L10 44l12 12" stroke="${teal}" stroke-width="4"/>`
    };
    return `<svg data-symbol="${e(Object.hasOwn(shapes,name)?name:'plan')}" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${shapes[name]||shapes.plan}</svg>`;
  }

  function sql(index,focus) {
    if(index===0) return shop(27,127,.91)+enter(lia(354,224,1.03),.1)+enter(notebook(569,140,1.08),.4)+move(ticket(485,275,'Ana','2 pães','#eee8fc',150),-135,-45,.6)+label(620,115,'Guardar informações',yellow,238)+sparkle(540,100,.7);
    if(index===1) return enter(lia(133,198,1.05)) + enter(table(310,82,'Clientes',[[1,'Ana'],[2,'Bia'],[3,'Caio']],355,focus==='column'?'column':'row'),.2)+label(488,358,focus==='column'?'coluna = tipo de dado':'linha = um registro',focus==='column'?'#b6d6f1':yellow,295)+arrow(237,257,306,focus==='column'?129:169,purple,0,.7);
    if(index===2) return enter(human(210,122,1.23,purple,'#c88a65','#47322d','Ana'))+enter(human(535,122,1.23,teal,'#e2b48a','#594133','Ana'),.3)+move(label(210,373,'Cliente 1',yellow,185),0,-40,.6)+move(label(535,373,'Cliente 4',yellow,185),0,-40,.9)+lines(372,93,['Mesmo nome.','Números diferentes.'],23)+sparkle(373,250,.8);
    if(index===3) return enter(table(48,102,'Clientes',[[1,'Ana'],[2,'Bia'],[3,'Caio']],268))+enter(table(420,102,'Pedidos',[[101,'cliente 1'],[102,'cliente 1'],[103,'cliente 2']],290),.4)+arrow(288,181,435,181,purple,15,.7)+arrow(288,181,435,233,purple,12,.9)+label(390,389,'O mesmo cliente pode comprar outra vez',yellow,460);
    if(index===4||index===5) {
      const isLeft=index===5,ana=focus==='ana',caio=focus==='caio';
      return enter(human(93,101,.73,purple,'#c88a65','#47322d','Ana'))+enter(human(93,278,.73,teal,'#e4ad89','#40302e','Bia'),.1)+enter(ticket(259,78,'Pedido 101','cliente 1',ana?'#d6c5f0':cream,184),.2)+enter(ticket(259,178,'Pedido 102','cliente 1',ana?'#d6c5f0':cream,184),.3)+enter(ticket(259,294,'Pedido 103','cliente 2',cream,184),.4)+arrow(133,175,258,120,purple,0,.6)+arrow(133,175,258,218,purple,0,.8)+arrow(133,347,258,335,teal,0,1)+enter(table(496,80,isLeft?'Todos da esquerda':'Pares encontrados',isLeft?[['Ana','101'],['Ana','102'],['Bia','103'],['Caio','NULL']]:[['Ana','101'],['Ana','102'],['Bia','103']],240,ana?'ana':caio?'caio':''),.6)+(isLeft?`<g class="scene-enter" style="--delay:1.5s">${label(607,403,'Caio também fica',caio?yellow:'#e4f1e8',238)}</g>`:label(610,355,'Caio não tem par','#fff0d6',232));
    }
    return enter(device(69,117,1.11,'browser','Ler a lista',lines(30,86,['SELECT nome','FROM clientes;'],25,'start',700)),.1)+arrow(389,226,469,226,purple,0,.5)+enter(table(480,100,'Nomes',[[1,'Ana'],[2,'Bia'],[3,'Caio']],225),.6)+label(380,405,'Uma consulta pede informações',yellow,410);
  }
  function java(index) {
    if(index===0) return enter(lia(93,227,.9))+[ticket(212,99,'1 · Misturar','ingredientes',yellow,155),ticket(391,168,'2 · Colocar','na forma',purple,155),ticket(566,252,'3 · Assar','com cuidado',teal,155)].map((s,i)=>enter(s,i*.45)).join('')+arrow(319,200,393,206,ink,0,.6)+arrow(499,269,568,291,ink,0,1);
    if(index===1) return enter(notebook(99,111,1.25))+enter(cake(528,264,1.6),.5)+label(218,380,'Descrição do tipo',purple,256)+label(529,380,'Um bolo específico',yellow,250)+arrow(342,225,426,225,ink,0,.5)+lines(217,196,['sabor','tamanho','servir'],23);
    if(index===2) return enter(paper(270,45,220,96,'#eee8fc'))+text(380,84,'Classe Bolo',26)+text(380,116,'o modelo',19)+arrow(321,146,195,230,purple,-50,.4)+arrow(440,146,568,230,purple,40,.7)+enter(cake(189,303,1.3),.6)+enter(cake(569,303,1.3,'#e5a1b5'),.9)+label(189,401,'Chocolate',peach,190)+label(569,401,'Morango','#efb9c9',190);
    if(index===3) return enter(lia(123,202,1.02))+enter(cake(473,279,2,'#d7a780',true),.3)+label(471,123,'Ação: servir',yellow,240)+arrow(260,247,343,247,ink,0,.6);
    return enter(device(91,91,1.35,'browser','Uma instrução',text(142,111,'bolo.servir();',29)))+enter(cake(589,330,1.25,'#d7a780',true),.5)+label(381,416,'Objeto → ação',yellow,284);
  }
  function engineering(index) {
    if(index===0) return shop(15,155,.75)+enter(lia(307,211,1))+enter(human(593,220,1.03,teal,'#e5b58d','#38303a'))+paper(430,48,277,112,'#fff4cc',-2)+lines(567,93,['Registrar encomendas','sem perder informações'],22)+arrow(393,204,444,167,ink,0,.8);
    if(index===1) return enter(lia(109,214,1))+enter(paper(282,73,382,270,'#fff7d8'),.3)+text(471,121,'Guardar a encomenda',27)+lines(330,184,['Cliente','Produto','Data de entrega'],26,'start')+label(473,396,'Uma necessidade escrita com clareza',yellow,430);
    if(index===2) return enter(device(153,67,1.55,'browser','Rascunho da tela',`<g fill="none" stroke="#b6a3d0"><rect x="25" y="61" width="233" height="31" rx="4"/><rect x="25" y="105" width="233" height="31" rx="4"/><rect x="25" y="149" width="148" height="31" rx="4"/></g>${text(37,83,'Cliente',18,'start')}${text(37,127,'Produto',18,'start')}${text(37,171,'Entrega',18,'start')}`)) + label(382,422,'Desenhar para conversar',purple,370);
    if(index===3) return enter(ticket(40,168,'Encomenda','2 bolos · sábado',yellow,204))+arrow(258,219,331,219,ink,0,.5)+enter(device(358,102,1.15,'browser','Lista de encomendas',ticket(28,69,'2 bolos','sábado','#e0f1ec',224)),.5)+enter(label(534,396,'Dados conferidos',teal,275),1.1);
    return enter(lia(114,218,1))+enter(device(293,91,1.35,'browser','Editar encomenda',`<rect x="27" y="70" width="228" height="50" rx="7" fill="${yellow}"/>${text(141,102,'Mudar entrega',24)}${text(141,165,'Salvar alteração',20)}`),.3)+arrow(242,265,292,227,purple,0,.5)+label(434,429,'O uso traz novas descobertas',purple,390);
  }
  function web(index) {
    const left=device(65,102,1.1,'phone','Ana'),right=device(459,117,.95,'browser','Serviço da loja');
    if(index===4) return enter(device(86,64,1.5,'browser','Uma ficha de dados',lines(23,86,['nome: Pão','preco: 2'],27,'start')))+enter(lia(637,259,.77),.4)+label(376,427,'JSON organiza uma representação',yellow,440);
    return enter(left)+enter(right,.2)+`<path d="M242 243h201" stroke="${ink}" stroke-dasharray="6 7" fill="none" opacity=".35"/>`+(index===2?enter(paper(260,112,180,191,'#fff3cf'),.3)+text(350,149,'API',29)+lines(350,193,['Operações','Regras','Formatos'],20)+label(380,409,'O combinado da conversa',yellow,365):index===3?move(envelope(250,205,1,teal),230,0,.6)+label(355,152,'Resposta',teal,172)+label(599,405,'200 · sucesso','#e4f2e9',211):move(envelope(350,205),-140,0,.5)+label(362,152,index===0?'Pedido':'Atender ao pedido',yellow,index===0?170:245))+text(147,423,'Cliente',23)+text(593,376,'Servidor',23)+sparkle(694,95,.6);
  }
  function security(index) {
    if(index===0) return enter(lia(135,215,1.02))+enter(paper(339,147,276,181,'#e3eee9'),.3)+text(477,193,'Informações',26)+lines(477,236,['Receita da loja','Dados de clientes'],22)+enter(lock(559,259,.95),.6)+sparkle(673,154,.6)+label(467,397,'Cada cuidado tem uma finalidade',yellow,413);
    if(index===1) return enter(paper(229,107,302,248,'#c5a7dd'))+text(380,156,'Receita especial',28)+enter(lock(327,195,1.45),.4)+label(380,414,'Só para pessoas autorizadas',yellow,393);
    if(index===2) return enter(ticket(144,112,'Encomenda','2 bolos',cream,310))+enter(`<g transform="translate(505 196)"><path d="m0-55 17 11 21-4 6 22 17 13-10 20 4 22-22 6-13 18-20-10-22 3-6-22-17-13 10-20-3-22 22-6Z" fill="${teal}" stroke="${ink}" stroke-width="3"/><path d="m-21 0 17 18 28-33" stroke="${ink}" stroke-width="5" fill="none"/></g>`,.5)+label(379,372,'Cuidar das alterações',teal,326);
    if(index===3) return enter(shop(48,102,1.1))+enter(lia(521,196,1.18),.3)+move(ticket(380,107,'Lista de hoje','Acesso disponível',yellow,256),0,70,.6)+label(404,437,'A equipe consegue usar o serviço',teal,445);
    if(index===4) return enter(human(141,143,1.28,purple,'#c88a65','#443129'))+enter(ticket(45,359,'Crachá','Identidade',yellow,192),.2)+enter(paper(385,73,293,267,'#dfc7a5'),.3)+[0,1,2].map(i=>`<rect x="407" y="${95+i*78}" width="248" height="63" rx="7" fill="${i===1?'#e2f0e9':'#f4e6cf'}" stroke="${ink}" stroke-width="2"/><circle cx="623" cy="${128+i*78}" r="5" fill="${ink}"/>`).join('')+enter(lock(517,163,.6),.6)+label(530,405,'Permissão para uma gaveta',teal,343);
    return enter(lia(128,200,1.06))+enter(paper(292,85,371,260,'#fff7db'),.2)+text(477,135,'Entrega de encomenda',27)+lines(328,197,['Nome: Ana','Telefone: registrado','Finalidade: combinar entrega'],22,'start')+enter(lock(610,307,.7),.5)+label(437,419,'Informações sobre uma pessoa',yellow,407);
  }
  function infra(index) {
    if(index===4) return enter(paper(193,278,380,80,'#e4d0af'))+text(383,329,'Equipamento',27)+move(paper(193,175,380,80,'#c9b4e3')+text(383,224,'Sistema operacional',25),0,-60,.3)+move(paper(193,72,380,80,'#b6d9cc')+text(383,122,'Aplicativo',27),0,-95,.6)+label(383,424,'Partes com funções diferentes',yellow,412);
    if(index===3) return enter(device(48,228,.8))+enter(`<g fill="#eee8fc" stroke="${ink}" stroke-width="3"><path d="M357 288c-63-5-66-93-8-108-18-99 129-128 158-41 106-21 162 127 49 149Z"/></g>`,.3)+[0,1,2].map((n)=>enter(paper(377,160+n*40,153,31,cream)+text(452,182+n*40,'Servidor '+(n+1),17),.4+n*.2)).join('')+arrow(281,316,376,288,purple,0,.7)+label(455,400,'Computadores reais por trás',purple,382);
    if(index===2) return enter(ticket(26,155,'Nome','loja.exemplo',yellow,219))+arrow(248,202,314,202,ink,0,.4)+enter(paper(320,127,139,143,'#ddd0ef')+text(390,213,'DNS',32),.4)+arrow(464,202,518,202,ink,0,.8)+enter(ticket(522,155,'Endereço','192.0.2.10',teal,211),.9)+label(382,364,'Um endereço de exemplo',purple,351);
    return enter(device(46,138,.88,'phone','Ana'))+enter(device(471,158,.83,'browser','Destino'))+`<path d="M199 280C283 280 307 150 421 212l48 28" stroke="${purple}" stroke-width="12" fill="none" opacity=".3"/><path class="scene-line" pathLength="1" d="M199 280C283 280 307 150 421 212l48 28" stroke="${ink}" stroke-width="2" stroke-dasharray="8 7" fill="none"/>`+move(envelope(365,204,.8),-167,62,.4)+(index===1?label(371,139,'Destino: 192.0.2.10',yellow,303):label(378,124,'Uma rede conecta equipamentos',yellow,437))+text(393,415,index===1?'O pacote leva um destino.':'Os dados atravessam a conexão.',24);
  }
  function management(index) {
    if(index===1||index===2) return enter(board(116,94,1.03,index===1))+(index===2?enter(label(379,405,'Pouco trabalho em andamento',yellow,415),.6):label(379,418,'O cartão avança no fluxo',teal,355));
    if(index===3) return enter(paper(268,159,221,122,'#fff2cb'))+lines(378,210,['Um ciclo de','aprendizado'],26)+[label(378,71,'Combinar',purple,190),label(637,230,'Fazer',teal,142),label(378,398,'Observar',peach,190),label(117,230,'Ajustar',yellow,158)].map((s,i)=>enter(s,i*.2)).join('')+arrow(495,85,607,170,ink,20,.2)+arrow(624,286,482,369,ink,10,.5)+arrow(253,374,139,286,ink,-10,.8)+arrow(139,169,260,85,ink,-20,1.1);
    return enter(human(140,235,.93,purple,'#c88a65','#443129'))+enter(lia(375,236,.93),.2)+enter(human(611,236,.93,teal,'#e1b48d','#343043'),.4)+enter(paper(189,40,382,128,'#fff3ce'),.2)+lines(380,91,index===0?['Objetivo em comum','Entregar as encomendas']:['Uma melhoria para testar','Separar ingredientes antes'],26)+arrow(237,216,316,173,ink,0,.6)+arrow(517,216,448,173,ink,0,.8);
  }
  function data(index) {
    if(index===1) return enter(bars(225,80,1.05))+label(434,427,'Vendas de exemplo',yellow,300);
    if(index===0) return enter(shop(24,161,.68))+[0,1,2].map((i)=>move(ticket(343+i*32,95+i*89,['Venda 1','Venda 2','Venda 3'][i],['Pães','Bolos','Sucos'][i],[yellow,purple,teal][i],218),-95,20,i*.25+.3)).join('')+label(170,421,'Guardar cada venda',yellow,269);
    if(index===2) return enter(bars(76,85,.9))+arrow(410,250,483,250,ink,0,.6)+enter(lia(609,194,1.13),.3)+label(575,111,'Planejar a produção',yellow,300);
    return enter(table(25,123,index===4?'Casos reservados':'Exemplos',[[1,'Dia 1'],[2,'Dia 2'],[3,'Dia 3']],231))+arrow(263,238,321,238,ink,0,.4)+enter(paper(327,148,167,166,'#e9def5')+text(411,214,'Modelo',28)+text(411,253,'Padrões',21),.3)+arrow(500,238,547,238,ink,0,.8)+enter(ticket(552,178,index===4?'Comparar':'Estimativa',index===4?'previsão × real':'quantidade',yellow,187),.8)+label(388,410,index===4?'Avaliar depois do ajuste':'Aprender com os exemplos',teal,396);
  }
  function scene(topic,index,focus='row') {
    const step=topic.steps[index];
    const dispatch={sql,java,engenharia:engineering,web,seguranca:security,infra,gestao:management,dados:data};
    const art=step.expanded?expandedScene(topic,step):dispatch[topic.id]?dispatch[topic.id](index,focus):GeneralScenes.render(topic,index,focus);
    return `<svg class="story-svg" viewBox="0 0 760 470" role="img" aria-label="${e(step.observe)}" xmlns="http://www.w3.org/2000/svg"><title>${e(step.title)}</title><desc>${e(step.observe)}</desc><g font-family="Trebuchet MS, Segoe UI, Arial, sans-serif" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="382" cy="440" rx="327" ry="12" fill="${topic.light}"/><path d="M29 436q347 5 701-1" stroke="${ink}" stroke-width="1.2" opacity=".18" fill="none"/>${art}</g></svg>`;
  }
  function wrap(value,limit=23) {
    const output=[];let line='';
    for(const word of value.split(' ')){if(line&&line.length+word.length+1>limit){output.push(line);line=word;}else line+=(line?' ':'')+word;}
    if(line)output.push(line);return output;
  }
  function expandedScene(topic,step){
    const reviewing=step.mode==='revisao',term=reviewing?'Recuperar a ideia':step.term;
    const heading=reviewing?'SUA VEZ':step.mode==='conceito'?'CONCEITO':'NA PRÁTICA';
    const title=wrap(term,19).slice(0,3),rawExample=reviewing?'Pense primeiro. Depois, confira a explicação.':step.teacher.example;
    const allExample=wrap(rawExample,23),example=allExample.slice(0,3);
    if(allExample.length>3)example[2]+='…';
    return paper(64,58,632,322,cream)+label(380,99,heading,reviewing?yellow:teal,210)+
      paper(88,134,263,174,topic.light)+paper(409,134,263,174,'#fff2cf')+
      text(220,164,reviewing?'LEMBRE':'IDEIA',16)+lines(220,200,title,22,'middle',700)+
      text(540,164,reviewing?'CONFIRA':'SITUAÇÃO',16)+lines(540,198,example,17,'middle',500)+
      arrow(359,226,399,226,topic.color,0,0)+
      text(380,350,reviewing?'Pense e confira no seu ritmo':'Leia a situação completa abaixo',19);
  }
  function mindMap(topic,interactive=true) {
    const frame=(x,y,w,h,fill,accent)=>`<g class="map-frame"><path d="M${x+12} ${y}H${x+w-12}L${x+w} ${y+12}V${y+h-12}L${x+w-12} ${y+h}H${x+12}L${x} ${y+h-12}V${y+12}Z" fill="${fill}" stroke="${accent}" stroke-width="5"/><path d="M${x+20} ${y+7}h28m8 0h5m5 0h5M${x+w-15} ${y+h-7}h-35" fill="none" stroke="${ink}" stroke-width="2"/></g>`;
    if(topic.baseCount){
      const sections=StoryExpansion.sections(topic),positions=[[30,54],[30,260],[30,466],[760,54],[760,260],[760,466]];
      const branches=sections.map((section,i)=>{
        const [x,y]=positions[i],left=i<3,endX=left?x+290:x,rootX=left?395:685;
        const subtitle=`Cenas ${section.start+1} a ${section.end}`;
        const name=wrap(section.title,21).slice(0,2);
        const sample=[...new Set(topic.steps.slice(section.start,section.end).map(s=>s.recall?s.teacher.term:s.term))].slice(0,2).join(' · ');
        const first=wrap(sample,22).slice(0,2);
        const aria=`Abrir ${section.title}, cenas ${section.start+1} a ${section.end}`;
        return `<path d="M${rootX} 350 Q540 ${y+80} ${endX} ${y+80}" fill="none" stroke="${topic.color}" stroke-width="3"/>`+
          `<g ${interactive?`role="button" tabindex="0" data-map-step="${section.start}" aria-label="${e(aria)}"`:''}><title>${e(aria)}</title>${frame(x,y,290,164,i%2?'#dceee4':'#fff0bc',i%2?'#2395aa':'#d45969')}`+
          `<circle cx="${x+38}" cy="${y+39}" r="20" fill="${cream}" stroke="${ink}" stroke-width="2"/>${text(x+38,y+46,String(i+1),20)}`+
          `${lines(x+72,y+39,name,20,'start',700)}${text(x+25,y+101,subtitle,18,'start',600)}${lines(x+25,y+128,first,16,'start',500)}</g>`;
      }).join('');
      const title=wrap(topic.root[0],18).slice(0,3);
      return `<svg class="mindmap-svg" viewBox="0 0 1080 720" role="${interactive?'group':'img'}" aria-label="Mapa de ${e(topic.name)} com seis partes e trinta cenas" xmlns="http://www.w3.org/2000/svg"><rect class="map-canvas" width="1080" height="720" fill="${cream}"/><g font-family="Trebuchet MS, Segoe UI, Arial, sans-serif" stroke-linecap="round" stroke-linejoin="round">${branches}${frame(395,211,290,287,topic.light,'#2395aa')}${lines(540,245,title,24,'middle',700)}${lia(540,title.length>2?335:310,.56)}${text(540,464,'30 cenas · no seu ritmo',19)}${text(540,692,interactive?'Escolha uma parte para voltar à história.':'memória viva · mapa de estudo',18)}</g></svg>`;
    }
    const positions=[[26,56],[26,260],[26,467],[397,580],[766,467],[766,260],[766,56]];
    const chosen=topic.steps.length===5?[positions[0],positions[1],positions[3],positions[5],positions[6]]:topic.steps.length===6?[positions[0],positions[1],positions[2],positions[4],positions[5],positions[6]]:positions;
    const colors=['#eadff6','#fff0bc','#dceee4','#f5dfce','#d9ebf4','#f3dce5','#e5e7fc'];
    const mapNotes={
      sql:['Informações que guardamos','Linhas e colunas','Um crachá sem repetição','Uma compra aponta para um cliente','Combinar pelas referências','Todos da esquerda permanecem','Pedir informações ao banco'],
      java:['Uma sequência de ações','Descrever um tipo de coisa','Cada um tem estado próprio','Uma operação do objeto','Escrever as instruções'],
      engenharia:['Escutar a pessoa','Descrever o que é esperado','Enxergar antes de construir','Comparar com o esperado','Aprender com o uso'],
      web:['O programa que pede','O sistema que atende','Operações e regras','O retorno do pedido','Uma representação de dados'],
      seguranca:['Proteger a informação','Acesso autorizado','Cuidar das alterações','Conseguir usar quando precisa','Definir as ações permitidas','Informações sobre pessoas'],
      infra:['Equipamentos conectados','Encaminhar ao destino','Consultar pelo nome','Recursos reais por rede','Partes com funções próprias'],
      gestao:['Uma direção compartilhada','Enxergar o fluxo','Limitar tarefas em andamento','Observar e ajustar','Experimentar uma melhoria'],
      dados:['Guardar o que aconteceu','Comparar quantidades','Decidir com contexto','Ajustar padrões nos dados','Conhecer erros e limites']
    };
    const nodes=topic.steps.map((step,i)=>{
      const [x,y]=chosen[i],cx=x+145,cy=y+77,left=cx<520;
      const endX=left?x+290:x,rootX=left?398:652;
      const titles=wrap(step.map,19),note=wrap(mapNotes[topic.id]?.[i] || step.visual?.[0] || step.term,23).slice(0,2);
      const check=`<circle cx="28" cy="28" r="25" fill="${teal}" stroke="${ink}" stroke-width="2"/><path d="m13 27 11 11 20-23" stroke="${ink}" stroke-width="3" fill="none"/>`;
      const tinyBook=notebook(7,0,.28),tinyPhone=device(17,0,.24,'phone','Loja'),tinyScreen=device(0,4,.21,'browser','Loja');
      const cycle=`<path d="M48 15a24 24 0 1 0 0 33M48 15V3m0 12H35" fill="none" stroke="${purple}" stroke-width="4" stroke-linecap="round"/>`;
      const sketches={
        java:[tinyBook,symbol('plan',52),cake(16,31,.23)+cake(47,42,.24,'#e5a1b5'),cake(27,31,.3,'#d7a780',true),tinyScreen],
        engenharia:[human(26,1,.29),symbol('plan',52),tinyScreen,check,cycle],
        web:[tinyPhone,tinyScreen,symbol('plan',52),envelope(0,7,.68,teal),tinyBook],
        seguranca:[symbol('shield',53),lock(10,0,.56),check,tinyScreen,lock(10,0,.56),tinyBook],
        infra:[tinyPhone+`<g transform="translate(30 18)">${tinyScreen}</g>`,envelope(0,8,.68),tinyBook,symbol('cloud',53),symbol('board',53)],
        gestao:[human(12,0,.27)+human(41,2,.27,teal),symbol('board',53),ticket(0,7,'1','tarefa',yellow,103),cycle,check],
        dados:[tinyBook,symbol('chart',53),symbol('plan',53),symbol('database',53),check]
      };
      const family=topic.id.startsWith('port_')||topic.id.startsWith('ingles_')?['plan','search','link','arrows','cycle']:topic.id.startsWith('mat_')||topic.id.startsWith('logic_')?['blocks','chart','arrows','search','cycle']:topic.id.startsWith('info_')?['cloud','arrows','database','plan','lock']:['plan','heart','board','search','shield'];
      let mini=sketches[topic.id]?.[i]||symbol(family[i%family.length],51);
      if(topic.id==='gestao'&&i===2)mini=`<g transform="scale(.55)">${mini}</g>`;
      let sketch=`<g transform="translate(${x+18} ${y+82})">${mini}</g>`;
      if(topic.id==='sql'){
        const mini=[ticket(0,0,'Ana','2 pães',yellow,104),table(0,0,'Lista',[[1,'Ana'],[2,'Bia']],175,'row'),human(43,0,.58,purple,'#c88a65','#443129'),ticket(0,0,'101','cliente 1',peach,112),`<path d="M6 20h73M6 20l73 46" stroke="${purple}" stroke-width="5"/><circle cx="6" cy="20" r="10" fill="${yellow}" stroke="${ink}"/><circle cx="79" cy="20" r="10" fill="${teal}" stroke="${ink}"/><circle cx="79" cy="66" r="10" fill="${teal}" stroke="${ink}"/>`,human(43,0,.58,teal,'#dba779','#443129'),notebook(0,0,.78)][i];
        const scales=[.49,.32,.6,.47,.55,.6,.34];
        sketch=`<g transform="translate(${x+21} ${y+82}) scale(${scales[i]})">${mini}</g>`;
      }
      const connector=x===397?`M525 505Q525 545 542 580`:`M${rootX} 320Q${(rootX+endX)/2} ${cy} ${endX} ${cy}`;
      return `<path class="map-connector" d="${connector}" fill="none" stroke="${topic.color}" stroke-width="3"/>`+`<g ${interactive?`role="button" tabindex="0" data-map-step="${i}" aria-label="Abrir explicação: ${e(step.title)}"`:''}><title>${interactive?'Ver a cena '+(i+1)+': ':''}${e(step.title)}</title>${frame(x,y,290,166,colors[i],i%2?'#2395aa':'#d45969')}<circle cx="${x+36}" cy="${y+38}" r="18" fill="${cream}" stroke="${ink}" stroke-width="2"/>${text(x+36,y+45,String(i+1),20)}${lines(x+70,y+36,titles,20,'start',700)}${sketch}${lines(x+85,y+106,note,17,'start',500)}</g>`;
    }).join('');
    const rootTitle=wrap(topic.root[0],19);
    const centerArt=topic.id==='sql'?shop(443,257,.52):topic.id==='java'?cake(525,330,1.14):lia(525,rootTitle.length>1?294:267,.75);
    return `<svg class="mindmap-svg" viewBox="0 0 1080 790" role="${interactive?'group':'img'}" aria-label="Mapa ilustrado de ${e(topic.name)}.${interactive?' Cada ramo abre uma explicação.':''}" xmlns="http://www.w3.org/2000/svg"><rect class="map-canvas" width="1080" height="790" rx="3" fill="${cream}"/><g font-family="Trebuchet MS, Segoe UI, Arial, sans-serif" stroke-linecap="round" stroke-linejoin="round">${nodes}${frame(389,201,272,306,topic.light,'#2395aa')}${lines(525,239,rootTitle,24,'middle',700)}${centerArt}${lines(525,437,wrap(topic.root[1],24),19)}${sparkle(702,198,.8)}${sparkle(360,490,.6)}<g class="map-credit">${text(540,773,interactive?'Uma ideia de cada vez. Toque em um ramo para ver a história.':'memória viva. · Uma introdução ilustrada · 28/10/2026',19,'middle',500)}</g></g></svg>`;
  }
  return {scene,mindMap,symbol,lia,e,primitives:{ink,cream,yellow,purple,teal,peach,text,lines,enter,move,paper,arrow,sparkle,label,human,notebook,ticket,table,device,envelope,lock,wrap}};
})();
