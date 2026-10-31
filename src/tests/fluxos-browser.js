/* Execute com playwright-cli run-code --filename=tests/fluxos-browser.js. */
async page => {
  const errors=[],passed=[];
  page.on('pageerror',error=>errors.push(error.message));
  const base='http://127.0.0.1:8765/';
  const check=(ok,message)=>{if(!ok)throw new Error(message);};
  const visit=async hash=>{await page.goto(base+hash);await page.locator('main').waitFor();};
  const visibleViews=()=>page.evaluate(()=>[...document.querySelectorAll('section.view')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.id));

  await visit('#concursos');
  check(await page.locator('.contest-card').count()===28,'Catálogo inicial');
  await page.getByRole('searchbox',{name:'Buscar concurso, banca ou matéria'}).fill('natal suporte');
  check(await page.locator('[data-contest="natal-suporte-2023"]').isVisible(),'Busca no catálogo');
  check(await page.locator('#contest-search').evaluate(e=>e===document.activeElement),'Busca mantém foco');
  await page.locator('#contest-search').fill('termoabsolutamenteinexistente');
  check(await page.locator('.contest-card').count()===0,'Busca vazia no catálogo');
  passed.push('Busca de concursos e estado vazio');

  await visit('#materia/cgu-dev-2026/persistencia');
  check((await visibleViews()).join()==='view-materia','Rota de matéria');
  check(await page.locator('.topic-entry [data-journey]').count()>0,'Links para histórias');
  check(await page.locator('.topic-entry [data-infographic]').count()>0,'Links para mapas');
  await page.reload();
  check(page.url().endsWith('#materia/cgu-dev-2026/persistencia'),'F5 mantém matéria');
  await visit('#materia/cgu-dev-2026/inexistente');
  check(page.url().endsWith('#concurso/cgu-dev-2026'),'Rota inválida cai no concurso');
  await visit('#historia/%E0%A4%A');
  check(page.url().endsWith('#concursos'),'Hash malformado recuperado');
  passed.push('Links diretos, recarga e hashes inválidos');

  await visit('#historia/sql');
  check(await page.locator('[data-topic]').count()===41,'Todas as histórias');
  await page.locator('[data-journey-area="Informática"]').click();
  check(await page.locator('[data-topic]').count()===4,'Filtro por área');
  await page.locator('#journey-search').fill('planilha');
  check(await page.locator('[data-topic="info_planilhas"]').isVisible(),'Busca sem acentos');
  await page.locator('[data-topic="info_planilhas"]').click();
  await page.locator('[data-step="2"]').click();
  await page.getByRole('button',{name:'SOMA(A1;A3) · 40',exact:true}).click();
  check((await page.locator('#scene-art').textContent()).includes('SOMA = 40'),'Interação com intervalo de células');
  await page.reload();
  check((await page.locator('#step-label').textContent()).startsWith('Cena 3'),'Posição da história persistida');
  passed.push('Filtro de histórias, cenas interativas e posição salva');

  await visit('#infograficos/formas-normais');
  await page.reload();
  check(await page.locator('[data-info="formas-normais"]').getAttribute('aria-pressed')==='true','F5 mantém mapa');
  await page.locator('#infographic-search').pressSequentially('Liskov');
  check(await page.locator('[data-info="solid"]').getAttribute('aria-pressed')==='true','Busca no conteúdo detalhado');
  check(await page.locator('#infographic-search').inputValue()==='Liskov','Digitação contínua preservada');
  await page.locator('#infographic-search').fill('zxqinexistente');
  check(await page.locator('.infographic-sheet').count()===0,'Não exibir mapa incompatível com filtro');
  await page.locator('#infographic-search').fill('');
  await page.locator('[data-info-area="Todas"]').click();
  check(await page.locator('[data-info]').count()===56,'Todos os mapas');
  await page.reload();
  check(await page.locator('[data-info-area="Todas"]').getAttribute('aria-pressed')==='true','F5 mantém a área escolhida');
  await page.locator('#infographic-search').fill('habeas corpus');
  check(await page.locator('[data-info="direitos-constitucionais"]').isVisible(),'Busca em explicação expandida');
  passed.push('Busca dos mapas, seleção consistente e persistência');

  await visit('#infograficos/sql-linguagens');
  await page.locator('[data-toggle-recall]').focus();
  await page.keyboard.press('Enter');
  const groups=await page.locator('.inf-group').count();
  check(await page.locator('.recall-content[hidden]').count()===groups,'Pistas ocultas também da acessibilidade');
  await page.locator('[data-reveal="0"]').focus();
  await page.keyboard.press('Enter');
  check(await page.locator('.recall-content[hidden]').count()===groups-1,'Revelação individual por teclado');
  await page.locator('[data-toggle-recall]').click();
  check(await page.locator('.recall-content[hidden]').count()===0,'Mostrar todas');
  await page.locator('[data-join="FULL"]').click();
  check(await page.locator('#join-lab tbody tr').count()===5,'FULL JOIN: 5 linhas');
  await page.locator('[data-join="LEFT"]').click();
  check(await page.locator('#join-lab tbody tr').count()===4,'LEFT JOIN: 4 linhas');
  await visit('#infograficos/proposicoes-mapa');
  await page.locator('[data-truth="q"]').click();
  check((await page.locator('#truth-lab').textContent()).includes('único caso falso'),'Tabela verdade');
  await visit('#infograficos/planilhas-mapa');
  await page.locator('[data-sheet-cell="0"]').fill('');
  check((await page.locator('#sheet-result').textContent()).includes('números válidos'),'Célula vazia não vira zero');
  await page.locator('[data-sheet-cell="0"]').fill('6');
  check((await page.locator('#sheet-result').textContent()).includes('Revisar'),'SE recalculado');
  passed.push('Recuperação ativa acessível e os três laboratórios');

  await page.locator('[data-review-map]').click();
  await page.getByRole('link',{name:'Revisão',exact:true}).click();
  await page.locator('[data-review-days="7"]').click();
  const expected=await page.evaluate(()=>{const d=new Date();d.setDate(d.getDate()+7);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;});
  check(await page.locator('.review-card input[type=date]').inputValue()===expected,'Atalho usa data local');
  await page.reload();
  check(await page.locator('.review-card input[type=date]').inputValue()===expected,'Data de revisão persistida');
  await page.locator('[data-review-done]').click();
  check(await page.locator('.review-card input[type=date]').inputValue()==='','Concluir limpa próxima data');
  await page.locator('[data-review-remove]').click();
  check(await page.locator('.review-empty').isVisible(),'Remover revisão');
  passed.push('Agendamento, conclusão e remoção de revisão');

  await visit('#concursos');
  await page.locator('.add-contest summary').click();
  await page.locator('[name=name]').fill('Concurso de verificação');
  await page.locator('[name=place]').fill('Natal');
  await page.locator('[name=source]').fill('https://example.org/edital');
  await page.locator('[name=subjects]').fill('Administração\nContabilidade\nAFO\nInglês\nDireito Administrativo');
  await page.locator('#add-contest-form button[type=submit]').click();
  check(await page.locator('.subject-card').count()===5,'Cadastro personalizado');
  await page.locator('[data-subject="manual-1"]').click();
  check(await page.getByRole('heading',{name:'Entendendo o raciocínio',exact:true}).isVisible(),'Personalizado tem exemplos');
  await page.locator('[data-go="concurso"]').click();
  await page.reload();
  await page.locator('[data-delete-contest]').click();
  await page.reload();
  check(!(await page.locator('#view-concursos').textContent()).includes('Concurso de verificação'),'Exclusão persistente');
  passed.push('Criar, estudar e remover concurso personalizado');

  for(const [hash,expectedView] of [['#historia/mat_equacoes','view-mapa'],['#infograficos/hardware-dispositivos','view-infograficos'],['#materia/cgu-dev-2026/persistencia','view-materia'],['#estrategia','view-estrategia'],['#revisao','view-revisao'],['#fontes','view-fontes'],['#concursos','view-concursos']]){
    await visit(hash);
    await page.emulateMedia({media:'print'});
    await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
    check((await visibleViews()).join()===expectedView,'Impressão isolada: '+hash);
    if(hash.startsWith('#historia'))check(await page.locator('#map-art > svg').count()===1,'Mapa gerado antes de imprimir');
    await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
    await page.emulateMedia({media:'screen'});
  }
  passed.push('Impressão de sete telas sem mistura');

  await page.setViewportSize({width:390,height:844});
  for(const hash of ['#concursos','#historia/mat_equacoes','#infograficos/word-documentos','#infograficos/sql-linguagens','#materia/nisia-prefeitura/especifico','#revisao']){
    await visit(hash);
    const fits=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);
    check(fits,'Sem transbordamento no celular: '+hash);
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await visit('#historia/logic_conjuntos');
  check(await page.locator('#motion').isDisabled(),'Respeita movimento reduzido');
  check(await page.locator('body').evaluate(e=>e.classList.contains('motion-off')),'Animação desativada');
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:'output/playwright/conjuntos-mobile.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  await visit('#infograficos/hardware-dispositivos');
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:'output/playwright/hardware-desktop.png',fullPage:true});
  check(errors.length===0,'Erros de JavaScript: '+errors.join('; '));
  passed.push('Responsividade, movimento reduzido e ausência de erros JS');
  return {passed,errors};
}
