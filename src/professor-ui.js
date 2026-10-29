/* Professora virtual: áudios locais, controle de ritmo e texto sempre disponível. */
const ProfessorUI = (() => {
  const e=Art.e;
  const sound='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 4-5 4H3v8h3l5 4V4Zm4 4q4 4 0 8m3-11q7 7 0 14"/></svg>';
  const button=(kind,id='',extra='',part=0)=>`<button type="button" class="professor-button" data-professor="${e(kind)}" data-professor-id="${e(id)}" data-professor-extra="${e(extra)}" data-professor-part="${part}" aria-label="Professor: ouvir explicação" aria-controls="professor-panel" aria-expanded="false">${sound}<span>Professor</span></button>`;
  let options=null,panel=null,lesson=null,track=null,position=0,playing=false,paused=false,native=false,voice=null,rate=1,serial=0,timer=null,lastContext='',returnFocus=null,utterance=null;
  let media=null,preparing=false;
  let cachedFile='',cachedURL='',loadingFile='',loadingPromise=null,loadingController=null;
  const $=selector=>panel?.querySelector(selector);
  const contextLesson=()=>{const c=options.getContext();return ProfessorCore.resolve(c.view,['historia','mapa'].includes(c.view)?c.topic:c.view==='infograficos'?c.infographic:c.contest,c.view==='historia'?c.index:c.subject);};
  const status=text=>{if($('#professor-status'))$('#professor-status').textContent=text;};
  function stop(){
    serial++;clearTimeout(timer);timer=null;playing=false;paused=false;preparing=false;
    if(media){media.pause();media.onended=null;media.onerror=null;}
    if(typeof speechSynthesis!=='undefined')speechSynthesis.cancel();
    utterance=null;
    updateControls();
  }
  function close(restore=true){
    stop();if(panel)panel.hidden=true;document.body.classList.remove('professor-open');
    document.querySelectorAll('[data-professor][aria-expanded=true]').forEach(el=>el.setAttribute('aria-expanded','false'));
    document.querySelectorAll('.professor-reading').forEach(el=>el.classList.remove('professor-reading'));
    if(restore&&returnFocus?.isConnected&&returnFocus.getClientRects().length)returnFocus.focus({preventScroll:true});
  }
  function updateControls(){
    if(!lesson||!panel)return;
    $('#professor-play').textContent=playing?'Pausar':paused?'Retomar':'Ouvir trecho';
    $('#professor-play').setAttribute('aria-label',playing?'Pausar explicação':paused?'Retomar explicação':'Ouvir este trecho');
    $('#professor-previous').disabled=position===0;
    $('#professor-next').disabled=position===lesson.parts.length-1;
    $('#professor-next').textContent=lesson.parts[position].hold?'Conferir →':'Próximo →';
    $('#professor-review').hidden=!lesson.review;
    $('#professor-voice').textContent=native?`Voz do navegador: ${voice?.name||'indisponível'}`:track?'Thalita Neural · áudio incluído':'Thalita Neural · áudio não incluído';
    $('#professor-speed').value=String(rate);
  }
  function showPart(index){
    stop();position=Math.max(0,Math.min(lesson.parts.length-1,index));
    const p=lesson.parts[position];
    $('#professor-step').textContent=`Trecho ${position+1} de ${lesson.parts.length}`;
    $('#professor-part-title').textContent=p.label;
    $('#professor-text').textContent=p.text;
    $('#professor-text').dataset.kind=p.kind;
    $('#professor-part-select').value=String(position);
    $('#professor-progress').value=0;
    $('#professor-reflect').hidden=!p.hold;
    $('#professor-body').scrollTop=0;
    $('#professor-fallback').hidden=!!track;
    status(p.hold?'Tente responder antes de conferir. A professora espera por você.':'Acompanhe o texto. Você pode parar e repetir quando quiser.');
    updateControls();
  }
  function finishPart(token){
    if(token!==serial||!playing)return;
    media?.pause();clearTimeout(timer);playing=false;paused=false;
    $('#professor-progress').value=1;
    const p=lesson.parts[position];
    if(p.hold){status('Sua vez: explique com suas palavras e toque em Conferir quando quiser.');updateControls();return;}
    if(position<lesson.parts.length-1&&$('#professor-auto').checked){showPart(position+1);play();}
    else{status(position===lesson.parts.length-1?'Explicação concluída. Experimente explicar a ideia com suas palavras e revisar depois.':'Trecho concluído. Avance quando quiser.');updateControls();}
  }
  function tick(token){
    if(token!==serial||!playing||native)return;
    const p=track.segments[position];
    $('#professor-progress').value=Math.min(1,Math.max(0,(media.currentTime-p.start)/(p.end-p.start)));
    if(media.currentTime>=p.end-.02){finishPart(token);return;}
    timer=setTimeout(()=>tick(token),45);
  }
  function fail(message){
    stop();$('#professor-fallback').hidden=false;status(message);updateControls();
  }
  function nativeVoice(allowAlternative=false){
    if(typeof speechSynthesis==='undefined')return null;
    const voices=speechSynthesis.getVoices();
    return voices.find(v=>/thalita/i.test(v.name+' '+v.voiceURI)&&/^pt[-_]BR/i.test(v.lang))||
      (allowAlternative?(voices.find(v=>/^pt[-_]BR/i.test(v.lang))||voices.find(v=>/^pt/i.test(v.lang))):null);
  }
  function speakNative(token){
    if(!voice||typeof SpeechSynthesisUtterance==='undefined'){fail('Este navegador não disponibilizou uma voz em português. A explicação completa está no texto.');return;}
    utterance=new SpeechSynthesisUtterance(lesson.parts[position].spoken);utterance.voice=voice;utterance.lang='pt-BR';utterance.rate=.92*rate;
    utterance.onend=()=>finishPart(token);
    utterance.onerror=event=>{if(token===serial&&!['canceled','interrupted'].includes(event.error))fail('A voz do navegador não conseguiu iniciar. Você pode tentar novamente ou acompanhar o texto.');};
    utterance.onboundary=event=>{if(token===serial&&playing)$('#professor-progress').value=event.charIndex/Math.max(1,utterance.text.length);};
    speechSynthesis.resume();speechSynthesis.speak(utterance);
  }
  async function playableURL(file){
    const url=new URL(file,document.baseURI).href;
    if(location.protocol==='file:')return url;
    if(cachedFile===url&&cachedURL)return cachedURL;
    if(loadingFile===url&&loadingPromise)return loadingPromise;
    loadingController?.abort();
    const controller=new AbortController();loadingController=controller;loadingFile=url;
    // Um Blob permite saltar para qualquer trecho mesmo em servidores sem HTTP Range.
    const timeout=setTimeout(()=>controller.abort(),15000);
    const promise=(async()=>{
      try{
        const response=await fetch(url,{signal:controller.signal,cache:'force-cache'});
        if(!response.ok)throw new Error('Áudio não encontrado');
        const blob=await response.blob();if(blob.size<1000)throw new Error('Áudio incompleto');
        if(controller.signal.aborted)throw new Error('Carregamento cancelado');
        if(cachedURL)URL.revokeObjectURL(cachedURL);
        cachedURL=URL.createObjectURL(blob);cachedFile=url;return cachedURL;
      }finally{clearTimeout(timeout);if(loadingController===controller){loadingPromise=null;loadingFile='';loadingController=null;}}
    })();
    loadingPromise=promise;return promise;
  }
  async function play(){
    if(!lesson)return;
    if(playing){pause();return;}
    if(paused){
      playing=true;paused=false;updateControls();status('Explicação em andamento.');
      if(native){speechSynthesis.resume();return;}
      const token=serial;try{await media.play();if(token===serial)tick(token);}catch(_){if(token===serial)fail('Toque em Ouvir trecho para iniciar o áudio.');}return;
    }
    stop();const token=serial;
    if(!track&&!native){voice=nativeVoice();if(voice)native=true;else{fail('O áudio Thalita deste roteiro não está disponível. Use o pacote completo ou escolha a voz em português do navegador.');return;}}
    playing=true;updateControls();status('Preparando a explicação…');
    if(native){try{speakNative(token);if(playing)status('Explicação em andamento.');}catch(_){fail('A voz do navegador não pôde iniciar. A explicação completa continua no texto.');}return;}
    preparing=true;
    try{
      const source=await playableURL(track.file);
      if(token!==serial)return;
      if(media.src!==source){media.src=source;media.load();}
      if(media.readyState<1)await new Promise((resolve,reject)=>{
        let timeout;
        const cleanup=()=>{clearTimeout(timeout);media.removeEventListener('loadedmetadata',ready);media.removeEventListener('error',error);};
        const ready=()=>{cleanup();resolve();},error=()=>{cleanup();reject(new Error('Áudio indisponível'));};
        media.addEventListener('loadedmetadata',ready);media.addEventListener('error',error);timeout=setTimeout(error,15000);
      });
      if(token!==serial)return;
      media.currentTime=track.segments[position].start;media.playbackRate=rate;
      media.onended=()=>finishPart(token);
      media.onerror=()=>{if(token===serial)fail('Não foi possível abrir o áudio. Mantenha a pasta audio junto do HTML ou use a voz do navegador.');};
      await media.play();
      if(token!==serial)return;
      preparing=false;
      status('Thalita está explicando. Acompanhe o trecho destacado.');tick(token);
    }catch(_){if(token===serial)fail('O áudio não iniciou. Toque em Ouvir trecho para tentar novamente. Se o arquivo estiver ausente, extraia o pacote completo.');}
  }
  function pause(){
    if(!playing)return;
    if(preparing){stop();status('Preparação interrompida. Toque em Ouvir trecho quando quiser começar.');return;}
    playing=false;paused=true;clearTimeout(timer);
    if(native)speechSynthesis.pause();else media.pause();
    status('Pausado. Retome quando estiver pronto.');updateControls();
  }
  function open(kind='current',id='',extra='',start=0,origin=null){
    if(!options)return;
    const selected=kind==='current'?contextLesson():ProfessorCore.resolve(kind,id,extra);
    if(!selected)return;
    const enlarged=document.querySelector('#art-dialog');
    if(enlarged?.open){enlarged.close();origin=document.querySelector('#enlarge');}
    close(false);lesson=selected;position=0;native=false;voice=null;returnFocus=origin||document.activeElement;
    const fingerprint=ProfessorCore.fingerprint(lesson);
    track=PROFESSOR_AUDIO.tracks?.[fingerprint]||null;
    if(track&&track.segments.length!==lesson.parts.length)track=null;
    $('#professor-title').textContent=lesson.title;
    $('#professor-part-select').innerHTML=lesson.parts.map((p,i)=>`<option value="${i}">${i+1}. ${e(p.label)}</option>`).join('');
    panel.hidden=false;panel.classList.remove('is-minimized');$('#professor-minimize').setAttribute('aria-expanded','true');$('#professor-minimize').textContent='−';$('#professor-head-note').textContent='Uma professora para acompanhar você';document.body.classList.add('professor-open');
    if(origin?.matches('[data-professor]'))origin.setAttribute('aria-expanded','true');
    const index=Number(start)||0;showPart(index);$('#professor-close').focus({preventScroll:true});
    play();
  }
  function insertButton(element,kind,id='',extra='',part=0){
    if(!element||element.querySelector(':scope > .professor-button'))return;
    element.insertAdjacentHTML('beforeend',button(kind,id,extra,part));
    const title=element.querySelector('h1,h2,h3,h4')?.textContent;
    if(title)element.querySelector(':scope > .professor-button').setAttribute('aria-label','Professor: explicar '+title.trim());
  }
  function refresh(){
    if(!options)return;
    const c=options.getContext(),key=[c.view,c.topic,c.index,c.infographic,c.contest,c.subject,c.activity].join('|');
    if(lastContext&&key!==lastContext)close(false);
    lastContext=key;
    const view=document.querySelector('#view-'+c.view);if(!view)return;
    if(!view.querySelector(':scope > .professor-page-bar'))view.insertAdjacentHTML('afterbegin',`<div class="professor-page-bar"><div><span class="professor-mini-mark" aria-hidden="true">✦</span><span>Entenda com uma professora<small>Ouça, acompanhe e explique com suas palavras.</small></span></div>${button('current')}</div>`);
    if(c.view==='infograficos'){
      const l=ProfessorCore.infographic(c.infographic);
      insertButton(view.querySelector('.inf-center'),'infograficos',c.infographic);
      view.querySelectorAll('.inf-group').forEach((group,i)=>insertButton(group,'infograficos',c.infographic,'',Math.max(0,l.parts.findIndex(p=>p.label.startsWith(`Bloco ${i+1} ·`)))));
      insertButton(view.querySelector('.mini-lab'),'laboratorio',c.infographic);
    }
    if(c.view==='mapa')insertButton(view.querySelector('.map-heading'),'mapa',c.topic);
    if(c.view==='concursos')view.querySelectorAll('.contest-card').forEach(card=>insertButton(card,'concurso',card.querySelector('[data-contest]').dataset.contest));
    if(c.view==='materia'){
      view.querySelectorAll('.guided-card').forEach((card,i)=>insertButton(card,'exemplo',c.contest,`${c.subject}/${i}`));
      view.querySelectorAll('.topic-entry').forEach(entry=>{const map=entry.querySelector('[data-infographic]'),story=entry.querySelector('[data-journey]');if(map)insertButton(entry,'infograficos',map.dataset.infographic);else if(story)insertButton(entry,'mapa',story.dataset.journey);});
    }
    if(c.view==='revisao')view.querySelectorAll('.review-card').forEach(card=>{const [type,id]=card.dataset.reviewItem.split(':');insertButton(card,type==='mapa'?'infograficos':'mapa',id);});
  }
  function mount(config){
    if(options)return;options=config;media=new Audio();media.preload='metadata';
    try{const saved=Number(localStorage.getItem('memoria-viva-professor-velocidade'));if([.8,1,1.15,1.3].includes(saved))rate=saved;}catch(_){}
    document.body.insertAdjacentHTML('beforeend',`<aside id="professor-panel" class="professor-panel" aria-labelledby="professor-panel-label" hidden>
      <header class="professor-head"><span class="professor-avatar" aria-hidden="true">${sound}</span><div class="professor-head-titles"><h2 id="professor-panel-label">Professor</h2><p id="professor-head-note">Uma professora para acompanhar você</p></div><div class="professor-window-controls"><button id="professor-minimize" type="button" aria-label="Recolher ou expandir a professora para ver o conteúdo" aria-controls="professor-body" aria-expanded="true">−</button><button id="professor-close" type="button" aria-label="Fechar professora">×</button></div></header>
      <div class="professor-body" id="professor-body"><p class="professor-voice" id="professor-voice"></p><h3 id="professor-title"></h3>
      <label class="professor-select-label" for="professor-part-select">Escolha um trecho<select id="professor-part-select"></select></label>
      <div class="professor-lesson"><span id="professor-step"></span><h4 id="professor-part-title"></h4><p id="professor-text"></p></div>
      <p id="professor-reflect" class="professor-reflect" hidden>✦ Sua vez. A resposta só vem quando você escolher conferir.</p>
      <p id="professor-status" class="professor-status" role="status" aria-live="polite"></p>
      <button id="professor-fallback" type="button" class="professor-fallback" hidden>Usar voz disponível no navegador</button>
      <progress id="professor-progress" value="0" max="1" aria-label="Progresso do trecho narrado"></progress>
      <div class="professor-settings"><label>Velocidade<select id="professor-speed"><option value="0.8">Mais devagar · 0,8×</option><option value="1">Calma · 1×</option><option value="1.15">1,15×</option><option value="1.3">1,3×</option></select></label><label class="professor-auto"><input id="professor-auto" type="checkbox" checked>Continuar a explicação; pausar nas perguntas</label></div>
      <button id="professor-review" type="button" class="professor-save">♡ Guardar este assunto para revisar</button>
      <p class="professor-disclosure">Professora virtual · voz gerada por IA. O roteiro vem do conteúdo desta página. Ouvir, explicar e revisar são formas de praticar; você controla o ritmo.</p></div>
      <footer class="professor-controls"><div><button id="professor-previous" type="button">← Anterior</button><button id="professor-next" type="button">Próximo →</button></div><div><button id="professor-repeat" type="button" aria-label="Repetir este trecho">↻ Repetir</button><button id="professor-play" type="button" class="professor-play">Ouvir trecho</button></div></footer></aside>`);
    panel=document.querySelector('#professor-panel');
    insertButton(document.querySelector('#art-dialog > header'),'current');
    document.addEventListener('click',event=>{const b=event.target.closest('[data-professor]');if(b)open(b.dataset.professor,b.dataset.professorId,b.dataset.professorExtra,b.dataset.professorPart,b);});
    $('#professor-close').addEventListener('click',()=>close());
    $('#professor-minimize').addEventListener('click',()=>{const minimized=panel.classList.toggle('is-minimized');$('#professor-minimize').setAttribute('aria-expanded',String(!minimized));$('#professor-minimize').textContent=minimized?'＋':'−';$('#professor-head-note').textContent=minimized?lesson.title:'Uma professora para acompanhar você';});
    $('#professor-play').addEventListener('click',play);
    $('#professor-repeat').addEventListener('click',()=>{showPart(position);play();});
    $('#professor-previous').addEventListener('click',()=>{showPart(position-1);play();});
    $('#professor-next').addEventListener('click',()=>{showPart(position+1);play();});
    $('#professor-part-select').addEventListener('change',event=>{showPart(Number(event.target.value));play();});
    $('#professor-speed').addEventListener('change',event=>{rate=Number(event.target.value);try{localStorage.setItem('memoria-viva-professor-velocidade',String(rate));}catch(_){}if(native&&(playing||paused)){showPart(position);play();}else media.playbackRate=rate;});
    $('#professor-review').addEventListener('click',()=>{if(lesson.review){const saved=options.onReview(lesson.review);status(saved?'Assunto guardado na Revisão. Escolha a data de retomada quando quiser.':'Assunto disponível na Revisão nesta sessão; o navegador não permitiu salvar.');}});
    $('#professor-fallback').addEventListener('click',()=>{stop();voice=nativeVoice(true);if(!voice){fail('Nenhuma voz em português está disponível neste navegador. Você pode acompanhar toda a explicação escrita.');return;}native=true;play();});
    panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();}});
    window.addEventListener('pagehide',()=>close(false));
    window.addEventListener('beforeprint',pause);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
    refresh();
  }
  return {mount,refresh,open,close,stop,button};
})();
