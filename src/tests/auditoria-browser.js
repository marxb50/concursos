async page=>{
 const base=new URL('.',page.url()).href,browser=page.context().browser(),ctx=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[],passed=[];
 p.setDefaultTimeout(15000);p.on('pageerror',e=>errors.push(e.message));
 const check=(v,m)=>{if(!v)throw Error(m);},visit=async(c,s)=>p.goto(base+'#atividades/'+c+'/'+s);
 const start=async(c,s,family)=>{const id=await p.evaluate(({c,s,family})=>ActivityCore.missions(c,s).find(m=>m.family===family).id,{c,s,family});await p.locator(`[data-game-start="${id}"]`).click();return id;};
 const current=async(c,s,id)=>p.evaluate(({c,s,id})=>{const state=ActivityCore.normalize(JSON.parse(localStorage.getItem('memoria-viva-atividades-v2')||'null'));return ActivityCore.mission(id).questions[ActivityCore.run(state,c,s,id).cursor];},{c,s,id});
 const answer=async q=>{
  if(q.type==='number')await p.locator('#game-number').fill(String(q.answer));
  else if(q.type==='sql')await p.locator('[name=join]').selectOption(q.answer);
  else if(q.type==='logic')for(let i=0;i<4;i++)await p.locator(`[name=truth-${i}]`).setChecked(q.answer[i]);
  else if(q.type==='order'){for(let wanted=0;wanted<q.answer.length;wanted++){let order=await p.locator('[data-order-piece]').evaluateAll(es=>es.map(e=>Number(e.dataset.orderPiece)));while(order.indexOf(q.answer[wanted])>wanted){await p.locator(`[data-piece-up="${order.indexOf(q.answer[wanted])}"]`).click();order=await p.locator('[data-order-piece]').evaluateAll(es=>es.map(e=>Number(e.dataset.orderPiece)));}}}
  else await p.locator(`input[name=choice][value="${q.answer}"]`).check();
  await p.getByRole('button',{name:'Conferir resposta',exact:true}).click();check((await p.locator('#game-feedback').innerText()).includes('Conexão estabelecida'),'Gabarito aceito: '+q.canonical);
 };
 try{
  await p.addInitScript(()=>{const O=window.Audio;window.Audio=function(...a){const audio=new O(...a);window.__auditAudio=audio;return audio;};});
  await visit('camara-2026','fala');check(await p.locator('.game-missions article').count()===4,'Quatro fases de fala');
  let id=await start('camara-2026','fala','fala'),q=await current('camara-2026','fala',id);check(q.type==='judgment'&&await p.locator('[name=choice]').count()===2,'Formato Cebraspe');
  await p.locator(`[name=choice][value="${1-q.answer}"]`).check();await p.getByRole('button',{name:'Conferir resposta',exact:true}).click();check(await p.locator('[data-game-next]').count()===0,'Erro não avança');
  await p.locator('.game-stage .professor-button').click();check((await p.locator('#professor-text').innerText()).includes('Amostragem'),'Professor explica o conceito desta questão');await p.locator('#professor-close').click();
  await answer(q);await p.locator('[data-game-next]').click();
  await p.getByRole('combobox',{name:'Escolher visual'}).selectOption('caderno');check((await p.locator('.game-round').innerText()).includes('2 de 10'),'Visual preserva rodada');await p.reload();await p.locator(`[data-game-start="${id}"]`).click();check((await p.locator('.game-round').innerText()).includes('2 de 10'),'Retomada após recarga');
  for(let i=1;i<10;i++){await answer(await current('camara-2026','fala',id));await p.locator('[data-game-next]').click();}
  check((await p.locator('.game-finish').innerText()).includes('9/10'),'Resultado identifica primeira falha');await p.locator('[data-game-errors]').click();check((await p.locator('.game-round').innerText()).includes('1 de 10'),'Treinar erro');await answer(await current('camara-2026','fala',id));await p.locator('[data-game-next]').click();check(await p.locator('.game-finish').count()===1,'Revisão pula acertos');passed.push('Cebraspe, erro, professor específico, dois visuais, recarga e revisão seletiva');
  await visit('cgu-dev-2026','persistencia');id=await start('cgu-dev-2026','persistencia','resgate-sql');
  for(let i=0;i<4;i++){q=await current('cgu-dev-2026','persistencia',id);await p.locator('[name=join]').selectOption(q.answer);check(await p.locator('#game-sql-preview tbody tr').count()===({INNER:3,LEFT:4,RIGHT:4,FULL:5})[q.answer],'Linhas SQL reais');await answer(q);await p.locator('[data-game-next]').click();}
  const xp=await p.evaluate(()=>ActivityCore.stats(JSON.parse(localStorage.getItem('memoria-viva-atividades-v2'))).xp);await p.locator('[data-game-replay]').click();for(let i=0;i<4;i++){await answer(await current('cgu-dev-2026','persistencia',id));await p.locator('[data-game-next]').click();}check(await p.evaluate(()=>ActivityCore.stats(JSON.parse(localStorage.getItem('memoria-viva-atividades-v2'))).xp)===xp,'Replay não duplica XP');passed.push('Quatro JOINs com resultados coerentes e XP sem duplicação');
  for(const [c,s,f] of [['natal-sttu','matematica','balanca-equacoes'],['sao-agente-2021','logica','logica'],['abdi-dev-2026','tecnologia','oficina-sequencias'],['abdi-dev-2026','institucional','abdi']]){await visit(c,s);id=await start(c,s,f);await answer(await current(c,s,id));await p.locator('[data-game-next]').click();}
  passed.push('Cálculo, conexões, ordenação por teclado/toque e casos institucionais');
  await visit('ufrn-ati-dev-2025','especificos');check((await p.locator('.game-top-priority').innerText()).includes('70%'),'Peso real UFRN');
  const summary=await p.evaluate(()=>CONTESTS.flatMap(c=>c.subjects.map(s=>({c:c.id,s:s.id,n:ActivityCore.missions(c.id,s.id).flatMap(m=>m.questions).length}))));check(summary.length===140&&summary.every(x=>x.n>=40&&x.n<=100),'Cobertura de todas as matérias no navegador');
  // Explicação pendente: texto completo e navegação continuam disponíveis.
  const missing=await p.evaluate(()=>ActivityCore.allQuestions().find(q=>!PROFESSOR_AUDIO.tracks[ProfessorCore.fingerprint(ProfessorCore.question(q.canonical))])?.canonical||null);
  if(missing){await p.evaluate(id=>ProfessorUI.open('questao',id),missing);check((await p.locator('#professor-voice').innerText()).includes('pendente'),'Pendência honesta');check((await p.locator('#professor-text').innerText()).length>10,'Texto da explicação presente');await p.locator('#professor-next').click();await p.locator('#professor-close').click();}
  await p.goto(base+'#historia/sql');await p.locator('#view-historia .professor-page-bar [data-professor="current"]').click();await p.waitForFunction(()=>window.__auditAudio&&!window.__auditAudio.paused&&window.__auditAudio.currentTime>0,null,{timeout:15000});check((await p.locator('#professor-voice').innerText()).includes('Thalita'),'Áudio existente continua Thalita');await p.locator('#professor-close').click();passed.push(missing?'Roteiro pendente legível e reprodução de áudio Thalita existente':'Cobertura de áudio das questões e reprodução Thalita');
  check(errors.length===0,JSON.stringify(errors));return {passed,errors,subjects:summary.length};
 }finally{await ctx.close();}
}
