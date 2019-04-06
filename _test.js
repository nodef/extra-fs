const fs = require('./');
const path = require('path');



const ROOT = 'build';



async function onefile() {
  var dir = path.join(ROOT, 'onefile');
  var file = path.join(dir, 'file0.txt');
  await fs.mkdirp(dir);
  await fs.writeFile(file, 'line0');
  await fs.dehuskDir(dir);
  var ok = fs.existsSync(file);
  if(ok) console.log('onefile: passed');
  else throw new Error('onefile: failed');
}

async function multifile() {
  var dir = path.join(ROOT, 'multifile');
  var files = new Array(10).fill(0).map((v, i) => path.join(dir, `file${i}.txt`));
  await fs.mkdirp(dir);
  files.forEach((f, i) => fs.writeFile(f, `line0 of file${i}`));
  await fs.dehuskDir(dir);
  var ok = files.every(fs.existsSync);
  if(ok) console.log('multifile: passed');
  else throw new Error('multifile: failed');
}

async function onedir() {
  var dir = path.join(ROOT, 'onedir');
  var idir = path.join(dir, 'dir0');
  var files = new Array(10).fill(0).map((v, i) => path.join(idir, `file${i}.txt`));
  await fs.mkdirp(idir);
  files.forEach((f, i) => fs.writeFile(f, `line0 of file${i}`));
  await fs.dehuskDir(dir);
  var dfiles = new Array(10).map((v, i) => path.join(dir, `file${i}.txt`));
  var ok = !files.some(fs.existsSync) && dfiles.every(fs.existsSync);
  if(ok) console.log('onedir: passed');
  else throw new Error('onedir: failed');
}

async function multidir() {
  var dir = path.join(ROOT, 'multidir');
  var idirs = new Array(10).fill(0).map((v, i) => path.join(dir, `dir${i}`));
  await Promise.all(idirs.map(d => fs.mkdirp(d)));
  await fs.dehuskDir(dir);
  var ok = idirs.every(fs.existsSync);
  if(ok) console.log('multidir: passed');
  else throw new Error('multidir: failed');
}

async function test() {
  await onefile();
  await multifile();
  await onedir();
  await multidir();
}
test();
