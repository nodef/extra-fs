const fs = require('fs-extra');
const path = require('path');
const os = require('os');

// Global variables
const E = process.env;
const WALKOPT = {
  root: process.cwd(),
  traversal: 'bfs',
  depth: -1,
  filter: null,
};
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





function findDfs(dir, filter, depth, ans, fn) {
  if(depth===0) return fn(null, ans);
  fs.readdir(dir, {withFileTypes: true}, (err, entries) => {
    if(err) return fn(err);
    for(var e of entries) {
      var p = path.join(dir, e.name);
      var v = {path: p, entry: e};
      if(!filter(v)) continue;
      ans.push([v]);

    }
  });
}

/**
 * Walk entries within a root directory (synchronously).
 * @param {RegExp|function} ent entry to traverse
 * @param {object?} opt options {root, traversal, depth}
 */
function walkSync(ent, opt) {
  var o = walkOptions(ent, opt);
  if(o.traversal==='bfs') return walkBfsSync([o.root], o.filter, o.depth, []);
  else return walkDfsSync(o.root, o.filter, o.depth, []);
}

function walkOptions(ent, opt) {
  var o = Object.assign({}, WALKOPT, opt);
  if(typeof ent==='function') o.filter = ent;
  else o.filter = e => ({path, entry}) => ent.test(path);
  return o;
}

function walkBfsSync(dirs, filter, depth, ans) {
  if(depth===0 || dirs.length===0) return ans;
  var subdirs = [];
  for(var dir of dirs) {
    for(var e of fs.readdirSync(dir, {withFileTypes: true})) {
      var p = path.join(dir, e.name);
      var v = {path: p, entry: e};
      if(!filter(v)) continue;
      ans.push(v);
      if(!e.isDirectory()) continue;
      subdirs.push(p);
    }
  }
  return walkBfsSync(subdirs, filter, depth-1, ans);
}

function walkDfs(dir, filter, depth, ans, fn) {
  if(depth===0) return fn(null, ans);
  fs.readdir(dir, {withFileTypes: true}, (err, entries) => {
    if(err) return fn(err);
    var i = entries.length;
    for(var e of entries) {
      var p = path.join(dir, e.name);
      var v = {path: p, entry: e};
      if(!filter(v)) continue;
      ans.push([v]);
      if(!e.isDirectory()) { --i; continue;}
      var af = [];
      ans.push(af);
      walkDfs(p, filter, depth-1, af, (err) => {
        if(err) return fn(err);
        if(--i>0) return;
        fn(null, ans.flat(Number.MAX_SAFE_INTEGER));
      });
    }
    if(i>0)  return;
    fn(null, ans.flat(Number.MAX_SAFE_INTEGER));
  });
}

function walkDfsSync(dir, filter, depth, ans) {
  if(depth===0) return ans;
  var entries = fs.readdirSync(dir, {withFileTypes: true});
  return walkStep(dir, entries, filter, ans, null, dir => {
    walkDfsSync(dir, filter, depth-1, ans);
  });
}

function walkStep(dir, entries, filter, ans, subdirs, fn) {
  for(var e of entries) {
    var p = path.join(dir, e.name);
    var v = {path: p, entry: e};
    if(!filter(v)) continue;
    ans.push(v);
    if(!e.isDirectory()) continue;
    if(subdirs) subdirs.push(p);
    if(fn) fn(p);
  }
  return ans;
}


/**
 * Removes matching files or directories (asynchronously).
 * @param {string|RegExp|function} pth path to remove
 * @param {object?} opt options {root, maxRetries, retryDelay}
 * @param {function?} fn callback function (err)
 * @returns {Promise} on completion
 */
function remove(pth, opt, fn) {
  fn = fn||typeof opt==='function'? opt:null;
  opt = typeof opt==='object'? opt:null;
  var o = removeOptions(pth, opt);
  return new Promise((fres, frej) => {
    removeFilter(o.root, o.filter, o, err => {
      if(fn) fn(err);
      return err? frej(err):fres();
    });
  });
}

/**
 * Removes matching files or directories (synchronously).
 * @param {string|RegExp|function} pth path to remove
 * @param {object?} opt options {root, maxRetries, retryDelay}
 */
function removeSync(pth, opt) {
  var o = removeOptions(pth, opt);
  removeFilterSync(o.root, o.filter, o);
}

function removeOptions(pth, opt) {
  var o = Object.assign({}, REMOVEOPT, opt);
  o.root = o.root||process.cwd();
  if(typeof pth==='function') o.filter = pth;
  else if(typeof pth==='string') o.filter = ({path, entry}) => path===pth;
  else o.filter = ({path, entry}) => pth.test(path);
  return o;
}

function removeFilter(pth, filter, opt, fn) {
  fs.stat(pth, (err, s) => {
    if(err) return fn(err);
    if(s.isDirectory()) rmdirFilter(pth, filter, opt, fn);
    else if(filter(v)) fs.unlink(pth, fn);
  });
}

function removeFilterSync(pth, filter, opt) {
  var s = fs.statSync(pth);
  if(s.isDirectory()) rmdirFilterSync(pth, filter, opt);
  else if(filter(v)) fs.unlinkSync(pth);
}

function rmdirFilter(dir, filter, opt, fn) {
  var work = 0;
  var done = err => {
    if(err) { work = -1; if(work>0) fn(err); }
    else if(work===0) fn(null);
  };
  fs.readdir(dir, {withFileTypes: true}, (err, entries) => {
    if(err) return fn(err);
    for(var e of entries) {
      var p = path.join(dir, e.name);
      var v = {path: p, entry: e};
      if(filter(v)) {
        work++;
        if(e.isFile()) fs.unlink(p, done);
        else if(e.isDirectory()) fs.rmdir(p, opt, done);
      }
      else if(e.isDirectory()) {
        work++;
        rmdirFilter(p, filter, opt, done);
      }
    }
  });
}

function rmdirFilterSync(dir, filter, opt) {
  var entries = fs.readdirSync(dir, {withFileTypes: true});
  for(var e of entries) {
    var p = path.join(dir, e.name);
    var v = {path: p, entry: e};
    if(filter(v)) {
      if(e.isFile()) fs.unlinkSync(p);
      else if(e.isDirectory()) fs.rmdirSync(p, opt);
    }
    else if(e.isDirectory()) rmdirFilterSync(p, filter, opt);
  }
}



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
fs.dehuskDir = dehuskDir;
fs.dehuskDirSync = dehuskDirSync;
fs.remove = remove;
fs.removeSync = removeSync;
fs.which = which;
fs.whichSync = whichSync;
module.exports = fs;
