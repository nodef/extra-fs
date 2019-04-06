const fs = require('fs-extra');
const path = require('path');



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
