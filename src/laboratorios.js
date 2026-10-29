/* Prática opcional, depois da explicação. Todos os cálculos ficam no dispositivo. */
const LabUI = (() => {
  const e=Art.e;
  const table=(caption,head,rows)=>`<table><caption>${e(caption)}</caption><thead><tr>${head.map(x=>`<th scope="col">${e(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${x===null?'<span class="null-value">NULL</span>':e(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  const descriptions={INNER:'Somente os pares encontrados. Ana aparece duas vezes porque tem dois pedidos.',LEFT:'Todos os clientes permanecem. Caio aparece sem pedido, com NULL.',RIGHT:'Todos os pedidos permanecem. O pedido 104 não tem cliente associado.',FULL:'Todos os clientes e todos os pedidos permanecem, com NULL onde não há par.'};
  function join(kind='INNER'){
    return `<div class="lab-controls" aria-label="Tipo de junção">${['INNER','LEFT','RIGHT','FULL'].map(k=>`<button type="button" data-join="${k}" aria-pressed="${k===kind}">${k} JOIN</button>`).join('')}</div><pre><code>SELECT clientes.nome, pedidos.id
FROM clientes ${e(kind)} JOIN pedidos
ON clientes.id = pedidos.cliente_id;</code></pre><div class="lab-result" aria-live="polite">${table('Resultado da junção',['Cliente','Pedido'],LabCore.joinRows(kind).map(r=>[r.client,r.order]))}<p>${descriptions[kind]}</p></div>`;
  }
  function truth(p=true,q=true){const r=LabCore.truth(p,q),v=x=>x?'V':'F';return `<div class="lab-controls"><button type="button" data-truth="p" aria-pressed="${p}">P: ${v(p)}</button><button type="button" data-truth="q" aria-pressed="${q}">Q: ${v(q)}</button></div><div aria-live="polite">${table('Valores com P e Q selecionados',['¬P','P ∧ Q','P ∨ Q','P → Q','P ↔ Q'],[[r.not,r.and,r.or,r.implies,r.iff].map(v)])}<p>${r.implies?'A condicional é verdadeira nesta combinação.':'P verdadeiro e Q falso: o único caso falso da condicional.'}</p></div>`;}
  function sheetResult(values){try{const r=LabCore.sheet(values),num=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:3});return table('Resultados das fórmulas',['Fórmula','Resultado'],[['=SOMA(A1:A3)',num(r.sum)],['=SOMA(A1;A3)',num(r.isolated)],['=MÉDIA(A1:A3)',num(r.mean)],['=SE(A1>=7;"Aprovado";"Revisar")',r.condition]]);}catch(_){return '<p>Preencha A1, A2 e A3 com números válidos para calcular.</p>';}}
  function render(id){
    let body='';
    if(id==='sql-linguagens')body=`<p>Compare as tabelas e escolha a junção. O pedido 104 tem cliente_id NULL.</p><div class="lab-tables">${table('Clientes',['id','nome'],LabCore.clients.map(c=>[c.id,c.name]))}${table('Pedidos',['id','cliente_id'],LabCore.orders.map(o=>[o.id,o.client]))}</div><div id="join-lab">${join()}</div>`;
    if(id==='proposicoes-mapa')body='<p>Alterne P e Q e observe os conectivos. V significa verdadeiro; F, falso.</p><div id="truth-lab">'+truth()+'</div>';
    if(id==='planilhas-mapa')body=`<p>Edite os números. Dois-pontos inclui todo o intervalo; ponto e vírgula separa argumentos. Sintaxe em português.</p><div class="lab-controls">${[10,20,30].map((n,i)=>`<label>A${i+1}<input type="number" data-sheet-cell="${i}" step="any" value="${n}" aria-label="Valor da célula A${i+1}"></label>`).join('')}</div><div id="sheet-result" aria-live="polite">${sheetResult([10,20,30])}</div>`;
    return body?`<section class="mini-lab" aria-label="Laboratório opcional"><span class="eyebrow">entendeu a ideia? experimente</span><h2>Um pequeno laboratório</h2>${body}<p class="lab-note">Exemplo didático com dados fictícios. Explore sem nota, cronômetro ou obrigação de acertar.</p></section>`:'';
  }
  return {render,join,truth,sheetResult};
})();
