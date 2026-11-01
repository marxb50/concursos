async page => {
  const result=await page.evaluate(()=>{
    const host=document.createElement('div');host.style.cssText='position:absolute;left:0;top:0;width:760px;background:#fff;z-index:100';document.body.append(host);
    const problems=[];let count=0,maps=0;
    for(const topic of JOURNEYS){
      for(let i=0;i<topic.steps.length;i++){
        host.innerHTML=Art.scene(topic,i);
        const frame=host.querySelector('svg').getBoundingClientRect();
        for(const label of host.querySelectorAll('text')){const r=label.getBoundingClientRect();if(r.left<frame.left-1||r.right>frame.right+1||r.top<frame.top-1||r.bottom>frame.bottom+1)problems.push({topic:topic.id,scene:i,text:label.textContent});}
        count++;
      }
      host.innerHTML=Art.mindMap(topic);
      const frame=host.querySelector('svg').getBoundingClientRect();
      for(const label of host.querySelectorAll('text')){const r=label.getBoundingClientRect();if(r.left<frame.left-1||r.right>frame.right+1||r.top<frame.top-1||r.bottom>frame.bottom+1)problems.push({topic:topic.id,scene:'mapa',text:label.textContent});}
      maps++;
    }
    host.remove();return {scenes:count,maps,overflow:problems};
  });
  if(result.overflow.length)throw new Error(JSON.stringify(result));
  return result;
}
