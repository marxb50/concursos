/* Os dois visuais compartilham conteúdo e progresso. */
const ThemeCore={normalize:value=>value==='caderno'?'caderno':'circuitos'};
if(typeof document!=='undefined')(()=>{
  const key='memoria-viva-visual-v1';
  function apply(value){
    const theme=ThemeCore.normalize(value);
    document.documentElement.dataset.theme=theme;
    document.querySelector('#central-theme').media=theme==='circuitos'?'screen':'not all';
    document.querySelector('meta[name=theme-color]').content=theme==='circuitos'?'#063d52':'#fcf8ed';
    document.querySelectorAll('[data-theme-select]').forEach(s=>s.value=theme);
    return theme;
  }
  let value;try{value=localStorage.getItem(key);}catch(_){}
  apply(value);
  document.addEventListener('change',event=>{if(!event.target.matches('[data-theme-select]'))return;const theme=apply(event.target.value);try{localStorage.setItem(key,theme);}catch(_){const note=document.querySelector('#theme-status');if(note)note.textContent='Visual aplicado nesta sessão; o navegador não permitiu salvar.';}});
  document.addEventListener('DOMContentLoaded',()=>apply(document.documentElement.dataset.theme));
})();
