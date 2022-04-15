import {EOL}  from "os";
import {join} from "path";
import {CopyOptions, NoParamCallback} from "fs"
import {constants as C} from "fs";
import * as F from "fs";
import * as P from "fs/promises";




// CLASSES
// =======

/** File system error. */
export class FsError extends Error implements NodeJS.ErrnoException {
  /** Error code. */
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }
}




// METHODS
// =======

// EXISTS
// ------
// ※ https://nodejs.org/api/fs.html#fsexistspath-callback
// ※ https://github.com/jprichardson/node-fs-extra/blob/master/docs/pathExists.md

/** Get results of exists(). */
export type ExistsCallback = (err: NodeJS.ErrnoException, exists?: boolean) => void;


/**
 * Check if file or directory exists.
 * @param path file or directory path
 * @returns whether it exists
 */
export async function existsAsync(path: string): Promise<boolean> {
  try { await P.access(path); return true; }
  catch { return false; }
}


// Check if file or directory exists.
export {existsSync} from "fs";


/**
 * Check if file or directory exists.
 * @param path file or directory path
 * @param fn callback (err, exists)
 * @returns whether it exists
 */
export function exists(path: string, fn: ExistsCallback): void {
  existsAsync(path).then(a => fn(null, a), fn);
}


/**
 * Assert that a file or directory exists.
 * @param path file or directory path
 */
export async function assertExistsAsync(path: string): Promise<void> {
  await P.access(path);
}


/**
 * Assert that a file or directory exists.
 * @param path file or directory path
 */
export function assertExistsSync(path: string): void {
  F.accessSync(path);
}


/**
 * Assert that a file or directory exists.
 * @param path file or directory path
 * @param fn callback (err)
 */
export function assertExists(path: string, fn: NoParamCallback): void {
  F.access(path, fn);
}


/**
 * Assert that a file or directory does not exist.
 * @param path file or directory path
 * @param err error code [ERR_FS_ENSURE_NOT_EXISTS_EEXIST]
 */
export async function assertNotExistsAsync(path: string, err?: string): Promise<void> {
  try { await P.access(path); } catch { return; }
  var message = `file or directory already exists, path "${path}"`;
  throw new FsError(err || "ERR_FS_ENSURE_NOT_EXISTS", message);
}


/**
 * Assert that a file or directory does not exist.
 * @param path file or directory path
 * @param err error code [ERR_FS_ENSURE_NOT_EXISTS_EEXIST]
 */
export function assertNotExistsSync(path: string, err?: string): void {
  try { F.accessSync(path); } catch { return; }
  var message = `file or directory already exists, path "${path}"`;
  throw new FsError(err || "ERR_FS_ENSURE_NOT_EXISTS", message);
}


/**
 * Assert that a file or directory does not exist.
 * @param path file or directory path
 * @param err error code [ERR_FS_ENSURE_NOT_EXISTS_EEXIST]
 * @param fn callback (err)
 */
export function assertNotExists(path: string, err: string | NoParamCallback, fn?: NoParamCallback): void {
  var _fn  = arguments.length === 3? fn : err as NoParamCallback;
  var _err = arguments.length === 3? err as string : null;
  F.access(path, e => {
    if (e != null) return _fn(null);
    var message = `file or directory already exists, path "${path}"`;
    _fn(new FsError(_err || "ERR_FS_ENSURE_NOT_EXISTS", message));
  });
}




// ACCESS?
// -------
// STAT?
// -----




// COPY
// ----
// ※ https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md
// ※ https://github.com/coderaiser/copy-symlink/blob/master/lib/copy-symlink.js
// ※ https://nodejs.org/api/fs.html#fscpsrc-dest-options-callback
// ※ https://nodejs.org/api/fs.html#fsrealpathpath-options-callback

/**
 * Copy file or directory from source to destination.
 * @param src source file or directory path
 * @param dest destination file or directory path
 * @param options copy options {dereference, errorOnExist, filter, ...}
 */
export async function copyAsync(src: string, dest: string, options?: CopyOptions): Promise<void> {
  var o = options || {};
  var s = o.dereference? await P.stat(src) : await P.lstat(src);
  if (s.isFile()) {
    var mode = o.force && !o.errorOnExist? 0 : C.COPYFILE_EXCL;
    await P.copyFile(src, dest, mode);
  }
  else if (s.isDirectory() && o.recursive) {
    await P.mkdir(dest, {recursive: o.force, mode: s.mode});
    for (var name of await P.readdir(src)) {
      var nsrc  = join(src, name);
      var ndest = join(dest, name);
      if (o.filter && !o.filter(nsrc, ndest)) continue;
      copyAsync(nsrc, ndest, o);
    }
  }
  else {
    var target = await P.realpath(src);
    await P.symlink(target, dest);
  }
  if (o.preserveTimestamps) await P.lutimes(dest, s.atime, s.mtime);
}


