async page=>{
 const base=new URL('.',page.url()).href,browser=page.context().browser(),errors=[],checked=[],contrast=[];
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.setDefaultTimeout(15000);
 const routes=['#concursos','#concurso/abdi-dev-2026','#materia/natal-suporte-2023/especificos','#historia/sql','#mapa/sql','#infograficos/planilhas-mapa','#revisao','#estrategia','#fontes'];
 const badText=()=>{
  const rgb=s=>{const v=s.match(/[\d.]+/g)?.map(Number);return v&&v.length>=3?{v,a:v[3]??1}:null};
  const lum=v=>v.slice(0,3).map(c=>{c/=255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
  const bg=e=>{for(let x=e;x;x=x.parentElement){if(x.classList.contains('contest-card')){const pseudo=rgb(getComputedStyle(x,'::before').backgroundColor);if(pseudo&&pseudo.a>.95)return pseudo.v;}const c=rgb(getComputedStyle(x).backgroundColor);if(c&&c.a>.95)return c.v;}return [6,61,82]};
  return [...document.querySelectorAll('main *, .professor-panel *')].filter(e=>!e.closest('svg')&&e.getClientRects().length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&!e.matches('button:disabled')).flatMap(e=>{const s=getComputedStyle(e),f=rgb(s.color);if(!f||f.a<.95)return [];const l1=lum(f.v),l2=lum(bg(e)),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);const large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&Number(s.fontWeight)>=700);return ratio+0.05<(large?3:4.5)?[{selector:e.className||e.tagName,text:e.textContent.trim().slice(0,65),ratio:Math.round(ratio*100)/100,color:s.color,bg:bg(e)}]:[]}).slice(0,24);
 };
 try{
 for(const width of [390,1440]){await p.setViewportSize({width,height:1000});for(const route of routes){await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);checked.push({width,route});contrast.push(...(await p.evaluate(badText)).map(v=>({width,route,...v})));if(width===1440||['#concursos','#mapa/sql','#infograficos/planilhas-mapa'].includes(route))await p.screenshot({path:`output/playwright/central-${width}-${route.slice(1).replaceAll('/','-')}.png`});if(route==='#concursos'){await p.locator('.contest-grid').scrollIntoViewIfNeeded();await p.locator('.contest-card').first().screenshot({path:`output/playwright/central-${width}-cartao.png`});}}
 }
 await p.goto(base+'#concurso/abdi-dev-2026');if(await p.locator('.subject-card').first().getAttribute('data-subject')!=='tecnologia')throw Error('ABDI deveria começar por TI');if(!await p.locator('.priority-panel').innerText().then(t=>t.includes('25 pontos')&&t.includes('52%')&&t.includes('30 das 60')))throw Error('Pesos ou mínimos ABDI');
 await p.goto(base+'#concurso/cgu-dev-2026');if(!await p.locator('.priority-panel').innerText().then(t=>t.includes('260 pontos')&&t.includes('Erro desconta 2 pontos')&&t.includes('P3 54')))throw Error('Pesos por bloco da CGU');
 await p.goto(base+'#concurso/nisia-guarda');if(!await p.locator('.priority-panel').innerText().then(t=>t.includes('90 pontos')&&t.includes('Português 9')))throw Error('Nísia: pesos e mínimos');
 await p.goto(base+'#materia/natal-suporte-2023/especificos');const counts=await p.locator('.observed-list strong').allTextContents();if(counts.join(',')!=='6,5,3,3,2,1')throw Error('Frequência deve preservar empates');
 await p.goto(base+'#fontes');await p.emulateMedia({media:'print'});if(await p.evaluate(()=>getComputedStyle(document.body).backgroundColor)!=='rgb(255, 255, 255)')throw Error('Impressão precisa de papel claro');await p.emulateMedia({media:'screen'});
 if(errors.length||contrast.length)throw Error(JSON.stringify({errors,contrast}));return {checked:checked.length,scoring:'passed',historicalOrder:'passed',print:'passed',contrast,errors};
 }finally{await context.close();}
}
