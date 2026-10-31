async page=>{
 const base=new URL('.',page.url()).href,context=await page.context().browser().newContext({viewport:{width:390,height:900},reducedMotion:'reduce'}),p=await context.newPage(),errors=[],problems=[];let checked=0;
 p.on('pageerror',e=>errors.push(e.message));
 const badText=()=>{
  const rgb=s=>{const v=s.match(/[\d.]+/g)?.map(Number);return v&&v.length>=3?{v,a:v[3]??1}:null};
  const lum=v=>v.slice(0,3).map(c=>{c/=255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
  const bg=e=>{for(let x=e;x;x=x.parentElement){if(x.classList.contains('contest-card')){const pseudo=rgb(getComputedStyle(x,'::before').backgroundColor);if(pseudo&&pseudo.a>.95)return pseudo.v;}const c=rgb(getComputedStyle(x).backgroundColor);if(c&&c.a>.95)return c.v;}return [6,61,82]};
  return [...document.querySelectorAll('main *, .professor-panel *')].filter(e=>!e.closest('svg')&&e.getClientRects().length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&!e.matches('button:disabled')).flatMap(e=>{const s=getComputedStyle(e),f=rgb(s.color);if(!f||f.a<.95)return [];const l1=lum(f.v),l2=lum(bg(e)),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);const large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&Number(s.fontWeight)>=700);return ratio+0.05<(large?3:4.5)?[{selector:e.className||e.tagName,text:e.textContent.trim().slice(0,65),ratio:Math.round(ratio*100)/100,color:s.color,bg:bg(e)}]:[]}).slice(0,24);
 };
 try{
 await p.goto(base+'#concursos');
 const routes=await p.evaluate(()=>[...CONTESTS.filter(c=>!c.manual).flatMap(c=>['#concurso/'+c.id,...c.subjects.map(s=>'#materia/'+c.id+'/'+s.id)]),...INFOGRAPHICS.map(m=>'#infograficos/'+m.id)]);
 for(const route of routes){await p.goto(base+route);const contrast=await p.evaluate(badText),overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(contrast.length||overflow)problems.push({route,overflow,contrast});checked++;}
 if(problems.length||errors.length)throw Error(JSON.stringify({checked,problems,errors}));return {checked,viewport:390,contrast:'passed',overflow:'passed',errors};
 }finally{await context.close();}
}
