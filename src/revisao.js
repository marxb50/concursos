/* Revisões escolhidas pelo estudante: sem algoritmo de previsão ou teste obrigatório. */
const ReviewCore=(()=>{
 const dateOk=value=>{if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value&&Number(value.slice(0,4))>=1000;};
 const ref=(type,id)=>type==='historia'?JOURNEYS.find(x=>x.id===id):type==='mapa'?INFOGRAPHICS.find(x=>x.id===id):null;
 const normalize=raw=>{const result=[],seen=new Set();for(const x of Array.isArray(raw)?raw:[]){if(!x||typeof x.id!=='string'||!ref(x.type,x.id))continue;const k=x.type+':'+x.id;if(seen.has(k))continue;seen.add(k);result.push({type:x.type,id:x.id,added:dateOk(x.added)?x.added:null,due:dateOk(x.due)?x.due:null,reviewed:dateOk(x.reviewed)?x.reviewed:null});}return result;};
 const add=(items,type,id,today)=>{if(!ref(type,id)||!dateOk(today))return normalize(items);const list=normalize(items);if(!list.some(x=>x.type===type&&x.id===id))list.push({type,id,added:today,due:null,reviewed:null});return list;};
 const update=(items,type,id,changes)=>normalize(items).map(x=>x.type===type&&x.id===id?{...x,...changes}:x);
 const schedule=(items,type,id,due)=>{if(due!==null&&!dateOk(due))throw new Error('Data inválida');return update(items,type,id,{due});};
 const done=(items,type,id,today)=>{if(!dateOk(today))throw new Error('Data inválida');return update(items,type,id,{reviewed:today,due:null});};
 const remove=(items,type,id)=>normalize(items).filter(x=>x.type!==type||x.id!==id);
 const ordered=(items,today)=>normalize(items).sort((a,b)=>{const rank=x=>!x.due?2:x.due<=today?0:1,name=x=>ref(x.type,x.id).name||ref(x.type,x.id).title;return rank(a)-rank(b)||(a.due||'').localeCompare(b.due||'')||name(a).localeCompare(name(b),'pt-BR');});
 const plusDays=(date,days)=>{if(!dateOk(date)||!Number.isInteger(days)||days<0||days>366)throw new Error('Intervalo inválido');const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10);};
 return {plusDays,dateOk,ref,normalize,add,schedule,done,remove,ordered};
})();

const ReviewUI=(()=>{
 const e=Art.e;
 const dateText=d=>d?`${d.slice(8,10)}/${d.slice(5,7)}/${d.slice(0,4)}`:'';
 function render(items,today){
  const list=ReviewCore.ordered(items,today),due=list.filter(x=>x.due&&x.due<=today).length;
  const cards=list.map(x=>{const item=ReviewCore.ref(x.type,x.id),name=item.name||item.title,kind=x.type==='mapa'?'Mapa':'História',status=x.due?(x.due<today?`Retomada prevista para ${dateText(x.due)}`:x.due===today?'Retomada para hoje':`Retomada em ${dateText(x.due)}`):'Sem data escolhida';
   return `<article class="review-card" data-review-item="${e(x.type+':'+x.id)}"><div><span class="review-kind">${kind} · ${e(status)}</span><h2>${e(name)}</h2><p>${x.reviewed?`Última revisão registrada: ${dateText(x.reviewed)}.`:'Você ainda não registrou uma revisão.'}</p></div><div class="review-date"><label>Escolher data de retomada <input type="date" value="${e(x.due||'')}" aria-label="Data de retomada: ${e(name)}"></label><button type="button" data-review-schedule="${e(x.type+':'+x.id)}">Salvar data</button></div><div class="review-shortcuts"><span>Retomar a partir de hoje:</span>${[1,3,7,15].map(d=>`<button type="button" data-review-days="${d}">+${d} ${d===1?'dia':'dias'}</button>`).join('')}</div><div class="review-actions"><button type="button" ${x.type==='mapa'?`data-infographic="${e(x.id)}"`:`data-journey="${e(x.id)}"`}>Abrir ${kind.toLowerCase()} →</button><button type="button" data-review-done="${e(x.type+':'+x.id)}">Registrar revisão feita</button><button type="button" class="review-remove" data-review-remove="${e(x.type+':'+x.id)}">Retirar da lista</button></div></article>`;
  }).join('');
  return `<div class="review-header"><span class="eyebrow">seu ritmo, suas escolhas</span><h1>Volte às ideias no seu tempo.</h1><p>Guarde histórias e mapas que você já começou a entender. Escolha uma data se quiser; depois de revisar, registre a retomada e escolha outra data quando fizer sentido.</p><p class="review-privacy">A lista fica somente neste navegador e dispositivo. Ela não mede sua aprendizagem e não envia notificações.</p></div><div class="review-summary"><strong>${list.length} ${list.length===1?'assunto guardado':'assuntos guardados'}</strong><span>${due} ${due===1?'retomada para hoje ou atrasada':'retomadas para hoje ou atrasadas'}</span></div>${list.length?`<div class="review-list">${cards}</div>`:`<div class="review-empty"><h2>Seu espaço de revisão está vazio.</h2><p>Abra uma história ou mapa, entenda a explicação e use o botão “Guardar para revisar”.</p><button class="button button-primary" type="button" data-go="infograficos">Explorar os mapas →</button></div>`}<p class="review-research">Distribuir o estudo pode ajudar na retenção, mas não existe um intervalo único adequado a todas as pessoas e conteúdos. <a href="https://files.eric.ed.gov/fulltext/ED536925.pdf" target="_blank" rel="noopener noreferrer">Conheça a revisão de pesquisas ↗</a></p>`;
 }
 return {render};
})();