/**
 * Copy file or directory from source to destination.
 * @param src source file or directory path
 * @param dest destination file or directory path
 * @param options copy options {dereference, errorOnExist, filter, ...}
 */
export function copySync(src: string, dest: string, options?: CopyOptions): void {
  var o = options || {};
  var s = o.dereference? F.statSync(src) : F.lstatSync(src);
  if (s.isFile()) {
    var mode = o.force && !o.errorOnExist? 0 : C.COPYFILE_EXCL;
    F.copyFileSync(src, dest, mode);
  }
  else if (s.isDirectory() && o.recursive) {
    F.mkdirSync(dest, {recursive: o.force, mode: s.mode});
    for (var name of F.readdirSync(src)) {
      var nsrc  = join(src, name);
      var ndest = join(dest, name);
      if (o.filter && !o.filter(nsrc, ndest)) continue;
      copySync(nsrc, ndest, o);
    }
  }
  else {
    var target = F.realpathSync(src);
    F.symlinkSync(target, dest);
  }
  if (o.preserveTimestamps) F.lutimesSync(dest, s.atime, s.mtime);
}


/**
 * Copy file or directory from source to destination.
 * @param src source file or directory path
 * @param dest destination file or directory path
 * @param options copy options {dereference, errorOnExist, filter, ...}
 * @param fn callback (err)
 */
export function copy(src: string, dest: string, options: CopyOptions | NoParamCallback, fn?: NoParamCallback): void {
  var _fn = arguments.length === 4? fn : options as NoParamCallback;
  var _o  = arguments.length === 4? options as CopyOptions : null;
  copyAsync(src, dest, _o).then(() => _fn(null), _fn);
}




// MOVE
// ----
// ※ https://github.com/sindresorhus/move-file
// ※ https://github.com/jprichardson/node-fs-extra/blob/master/docs/move.md

/**
 * Move file from source to destination, even across partitions.
 * @param src source file path
 * @param dest destination file path
 * @param mode move mode (0, COPYFILE_EXCL) [0 ⇒ overwrite]
 */
export async function moveFileAsync(src: string, dest: string, mode: number=0): Promise<void> {
  if (mode & C.COPYFILE_EXCL) await assertNotExistsAsync(dest, "ERR_FS_MOVE_FILE_EEXIST");
  try { await P.rename(src, dest); }
  catch (e) {
    if (e.code !== "EXDEV") throw e;
    await P.copyFile(src, dest, mode);
    await P.unlink(src);
  }
}


/**
 * Move file from source to destination, even across partitions.
 * @param src source file path
 * @param dest destination file path
 * @param mode move mode (0, COPYFILE_EXCL) [0 ⇒ overwrite]
 */
export function moveFileSync(src: string, dest: string, mode: number=0): void {
  if (mode & C.COPYFILE_EXCL) assertNotExists(dest, "ERR_FS_MOVE_FILE_EEXIST");
  try { F.renameSync(src, dest); }
  catch (e) {
    if (e.code !== "EXDEV") throw e;
    F.copyFileSync(src, dest, mode);
    F.unlinkSync(src);
  }
}


/**
 * Move file from source to destination, even across partitions.
 * @param src source file path
 * @param dest destination file path
 * @param mode move mode (0, COPYFILE_EXCL) [0 ⇒ overwrite]
 * @param fn callback (err)
 */
export function moveFile(src: string, dest: string, mode?: number | NoParamCallback, fn?: NoParamCallback): void {
  var _fn   = arguments.length === 4? fn : mode as NoParamCallback;
  var _mode = arguments.length === 4? mode as number : 0;
  moveFileAsync(src, dest, _mode).then(() => _fn(null), _fn);
}


/**
 * Move file or directory from source to destination, even across partitions.
 * @param src source file or directory path
 * @param dest destination file or directory path
 * @param options move options {dereference, errorOnExist, filter, ...}
 */
export async function moveAsync(src: string, dest: string, options?: CopyOptions): Promise<void> {
  var o = options || {};
  if (o.errorOnExist) await assertNotExistsAsync(dest, "ERR_FS_MOVE_EEXIST");
  try { await P.rename(src, dest); }
  catch (e) {
    if (e.code !== "EXDEV") throw e;
    await copyAsync(src, dest, o);
    await P.rm(src, o);
  }
}


/**
 * Move file or directory from source to destination, even across partitions.
 * @param src source file or directory path
 * @param dest destination file or directory path
 * @param options move options {dereference, errorOnExist, filter, ...}
 */
