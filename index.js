const fs = require('fs-extra');
const path = require('path');



function dehuskDirSync(dir, depth=-1) {
  for(var seed=dir; depth; depth--) {
    var ents = fs.readdirSync(dir, {withFileTypes: true});
    if(ents.length===0 || ents.length>1 || ents[0].isFile()) break;
    seed = path.join(seed, ents[0].name);
  }
  if(seed===dir) return seed;
  var temp = dir+Math.random();
  fs.moveSync(dir, temp);
  fs.moveSync(seed, dir);
  fs.removeSync(temp);
  return seed;
}

async function dehuskDir(dir, depth=-1) {
  for(var seed=dir; depth; depth--) {
    var ents = await fs.readdir(dir, {withFileTypes: true});
    if(ents.length===0 || ents.length>1 || ents[0].isFile()) break;
    seed = path.join(seed, ents[0].name);
  }
  if(seed===dir) return seed;
  var temp = dir+Math.random();
  await fs.move(dir, temp);
  await fs.move(seed, dir);
  await fs.remove(temp);
  return seed;
}
fs.dehuskDirSync = dehuskDirSync;
fs.dehuskDir = dehuskDir;
module.exports = fs;
