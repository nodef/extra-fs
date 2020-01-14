const fs = require('./');
const path = require('path');
const cp = require('child_process');
require('extra-boolean');

// Global variables
const E = process.env;
const OPTIONS = {
  help: false,
  silent: Boolean.parse(E['EWHICH_SILENT']||'0'),
  regexp: Boolean.parse(E['EWHICH_REGXP']||'0'),
  function: Boolean.parse(E['EWHICH_FUNCTION']||'0'),
  paths: E['EWHICH_PATHS']||null,
  programs: []
};
const STDIO = [0, 1, 2];
const CRESET = '\x1b[0m';
const CFMAGENTA = '\x1b[35m';



function main(a) {
  var o = Object.assign({}, OPTIONS);
  for(var i=2, I=a.length; i<I;)
    i = options(o, a[i], a, i);
  if(o.help) return cp.execSync('less which.md', {cwd: process.cwd(), stdio: STDIO});
  if(o.programs.length<1) return error('No program name given!', o);
  for(var p of o.programs)
    log(fs.whichSync(program(p, o), o));
}

function options(o, k, a, i) {
  if(k==='--help') o.help = true;
  else if(k==='--silent') o.silent = true;
  else if(k==='-r' || k==='--regexp') o.regexp = true;
  else if(k==='-f' || k==='--function') o.function = true;
  else if(k==='-p' || k==='--paths') o.paths = (a[++i]||'').split(path.delimiter);
  else o.programs.push(a[i]);
  return i+1;
}

function log(map) {
  for(var v of map.values())
    console.log(v);
}

function error(msg, o) {
  if(o.silent) return console.log(-1);
  console.error(`${CFMAGENTA}error:${CRESET}`, msg);
}

function program(x, o) {
  if(o.function) return eval(x);
  if(o.regexp) return regexp(x);
  var re = /^\/(.*?)\/([igmuys]*)$/;
  if(re.test(x)) return regexp(x);
  return x;
}

function regexp(x) {
  var [pattern, flags] = x.replace(/^\/(.*?)\/([igmuys]*)$|(.*)/, '$1$3:$2').split(':');
  return new RegExp(pattern, flags);
}
if(require.main===module) main(process.argv);
