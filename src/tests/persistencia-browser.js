async page => {
  const check=(ok,message)=>{if(!ok)throw new Error(message);};
  const context=await page.context().browser().newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const probe=await context.newPage(),errors=[];
  probe.on('pageerror',e=>errors.push(e.message));
  try {
    await probe.goto('http://127.0.0.1:8765/#historia/logic_conjuntos');
    check(await probe.locator('[data-topic="logic_conjuntos"]').evaluate(el=>{const r=el.getBoundingClientRect(),p=el.parentElement.getBoundingClientRect();return r.top>=p.top&&r.bottom<=p.bottom+1;}),'História ativa visível na biblioteca');
    await probe.locator('[data-journey-area="Informática"]').click();
    await probe.locator('[data-topic="info_hardware"]').click();
    check(await probe.locator('[data-topic]').count()===4,'Escolher história mantém filtro');
    await probe.goto('http://127.0.0.1:8765/#historia/sql');
    check(await probe.locator('[data-topic="sql"]').isVisible(),'Link direto não fica escondido por filtro anterior');
    await probe.goto('http://127.0.0.1:8765/#infograficos/sql-linguagens');
    await probe.locator('[data-info-area="Todas"]').click();
    await probe.reload();
    check(await probe.locator('[data-info-area="Todas"]').getAttribute('aria-pressed')==='true','Área sobrevive ao F5');
    await probe.locator('[data-info="formas-normais"]').click();
    await probe.goBack();
    check(probe.url().endsWith('#infograficos/sql-linguagens'),'Voltar recupera mapa anterior');
    await probe.locator('[data-toggle-recall]').click();
    await probe.emulateMedia({media:'print'});
    await probe.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));
    check(await probe.locator('.recall-content').first().isVisible(),'Impressão revela pistas ocultas');
    await probe.evaluate(()=>window.dispatchEvent(new Event('afterprint')));
    await probe.emulateMedia({media:'screen'});
    check(!(await probe.locator('.recall-content').first().isVisible()),'Impressão preserva modo de memória ao voltar');
    await context.setOffline(true);
    await probe.locator('[data-join="FULL"]').click();
    check(await probe.locator('#join-lab tbody tr').count()===5,'Laboratório funciona sem rede após carregar');
    await probe.getByRole('link',{name:'Aprender',exact:true}).click();
    check(await probe.locator('#scene-art > svg').count()===1,'Navegação interna funciona sem rede');
    await context.setOffline(false);
    await probe.evaluate(()=>{localStorage.setItem('memoria-viva-historias-v2','{');localStorage.setItem('memoria-viva-concursos-proprios-v1','{');localStorage.setItem('memoria-viva-revisoes-v1','{');sessionStorage.setItem('memoria-viva-selecao','null');});
    await probe.reload();
    check(await probe.locator('#scene-art > svg').count()===1,'Dados corrompidos não bloqueiam estudo');
    const denied=await context.newPage();
    denied.on('pageerror',e=>errors.push(e.message));
    await denied.addInitScript(()=>{Storage.prototype.getItem=function(){throw new Error('Armazenamento indisponível no teste');};Storage.prototype.setItem=function(){throw new Error('Armazenamento indisponível no teste');};});
    await denied.goto('http://127.0.0.1:8765/#historia/sql');
    check(await denied.locator('#storage-note').isVisible(),'Aviso quando armazenamento é negado');
    await denied.locator('[data-review-story]').click();
    await denied.getByRole('link',{name:'Revisão',exact:true}).click();
    await denied.locator('#view-revisao').waitFor({state:'visible'});
    check(await denied.locator('.review-card').count()===1,'Revisão continua na sessão sem armazenamento');
    check(errors.length===0,errors.join('; '));
    return {passed:['Filtro e história ativa','Área e histórico de navegação','Impressão com pistas ocultas','Estudo sem rede após carregar','Armazenamento corrompido ou negado'],errors};
  } finally {await context.close();}
}
