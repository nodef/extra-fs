const fs = require('fs-extra');
const path = require('path');
const os = require('os');

// Global variables
const E = process.env;
const WIN32 = os.platform()==='win32';
const PATHSEP = WIN32? ';':':';
const PATHS = (E['PATH']||'').split(PATHSEP);
const PATHEXT = (E['PATHEXT']||'').toLowerCase();
const WHICHOPT = {
  cwd: process.cwd(),
  paths: PATHS,
  platform: os.platform(),  
  exefn: null,
  progfn: null,
};



/**
 * Locates executable path of programs (asynchronous).
 * @param {string|RegExp|function} prog program name to look for
 * @param {object?} opt options {cwd, paths, platform}
 * @param {function?} fn callback (err, ans)
 * @returns {Promise<Map>} map of {program -> executable path}
 */
function which(prog, opt, fn) {
  fn = fn||typeof opt==='function'? opt:null;
  opt = typeof opt==='object'? opt:null;
  var o = whichOptions(prog, opt);
  return new Promise((fres, frej) => {
    _which(o.paths, o.progfn, o.exefn, new Map(), (err, ans) => {
      if(fn) fn(err, ans);
      return err? frej(err):fres(ans);
    });
  });
}
function _which(paths, isProg, isExe, ans, fn) {
  var reads = new Array(paths.length).fill(null);
  for(var i=0, j=0, I=paths.length; i<I; i++) (i => {
    fs.readdir(paths[i], {withFileTypes: true}, (err, entries) => {
      reads[i] = err? []:entries;
      for(; j<I && reads[j]!==null; j++)
        whichEntries(paths[j], reads[j], isProg, isExe, ans);
      if(j>=I) fn(null, ans);
    });
  })(i);
}

/**
 * Locates executable path of programs (synchronous).
 * @param {string|RegExp|function} prog program name to look for
 * @param {object?} opt options {cwd, paths, platform}
 * @returns {Map} map of {program -> executable path}
 */
function whichSync(prog, opt) {
  var o = whichOptions(prog, opt);
  return _whichSync(o.paths, o.progfn, o.exefn, new Map());
}
function _whichSync(paths, isProg, isExe, ans) {
  for(var p of paths) { try {
    var entries = fs.readdirSync(p, {withFileTypes: true});
    whichEntries(p, entries, isProg, isExe, ans);
  } catch (e) {}}
  return ans;
}

function whichOptions(prog, opt) {
  var o = Object.assign({}, WHICHOPT, opt);
  o.paths = o.paths||[o.cwd, ...PATHS];
  o.exefn = o.exefn||o.platform==='win32'? isExeWin32:isExeNix;
  if(typeof prog==='function') o.progfn = prog;
  else if(typeof prog==='string') o.progfn = name => name===prog;
  else o.progfn = name => prog.test(name);
  return o;
}
function whichEntries(dir, entries, isProg, isExe, ans) {
  var prios = new Map();
  for(var e of entries) {
    if(!e.isFile()) continue;
    var base = path.basename(e.name);
    var ext = path.extname(e.name);
    var name = base.substr(0, base.length-ext.length); 
    var full = path.join(dir, e.name);
    var prio = isExe(full);
    if(prio<0 || prio>=(prios.get(name)||1024)) continue;
    if(!isProg(name)) continue;
    ans.set(name, full);
    prios.set(prio);
  }
}
function isExeWin32(p) {
  return PATHEXT.indexOf(path.extname(p).toLowerCase()||'.zzz');
}
function isExeNix(p) {
  return path.extname(p)===''? 0:-1;
}



/**
 * Removes extra outer directories, say after extracting zip (asynchronous).
 * @param {string} dir outermost directory
 * @param {number?} depth max. extra directories to remove (default -1 => unlimited)
 * @param {function?} fn callback function (error, seed_directory)
 * @returns {Promise<string>} seed directory
 */
function dehuskDir(dir, depth, fn) {
  fn = fn||(typeof depth==='function'? depth:null);
  depth = typeof depth==='number'? depth:-1;
  return _dehuskDir(dir, depth).then(seed => {
    if(fn) fn(null, seed);
  }, err => { fn(err, null); throw err; });
}
async function _dehuskDir(dir, depth=-1) {
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

/**
 * Removes extra outer directories, say after extracting zip (synchronous).
 * @param {string} dir outermost directory
 * @param {number?} depth max. extra directories to remove (default -1 => unlimited)
 * @returns {string} seed directory
 */
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
fs.which = which;
fs.whichSync = whichSync;
fs.dehuskDirSync = dehuskDirSync;
fs.dehuskDir = dehuskDir;
module.exports = fs;
