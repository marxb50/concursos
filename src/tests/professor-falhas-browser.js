async page => {
  const context=await page.context().browser().newContext({reducedMotion:'reduce'}),probe=await context.newPage(),errors=[],passed=[];
  probe.setDefaultTimeout(15000);
  probe.on('pageerror',e=>errors.push(e.message));
  const check=(ok,message)=>{if(!ok)throw new Error(message);};
  await probe.addInitScript(()=>{const AudioOriginal=window.Audio;window.Audio=function(...args){const a=new AudioOriginal(...args);window.__profAudio=a;return a;};window.__utterances=[];window.SpeechSynthesisUtterance=function(text){this.text=text;};const voice={name:'Voz de teste em português',lang:'pt-BR',voiceURI:'teste'};speechSynthesis.getVoices=()=>[voice];speechSynthesis.speak=u=>window.__utterances.push({voice:u.voice.name,text:u.text});speechSynthesis.cancel=()=>{};speechSynthesis.resume=()=>{};});
  try{
    let release;
    const gate=new Promise(resolve=>release=resolve);
    await probe.route('**/audio/professor/*.mp3',async route=>{await gate;await route.continue();});
    await probe.goto('http://127.0.0.1:8765/#historia/sql');
    await probe.locator('#listen').click();
    await probe.locator('#professor-play').click();
    release();
    await probe.waitForTimeout(350);
    check(await probe.evaluate(()=>window.__profAudio.paused),'Pausar durante carregamento impede início tardio');
    await probe.locator('#professor-play').click();
    await probe.waitForFunction(()=>!window.__profAudio.paused);
    await context.setOffline(true);
    await probe.locator('#professor-repeat').click();
    await probe.waitForFunction(()=>window.__profAudio.currentTime<2&&!window.__profAudio.paused);
    check((await probe.locator('#professor-voice').innerText()).includes('Thalita'),'Repetição local conserva Thalita');
    await probe.locator('#professor-close').click();
    await context.setOffline(false);
    passed.push('Cancelamento durante carregamento e repetição sem rede');
    await probe.unroute('**/audio/professor/*.mp3');
    await probe.route('**/audio/professor/*.mp3',route=>route.abort());
    await probe.goto('http://127.0.0.1:8765/?teste=audio-ausente#historia/sql');
    await probe.locator('#listen').click();
    await probe.locator('#professor-fallback').waitFor({state:'visible'});
    check((await probe.locator('#professor-text').innerText()).length>40,'Texto continua disponível');
    check(await probe.evaluate(()=>window.__utterances.length)===0,'Não troca a voz silenciosamente');
    await probe.locator('#professor-fallback').click();
    check((await probe.locator('#professor-voice').innerText()).includes('Voz de teste em português'),'Alternativa identificada pelo nome real');
    check(await probe.evaluate(()=>window.__utterances.length)>0,'Voz alternativa só após escolha');
    await probe.locator('#professor-close').press('Escape');
    check(!(await probe.locator('#professor-panel').isVisible()),'Escape fecha painel');
    passed.push('Arquivo ausente, alternativa explícita, texto acessível e Escape');
    check(errors.length===0,errors.join('; '));
    return {passed,errors};
  }finally{await context.close();}
}
