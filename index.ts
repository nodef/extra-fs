import {join, basename, dirname, fromFileUrl} from "@std/path";
import {format, LF, EOL} from "@std/fs";
export * from "@std/fs";




//#region READ/WRITE FILES
/**
 * Read a text file and normalize line endings.
 * @param path file path or URL
 * @returns file text with normalized line endings
 */
export async function readTextFile(path: string | URL): Promise<string> {
  const data = await Deno.readTextFile(path);
  return format(data, LF);
}


/**
 * Read a text file and normalize line endings (synchronously).
 * @param path file path or URL
 * @returns file text with normalized line endings
 */
export function readTextFileSync(path: string | URL): string {
  const data = Deno.readTextFileSync(path);
  return format(data, LF);
}


/**
 * Write a text file and normalize line endings.
 * @param path file path or URL
 * @param text file text
 */
export async function writeTextFile(path: string | URL, text: string): Promise<void> {
  const data = format(text, EOL);
  await Deno.writeTextFile(path, data);
}


/**
 * Write a text file and normalize line endings (synchronously).
 * @param path file path or URL
 * @param text file text
 */
export function writeTextFileSync(path: string | URL, text: string): void {
  const data = format(text, EOL);
  Deno.writeTextFileSync(path, data);
}


/**
 * Read a JSON file and parse it.
 * @param path file path or URL
 * @returns parsed JSON data
 */
export async function readJsonFile(path: string | URL): Promise<unknown> {
  const text = await readTextFile(path);
  return JSON.parse(text);
}


/**
 * Read a JSON file and parse it (synchronously).
 * @param path file path or URL
 * @returns parsed JSON data
 */
export function readJsonFileSync(path: string | URL): unknown {
  const text = readTextFileSync(path);
  return JSON.parse(text);
}


/**
 * Write data to a JSON file.
 * @param path file path or URL
 * @param data data to write
 */
export function writeJsonFile(path: string | URL, data: unknown): Promise<void> {
  const text = JSON.stringify(data, null, 2) + LF;
  return writeTextFile(path, text);
}


/**
 * Write data to a JSON file (synchronously).
 * @param path file path or URL
 * @param data data to write
 */
export function writeJsonFileSync(path: string | URL, data: unknown): void {
  const text = JSON.stringify(data, null, 2) + LF;
  writeTextFileSync(path, text);
}
//#endregion




//#region UNWRAP DIRECTORY
/** Convert a path or URL to a path string. */
function toPath(path: string | URL): string {
  return path instanceof URL? fromFileUrl(path) : path;
}


/** Generate a temporary sibling path for a given path. */
function tempSibling(path: string): string {
  return join(dirname(path), `${basename(path)}.${crypto.randomUUID()}`);
}


/**
 * Remove outer one-item directories.
 * Given `dir/a/b/c/` where `a` and `b` each contain only one directory,
 * `unwrapDir("dir")` moves `c` up to `dir` and returns `"dir/a/b/c"`.
 * @param dir outer directory
 * @param depth maximum depth (-ve ⇒ all) [-1]
 * @returns seed directory (its path before it was moved)
 */
export async function unwrapDir(dir: string | URL, depth = -1): Promise<string> {
  const root = toPath(dir);
  let   seed = root;
  for (let d = depth < 0? Infinity : depth; d > 0; d--) {
    const entries = await Array.fromAsync(Deno.readDir(seed));
    if (entries.length !== 1 || !entries[0].isDirectory) break;
    seed = join(seed, entries[0].name);
  }
  if (seed === root) return seed;
  const tmp = tempSibling(root);
  await Deno.rename(seed, tmp);
  await Deno.remove(root, {recursive: true});
  await Deno.rename(tmp, root);
  return seed;
}


/**
 * Remove outer one-item directories (synchronously).
 * Given `dir/a/b/c/` where `a` and `b` each contain only one directory,
 * `unwrapDirSync("dir")` moves `c` up to `dir` and returns `"dir/a/b/c"`.
 * @param dir outer directory
 * @param depth maximum depth (-ve ⇒ all) [-1]
 * @returns seed directory (its path before it was moved)
 */
export function unwrapDirSync(dir: string | URL, depth = -1): string {
  const root = toPath(dir);
  let seed = root;
  for (let d = depth < 0? Infinity : depth; d > 0; d--) {
    const entries = [...Deno.readDirSync(seed)];
    if (entries.length !== 1 || !entries[0].isDirectory) break;
    seed = join(seed, entries[0].name);
  }
  if (seed === root) return seed;
  const tmp = tempSibling(root);
  Deno.renameSync(seed, tmp);
  Deno.removeSync(root, {recursive: true});
  Deno.renameSync(tmp, root);
  return seed;
}
//#endregion
