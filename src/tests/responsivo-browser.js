async page=>{
 const base=new URL('.',page.url()).href,browser=page.context().browser(),errors=[],overflow=[],checked=[];
 const routes=['#concursos','#concurso/natal-suporte-2023','#materia/cgu-dev-2026/persistencia','#historia/sql','#mapa/mat_equacoes','#infograficos/planilhas-mapa','#revisao','#estrategia','#fontes'];
 for(const width of [320,360,390,768,1024,1440]){
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width<750,hasTouch:width<750,reducedMotion:'reduce'}),p=await context.newPage();p.setDefaultTimeout(15000);p.on('pageerror',e=>errors.push(e.message));
  try{
   for(const route of routes){
    await p.goto(base+route);
    const mode=await p.locator('html').getAttribute('data-layout');
    if(mode!==(width<=750?'mobile':width<=1100?'tablet':'desktop'))throw Error('Modo incorreto: '+width);
    const result=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+2&&!e.closest('.map-scroll,.enlarged-scroll')}).slice(0,5).map(e=>e.className)}));
    if(result.scroll>width+1)overflow.push({width,route,...result});
    checked.push({width,route,mode});
   }
   await p.goto(base+'#historia/sql');await p.locator('#listen').click();
   await p.waitForFunction(()=>document.querySelector('#professor-status').textContent.includes('Thalita está'));
   if(!await p.locator('#professor-close').isVisible()||!await p.locator('#professor-play').isVisible())throw Error('Controles da professora: '+width);
   const panel=await p.locator('#professor-panel').boundingBox();if(panel.x<0||panel.x+panel.width>width+1)overflow.push({width,route:'professor',panel});
   await p.locator('#professor-minimize').click();await p.screenshot({path:`output/playwright/publicacao-${width}.png`});
   await p.locator('#professor-close').click();
   if(width===390){await p.setViewportSize({width:844,height:390});await p.waitForFunction(()=>document.documentElement.dataset.layout==='tablet');await p.setViewportSize({width:390,height:844});await p.waitForFunction(()=>document.documentElement.dataset.layout==='mobile');}
  }finally{await context.close();}
 }
 if(overflow.length||errors.length)throw Error(JSON.stringify({overflow,errors}));
 return {checked:checked.length,widths:[320,360,390,768,1024,1440],audio:'Thalita em todos os tamanhos',rotation:'passed',overflow,errors};
}
