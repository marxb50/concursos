/* Execute com playwright-cli run-code --filename=tests/cenas-ampliadas-browser.js. */
async page=>{
 const browser=page.context().browser(),base=new URL('.',page.url()).href,errors=[],passed=[],visual=[];
 const check=(ok,message)=>{if(!ok)throw Error(message);};
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),p=await ctx.newPage();
 p.on('pageerror',e=>errors.push(e.message));p.setDefaultTimeout(15000);
 await p.addInitScript(()=>{if(!localStorage.getItem('memoria-viva-historias-v2'))localStorage.setItem('memoria-viva-historias-v2',JSON.stringify({topic:'adm_patrimonio',positions:{adm_patrimonio:1},motion:false}));const O=window.Audio;window.Audio=function(...args){const audio=new O(...args);window.__sceneAudio=audio;return audio;};});
 try{
  await p.goto(base+'#historia/adm_patrimonio');
  check((await p.locator('#step-label').innerText()).startsWith('Cena 2 de 30'),'Posição anterior preservada');
  check(await p.locator('#scene-jump option').count()===30,'Seletor contém 30 cenas');
  check(await p.locator('#step-dots button').count()===6,'Navegação dividida em seis partes');
  await p.locator('#view-historia .professor-page-bar [data-professor]').click();
  await p.waitForFunction(()=>window.__sceneAudio&&!window.__sceneAudio.paused&&window.__sceneAudio.currentTime>0.1,null,{timeout:15000});
  check((await p.locator('#professor-voice').innerText()).includes('Thalita'),'Áudio antigo preservado');await p.locator('#professor-close').click();
  await p.locator('#scene-jump').selectOption('12');
  check((await p.locator('#scene-title').innerText()).includes('Inventário físico'),'Cena ampliada correta');
  check(await p.locator('#scene-source a').isVisible(),'Fonte visível');
  check((await p.locator('#scene-exam a').getAttribute('href')).includes('fbn_-_assistenteadministrativo_01_tarde_tipo01.pdf#page=9'),'Questão histórica identificada');
  await p.locator('#view-historia .professor-page-bar [data-professor]').click();
  check((await p.locator('#professor-text').innerText()).includes('Inventário físico'),'Professora explica a cena ampliada');
  await p.waitForFunction(()=>window.__sceneAudio&&!window.__sceneAudio.paused&&window.__sceneAudio.currentTime>0.1,null,{timeout:15000});
  check((await p.locator('#professor-voice').innerText()).includes('Thalita'),'Áudio Thalita da cena nova');await p.locator('#professor-close').click();
  await p.locator('#scene-jump').selectOption('5');
  await p.locator('#view-historia .professor-page-bar [data-professor]').click();
  check((await p.locator('#professor-part-title').innerText()).includes('Bloco 1'),'Áudio do mapa começa no bloco desta cena');
  check((await p.locator('#professor-voice').innerText()).includes('Thalita'),'Explicação do mapa reaproveita Thalita');
  await p.locator('#professor-close').click();await p.locator('#scene-jump').selectOption('12');
  await p.reload();check((await p.locator('#step-label').innerText()).startsWith('Cena 13 de 30'),'Recarga conserva posição ampliada');
  await p.locator('#scene-jump').selectOption('25');
  check(await p.locator('#scene-recall').isVisible(),'Revisão disponível');
  check(!await p.locator('#scene-recall-answer').isVisible(),'Resposta escondida antes de conferir');
  check(!await p.locator('#view-historia .new-word').isVisible(),'Resposta não vaza pelo termo');
  check(!await p.locator('#view-historia .remember').isVisible(),'Resposta não vaza pelo resumo');
  await p.locator('#view-historia .professor-page-bar [data-professor]').click();
  check((await p.locator('#professor-part-title').innerText()).includes('Agora é sua vez'),'Professora inicia pela pergunta de revisão');
  await p.waitForFunction(()=>window.__sceneAudio&&!window.__sceneAudio.paused&&window.__sceneAudio.currentTime>0.1,null,{timeout:15000});
  const end=await p.evaluate(()=>{const l=ProfessorCore.scene('adm_patrimonio',25),track=PROFESSOR_AUDIO.tracks[ProfessorCore.fingerprint(l)];return track.segments[l.startPart].end;});
  await p.evaluate(end=>{window.__sceneAudio.currentTime=end-.01;},end);
  await p.waitForFunction(()=>window.__sceneAudio.paused,null,{timeout:10000});
  check((await p.locator('#professor-next').innerText()).includes('Conferir'),'Áudio pausa antes de revelar a resposta');
  await p.locator('#professor-close').click();
  await p.locator('#scene-recall summary').click();check(await p.locator('#scene-recall-answer').isVisible(),'Pessoa escolhe conferir');
  await p.locator('#scene-jump').selectOption('24');await p.locator('#scene-jump').selectOption('25');
  check(!await p.locator('#scene-recall-answer').isVisible(),'A resposta volta a ficar oculta ao retornar');
  await p.locator('#tab-mapa').click();check(await p.locator('[data-map-step]').count()===6,'Mapa agrupa seis partes');
  await p.locator('[data-map-step="5"]').focus();await p.keyboard.press('Enter');
  check((await p.locator('#step-label').innerText()).startsWith('Cena 6 de 30'),'Navegação do mapa pelo teclado');
  passed.push('Posição antiga, seletor, áudio Thalita, fonte, recarga, revisão oculta e mapa por teclado');
  const all=await p.evaluate(()=>JOURNEYS.map(t=>({id:t.id,count:t.steps.length,base:t.baseCount,sections:StoryExpansion.sections(t).length,review:t.steps.filter(s=>s.recall).length})));
  check(all.length===41&&all.every(t=>t.count===30&&t.sections===6&&t.review>=3),'Todas as histórias têm 30 cenas e revisão');
  for(const theme of ['circuitos','caderno'])for(const width of [320,390,768,1440]){
   await p.setViewportSize({width,height:900});await p.getByRole('combobox',{name:'Escolher visual'}).selectOption(theme);
   for(const position of ['0','12','25']){
    await p.locator('#scene-jump').selectOption(position);
    const info=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,font:parseFloat(getComputedStyle(document.querySelector('#scene-jump')).fontSize)}));
    check(info.scroll<=width+1,`Transbordamento em ${theme}/${width}/${position}: ${JSON.stringify(info)}`);
    if(width<750)check(info.font>=16,'Seletor sem zoom involuntário');
    visual.push({theme,width,position});
    if(width===390&&position==='12'){await p.locator('.story-board').scrollIntoViewIfNeeded();await p.screenshot({path:`output/playwright/cenas30-${theme}-${width}.png`});}
    if(width===390&&position==='25'){await p.locator('.story-navigation').scrollIntoViewIfNeeded();await p.screenshot({path:`output/playwright/cenas30-navegacao-${theme}-${width}.png`});}
   }
  }
  check(errors.length===0,'Erros de JavaScript: '+errors.join('; '));
  return {passed,historias:all.length,cenas:all.reduce((n,t)=>n+t.count,0),visual:visual.length,errors};
 }finally{await ctx.close();}
}
