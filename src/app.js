const LessonCore = (() => {
  const normalize = raw => {
    const positions={};
    for(const topic of JOURNEYS) positions[topic.id]=Math.max(0,Math.min(topic.steps.length-1,Number.isInteger(raw?.positions?.[topic.id])?raw.positions[topic.id]:0));
    return {topic:JOURNEYS.some(topic=>topic.id===raw?.topic)?raw.topic:'sql',positions,motion:typeof raw?.motion==='boolean'?raw.motion:true};
  };
  const move = (topic,index,delta) => Math.max(0,Math.min(topic.steps.length-1,index+delta));
  return {normalize,move};
})();

if(typeof document!=='undefined') (()=>{
  'use strict';
  const $=selector=>document.querySelector(selector),$$=selector=>[...document.querySelectorAll(selector)];
  const key='memoria-viva-historias-v2';
  const systemMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let storage=true,raw=null;
  try{raw=JSON.parse(localStorage.getItem(key)||'null');}catch(_){storage=false;$('#storage-note').hidden=false;}
  const state={...LessonCore.normalize(raw),view:'historia',focus:'row'};
  if(systemMotion.matches)state.motion=false;
  let toastTimer;
  const customKey='memoria-viva-concursos-proprios-v1';
  const makeCustom=CustomContestCore.make;
  let customRaw=[];try{const read=JSON.parse(localStorage.getItem(customKey)||'[]');if(Array.isArray(read))customRaw=read.filter((x,i,a)=>makeCustom(x)&&a.findIndex(y=>y?.id===x.id)===i).slice(0,100);}catch(_){}
  for(const data of customRaw){const item=makeCustom(data);if(item)CONTESTS.push(item);}
  let selection={};try{selection=JSON.parse(sessionStorage.getItem('memoria-viva-selecao')||'{}');}catch(_){}
  if(!selection||typeof selection!=='object')selection={};
  const catalogState={filter:'Todos',query:'',contest:typeof selection.contest==='string'?selection.contest:null,subject:typeof selection.subject==='string'?selection.subject:null};
  const reviewKey='memoria-viva-revisoes-v1';
  let reviewItems=[];try{reviewItems=ReviewCore.normalize(JSON.parse(localStorage.getItem(reviewKey)||'[]'));}catch(_){}
  const localDate=()=>{const d=new Date(),pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;};
  function saveReview(items){reviewItems=items;try{localStorage.setItem(reviewKey,JSON.stringify(items));return true;}catch(_){notify('Não foi possível salvar a revisão neste navegador; ela fica disponível somente nesta sessão.');return false;}}
  function renderReview(){ $('#view-revisao').innerHTML=ReviewUI.render(reviewItems,localDate());ProfessorUI.refresh(); }
  function saveSelection(){try{sessionStorage.setItem('memoria-viva-selecao',JSON.stringify({contest:catalogState.contest,subject:catalogState.subject,infographic:activeInfographic,infoArea:activeInfoArea}));}catch(_){}}
  const currentContest=()=>CONTESTS.find(c=>c.id===catalogState.contest);
  const currentSubject=()=>currentContest()?.subjects.find(s=>s.id===catalogState.subject);
  const topic=()=>JOURNEYS.find(item=>item.id===state.topic);
  const index=()=>state.positions[state.topic];
  const step=()=>topic().steps[index()];
  const icons={
    replay:'<path d="M20 7V2m0 5h-5M20 7a9 9 0 1 0 1 9"/>',
    pause:'<path d="M8 4v16M16 4v16" stroke-width="3"/>',
    play:'<path d="m7 3 14 9-14 9Z"/>',
    expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    sound:'<path d="m12 3-6 5H2v8h4l6 5V3Zm4 4q6 5 0 10m3-13q10 8 0 16"/>',
    stop:'<rect x="5" y="5" width="14" height="14" rx="2"/>',
    left:'<path d="M20 12H4m6-6-6 6 6 6"/>',
    right:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    download:'<path d="M12 2v14m-5-5 5 5 5-5M3 17v5h18v-5"/>',
    close:'<path d="m5 5 14 14M5 19 19 5"/>'
  };
  const ui=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.right}</svg>`;
  function hydrate(){ $$('[data-ui]').forEach(node=>{node.innerHTML=ui(node.dataset.ui);}); }
  function notify(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),4300);}
  function save(){if(storage){try{localStorage.setItem(key,JSON.stringify({topic:state.topic,positions:state.positions,motion:state.motion}));}catch(_){storage=false;$('#storage-note').hidden=false;}}}
  let journeyArea='Todas',journeyQuery='';
  function renderRail(){
    const rail=$('#topic-rail'),previousScroll=rail.scrollTop;
    const visible=SearchCore.journeys(journeyArea,journeyQuery);
    $('#journey-areas').innerHTML=SearchCore.areas.map(a=>`<button type="button" data-journey-area="${Art.e(a)}" aria-pressed="${a===journeyArea}">${Art.e(a)}</button>`).join('');
    $('#journey-count').textContent=`${visible.length} histórias encontradas`;
    $('#topic-rail').innerHTML=visible.map(item=>`<button type="button" data-topic="${item.id}" class="topic-pill" style="--pill-bg:${item.light}" aria-pressed="${item.id===state.topic}"><span class="topic-symbol">${Art.symbol(item.symbol,36)}</span><span><strong>${Art.e(item.name)}</strong><small>${item.steps.length} cenas · ${Art.e(SearchCore.area(item))}</small></span></button>`).join('')||'<p class="empty-results">Nenhuma história encontrada. Tente outro termo ou área.</p>';
    rail.scrollTop=previousScroll;
  }
  function revealCurrentTopic(){
    const rail=$('#topic-rail'),selected=rail.querySelector('[aria-pressed="true"]');
    if(!selected||$('.library').hidden)return;
    const box=rail.getBoundingClientRect(),item=selected.getBoundingClientRect();
    if(item.top<box.top)rail.scrollTop+=item.top-box.top-8;
    else if(item.bottom>box.bottom)rail.scrollTop+=item.bottom-box.bottom+8;
  }
  function renderArt(){
    $('#scene-art').innerHTML=Art.scene(topic(),index(),state.focus);
    if($('#art-dialog').open)$('#enlarged-art').innerHTML=Art.scene(topic(),index(),state.focus);
  }
  function applyMotion(){
    // A preferência pode mudar antes de o evento do MediaQueryList ser entregue.
    if(systemMotion.matches)state.motion=false;
    document.body.classList.toggle('motion-off',!state.motion);
    $('#motion').setAttribute('aria-pressed',String(!state.motion));
    $('#motion').setAttribute('aria-label',systemMotion.matches?'Movimento reduzido pela preferência do sistema':state.motion?'Pausar animações':'Ativar animações');
    $('#motion').title=$('#motion').getAttribute('aria-label');
    $('#motion').innerHTML=ui(state.motion?'pause':'play');
    $('#motion').disabled=systemMotion.matches;
    $('#replay').disabled=!state.motion;
    $('#replay').title=state.motion?'Repetir a animação desta cena':'Ative o movimento para repetir a animação';
  }
  function sceneActions(){
    let actions=[];
    if(step().expanded){$('#scene-actions').innerHTML='';return;}
    if(state.topic==='sql'&&index()===1)actions=[['row','Destacar uma linha'],['column','Destacar uma coluna']];
    if(state.topic==='sql'&&[4,5].includes(index()))actions=[['row','Ver o resultado'],['ana','Destacar Ana']];
    if(state.topic==='sql'&&index()===5)actions.push(['caio','Destacar Caio']);
    actions.push(...GeneralScenes.actions(state.topic,index()));
    if(actions.length&&!actions.some(([value])=>value===state.focus)){state.focus=actions[0][0];renderArt();}
    $('#scene-actions').innerHTML=actions.map(([value,label])=>`<button type="button" data-focus="${value}" aria-pressed="${state.focus===value}">${label}</button>`).join('');
  }
  function renderLesson(){
    const current=topic(),item=step();
    document.documentElement.style.setProperty('--topic',current.color);
    document.documentElement.style.setProperty('--topic-light',current.light);
    $('#journey-title').textContent=current.hero;
    $('#journey-description').textContent=current.description;
    $('#course-position').textContent=`História ${JOURNEYS.indexOf(current)+1} de ${JOURNEYS.length}`;
    $('#scene-caption').textContent=`CENA ${String(index()+1).padStart(2,'0')} · ${item.map}`;
    $('#chapter-label').textContent=`${current.label} · ${index()+1} / ${current.steps.length}`;
    $('#scene-title').textContent=item.title;
    $('#scene-speech').textContent=item.speech;
    $('#scene-explain').textContent=item.explain;
    $('#scene-observe').textContent=item.observe;
    $('#scene-observe-title').textContent=item.recall?'Pense antes de conferir':item.expanded?'Veja a situação':'Olhe o que acontece';
    $('#term-title').textContent=item.term;
    $('#term-meaning').textContent=item.meaning;
    $('#scene-remember').textContent=item.remember;
    $('#view-historia .new-word').hidden=!!item.recall;
    $('#view-historia .remember').hidden=!!item.recall;
    $('#scene-recall').hidden=!item.recall;$('#scene-recall').open=false;
    $('#scene-recall-answer').textContent=item.recall?.answer||'';
    const sourceUrl=ContestCore.validSource(item.source?.[1]);
    $('#scene-source').hidden=!sourceUrl;
    if(sourceUrl){const link=$('#scene-source a');link.href=sourceUrl;link.textContent=`${item.source[0]} ↗`;}
    const examUrl=ContestCore.validSource(item.exam?.[1]);
    $('#scene-exam').hidden=!examUrl;
    if(examUrl){const link=$('#scene-exam a');link.href=examUrl;link.textContent=`${item.exam[0]} ↗`;}
    $('#code-example').hidden=!item.code;
    $('#scene-code').textContent=item.code||'';
    $('#step-label').textContent=`Cena ${index()+1} de ${current.steps.length} · avance quando quiser`;
    $('#previous').disabled=index()===0;
    $('#next').innerHTML=(index()===current.steps.length-1?'Ver o mapa ilustrado':'Continuar')+ui('right');
    $('#step-dots').innerHTML=StoryExpansion.sections(current).map((section,i)=>`<button type="button" class="step-dot" data-step="${section.start}" aria-label="${Art.e(section.title)}: cenas ${section.start+1} a ${section.end}" ${index()>=section.start&&index()<section.end?'aria-current="step"':''}></button>`).join('');
    $('#scene-jump').innerHTML=current.steps.map((s,i)=>`<option value="${i}" ${i===index()?'selected':''}>${i+1}. ${Art.e(s.title)}</option>`).join('');
    $('#story-end').hidden=index()!==current.steps.length-1;
    renderArt();sceneActions();applyMotion();renderRail();ProfessorUI.refresh();
  }
  function renderMap(){ $('#map-art').innerHTML=Art.mindMap(topic()); }
  function renderSources(){
    $('#learning-sources').innerHTML=LEARNING_SOURCES.map(source=>`<article><a href="${Art.e(source.url)}" target="_blank" rel="noopener noreferrer">${Art.e(source.title)} ↗</a><p>${Art.e(source.text)}</p></article>`).join('');
    $('#concept-sources').innerHTML=CONCEPT_SOURCES.map(source=>`<a href="${Art.e(source.url)}" target="_blank" rel="noopener noreferrer">${Art.e(source.title)} ↗</a>`).join('');
    $('#scope-text').textContent=`São ${JOURNEYS.length} histórias introdutórias, ${JOURNEYS.reduce((n,item)=>n+item.steps.length,0)} cenas ilustradas e um mapa por história. A posição em cada história pode ser guardada neste navegador. Ela indica apenas onde você parou, sem medir aprendizagem.`;
  }
  function stopListening(){ProfessorUI.stop();}
  let activeInfographic=INFOGRAPHICS.some(m=>m.id===selection.infographic)?selection.infographic:'leitura-texto';
  let activeInfoArea=selection.infoArea||INFOGRAPHICS.find(m=>m.id===activeInfographic).area,infoQuery='';
  if(activeInfoArea!=='Todas'&&!INFOGRAPHICS.some(m=>m.area===activeInfoArea))activeInfoArea='Todas';
  const views=RouteCore.views;
  function currentHash(){return RouteCore.hash(state.view,['historia','mapa'].includes(state.view)?state.topic:state.view==='infograficos'?activeInfographic:['concurso','materia','atividades'].includes(state.view)?catalogState.contest:null,catalogState.subject);}
  function writeHash(replace=false){const hash=currentHash();if(location.hash!==hash)history[replace?'replaceState':'pushState'](null,'',hash);}
  function renderInfographics(updateRoute=false){const visible=SearchCore.maps(activeInfoArea,infoQuery);if(visible.length&&!visible.some(m=>m.id===activeInfographic))activeInfographic=visible[0].id;$('#view-infograficos').innerHTML=InfographicUI.render(activeInfographic,activeInfoArea,infoQuery);saveSelection();if(updateRoute)writeHash(true);ProfessorUI.refresh();}
  function readRoute(){
    if(location.hash==='#main')return;
    const r=RouteCore.parse(location.hash);
    if(['historia','mapa'].includes(r.view)&&r.id){state.topic=r.id;state.focus='row';if(!SearchCore.journeys(journeyArea,journeyQuery).some(t=>t.id===r.id)){journeyArea='Todas';journeyQuery='';$('#journey-search').value='';}save();renderLesson();}
    if(r.view==='infograficos'&&r.id){const area=INFOGRAPHICS.find(m=>m.id===r.id).area;const keepArea=activeInfographic===r.id&&(activeInfoArea==='Todas'||activeInfoArea===area);activeInfographic=r.id;if(!keepArea)activeInfoArea=area;infoQuery='';}
    if(['concurso','materia','atividades'].includes(r.view)&&r.id){catalogState.contest=r.id;catalogState.subject=r.subject||null;}
    saveSelection();setView(r.view,false);writeHash(true);revealCurrentTopic();
  }
  function updateCalculator(){
    const total=Number($('#calc-total').value),select=$('#calc-eliminated');
    const prior=Math.min(Number(select.value)||0,total-1);
    select.innerHTML=Array.from({length:total},(_,i)=>`<option value="${i}" ${i===prior?'selected':''}>${i}</option>`).join('');
    const removed=Number(select.value),rule=$('#calc-rule').value;
    const correct=rule==='cgu3'?2:1,wrong=rule==='penalty'?-1:rule==='cgu3'?-2:0;
    const result=ContestCore.guess(total,removed,correct,wrong),pct=x=>`${(x*100).toLocaleString('pt-BR',{maximumFractionDigits:1})}%`;
    let explanation=`Restam <strong>${result.remaining} ${result.remaining===1?'alternativa':'alternativas'}</strong>. Sob as hipóteses acima, a chance seria <strong>${pct(result.probability)}</strong>.`;
    if(rule==='unknown') explanation+=' A pontuação não foi calculada porque a regra ainda não foi informada.';
    else explanation+=` Pontuação média hipotética por marcação: <strong>${result.expected.toLocaleString('pt-BR',{maximumFractionDigits:2})}</strong> ponto(s); em branco: 0. ${wrong<0?'Para ter expectativa acima de zero, a chance precisa superar 50%.':'A regra escolhida não desconta pontos por erro.'}`;
    $('#calc-result').innerHTML=explanation;
  }
  function setView(view,updateHash=true){
    if(!views.includes(view))view='historia';
    if(view==='concurso'&&!currentContest())view='concursos';
    if(view==='materia'&&!currentSubject())view=currentContest()?'concurso':'concursos';
    const changed=state.view!==view;
    state.view=view;
    for(const id of views)$(`#view-${id}`).hidden=view!==id;
    const learning=['historia','mapa'].includes(view);
    $('.intro').hidden=!learning;$('.library').hidden=!learning;$('.view-tabs').hidden=!learning;
    const active=['concurso','materia'].includes(view)?'concursos':view==='mapa'?'historia':view;
    $$('[data-view]').forEach(link=>{link.classList.toggle('active',link.dataset.view===active);if(link.dataset.view===active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    $$('[data-tab]').forEach(button=>{button.setAttribute('aria-selected',String(button.dataset.tab===view));button.tabIndex=button.dataset.tab===view?0:-1;});
    if(view==='concursos')$('#view-concursos').innerHTML=Catalog.catalog(catalogState.filter,catalogState.query);
    if(view==='concurso')$('#view-concurso').innerHTML=Catalog.contest(currentContest());
    if(view==='materia')$('#view-materia').innerHTML=Catalog.subject(currentContest(),currentSubject());
    if(view==='atividades'){const selected=ActivityUI.render(catalogState.contest,catalogState.subject);catalogState.contest=selected.contest;catalogState.subject=selected.subject;saveSelection();}
    if(view==='estrategia'){$('#view-estrategia').innerHTML=Catalog.strategy();updateCalculator();}
    if(view==='infograficos')renderInfographics();
    if(view==='revisao')renderReview();
    if(view==='mapa')renderMap();
    if(view==='fontes')renderSources();
    if(view!=='historia')stopListening();
    if(updateHash)writeHash();
    ProfessorUI.refresh();
    if(changed)window.scrollTo({top:learning?Math.max(0,$('.view-tabs').getBoundingClientRect().top+window.scrollY-20):0,behavior:systemMotion.matches?'auto':'smooth'});
  }
  function goStep(position,scroll=true){
    stopListening();
    state.positions[state.topic]=Math.max(0,Math.min(topic().steps.length-1,position));
    state.focus='row';save();renderLesson();
    if(scroll){$('.story-board').scrollIntoView({behavior:systemMotion.matches?'auto':'smooth',block:'start'});$('#scene-title').focus({preventScroll:true});}
  }
  function changeTopic(id,resetFilters=true){
    if(!JOURNEYS.some(item=>item.id===id))return;
    if(resetFilters){journeyArea='Todas';journeyQuery='';$('#journey-search').value='';}
    stopListening();state.topic=id;state.focus='row';save();renderLesson();setView('historia');revealCurrentTopic();
    if(window.innerWidth>600)window.scrollTo({top:0,behavior:systemMotion.matches?'auto':'smooth'});
  }
  function downloadMap(){
    const svg=Art.mindMap(topic(),false);
    const url=URL.createObjectURL(new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n'+svg],{type:'image/svg+xml;charset=utf-8'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download=`mapa-ilustrado-${state.topic}.svg`;document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
    notify('O desenho foi preparado como SVG, para ampliar sem perder nitidez.');
  }
  document.addEventListener('click',event=>{
    const mapNode=event.target.closest('[data-map-step]');
    if(mapNode){setView('historia');goStep(Number(mapNode.dataset.mapStep));return;}
    const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.reviewMap||button.hasAttribute('data-review-story')){
      const type=button.dataset.reviewMap?'mapa':'historia',id=button.dataset.reviewMap||state.topic;
      const already=reviewItems.some(x=>x.type===type&&x.id===id);
      if(saveReview(ReviewCore.add(reviewItems,type,id,localDate())))notify(already?'Este conteúdo já está na sua lista de revisão.':'Conteúdo guardado. Acesse Revisão para escolher uma data.');
      return;
    }
    if(button.dataset.reviewDays){const [type,id]=button.closest('.review-card').dataset.reviewItem.split(':');if(saveReview(ReviewCore.schedule(reviewItems,type,id,ReviewCore.plusDays(localDate(),Number(button.dataset.reviewDays)))))notify('Data de retomada salva.');renderReview();return;}
    if(button.dataset.reviewSchedule||button.dataset.reviewDone||button.dataset.reviewRemove){
      const code=button.dataset.reviewSchedule||button.dataset.reviewDone||button.dataset.reviewRemove,[type,id]=code.split(':');
      if(!ReviewCore.ref(type,id))return;
      if(button.dataset.reviewSchedule){const value=button.closest('.review-card').querySelector('input[type=date]').value||null;if(value&&!ReviewCore.dateOk(value)){notify('Escolha uma data válida.');return;}if(saveReview(ReviewCore.schedule(reviewItems,type,id,value)))notify(value?'Data de retomada salva.':'Data removida; o conteúdo continua na lista.');}
      else if(button.dataset.reviewDone){if(saveReview(ReviewCore.done(reviewItems,type,id,localDate())))notify('Revisão registrada. Escolha outra data quando quiser.');}
      else if(saveReview(ReviewCore.remove(reviewItems,type,id)))notify('Conteúdo retirado da lista de revisão.');
      renderReview();return;
    }
    if(button.dataset.journeyArea){journeyArea=button.dataset.journeyArea;renderRail();return;}
    if(button.dataset.infoArea){activeInfoArea=button.dataset.infoArea;renderInfographics(true);return;}
    if(button.dataset.info){activeInfographic=button.dataset.info;renderInfographics();writeHash();return;}
    if(button.dataset.infographic){activeInfographic=button.dataset.infographic;activeInfoArea=INFOGRAPHICS.find(m=>m.id===activeInfographic)?.area||'Todas';infoQuery='';return setView('infograficos');}
    if(button.hasAttribute('data-toggle-recall')){
      const enabled=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'Mostrar todas as pistas':'Tentar lembrar sem consultar';
      $('#recall-help').hidden=!enabled;
      $$('.inf-group').forEach(group=>{group.classList.remove('revealed');group.querySelector('.recall-content').hidden=enabled;const reveal=group.querySelector('[data-reveal]');reveal.hidden=!enabled;reveal.setAttribute('aria-expanded',String(!enabled));reveal.textContent='Revelar pistas';});return;
    }
    if(button.dataset.reveal!==undefined){const group=button.closest('.inf-group'),content=group.querySelector('.recall-content'),show=content.hidden;content.hidden=!show;group.classList.toggle('revealed',show);button.setAttribute('aria-expanded',String(show));button.textContent=show?'Ocultar pistas':'Revelar pistas';return;}
    if(button.dataset.join){$('#join-lab').innerHTML=LabUI.join(button.dataset.join);$(`[data-join="${button.dataset.join}"]`).focus();return;}
    if(button.dataset.truth){let p=$('[data-truth=p]').getAttribute('aria-pressed')==='true',q=$('[data-truth=q]').getAttribute('aria-pressed')==='true';if(button.dataset.truth==='p')p=!p;else q=!q;$('#truth-lab').innerHTML=LabUI.truth(p,q);$(`[data-truth="${button.dataset.truth}"]`).focus();return;}
    if(button.hasAttribute('data-print-infographic')){window.print();return;}
    if(button.dataset.filter){catalogState.filter=button.dataset.filter;$('#view-concursos').innerHTML=Catalog.catalog(catalogState.filter,catalogState.query);ProfessorUI.refresh();return;}
    if(button.dataset.deleteContest){
      const id=button.dataset.deleteContest,item=CONTESTS.find(c=>c.id===id&&c.manual);if(!item)return;
      const next=customRaw.filter(c=>c.id!==id);try{localStorage.setItem(customKey,JSON.stringify(next));}catch(_){notify('Não foi possível remover o concurso salvo. Tente novamente.');return;}
      customRaw=next;CONTESTS.splice(CONTESTS.indexOf(item),1);catalogState.contest=null;catalogState.subject=null;saveSelection();setView('concursos');notify('Concurso personalizado removido.');return;
    }
    if(button.dataset.activitiesContest){catalogState.contest=button.dataset.activitiesContest;catalogState.subject=button.dataset.activitiesSubject||null;saveSelection();return setView('atividades');}
    if(button.dataset.contest){catalogState.contest=button.dataset.contest;catalogState.subject=null;saveSelection();return setView('concurso');}
    if(button.dataset.subject){catalogState.subject=button.dataset.subject;saveSelection();return setView('materia');}
    if(button.dataset.journey)return changeTopic(button.dataset.journey);
    if(button.dataset.go)return setView(button.dataset.go);
    if(button.dataset.topic)return changeTopic(button.dataset.topic,false);
    if(button.dataset.tab)return setView(button.dataset.tab);
    if(button.dataset.step!==undefined)return goStep(Number(button.dataset.step));
    if(button.dataset.focus){state.focus=button.dataset.focus;renderArt();sceneActions();return;}
    if(button.hasAttribute('data-open-map'))return setView('mapa');
  });
  document.addEventListener('submit',event=>{
    if(event.target.id!=='add-contest-form')return;event.preventDefault();
    const form=event.target,fd=new FormData(form),message=form.querySelector('#add-contest-message');
    const data={id:'manual-'+Date.now().toString(36),name:String(fd.get('name')||''),place:String(fd.get('place')||''),source:String(fd.get('source')||''),subjects:String(fd.get('subjects')||'').split(/\r?\n/)};
    const item=makeCustom(data);if(!item){message.textContent='Preencha o nome, o local, um link http ou https válido e pelo menos uma matéria.';return;}
    if(customRaw.length>=100){message.textContent='Sua lista atingiu 100 concursos. Remova um antes de adicionar outro.';return;}
    try{localStorage.setItem(customKey,JSON.stringify([...customRaw,data]));}catch(_){message.textContent='Não foi possível guardar o concurso neste navegador.';return;}
    customRaw.push(data);CONTESTS.push(item);catalogState.contest=item.id;catalogState.subject=null;saveSelection();setView('concurso');notify('Concurso guardado neste navegador.');
  });
  document.addEventListener('input',event=>{
    const node=event.target;
    if(node.id==='journey-search'){journeyQuery=node.value;renderRail();return;}
    if(node.matches('[data-sheet-cell]')){$('#sheet-result').innerHTML=LabUI.sheetResult($$('[data-sheet-cell]').map(n=>n.value.trim()===''?NaN:n.valueAsNumber));return;}
    if(!['contest-search','infographic-search'].includes(node.id))return;
    const id=node.id,start=node.selectionStart,end=node.selectionEnd;
    if(id==='contest-search'){catalogState.query=node.value;$('#view-concursos').innerHTML=Catalog.catalog(catalogState.filter,catalogState.query);ProfessorUI.refresh();}else{infoQuery=node.value;renderInfographics(true);}
    const input=$('#'+id);input.focus({preventScroll:true});input.setSelectionRange(start,end);
  });
  document.addEventListener('change',event=>{if(event.target.matches('#calc-total,#calc-eliminated,#calc-rule'))updateCalculator();if(event.target.id==='scene-jump')goStep(Number(event.target.value));});
  $('#map-art').addEventListener('keydown',event=>{
    const node=event.target.closest('[data-map-step]');
    if(node&&['Enter',' '].includes(event.key)){event.preventDefault();setView('historia');goStep(Number(node.dataset.mapStep));}
  });
  $('.view-tabs').addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const view=event.key==='Home'||event.key==='ArrowLeft'?'historia':'mapa';setView(view);$(`#tab-${view}`).focus();
  });
  $('#previous').addEventListener('click',()=>goStep(LessonCore.move(topic(),index(),-1)));
  $('#next').addEventListener('click',()=>{if(index()===topic().steps.length-1)setView('mapa');else goStep(LessonCore.move(topic(),index(),1));});
  $('#replay').addEventListener('click',()=>{renderArt();notify('A animação começou de novo.');});
  $('#motion').addEventListener('click',()=>{if(systemMotion.matches)return;state.motion=!state.motion;applyMotion();save();if(state.motion)renderArt();notify(state.motion?'Movimento ativado.':'Figuras paradas. A explicação continua completa.');});
  systemMotion.addEventListener('change',()=>{if(systemMotion.matches)state.motion=false;applyMotion();});
  $('#download-map').addEventListener('click',downloadMap);
  $('#enlarge').addEventListener('click',()=>{$('#enlarged-art').innerHTML=Art.scene(topic(),index(),state.focus);$('#art-dialog').showModal();});
  $('#close-dialog').addEventListener('click',()=>$('#art-dialog').close());
  $('#art-dialog').addEventListener('close',()=>$('#enlarge').focus());
  window.addEventListener('hashchange',readRoute);
  window.addEventListener('pagehide',stopListening);
  window.addEventListener('beforeprint',()=>{document.body.classList.remove('print-infographic','print-current-view','print-map');if(state.view==='infograficos')document.body.classList.add('print-infographic');else if(['historia','mapa'].includes(state.view)){renderMap();document.body.classList.add('print-map');}else document.body.classList.add('print-current-view');});
  window.addEventListener('afterprint',()=>document.body.classList.remove('print-infographic','print-current-view','print-map'));
  $('#lia-avatar').innerHTML=`<svg viewBox="-46 -34 92 135">${Art.lia(0,10,.88)}</svg>`;
  ActivityUI.mount({navigate:(contest,subject)=>{catalogState.contest=contest;catalogState.subject=subject;setView('atividades');},review:ref=>saveReview(ReviewCore.add(reviewItems,ref.type,ref.id,localDate())),notify});
  hydrate();renderLesson();
  readRoute();
  ProfessorUI.mount({
    getContext:()=>({view:state.view,activity:state.view==='atividades'?ActivityUI.contextKey():'',topic:state.topic,index:index(),infographic:activeInfographic,contest:catalogState.contest,subject:catalogState.subject}),
    onReview:ref=>{const saved=saveReview(ReviewCore.add(reviewItems,ref.type,ref.id,localDate()));if(state.view==='revisao')renderReview();return saved;}
  });
})();
