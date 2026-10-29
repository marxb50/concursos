/* Missões acessíveis por mouse, toque e teclado. */
const ActivityUI=(()=>{
  const e=Art.e,key='memoria-viva-atividades-v1';
  let options,host,store={version:1,runs:{},awards:{}},ctx={},active=null,draft=[],storageOk=true;
  const $=s=>host?.querySelector(s);
  const current=()=>active&&ActivityCore.missions(ctx.contest,ctx.subject).find(m=>m.id===active);
  const currentRun=m=>ActivityCore.run(store,ctx.contest,ctx.subject,m.id);
  const contextKey=()=>{const m=current();return m?`${m.id}/${currentRun(m).cursor}`:'lista';};
  function save(next){store=next;try{localStorage.setItem(key,JSON.stringify(store));}catch(_){storageOk=false;} }
  const badge=(text,extra='')=>`<span class="game-badge ${extra}">${e(text)}</span>`;
  function origin(c,s,m){
    const o=m.evidence;
    return o?`<p class="game-origin"><strong>Grupo relacionado na prova:</strong> ${e(o.name)} · ${o.count}/${o.total} questões desta matéria. <a href="${e(o.source)}" target="_blank" rel="noopener noreferrer">Conferir questões ${o.questions.join(', ')} ↗</a></p>`:`<p class="game-origin">Treino de fundamentos relacionados ao programa. Sem frequência própria medida para esta missão.</p>`;
  }
  function selectors(c,s){
    return `<div class="game-selectors"><label>Concurso<select data-game-contest>${CONTESTS.map(x=>`<option value="${e(x.id)}" ${x.id===c.id?'selected':''}>${e(x.name)}</option>`).join('')}</select></label><label>Matéria<select data-game-subject>${ScoringCore.subjects(c).map(x=>`<option value="${e(x.id)}" ${x.id===s.id?'selected':''}>${e(x.name)}</option>`).join('')}</select></label></div>`;
  }
  function priority(c,s){
    const d=ScoringCore.distribution(c),row=d.kind==='subjects'?d.rows.find(r=>r.id===s.id):null,groups=ActivityCore.sourceGroups(c.id,s.id);
    return `<p class="game-top-priority">${row?`<strong>${ScoringCore.number(row.share)}% dos pontos da objetiva nesta matéria.</strong> `:''}${groups.length?`Grupo mais frequente neste caderno: <strong>${e(groups[0].name)}</strong> · ${groups[0].questions.length}/${s.count} questões.`:'Trilha de fundamentos: consulte o edital do cargo.'}</p><details class="game-priority"><summary>Por que estudar estes assuntos?</summary>${row?`<p><strong>${ScoringCore.number(row.points)} pontos · ${ScoringCore.number(row.share)}% da objetiva.</strong> Importância calculada com o peso desta matéria no edital.</p>`:`<p>${d.kind==='blocks'?'O edital distribui pontos por bloco, sem fixar quantos itens de cada matéria.':'A ordem desta trilha é uma sugestão de estudo; não há peso oficial por matéria cadastrado.'}</p>`}${groups.length?`<p>Mais frequentes <strong>neste caderno</strong>, por tema principal. Empates permanecem empatados.</p><ol class="game-evidence-list">${groups.map(o=>`<li><span>${e(o.name)}</span><strong>${o.questions.length}/${s.count}</strong><small>Questões ${o.questions.join(', ')}</small></li>`).join('')}</ol><a href="${e(c.exam)}" target="_blank" rel="noopener noreferrer">Abrir prova real · ${e(c.name)} ↗</a>`:'<p>Sem caderno próprio classificado para medir a frequência deste cargo. A distribuição de outro cargo não é tratada como previsão.</p>'}<p class="game-small">As contagens descrevem a amostra. Estes exercícios são autorais, sem atribuir às bancas um gabarito que elas não publicaram para estes enunciados.</p></details>`;
  }
  function city(completed,total){
    const count=Math.min(5,completed),names=['Entender','Conectar','Aplicar','Conferir','Retomar'];
    return `<div class="game-city" aria-label="Seu percurso de estudo"><div class="game-route" aria-hidden="true"></div>${names.map((name,i)=>`<div class="game-district ${i<count?'is-powered':''}"><span aria-hidden="true">${['⌁','◇','⚡','✓','↻'][i]}</span><strong>${name}</strong></div>`).join('')}<p>${completed} de ${total} missões desta matéria concluídas. As luzes acompanham seu avanço.</p></div>`;
  }
  function dashboard(c,s){
    const missions=ActivityCore.missions(c.id,s.id),stats=ActivityCore.stats(store),done=missions.filter(m=>currentRun(m).cursor===m.questions.length).length;
    return `<header class="game-hero"><div><span class="eyebrow">atividades · central de missões</span><h1>O conhecimento entra em ação.</h1><p>Investigue pistas, monte circuitos e resolva problemas. Cada missão permite tentar, entender o erro e continuar no seu ritmo.</p></div><div class="game-xp"><strong>${stats.xp} XP</strong><span>${stats.completed} missões distintas concluídas</span><small>XP é progresso no jogo.</small></div></header>${selectors(c,s)}${priority(c,s)}${city(done,missions.length)}<div class="game-section-title"><div><span class="eyebrow">${e(s.name)}</span><h2>Escolha sua missão</h2><p>Quando há grupo relacionado na prova, ele orienta a ordem. Os demais desafios complementam os fundamentos.</p></div></div><div class="game-missions">${missions.map((m,i)=>{
      const r=currentRun(m),finished=r.cursor===m.questions.length;return `<article class="game-mission ${finished?'is-complete':''}"><div class="game-card-head">${badge(ActivityCore.types[m.type])}<span class="game-mission-number">${String(i+1).padStart(2,'0')}</span></div><h3>${e(m.title)}</h3><p>${e(m.story)}</p>${origin(c,s,m)}<p class="game-small">${m.questions.length} rodadas · ${m.kind==='foundation'?'Fundamentos da história':'Desafios autorais de aplicação'}</p><div class="game-card-progress"><progress value="${r.cursor}" max="${m.questions.length}" aria-label="Rodadas concluídas: ${e(m.title)}"></progress><span>${r.cursor}/${m.questions.length}</span></div><button class="button button-primary" type="button" data-game-start="${e(m.id)}">${finished?'Ver resultado':r.cursor||r.answers.some(a=>a.values.length)?'Continuar missão':'Jogar missão'} <span aria-hidden="true">→</span></button></article>`;
    }).join('')||'<div class="review-empty"><h2>Esta matéria precisa de atividades próprias.</h2><p>O nome cadastrado ainda não possui uma associação segura com os fundamentos disponíveis. Use as fontes do seu edital para estudar.</p></div>'}</div><p class="game-small">O treino atual cobre fundamentos e aplicações selecionadas. Confira o programa completo do cargo para aprofundar os demais tópicos. Posições e revisões anteriores continuam disponíveis.</p>`;
  }
  const rows=kind=>LabCore.joinRows(kind).map(r=>`<tr><td>${e(r.client??'NULL')}</td><td>${e(r.order??'NULL')}</td></tr>`).join('');
  const sqlTable=kind=>`<table><caption>Resultado de ${e(kind)} JOIN</caption><thead><tr><th>Cliente</th><th>Pedido</th></tr></thead><tbody>${rows(kind)}</tbody></table>`;
  function orderPieces(q){return `<ol class="game-order">${draft.map((index,i)=>`<li data-order-piece="${index}"><span class="game-order-index">${i+1}</span><strong>${e(q.pieces[index])}</strong><span class="game-order-buttons"><button type="button" data-piece-up="${i}" ${i===0?'disabled':''} aria-label="Subir: ${e(q.pieces[index])}">↑</button><button type="button" data-piece-down="${i}" ${i===draft.length-1?'disabled':''} aria-label="Descer: ${e(q.pieces[index])}">↓</button></span></li>`).join('')}</ol>`;}
  function controls(q,a){
    const last=a.values.at(-1);
    if(q.type==='number')return `<div class="game-calculation"><div class="game-equation" aria-label="Situação do cálculo">${e(q.visual)}</div><label>Sua resposta${q.unit?' · '+e(q.unit):''}<span class="game-number-control"><button type="button" data-number-delta="-1" aria-label="Diminuir resposta">−</button><input id="game-number" name="number" type="number" step="any" required inputmode="decimal" value="${typeof last==='number'?last:''}" aria-describedby="game-question"><button type="button" data-number-delta="1" aria-label="Aumentar resposta">+</button></span></label></div>`;
    if(q.type==='logic')return `<table class="game-truth"><caption>Marque a saída como verdadeira; desmarcada significa falsa.</caption><thead><tr><th>P</th><th>Q</th><th>Saída</th></tr></thead><tbody>${[[true,true],[true,false],[false,true],[false,false]].map(([p,r],i)=>`<tr><td>${p?'V':'F'}</td><td>${r?'V':'F'}</td><td><label><input name="truth-${i}" type="checkbox" ${last?.[i]?'checked':''} aria-label="Saída para P ${p?'verdadeiro':'falso'} e Q ${r?'verdadeiro':'falso'}"><span>${last?.[i]?'Verdadeiro':'Falso'}</span></label></td></tr>`).join('')}</tbody></table>`;
    if(q.type==='sql')return `<div class="game-sql"><div class="game-sql-data"><p><strong>Esquerda · Clientes</strong><br>Ana (1), Bia (2), Caio (3)</p><p><strong>Direita · Pedidos</strong><br>101 → Ana; 102 → Ana; 103 → Bia; 104 → sem cliente</p></div><label>Complete a consulta<select name="join" required><option value="">Escolha uma junção…</option>${['INNER','LEFT','RIGHT','FULL'].map(k=>`<option ${last===k?'selected':''}>${k}</option>`).join('')}</select></label><pre>SELECT cliente, pedido
FROM clientes
<span id="game-join-name">${e(last||'_____')}</span> JOIN pedidos ON clientes.id = pedidos.cliente_id;</pre><div id="game-sql-preview">${last?sqlTable(last):'<p>Escolha uma junção para inspecionar as linhas.</p>'}</div></div>`;
    if(q.type==='order'){draft=last?[...last]:q.pieces.map((_,i)=>(i+1)%q.pieces.length);return `<p class="game-small">Mova as peças para cima ou para baixo. A posição 1 acontece primeiro.</p><div id="game-order-pieces">${orderPieces(q)}</div>`;}
    return `${q.passage?`<blockquote class="game-clue"><span>${q.type==='connect'?'Pista do painel':'Leia a mensagem'}</span><p>${e(q.passage)}</p></blockquote>`:''}<fieldset class="game-choices"><legend class="sr-only">Escolha uma resposta</legend>${q.options.map((text,i)=>`<label class="game-choice"><input type="radio" name="choice" required value="${i}" ${last===i?'checked':''}><span class="game-choice-key" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${e(text)}</span></label>`).join('')}</fieldset>`;
  }
  function feedback(q,a){
    const solved=ActivityCore.settled(q,a),attempted=a.values.length>0,correct=attempted&&ActivityCore.grade(q,a.values.at(-1));
    if(!attempted&&!a.revealed)return '<div id="game-feedback" class="game-feedback" role="status" tabindex="-1" hidden></div>';
    return `<div id="game-feedback" class="game-feedback ${correct?'is-correct':'is-learning'}" role="status" tabindex="-1"><strong>${a.revealed?'Solução para conferir':correct?'Conexão estabelecida!':'Vamos ajustar esta ideia.'}</strong><p>${e(q.explain)}</p><small>${correct&&!a.hint&&a.values.length===1?'Acerto na primeira tentativa, sem dica.':solved?'Agora continue para uma nova aplicação.':'Você pode tentar novamente ou conferir a solução.'}</small></div>`;
  }
  function finish(c,s,m,r){
    const first=m.questions.filter((q,i)=>{const a=r.answers[i];return !a.hint&&!a.revealed&&a.values.length===1&&ActivityCore.grade(q,a.values[0]);}).length;
    return `<section class="game-finish"><span class="game-finish-symbol" aria-hidden="true">✦</span><span class="eyebrow">missão concluída</span><h2 id="game-title" tabindex="-1">${e(m.title)}</h2><p>Você percorreu as ${m.questions.length} rodadas.</p><div class="game-result-grid"><div><strong>${first}/${m.questions.length}</strong><span>Acertos na primeira tentativa, sem dica</span></div><div><strong>${store.awards[m.id]||0} XP</strong><span>Melhor recompensa desta missão</span></div></div><p>Repetir ajuda a praticar. A mesma missão não acumula XP a cada repetição; uma tentativa melhor pode aumentar a recompensa até o limite dela.</p><div class="game-actions"><button class="button button-primary" type="button" data-game-back>Escolher próxima missão →</button><button class="button" type="button" data-game-replay>Jogar novamente</button><button class="button" type="button" data-game-review>Guardar fundamento para revisar</button></div></section>`;
  }
  function player(c,s,m){
    const r=currentRun(m),q=m.questions[r.cursor],a=r.answers[r.cursor];
    return `<button type="button" class="back-link" data-game-back>← Missões de ${e(s.name)}</button><div class="game-player-top">${badge(ActivityCore.types[m.type])}<span>${e(c.name)}</span></div>${q?`<section class="game-stage"><div class="game-round"><span>Rodada ${r.cursor+1} de ${m.questions.length}</span><progress value="${r.cursor}" max="${m.questions.length}" aria-label="Rodadas concluídas"></progress><span class="game-help-used">${a.hint?'Com apoio nesta rodada':'Tente primeiro; peça ajuda quando quiser.'}</span></div><h1 id="game-title" tabindex="-1">${e(m.title)}</h1><p class="game-question" id="game-question">${e(q.prompt)}</p><form id="game-answer-form">${controls(q,a)}<div class="game-actions"><button class="button button-primary" type="submit" ${ActivityCore.settled(q,a)?'disabled':''}>Conferir resposta</button><button type="button" class="button" data-game-hint aria-expanded="${a.hint}" aria-controls="game-hint">Pedir dica</button>${q.ref.kind?ProfessorUI.button(q.ref.kind,q.ref.id,'',q.ref.part):ProfessorUI.button('historia',q.ref.journey,q.ref.index)}</div></form><p class="game-professor-note">Professor retoma o fundamento desta atividade com a voz Thalita. Consultar a explicação conta como apoio.</p><div id="game-hint" class="game-hint" ${a.hint?'':'hidden'}>${e(q.hint)}</div><p id="game-validation" role="alert"></p>${feedback(q,a)}<div class="game-actions">${ActivityCore.settled(q,a)?`<button class="button button-primary" type="button" data-game-next>${r.cursor===m.questions.length-1?'Concluir missão':'Próxima rodada'} →</button>`:a.values.length?'<button class="button" type="button" data-game-reveal>Conferir solução e continuar</button>':''}</div></section>`:finish(c,s,m,r)}${origin(c,s,m)}<p class="game-small">${m.kind==='foundation'?'Treino de conceitos da história relacionada.':'Exercício autoral de aplicação.'} XP não corresponde a pontos da prova nem a uma estimativa de aprovação.</p>`;
  }
  function render(cid,sid){
    if(!host)return {contest:cid,subject:sid};
    const c=CONTESTS.find(c=>c.id===cid)||CONTESTS.find(c=>c.id==='natal-suporte-2023')||CONTESTS[0];
    const s=c.subjects.find(s=>s.id===sid)||ScoringCore.subjects(c)[0];
    if(ctx.contest!==c.id||ctx.subject!==s.id)active=null;
    ctx={contest:c.id,subject:s.id};
    const m=current();if(active&&!m)active=null;
    host.innerHTML=(storageOk?'':'<p class="game-storage" role="status">O navegador não permitiu salvar. O progresso fica disponível nesta sessão.</p>')+(m?player(c,s,m):dashboard(c,s));
    ProfessorUI.refresh();return ctx;
  }
  const edit=(action,value)=>{if(current())save(ActivityCore.edit(store,ctx.contest,ctx.subject,active,action,value));};
  function redraw(focus){ProfessorUI.close(false);render(ctx.contest,ctx.subject);if(focus)$(focus)?.focus({preventScroll:true});}
  function hint(){edit('hint');const m=current(),a=currentRun(m).answers[currentRun(m).cursor];if($('#game-hint'))$('#game-hint').hidden=false;if($('.game-help-used'))$('.game-help-used').textContent=a.hint?'Com apoio nesta rodada':'Explicação consultada após a resposta.';$('[data-game-hint]')?.setAttribute('aria-expanded','true');return a;}
  function mount(config){
    if(options)return;options=config;host=document.querySelector('#view-atividades');
    try{store=ActivityCore.normalize(JSON.parse(localStorage.getItem(key)||'null'));}catch(_){store=ActivityCore.normalize(null);storageOk=false;}
    host.addEventListener('change',event=>{
      const el=event.target;
      if(el.matches('[data-game-contest]')){options.navigate(el.value,null);$('[data-game-contest]')?.focus();}
      if(el.matches('[data-game-subject]')){options.navigate(ctx.contest,el.value);$('[data-game-subject]')?.focus();}
      if(el.name==='join'){$('#game-join-name').textContent=el.value||'_____';$('#game-sql-preview').innerHTML=el.value?sqlTable(el.value):'<p>Escolha uma junção.</p>';}
      if(el.name?.startsWith('truth-'))el.nextElementSibling.textContent=el.checked?'Verdadeiro':'Falso';
    });
    host.addEventListener('click',event=>{
      const b=event.target.closest('button');if(!b||b.disabled)return;
      if(b.dataset.gameStart){active=b.dataset.gameStart;redraw('#game-title');$('.game-stage,.game-finish')?.scrollIntoView({block:'start',behavior:'auto'});return;}
      if(b.hasAttribute('data-game-back')){active=null;redraw();return;}
      if(b.hasAttribute('data-game-replay')){edit('reset');redraw('#game-title');return;}
      if(b.hasAttribute('data-game-review')){const m=current();if(options.review({type:'historia',id:m.journey}))options.notify('Fundamento guardado na Revisão.');return;}
      if(!current())return;
      if(b.hasAttribute('data-game-hint')){hint();$('#game-hint')?.focus();return;}
      if(b.hasAttribute('data-professor')&&b.closest('.game-stage')){hint();return;}
      if(b.hasAttribute('data-game-reveal')){edit('reveal');redraw('#game-feedback');return;}
      if(b.hasAttribute('data-game-next')){edit('next');redraw('#game-title');return;}
      if(b.dataset.numberDelta){const input=$('#game-number');input.value=String((Number.isFinite(input.valueAsNumber)?input.valueAsNumber:0)+Number(b.dataset.numberDelta));input.focus();return;}
      if(b.dataset.pieceUp!==undefined||b.dataset.pieceDown!==undefined){const from=Number(b.dataset.pieceUp??b.dataset.pieceDown),to=from+(b.dataset.pieceUp!==undefined?-1:1);[draft[from],draft[to]]=[draft[to],draft[from]];const q=current().questions[currentRun(current()).cursor];$('#game-order-pieces').innerHTML=orderPieces(q);const buttons=$(`#game-order-pieces li:nth-child(${to+1})`).querySelectorAll('button:not(:disabled)');buttons[0]?.focus();}
    });
    host.addEventListener('submit',event=>{
      if(event.target.id!=='game-answer-form')return;event.preventDefault();
      const m=current(),q=m.questions[currentRun(m).cursor],fd=new FormData(event.target);let value;
      if(q.type==='number')value=$('#game-number').valueAsNumber;
      else if(q.type==='logic')value=[0,1,2,3].map(i=>fd.has('truth-'+i));
      else if(q.type==='sql')value=fd.get('join');
      else if(q.type==='order')value=[...draft];
      else value=fd.has('choice')?Number(fd.get('choice')):null;
      if(!ActivityCore.valid(q,value)){$('#game-validation').textContent='Escolha uma resposta válida antes de conferir.';return;}
      edit('answer',value);redraw('#game-feedback');
    });
  }
  return {mount,render,contextKey};
})();
