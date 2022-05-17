import {EOL}  from "os";
import {join} from "path";
import {PathLike, PathOrFileDescriptor, TimeLike} from "fs";
import {Mode, Stats, BigIntStats, StatOptions} from "fs";
import {MakeDirectoryOptions, EncodingOption, OpenMode} from "fs";
import {OpenDirOptions, Dir, ReadAsyncOptions, ReadPosition, Dirent} from "fs";
import {RmOptions, RmDirOptions} from "fs";
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
 * @param callback callback (err)
 */
export function access(path: PathLike, callback: NoParamCallback): void;

/**
 * Test a user's permissions for the file or directory.
 * @param path file or directory path
 * @param mode accessibility checks (R_OK, W_OK, X_OK)
 * @param callback callback (err)
 */
export function access(path: PathLike, mode: number, callback: NoParamCallback): void;

/**
 * Test a user's permissions for the file or directory.
 * @param path file or directory path
 * @param mode accessibility checks (R_OK, W_OK, X_OK)
 */
export function access(path: PathLike, mode?: number): Promise<void>;

export function access(path: PathLike, mode?: number | NoParamCallback, callback?: NoParamCallback): void | Promise<void> {
  if  (typeof callback==="function") F.access(path, mode as number, callback);
  else if (typeof mode==="function") F.access(path, mode);
  else if (typeof mode==="number") return P.access(path, mode);
  return P.access(path);
}




// APPEND-FILE
// -----------

// Append data to a file, creating the file if it does not yet exist.
export {appendFileSync} from "fs";
// Append data to a file, creating the file if it does not yet exist.
export {appendFile as appendFileAsync} from "fs/promises";


/**
 * Append data to a file, creating the file if it does not yet exist.
 * @param path filename or file descriptor
 * @param data string or buffer data
 * @param callback callback (err)
 */
export function appendFile(path: PathOrFileDescriptor, data: string | Uint8Array, callback: NoParamCallback): void;

/**
 * Append data to a file, creating the file if it does not yet exist.
 * @param path filename or file descriptor
 * @param data string or buffer data
 * @param options write options {encoding, mode, flag}
 * @param callback callback (err)
 */
export function appendFile(path: PathOrFileDescriptor, data: string | Uint8Array, options: WriteFileOptions, callback: NoParamCallback): void;

/**
 * Append data to a file, creating the file if it does not yet exist.
 * @param path filename or file descriptor
 * @param data string or buffer data
 * @param options write options {encoding, mode, flag}
 */
export function appendFile(path: PathOrFileDescriptor, data: string | Uint8Array, options?: WriteFileOptions): Promise<void>;

export function appendFile(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.appendFile.apply(null, args);
  else return P.appendFile.apply(null, args);
}




// CHMOD
// -----

// Change the permissions of a file.
export {chmodSync} from "fs";
// Change the permissions of a file.
export {chmod as chmodAsync} from "fs/promises";


/**
 * Change the permissions of a file.
 * @param path filename
 * @param mode file mode
 * @param callback callback (err)
 */
export function chmod(path: PathLike, mode: Mode, callback: NoParamCallback): void;

/**
 * Change the permissions of a file.
 * @param path filename
 * @param mode file mode
 */
export function chmod(path: PathLike, mode: Mode): Promise<void>;

export function chmod(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.chmod.apply(null, args);
  else return P.chmod.apply(null, args);
}




// CHOWN
// -----

// Change owner and group of a file.
export {chownSync} from "fs";
// Change owner and group of a file.
export {chown as chownAsync} from "fs/promises";


/**
 * Change owner and group of a file.
 * @param path filename
 * @param uid user id
 * @param gid group id
 * @param callback callback (err)
 */
export function chown(path: PathLike, uid: number, gid: number, callback: NoParamCallback): void;

/**
 * Change owner and group of a file.
 * @param path filename
 * @param uid user id
 * @param gid group id
 */
export function chown(path: PathLike, uid: number, gid: number): Promise<void>;

export function chown(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.chown.apply(null, args);
  else return P.chown.apply(null, args);
}




// COPY-FILE
// ---------

// Copy source file to destination. By default, destination is overwritten if it already exists.
export {copyFileSync} from "fs";
// Copy source file to destination. By default, destination is overwritten if it already exists.
export {copyFile as copyFileAsync} from "fs/promises";


