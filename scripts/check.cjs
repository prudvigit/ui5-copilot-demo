const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function check(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { check(file); }
    else if (/\.(js|cjs)$/.test(file)) { new vm.Script(fs.readFileSync(file, 'utf8'), {filename:file}); }
    else if (file.endsWith('.json')) { JSON.parse(fs.readFileSync(file, 'utf8')); }
  }
}
check('webapp'); check('scripts'); check('test');
console.log('JavaScript syntax and JSON checks passed.');
