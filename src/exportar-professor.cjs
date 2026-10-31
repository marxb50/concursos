'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function exportLessons(){
  const root=__dirname,manifest=require('./build-manifest.json'),context={URL};
  vm.runInNewContext(Object.values(manifest.scripts).filter(f=>!['app.js','professor-ui.js','professor-audios.js'].includes(f)).map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n')+'\nthis.lessons=ProfessorCore.all().map(l=>({...l,fingerprint:ProfessorCore.fingerprint(l)}));',context);
  return JSON.parse(JSON.stringify(context.lessons));
}
module.exports=exportLessons;
if(require.main===module){const lessons=exportLessons(),folder=path.join(__dirname,'output','speech');fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'roteiros.json'),JSON.stringify(lessons,null,2));console.log(`${lessons.length} aulas; ${new Set(lessons.map(l=>l.fingerprint)).size} roteiros distintos; ${lessons.reduce((n,l)=>n+l.parts.reduce((sum,p)=>sum+p.spoken.length,0),0)} caracteres.`);}