/**
 * Copy source file to destination. By default, destination is overwritten if it already exists.
 * @param src source filename to copy
 * @param dest destination filename of the copy operation
 * @param callback callback (err)
 */
export function copyFile(src: PathLike, dest: PathLike, callback: NoParamCallback): void;

/**
 * Copy source file to destination. By default, destination is overwritten if it already exists.
 * @param src source filename to copy
 * @param dest destination filename of the copy operation
 * @param mode modifiers for copy operation
 * @param callback callback (err)
 */
export function copyFile(src: PathLike, dest: PathLike, mode: number, callback: NoParamCallback): void;

/**
 * Copy source file to destination. By default, destination is overwritten if it already exists.
 * @param src source filename to copy
 * @param dest destination filename of the copy operation
 * @param mode modifiers for copy operation
 */
export function copyFile(src: PathLike, dest: PathLike, mode?: number): Promise<void>;

export function copyFile(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.copyFile.apply(null, args);
  else return P.copyFile.apply(null, args);
}




// CP
// --

// Copy entire directory structure from source to destination. When copying a directory, behaviour is similar to `cp src/ dest/`.
export {cpSync} from "fs";
// Copy entire directory structure from source to destination. When copying a directory, behaviour is similar to `cp src/ dest/`.
export {cp as cpAsync} from "fs/promises";


/**
 * Copy source file to destination. By default, destination is overwritten if it already exists.
 * @param src source path to copy
 * @param dest destination path to copy to
 * @param callback callback (err)
 */
export function cp(src: string, dest: string, callback: NoParamCallback): void;

/**
 * Copy source file to destination. By default, destination is overwritten if it already exists.
 * @param src source filename to copy
 * @param dest destination filename of the copy operation
 * @param options copy options
 * @param callback callback (err)
 */
export function cp(src: PathLike, dest: PathLike, options: CopyOptions, callback: NoParamCallback): void;

/**
 * Copy source file to destination. By default, destination is overwritten if it already exists.
 * @param src source filename to copy
 * @param dest destination filename of the copy operation
 * @param options copy options
 */
export function cp(src: PathLike, dest: PathLike, options?: CopyOptions): Promise<void>;

export function cp(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.cp.apply(null, args);
  else return P.cp.apply(null, args);
}




// CREATE-(READ/WRITE)-STREAM
// --------------------------

export {createReadStream}  from "fs";
export {createWriteStream} from "fs";




// READ-FILE
// ---------

/**
 * Get results of readFile().
 * @param err error
 * @param data contents of file
 */
export type ReadFileCallback = (err: NodeJS.ErrnoException, data: string | Buffer) => void;


// Read the entire contents of a file.
export {readFileSync} from "fs";
// Read the entire contents of a file.
export {readFile as readFileAsync} from "fs/promises";


/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param callback callback (err, data)
 */
export function readFile(path: PathOrFileDescriptor, callback: ReadFileCallback): void;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 * @param callback callback (err, data)
 */
export function readFile(path: PathOrFileDescriptor, options: any, callback: ReadFileCallback): void;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 * @returns contents of file
 */
export function readFile(path: PathOrFileDescriptor, options?: any): Promise<string | Buffer>;

export function readFile(...args: any[]): void | Promise<string | Buffer> {
  if (typeof args[args.length-1]==="function") F.readFile.apply(null, args);
  else return P.readFile.apply(null, args);
}




// RENAME
// ------

// Rename/move a file or directory.
export {renameSync} from "fs";
// Rename/move a file or directory.
export {rename as renameAsync} from "fs/promises";


/**
 * Rename/move a file or directory.
 * @param src source path to rename
 * @param dest destination path to rename to
 * @param callback callback (err)
 */
export function rename(src: PathLike, dest: PathLike, callback: NoParamCallback): void;

/**
 * Rename/move a file or directory.
 * @param src source filename to copy
 * @param dest destination filename of the copy operation
 */
export function rename(src: PathLike, dest: PathLike): Promise<void>;

export function rename(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.rename.apply(null, args);
  else return P.rename.apply(null, args);
}




// RM
// --

