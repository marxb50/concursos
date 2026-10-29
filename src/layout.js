/* O mesmo endereço acompanha o espaço disponível e o tipo de interação. */
const LayoutCore=(()=>{
  const classify=width=>width<=750?'mobile':width<=1100?'tablet':'desktop';
  return {classify};
})();
if(typeof document!=='undefined')(()=>{
  const coarse=window.matchMedia('(any-pointer: coarse)');
  let scheduled=false;
  const apply=()=>{
    scheduled=false;
    const root=document.documentElement;
    root.dataset.layout=LayoutCore.classify(root.clientWidth||window.innerWidth);
    root.dataset.input=coarse.matches?'touch':'pointer';
    const hint=document.querySelector('.map-heading p');
    if(hint)hint.textContent=coarse.matches?'Toque em um ramo para voltar à explicação. Deslize o desenho para explorar os lados.':'Clique em um ramo para voltar à explicação. Use a barra do desenho para explorar os lados quando necessário.';
  };
  window.addEventListener('resize',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(apply);}},{passive:true});
  coarse.addEventListener('change',apply);
  apply();
})();
