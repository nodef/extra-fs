#!/usr/bin/env node
const fs = require('./');
const cp = require('child_process');
require('extra-boolean');

// Global variables
const E = process.env;
const OPTIONS = {
  help: false,
  silent: Boolean.parse(E['EDEHUSKDIR_SILENT']||'0'),
  depth: parseInt(E['EDEHUSKDIR_DEPTH']||'-1', 10),
  dirs: []
};
const STDIO = [0, 1, 2];
const CRESET = '\x1b[0m';
const CFMAGENTA = '\x1b[35m';



function main(a) {
  var o = Object.assign({}, OPTIONS);
  for(var i=2, I=a.length; i<I;)
    i = options(o, a[i], a, i);
  if(o.help) return cp.execSync('less dehuskDir.md', {cwd: process.cwd(), stdio: STDIO});
  if(o.dirs.length<1) return error('No directory given!', o);
  for(var d of o.dirs)
    log(fs.dehuskDirSync(d, o.depth));
}

function options(o, k, a, i) {
  if(k==='--help') o.help = true;
  else if(k==='--silent') o.silent = true;
  else if(k==='-d' || k==='--depth') o.depth = parseInt(a[++i], 10);
  else o.dirs.push(a[i]);
  return i+1;
}

function log(v) {
    console.log(v);
}

function error(msg, o) {
  if(o.silent) return console.log(-1);
  console.error(`${CFMAGENTA}error:${CRESET}`, msg);
}
if(require.main===module) main(process.argv);
