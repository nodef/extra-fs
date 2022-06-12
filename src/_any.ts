import {join}        from "path";
import {Mode}        from "fs";
import {PathLike}    from "fs";
import {CopyOptions} from "fs";
import {RmOptions}   from "fs";
import {NoParamCallback} from "fs";
import {constants as C}  from "fs";
import * as F from "fs";
import * as P from "fs/promises";
import {FsError} from "./_all";




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

export function access(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.access.apply(null, args);
  else return P.access.apply(null, args);
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




// CP
// --

// Copy source directory to destination, overwite if exists.
export {cpSync} from "fs";
// Copy source directory to destination, overwite if exists.
export {cp as cpAsync} from "fs/promises";


/**
 * Copy source directory to destination, overwite if exists.
 * @param src source path
 * @param dest destination path
 * @param callback callback (err)
 */
export function cp(src: string, dest: string, callback: NoParamCallback): void;

/**
 * Copy source directory to destination, overwite if exists.
 * @param src source path
 * @param dest destination path
 * @param options cp options
 * @param callback callback (err)
 */
export function cp(src: PathLike, dest: PathLike, options: CopyOptions, callback: NoParamCallback): void;

/**
 * Copy source directory to destination, overwite if exists.
 * @param src source path
 * @param dest destination path
 * @param options cp options
 */
export function cp(src: PathLike, dest: PathLike, options?: CopyOptions): Promise<void>;

export function cp(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.cp.apply(null, args);
  else return P.cp.apply(null, args);
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
  if (typeof fn==="function") existsAsync(path).then(a => fn(null, a), fn);
  else return existsAsync(path);
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
export function assertExists(path: string, fn: NoParamCallback): void;

/**
 * Assert that a file or directory exists.
 * @param path file or directory path
 */
export function assertExists(path: string): Promise<void>;

export function assertExists(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.access.apply(null, args);
  else return assertExistsAsync.apply(null, args);
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


function assertNotExistsCb(path: string, err: string | NoParamCallback, fn?: NoParamCallback): void {
  var _fn  = arguments.length === 3? fn : err as NoParamCallback;
  var _err = arguments.length === 3? err as string : null;
  F.access(path, e => {
    if (e != null) return _fn(null);
    var message = `file or directory already exists, path "${path}"`;
    _fn(new FsError(_err || "ERR_FS_ENSURE_NOT_EXISTS", message));
  });
}

/**
 * Assert that a file or directory does not exist.
 * @param path file or directory path
 * @param fn callback (err)
 */
export function assertNotExists(path: string, fn: NoParamCallback): void;

/**
 * Assert that a file or directory does not exist.
 * @param path file or directory path
 * @param err error code [ERR_FS_ENSURE_NOT_EXISTS_EEXIST]
 * @param fn callback (err)
 */
export function assertNotExists(path: string, err: string, fn: NoParamCallback): void;

/**
 * Assert that a file or directory does not exist.
 * @param path file or directory path
 * @param err error code [ERR_FS_ENSURE_NOT_EXISTS_EEXIST]
 */
export function assertNotExists(path: string, err?: string): Promise<void>;

export function assertNotExists(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") assertNotExistsCb.apply(null, args);
  else return assertNotExistsAsync.apply(null, args);
}




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
async function copyAsync(src: string, dest: string, options?: CopyOptions): Promise<void> {
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
function copySync(src: string, dest: string, options?: CopyOptions): void {
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
function copy(src: string, dest: string, options: CopyOptions | NoParamCallback, fn?: NoParamCallback): void {
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
async function moveFileAsync(src: string, dest: string, mode: number=0): Promise<void> {
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
function moveFileSync(src: string, dest: string, mode: number=0): void {
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
function moveFile(src: string, dest: string, mode?: number | NoParamCallback, fn?: NoParamCallback): void {
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
async function moveAsync(src: string, dest: string, options?: CopyOptions): Promise<void> {
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
function moveSync(src: string, dest: string, options?: CopyOptions): void {
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
function move(src: string, dest: string, options?: CopyOptions | NoParamCallback, fn?: NoParamCallback): void {
  var _fn = arguments.length === 4? fn : options as NoParamCallback;
  var _o  = arguments.length === 4? options as CopyOptions : null;
  moveAsync(src, dest, _o).then(() => _fn(null), _fn);
}




// ACCESS?
// -------
// STAT?
// -----
