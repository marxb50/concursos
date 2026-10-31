async page=>{
 const base=new URL('.',page.url()).href,context=await page.context().browser().newContext({reducedMotion:'reduce'}),p=await context.newPage(),checked=[];
 await p.addInitScript(()=>{const Original=window.Audio;window.Audio=function(...args){const a=new Original(...args);window.__audio=a;return a;};});
 try{for(const id of ['cgu-dev-2026','abdi-dev-2026','estrategia']){
 await p.goto(base+(id==='estrategia'?'#estrategia':'#concurso/'+id));await p.locator('.professor-page-bar .professor-button:visible').click();await p.waitForFunction(()=>window.__audio.currentTime>0.01&&!window.__audio.paused);
 const target=await p.evaluate(id=>{const l=id==='estrategia'?ProfessorCore.page(id):ProfessorCore.contest(id);const index=id==='estrategia'?40:l.parts.findIndex(p=>p.label.startsWith('Leia a regra'));const track=PROFESSOR_AUDIO.tracks[ProfessorCore.fingerprint(l)];if(!track)throw Error('Sem áudio correspondente');return {index,start:track.segments[index].start,text:l.parts[index].text};},id);
 if(id==='estrategia'&&!target.text.includes('P3 usa +2/−2'))throw Error('Texto da estratégia desatualizado');
 await p.locator('#professor-part-select').selectOption(String(target.index));await p.waitForFunction(start=>Math.abs(window.__audio.currentTime-start)<3,target.start);if(await p.evaluate(()=>window.__audio.duration)<60)throw Error('Áudio inválido');checked.push(id);await p.locator('#professor-close').click();
 }return {checked,decoding:'passed',seeking:'passed',scripts:'passed'};}finally{await context.close();}
}