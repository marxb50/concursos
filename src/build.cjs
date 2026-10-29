'use strict';
const fs = require('node:fs');
const path = require('node:path');
const manifest = require('./build-manifest.json');
function build(root = __dirname) {
  const read = filename => fs.readFileSync(path.join(root, filename), 'utf8').replace(/\r\n?/g, '\n');
  let html = read('index.template.html');
  for (const [marker, filename] of Object.entries({...manifest.styles, ...manifest.scripts})) {
    if (html.split(marker).length !== 2) throw new Error(`Marcador ausente ou repetido: ${marker}`);
    const source = read(filename);
    // A função preserva literalmente $&, $$ e outros padrões do código-fonte.
    html = html.replace(marker, () => source);
  }
  if (/\/\*__[A-Z_]+__\*\//.test(html)) throw new Error('Há marcadores não resolvidos no HTML.');
  const target = path.join(root, 'dist', 'index.html');
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target + '.tmp', html, 'utf8');
  fs.renameSync(target + '.tmp', target);
  return target;
}
module.exports = {build, manifest};
if (require.main === module) console.log(`Aplicativo gerado: ${build()}`);
