import {EOL}  from "os";
import {join} from "path";
import {PathLike, PathOrFileDescriptor} from "fs";
import {WriteFileOptions, WriteVResult} from "fs";
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




// BUILT-IN METHODS
// ================

// ACCESS
// ------

// Test a user's permissions for the file or directory.
export {accessSync} from "fs";
// Test a user's permissions for the file or directory.
export {access as accessAsync} from "fs/promises";


/**
 * Test a user's permissions for the file or directory.
 * @param path file or directory path
 * @param fn callback (err)
 */
export function access(path: PathLike, fn: NoParamCallback): void;

/**
 * Test a user's permissions for the file or directory.
 * @param path file or directory path
 * @param mode accessibility checks (R_OK, W_OK, X_OK)
 * @param fn callback (err)
 */
export function access(path: PathLike, mode: number, fn: NoParamCallback): void;

/**
 * Test a user's permissions for the file or directory.
 * @param path file or directory path
 * @param mode accessibility checks (R_OK, W_OK, X_OK)
 */
export function access(path: PathLike, mode?: number): Promise<void>;

export function access(path: PathLike, mode?: number | NoParamCallback, fn?: NoParamCallback): void | Promise<void> {
  if (typeof fn==="function") F.access(path, mode as number, fn);
  else if (typeof mode==="function") F.access(path, mode);
  else if (typeof mode==="number") return P.access(path, mode);
  return P.access(path);
}




// WRITE
// -----

export {writeSync} from "fs";

// function writeAsync(fd, buffer, offset, length, position, callback) {
//   F.write()
// }



// WRITE-FILE
// ----------

// Write data to the file, replacing the file if it already exists.
export {writeFileSync} from "fs";
// Write data to the file, replacing the file if it already exists.
export {writeFile as writeFileAsync} from "fs/promises";


/**
 * Write data to the file, replacing the file if it already exists.
 * @param file filename or file descriptor
 * @param data data to write
 * @param fn callback (err)
 */
export function writeFile(file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, fn: NoParamCallback): void;

/**
 * Write data to the file, replacing the file if it already exists.
 * @param file filename or file descriptor
 * @param data data to write
 * @param options options {encoding, mode, flag, signal}
 * @param fn callback (err)
 */
export function writeFile(file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions, fn: NoParamCallback): void;

/**
 * Write data to the file, replacing the file if it already exists.
 * @param file filename or file descriptor
 * @param data data to write
 * @param options options {encoding, mode, flag, signal}
 */
export function writeFile(file: PathLike, data: string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | NodeJS.ReadableStream, options: WriteFileOptions, fn: NoParamCallback): Promise<void>;

export function writeFile(file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options?: WriteFileOptions | NoParamCallback, fn?: NoParamCallback): void | Promise<void> {
  if (typeof fn==="function") F.writeFile(file, data, options as WriteFileOptions, fn);
  else if (typeof options==="function") F.writeFile(file, data, options);
  else return P.writeFile(file as PathLike, data, options);
}




// WRITEV
// ------

/**
 * Get results of writev().
 * @param err writev error
 * @param bytesWritten the number of bytes written
 * @param buffers a reference to the buffers input
 */
export type WriteVCallback = (err: NodeJS.ErrnoException, bytesWritten: number, buffers: NodeJS.ArrayBufferView[]) => void;


// Write an array of buffers to the file.
export {writevSync} from "fs";


/**
 * Write an array of buffers to the file.
 * @param fd file descriptior
 * @param buffers array of buffers
 * @param position offset from begining of file [current position]
 * @returns results {bytesWritten, buffers}
 */
export function writevAsync(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position?: number): Promise<WriteVResult> {
  return new Promise((resolve, reject) => {
    F.writev(fd, buffers, position, (err, bytesWritten) => {
      if (err) reject(err);
      else resolve({bytesWritten, buffers: buffers as any});
    });
  });
}


/**
 * Write an array of buffers to the file.
 * @param fd file descriptior
 * @param buffers array of buffers
 * @param fn callback (err, bytesWritten, buffers)
 */
export function writev(fd: number, buffers: readonly NodeJS.ArrayBufferView[], fn: WriteVCallback): void;

/**
 * Write an array of buffers to the file.
 * @param fd file descriptior
 * @param buffers array of buffers
 * @param position offset from begining of file [current position]
 * @param fn callback (err, bytesWritten, buffers)
 */
export function writev(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position: number, fn: WriteVCallback): void | Promise<WriteVResult>;

/**
 * Write an array of buffers to the file.
 * @param fd file descriptior
 * @param buffers array of buffers
 * @param position offset from begining of file [current position]
 * @returns results {bytesWritten, buffers}
 */
export function writev(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position?: number): Promise<WriteVResult>;

export function writev(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position?: number | WriteVCallback, fn?: WriteVCallback): void | Promise<WriteVResult> {
  if (typeof fn==="function") F.writev(fd, buffers, position as number, fn);
  else if (typeof position==="function") F.writev(fd, buffers, position);
  else return writevAsync(fd, buffers, position as number);
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
 */
export function exists(path: string, fn: ExistsCallback): void;

/**
 * Check if file or directory exists.
 * @param path file or directory path
 * @returns whether it exists
 */
export function exists(path: string): Promise<boolean>;

export function exists(path: string, fn?: ExistsCallback): void | Promise<boolean> {
  var p = existsAsync(path);
  if (fn) p.then(a => fn(null, a), fn);
  return p;
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




// DEHUSK
// ------

/** Get results of dehuskdir(). */
export type SeedCallback = (err: NodeJS.ErrnoException, seed?: string) => void;

/**
 * Remove outer one-item directories.
 * @param dir outer directory
 * @param depth maximum depth (-1 => all)
 * @returns seed directory
 */
export async function dehuskdirAsync(dir: string, depth: number=-1): Promise<string> {
  for (var seed=dir; depth>0; depth--) {
    var es = await P.readdir(seed, {withFileTypes: true});
    if (es.length===0 || es.length>1 || !es[0].isDirectory()) break;
    seed = join(seed, es[0].name);
  }
  if (seed===dir) return seed;
  var tmp = dir + Math.random();
  await P.rename(seed, tmp);
  await P.rmdir(dir);
  await P.rename(tmp, dir);
  return seed;
}


/**
 * Remove outer one-item directories.
 * @param dir outer directory
 * @param depth maximum depth (-1 => all)
 * @returns seed directory
 */
export function dehuskdirSync(dir: string, depth: number=-1): string {
  for (var seed=dir; depth>0; depth--) {
    var es = F.readdirSync(seed, {withFileTypes: true});
    if (es.length===0 || es.length>1 || !es[0].isDirectory()) break;
    seed = join(seed, es[0].name);
  }
  if (seed===dir) return seed;
  var tmp = dir + Math.random();
  F.renameSync(seed, tmp);
  F.rmdirSync(dir);
  F.renameSync(tmp, dir);
  return seed;
}


/**
 * Remove outer one-item directories.
 * @param dir outer directory
 * @param depth maximum depth (-1 => all)
 * @param fn callback (err, seed_directory)
 */
export function dehuskdir(dir: string, depth: number | SeedCallback, fn?: SeedCallback): void {
  var _fn    = arguments.length === 3? fn : depth as SeedCallback;
  var _depth = arguments.length === 3? depth as number : -1;
  dehuskdirAsync(dir, _depth).then(seed => _fn(null, seed), _fn);
}