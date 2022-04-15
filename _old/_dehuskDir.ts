import * as fs from 'fs';
import * as path from 'path';

function dehuskDirSync(dir: string, depth: number=-1): string {
  for(var seed=dir; depth; depth--) {
    var ents = fs.readdirSync(seed, {withFileTypes: true});
    if(ents.length===0 || ents.length>1 || ents[0].isFile()) break;
    seed = path.join(seed, ents[0].name);
  }
  if(seed===dir) return seed;
  var temp = dir+Math.random();
  fs.renameSync(seed, temp);
  fs.rmdirSync(dir);
  fs.renameSync(temp, dir);
  return seed;
}

/**
 * Removes outer one-item directories.
 * @param dir outer dir
 * @param n maximum depth (-1 => all)
 * @returns seed dir
 */
async function dehuskDir(dir: string, n: number=-1): Promise<string> {
  for(var seed=dir; n; n--) {
    var ents = await fs.promises.readdir(seed, {withFileTypes: true});
    if(ents.length===0 || ents.length>1 || ents[0].isFile()) break;
    seed = path.join(seed, ents[0].name);
  }
  if(seed===dir) return seed;
  var temp = dir+Math.random();
  await fs.promises.rename(seed, temp);
  await fs.promises.rmdir(dir);
  await fs.promises.rename(temp, dir);
  return seed;
}
export default dehuskDir;
