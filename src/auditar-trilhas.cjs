'use strict';
const fs=require('fs'),vm=require('vm'),manifest=require('./build-manifest.json'),ctx={URL};
vm.runInNewContext(Object.values(manifest.scripts).filter(f=>f!=='app.js').map(f=>fs.readFileSync(f,'utf8')).join('\n')+'\nthis.audit={CONTESTS,ActivityBank,ActivityCore,ProfessorCore,PROFESSOR_AUDIO};',ctx);
const {CONTESTS,ActivityBank,ActivityCore,ProfessorCore,PROFESSOR_AUDIO}=ctx.audit;
const rows=CONTESTS.flatMap(c=>c.subjects.map(s=>{const ms=ActivityCore.missions(c.id,s.id),qs=ms.flatMap(m=>m.questions);return {contest:c.id,subject:s.id,name:s.name,board:c.organizer,total:qs.length,unique:new Set(qs.map(q=>q.canonical)).size,phases:ms.length,families:[...new Set(ms.map(m=>m.family))],formats:[...new Set(qs.map(q=>q.format))],expected:ActivityCore.blueprint(c,s).reduce((n,b)=>n+b.count,0)};}));
const all=ProfessorCore.all(),report={contests:CONTESTS.length,subjects:rows.length,uniqueQuestions:ActivityBank.reduce((n,m)=>n+m.questions.length,0),placements:rows.reduce((n,r)=>n+r.total,0),minimum:Math.min(...rows.map(r=>r.total)),maximum:Math.max(...rows.map(r=>r.total)),problems:rows.filter(r=>r.total<40||r.total>100||r.unique!==r.total||r.expected!==r.total),lessons:all.length,audioMissing:all.filter(l=>!PROFESSOR_AUDIO.tracks[ProfessorCore.fingerprint(l)]).length,rows};
fs.mkdirSync('output',{recursive:true});
fs.writeFileSync('output/auditoria-trilhas-20261030.json',JSON.stringify(report,null,2));
const md=['# Cobertura das atividades — 30/10/2026','',
 `${report.contests} concursos/trilhas, ${report.subjects} matérias, ${report.uniqueQuestions} questões autorais distintas e ${report.placements} posições de estudo. Cada matéria tem ${report.minimum} a ${report.maximum} questões, sem repetição interna. Fundamentos são compartilhados entre concursos compatíveis; posições de estudo não são questões inéditas.`,
 '', 'A quantidade abaixo é a do treino, não a quantidade prevista para a prova. Fases têm até 10 rodadas. Consulte no aplicativo os editais, o histórico analisado e as diferenças entre importância por pontos e frequência observada.',
 '', '| Concurso/trilha | Matéria | Questões | Fases | Banca/referência |', '|---|---|---:|---:|---|',
 ...rows.map(r=>`| ${CONTESTS.find(c=>c.id===r.contest).name} | ${r.name} | ${r.total} | ${r.phases} | ${r.board} |`),
 '', '## Limites', '',
 '- As questões do jogo são autorais. Os 12 cadernos oficiais fornecem referências e classificações de 630 questões; não foram transcritos integralmente no jogo.',
 '- A seleção adapta fundamentos ao cargo, à matéria e ao formato conhecido da banca. Não equivale à cobertura integral de cada edital nem prevê uma próxima prova.',
 '- Há 880 exercícios novos, em pares de reconhecimento de conceito e aplicação a caso; os 344 restantes são exercícios anteriores corrigidos. Definição e aplicação do mesmo conceito compartilham a aula da professora.',
 '- A trilha TCE-RN reúne fundamentos comuns; os cargos 4, 5 e 12 têm programas diferentes. Trilhas sem edital específico são identificadas como preparação geral.',
 `- Professora: ${report.lessons} explicações, ${report.audioMissing} com roteiro pronto e áudio Thalita pendente, conforme escolha do usuário.`, ''
];
fs.mkdirSync('pesquisa-atividades',{recursive:true});
fs.writeFileSync('pesquisa-atividades/COBERTURA_ATIVIDADES_20261030.md',md.join('\n'));
console.log(JSON.stringify({...report,rows:undefined},null,2));
