const fs = require('fs-extra');
const path = require('path');
const os = require('os');

const PATH = E['PATH']||'';
const PATHEXT = (E['PATHEXT']||'').toLowerCase();
const WIN32 = os.platform()==='win32';
const PATHSEP = WIN32? ';':':';


function which(prog) {
  return new Promise((fres, frej) => _which(prog, fres));
}
function _which(prog, fn) {
  var map = new Map();
  var ps = PATH.split(PATHSEP);
  for(var i=0, j=0, I=ps.length; i<I; i++) {
    whichDir(prog, ps[i], map, err => {
      if(++j>=I) fn(Array.from(map.values()));
    });
  }
}
function whichDir(prog, dir, map, fn) {
  var isExe = WIN32? isExeWin32:isExeNix;
  fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if(err) return fn(err);
    for(var f of files) {
      if(!f.isFile()) continue;
      var base = path.basename(f.name);
      var p = path.join(dir, f.name);
      var p0 = map.get(base)||null;
      if(!prog.test(base)) continue;
      if(isExe(p, p0)) map.set(base, p);
    }
    fn(null);
  });
}
function isExeWin32(p1, p0) {
  var i0 = PATHEXT.indexOf(path.extname(p0||'f.zzz').toLowerCase());
  var i1 = PATHEXT.indexOf(path.extname(p1).toLowerCase());
  return i1>=0 && (i0<0 || i1<i0);
}
function isExeNix(p1) {
  return path.extname(p1)==='';
}


function dehuskDirSync(dir, depth=-1) {
  for(var seed=dir; depth; depth--) {
    var ents = fs.readdirSync(seed, {withFileTypes: true});
    if(ents.length===0 || ents.length>1 || ents[0].isFile()) break;
    seed = path.join(seed, ents[0].name);
  }
  if(seed===dir) return seed;
  var temp = dir+Math.random();
  fs.moveSync(seed, temp);
  fs.removeSync(dir);
  fs.moveSync(temp, dir);
  return seed;
}

async function dehuskDir(dir, depth=-1) {
  for(var seed=dir; depth; depth--) {
    var ents = await fs.readdir(seed, {withFileTypes: true});
    if(ents.length===0 || ents.length>1 || ents[0].isFile()) break;
    seed = path.join(seed, ents[0].name);
  }
  if(seed===dir) return seed;
  var temp = dir+Math.random();
  await fs.move(seed, temp);
  await fs.remove(dir);
  await fs.move(temp, dir);
  return seed;
}
fs.dehuskDirSync = dehuskDirSync;
fs.dehuskDir = dehuskDir;
module.exports = fs;
