const fs = require('fs-extra');
const path = require('path');



async function dehuskDir(dir) {
  var ents = await fs.readdir(dir, {withFileTypes: true});
  if(ents.length===0 || ents.length>1 || ents[0].isFile()) return;
  var temp = dir+'.temp', seed = path.join(temp, ents[0].name);
  await fs.move(dir, temp);
  await fs.move(seed, dir);
  await fs.remove(temp);
}
fs.dehuskDir = dehuskDir;
module.exports = fs;
