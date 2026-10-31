async page=>{
 const base=new URL('.',page.url()).href,browser=page.context().browser(),errors=[],overflow=[],contrast=[],checked=[];
 const routes=['#concursos','#concurso/natal-suporte-2023','#materia/cgu-dev-2026/persistencia','#historia/sql','#mapa/mat_equacoes','#infograficos/planilhas-mapa','#revisao','#estrategia','#fontes','#atividades/natal-suporte-2023/especificos'];
 const games=[['parnamirim-guarda-2024','portugues','detetive-texto'],['parnamirim-futuro','matematica','balanca-equacoes'],['sao-agente-2021','logica','logica'],['cgu-dev-2026','persistencia','resgate-sql'],['abdi-dev-2026','tecnologia','oficina-sequencias'],['parnamirim-guarda-2024','constitucional','constitucional'],['camara-2026','fala','fala']];
 const badText=()=>{
  const rgb=s=>{const v=s.match(/[\d.]+/g)?.map(Number);return v&&v.length>=3?{v,a:v[3]??1}:null};
  const lum=v=>v.slice(0,3).map(c=>{c/=255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
  const bg=e=>{for(let x=e;x;x=x.parentElement){if(x.classList.contains('contest-card')){const pseudo=rgb(getComputedStyle(x,'::before').backgroundColor);if(pseudo&&pseudo.a>.95)return pseudo.v;}const c=rgb(getComputedStyle(x).backgroundColor);if(c&&c.a>.95)return c.v;}return document.documentElement.dataset.theme==='caderno'?[252,248,237]:[6,61,82]};
  return [...document.querySelectorAll('#view-atividades *, .theme-picker *, .professor-panel *')].filter(e=>!e.closest('svg')&&e.getClientRects().length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&!e.matches('button:disabled')).flatMap(e=>{const s=getComputedStyle(e),f=rgb(s.color);if(!f||f.a<.95)return [];const l1=lum(f.v),l2=lum(bg(e)),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);const large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&Number(s.fontWeight)>=700);return ratio+0.05<(large?3:4.5)?[{selector:e.className||e.tagName,text:e.textContent.trim().slice(0,50),ratio:Math.round(ratio*100)/100}]:[]}).slice(0,24);
 };
 for(const theme of ['circuitos','caderno'])for(const width of [320,360,390,768,1024,1440]){
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width<750,hasTouch:width<750,reducedMotion:'reduce'}),p=await context.newPage();p.setDefaultTimeout(15000);p.on('pageerror',e=>errors.push(e.message));
  await context.addInitScript(theme=>localStorage.setItem('memoria-viva-visual-v1',theme),theme);
  const inspect=async route=>{
   const result=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+2&&!e.closest('.map-scroll,.enlarged-scroll')}).slice(0,5).map(e=>e.className)}));
   if(result.scroll>width+1)overflow.push({theme,width,route,...result});
   if([320,1440].includes(width))contrast.push(...(await p.evaluate(badText)).map(v=>({theme,width,route,...v})));
   checked.push({theme,width,route});
  };
  try{
   for(const route of routes){await p.goto(base+route);await inspect(route);}
   for(const [cid,sid,mid] of games){await p.goto(base+'#atividades/'+cid+'/'+sid);await p.locator(`[data-game-start*="/${mid}/"]`).first().click();await inspect(mid);}
   if([390,1440].includes(width)){
    await p.goto(base+'#atividades/natal-suporte-2023/especificos');await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`output/playwright/atividades-${theme}-${width}.png`});
    await p.goto(base+'#atividades/cgu-dev-2026/persistencia');await p.locator('[data-game-start*="/resgate-sql/"]').first().click();await p.screenshot({path:`output/playwright/jogo-sql-${theme}-${width}.png`});
   }
   await p.locator('.game-stage .professor-button').click();await p.locator('#professor-panel').waitFor();await inspect('professora');await p.locator('#professor-close').click();
   if(width<750&&await p.locator('[data-theme-select]').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))<16)throw Error('Seletor de tema com fonte menor que 16px');
  }finally{await context.close();}
 }
 if(overflow.length||errors.length||contrast.length)throw Error(JSON.stringify({overflow,errors,contrast}));
 return {checked:checked.length,themes:['circuitos','caderno'],widths:[320,360,390,768,1024,1440],overflow,errors,contrast};
}