// Remove a file or directory.
export {rmSync} from "fs";
// Remove a file or directory.
export {rm as rmAsync} from "fs/promises";


/**
 * Remove a file or directory.
 * @param path object to remove
 * @param callback callback (err)
 */
export function rm(path: PathLike, callback: NoParamCallback): void;

/**
 * Remove a file or directory.
 * @param path object to remove
 * @param options rm options
 * @param callback callback (err)
 */
export function rm(path: PathLike, options: RmOptions, callback: NoParamCallback): void;

/**
 * Remove a file or directory.
 * @param path object to remove
 * @param options rm options
 */
export function rm(path: PathLike, options?: RmOptions): Promise<void>;

export function rm(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.rm.apply(null, args);
  else return P.rm.apply(null, args);
}




// STAT
// ----

/** Get results of [f/l]stat(). */
export type StatCallback<T = Stats | BigIntStats> = (err: NodeJS.ErrnoException, stats?: T) => void;

// Get file status.
export {statSync} from "fs";
// Get file status.
export {stat as statAsync} from "fs/promises";


/**
 * Get file status.
 * @param path file path
 * @param callback callback (err, stats)
 */
export function stat(path: PathLike, callback: StatCallback): void;

/**
 * Get file status.
 * @param path file path
 * @param options stat options
 * @param callback callback (err, stats)
 */
export function stat(path: PathLike, options: StatOptions, callback: StatCallback): void;

/**
 * Get file status.
 * @param path file path
 * @param options stat options
 */
export function stat(path: PathLike, options?: StatOptions): Promise<Stats | BigIntStats>;

export function stat(...args: any[]): void | Promise<Stats | BigIntStats> {
  if (typeof args[args.length-1]==="function") F.stat.apply(null, args);
  else return P.stat.apply(null, args);
}




// TRUNCATE
// --------

// Shorten a file (truncate).
export {truncateSync} from "fs";
// Shorten a file (truncate).
export {truncate as truncateAsync} from "fs/promises";


/**
 * Shorten a file (truncate).
 * @param path file path
 * @param callback callback (err)
 */
export function truncate(path: PathLike, callback: NoParamCallback): void;

/**
 * Shorten a file (truncate).
 * @param path file path
 * @param len maximum length of file
 * @param callback callback (err)
 */
export function truncate(path: PathLike, len: number, callback: NoParamCallback): void;

/**
 * Shorten a file (truncate).
 * @param path file path
 * @param len maximum length of file [0]
 */
export function truncate(path: number, len?: number): Promise<void>;

export function truncate(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.truncate.apply(null, args);
  else return P.truncate.apply(null, args);
}




// UNLINK
// ------

// Remove a file or symbolic link.
export {unlinkSync} from "fs";
// Remove a file or symbolic link.
export {unlink as unlinkAsync} from "fs/promises";


/**
 * Remove a file or symbolic link.
 * @param path file path
 * @param callback callback (err)
 */
export function unlink(path: PathLike, callback: NoParamCallback): void;

/**
 * Remove a file or symbolic link.
 * @param path file path
 */
export function unlink(path: PathLike): Promise<void>;

export function unlink(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.unlink.apply(null, args);
  else return P.unlink.apply(null, args);
}




// UTIMES
// ------

// Change the file system timestamps of an object.
export {utimesSync} from "fs";
// Change the file system timestamps of an object.
export {utimes as utimesAsync} from "fs/promises";


/**
 * Change the file system timestamps of an object.
 * @param path file path
 * @param atime last access time
 * @param mtime last modified time
 * @param callback callback (err)
 */
export function utimes(path: PathLike, atime: TimeLike, mtime: TimeLike, callback: NoParamCallback): void;

/**
 * Change the file system timestamps of an object.
 * @param path file path
 * @param atime last access time
 * @param mtime last modified time
 */
export function utimes(path: PathLike, atime: TimeLike, mtime: TimeLike): Promise<void>;

export function utimes(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.utimes.apply(null, args);
  else return P.utimes.apply(null, args);
}




// WATCH
// -----

// Watch for changes on file.
export {watchFile} from "fs";
// Stop watching for changes on file.
export {unwatchFile} from "fs";
// Watch for changes on file or directory.
export {watch} from "fs";




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
