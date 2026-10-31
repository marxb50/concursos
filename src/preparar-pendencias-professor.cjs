'use strict';
const fs=require('fs'),lessons=require('./exportar-professor.cjs')(),source=fs.readFileSync('professor-audios.js','utf8'),audio=JSON.parse(source.split('const PROFESSOR_AUDIO = ')[1].trim().replace(/;$/,''));
const pending=lessons.filter(l=>!audio.tracks[l.fingerprint]);
const report={date:'2026-10-30',voice:'pt-BR-ThalitaMultilingualNeural',status:'aguardando serviço de voz',authorization:'Usuário escolheu manter Thalita e deixar os novos roteiros prontos até o serviço voltar.',totalLessons:lessons.length,covered:lessons.length-pending.length,pending:pending.length,uniquePending:new Set(pending.map(l=>l.fingerprint)).size,lessons:pending};
fs.writeFileSync('roteiros-thalita-pendentes.json',JSON.stringify(report,null,2));
const groups=new Map();
for(const lesson of pending){if(!groups.has(lesson.fingerprint))groups.set(lesson.fingerprint,{...lesson,ids:[]});groups.get(lesson.fingerprint).ids.push(lesson.id);}
fs.writeFileSync('roteiros-thalita-pendentes.txt',[
 'ROTEIROS PENDENTES — THALITA NEURAL',
 'Voz: '+report.voice,
 `${report.pending} aulas, agrupadas em ${report.uniquePending} roteiros distintos. A mesma gravação pode servir a mais de uma questão do mesmo conceito.`,
 'Os identificadores abaixo permitem encaixar cada gravação no lugar correto. Não narrar os identificadores nem os títulos de controle.',
 ...[...groups.values()].map((lesson,i)=>`\n${'='.repeat(70)}\nROTEIRO ${i+1}: ${lesson.title}\nIdentificador do áudio: ${lesson.fingerprint}\nAulas: ${lesson.ids.join(', ')}\n\n${lesson.parts.map((p,j)=>`TRECHO ${j+1} — ${p.label}\n${p.spoken}`).join('\n\n')}`)
].join('\n')+'\n');
console.log(JSON.stringify({...report,lessons:undefined},null,2));