export function moveSync(src: string, dest: string, options?: CopyOptions): void {
  var o = options || {};
  if (o.errorOnExist) assertNotExists(dest, "ERR_FS_MOVE_EEXIST");
  try { F.renameSync(src, dest); }
  catch (e) {
    if (e.code !== "EXDEV") throw e;
    copySync(src, dest, o);
    F.rmSync(src, o);
  }
}


/**
 * Move file or directory from source to destination, even across partitions.
 * @param src source file or directory path
 * @param dest destination file or directory path
 * @param options move options {dereference, errorOnExist, filter, ...}
 * @param fn callback (err)
 */
export function move(src: string, dest: string, options?: CopyOptions | NoParamCallback, fn?: NoParamCallback): void {
  var _fn = arguments.length === 4? fn : options as NoParamCallback;
  var _o  = arguments.length === 4? options as CopyOptions : null;
  moveAsync(src, dest, _o).then(() => _fn(null), _fn);
}




// TEXT
// ----
// ※ https://docs.microsoft.com/en-us/dotnet/api/system.io.file.readalltext
// ※ https://docs.microsoft.com/en-us/dotnet/api/system.io.file.writealltext

/** Get results of readFileText(). */
export type TextCallback = (err: NodeJS.ErrnoException, text?: string) => void;


/**
 * Read file text with Unix EOL.
 * @param path file path
 * @returns file text
 */
export async function readFileTextAsync(path: string): Promise<string> {
  var text = await P.readFile(path, "utf8");
  return text.replace(/\r?\n/g, "\n");
}


/**
 * Read file text with Unix EOL.
 * @param path file path
 * @returns file text
 */
export function readFileTextSync(path: string): string {
  var text = F.readFileSync(path, "utf8");
  return text.replace(/\r?\n/g, "\n");
}


/**
 * Read file text with Unix EOL.
 * @param path file path
 * @param fn callback (err, text)
 */
export function readFileText(path: string, fn: TextCallback): void {
  F.readFile(path, "utf8", (err, text) => {
    if (err != null) return fn(err);
    fn(null, text.replace(/\r?\n/g, "\n"));
  });
}


/**
 * Write file text with system EOL.
 * @param path file path
 * @param text file text
 */
export function writeFileTextAsync(path: string, text: string): Promise<void> {
  var text = text.replace(/\r?\n/g, EOL);
  return P.writeFile(path, text);
}


/**
 * Write file text with system EOL.
 * @param path file path
 * @param text file text
 */
export function writeFileTextSync(path: string, text: string): void {
  var text = text.replace(/\r?\n/g, EOL);
  return F.writeFileSync(path, text);
}


/**
 * Write file text with system EOL.
 * @param path file path
 * @param text file text
 * @param fn callback (err)
 */
export function writeFileText(path: string, text: string, fn: NoParamCallback): void {
  var text = text.replace(/\r?\n/g, EOL);
  F.writeFile(path, text, fn);
}




// JSON
// ----
// ※ https://github.com/jprichardson/node-fs-extra/blob/master/docs/readJson.md
// ※ https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson.md

/** Get results of readJson(). */
export type JsonCallback = (err: NodeJS.ErrnoException, json?: any) => void;


/**
 * Read JSON file as value.
 * @param path path of JSON file
 * @returns json value
 */
export async function readJsonAsync(path: string): Promise<any> {
  return JSON.parse(await readFileTextAsync(path));
}


/**
 * Read JSON file as value.
 * @param path path of JSON file
 * @returns json value
 */
export function readJsonSync(path: string): any {
  return JSON.parse(readFileTextSync(path));
}


/**
 * Read JSON file as value.
 * @param path path of JSON file
 * @param fn callback (err, json)
 */
export function readJson(path: string, fn: JsonCallback): void {
  readFileText(path, (err, text) => {
    if (err != null) return fn(err);
    fn(null, JSON.parse(text));
  });
}


/**
 * Write object to JSON file.
 * @param path path of JSON file
 * @param json json value
 */
export function writeJsonAsync(path: string, json: any): Promise<void> {
  return writeFileTextAsync(path, JSON.stringify(json, null, 2) + "\n");
}


/**
 * Write object to JSON file.
 * @param path path of JSON file
 * @param json json value
 */
export function writeJsonSync(path: string, json: any): void {
  writeFileTextSync(path, JSON.stringify(json, null, 2) + "\n");
}


/**
 * Write object to JSON file.
 * @param path path of JSON file
 * @param json json value
 * @param fn callback (err)
 */
export function writeJson(path: string, json: any, fn: NoParamCallback): void {
  writeFileText(path, JSON.stringify(json, null, 2) + "\n", fn);
}
