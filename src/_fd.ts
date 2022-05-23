import {PathLike} from "fs";
import {TimeLike} from "fs";
import {OpenMode} from "fs";
import {Mode}     from "fs";
import {Stats}            from "fs";
import {BigIntStats}      from "fs";
import {StatOptions}      from "fs";
import {ReadPosition}     from "fs";
import {ReadAsyncOptions} from "fs";
import {ReadVResult}      from "fs";
import {WriteVResult}     from "fs";
import {NoParamCallback}  from "fs";
import * as F from "fs";
import * as P from "fs/promises";
import {StatCallback} from "./_all";




// OPEN
// ----

/**
 * Get results of open().
 * @param err open error
 * @param fd file descriptor
 */
export type OpenCallback = (err: NodeJS.ErrnoException, fd?: number) => void;


// Open a file.
export {openSync} from "fs";
// Open a file.
export {open as openAsync} from "fs/promises";


/**
 * Open a file.
 * @param path file path
 * @param callback callback (err, fd)
 */
export function open(path: PathLike, callback: OpenCallback): void;

/**
 * Open a file.
 * @param path file path
 * @param flags open flags (r, w, a, x, s, +)
 * @param callback callback (err, fd)
 */
export function open(path: PathLike, flags: OpenMode, callback: OpenCallback): void;

/**
 * Open a file.
 * @param path file path
 * @param flags open flags (r, w, a, x, s, +)
 * @param mode set file mode (permission and sticky bits) [0o666 ⇒ RW]
 * @param callback callback (err, fd)
 */
export function open(path: PathLike, flags: OpenMode, mode: Mode, callback: OpenCallback): void;

/**
 * Open a file.
 * @param path file path
 * @param flags open flags (r, w, a, x, s, +) [r]
 * @param mode set file mode (permission and sticky bits) [0o666 ⇒ RW]
 */
export function open(path: PathLike, flags?: OpenMode, mode?: Mode): Promise<number>;

export function open(...args: any[]): void | Promise<number> {
  if (typeof args[args.length-1]==="function") F.open.apply(null, args);
  else return P.open.apply(null, args);
}




// CLOSE
// -----

// Close a file.
export {closeSync} from "fs";


/**
 * Close a file.
 * @param fd file descriptor
 */
 export function closeAsync(fd: number): Promise<void> {
  return new Promise((resolve, reject) => {
    F.close(fd, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


/**
 * Close a file.
 * @param fd file descriptor
 * @param callback callback (err)
 */
export function close(fd: number, callback: NoParamCallback): void;

/**
 * Close a file.
 * @param fd file descriptor
 */
export function close(fd: number): Promise<void>;

export function close(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.close.apply(null, args);
  else return closeAsync.apply(null, args);
}




// READ
// ----

/** Results of read(). */
export interface ReadResult<B = NodeJS.ArrayBufferView> {
  /** Number of bytes read. */
  bytesRead: number,
  /** Output buffer. */
  buffer: B,
}


/**
 * Get results of read().
 * @param err read error
 * @param bytesRead number of bytes read
 * @param buffer output buffer
 */
export type ReadCallback<B = NodeJS.ArrayBufferView> = (err: NodeJS.ErrnoException, bytesRead?: number, buffer?: B) => void;


// Read data from a file.
export {readSync} from "fs";


/**
 * Read data from a file.
 * @param fd file descriptor
 * @param buffer output buffer [Buffer.alloc(16384)]
 * @param offset buffer offset [0]
 * @param length read length [buffer.length - offset]
 * @param position file position [null ⇒ current]
 * @returns read status {bytesRead, buffer}
 */
export function readAsync(fd: number, buffer?: NodeJS.ArrayBufferView, offset?: number, length?: number, position?: ReadPosition | null): Promise<ReadResult>;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param options read options {buffer, offset, length, position}
 * @returns read status {bytesRead, buffer}
 */
export function readAsync<B extends NodeJS.ArrayBufferView = NodeJS.ArrayBufferView>(fd: number, options?: ReadAsyncOptions<B>): Promise<ReadResult<B>>;

export function readAsync(...args: any[]): Promise<ReadResult> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    F.read(...args, (err: NodeJS.ErrnoException, bytesRead: number, buffer: NodeJS.ArrayBufferView) => {
      if (err) reject(err);
      else resolve({bytesRead, buffer});
    });
  });
}


/**
 * Read data from a file.
 * @param fd file descriptor
 * @param callback callback (err, bytesRead, buffer)
 */
export function read(fd: number, callback: ReadCallback): void;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param buffer output buffer [Buffer.alloc(16384)]
 * @param callback callback (err, bytesRead, buffer)
 */
export function read(fd: number, buffer: NodeJS.ArrayBufferView, callback: ReadCallback): void;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param buffer output buffer [Buffer.alloc(16384)]
 * @param offset buffer offset [0]
 * @param callback callback (err, bytesRead, buffer)
 */
export function read(fd: number, buffer: NodeJS.ArrayBufferView, offset: number, callback: ReadCallback): void;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param buffer output buffer [Buffer.alloc(16384)]
 * @param offset buffer offset [0]
 * @param length read length [buffer.length - offset]
 * @param callback callback (err, bytesRead, buffer)
 */
export function read(fd: number, buffer: NodeJS.ArrayBufferView, offset: number, length: number, callback: ReadCallback): void;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param buffer output buffer [Buffer.alloc(16384)]
 * @param offset buffer offset [0]
 * @param length read length [buffer.length - offset]
 * @param position file position [null ⇒ current]
 * @param callback callback (err, bytesRead, buffer)
 */
export function read(fd: number, buffer: NodeJS.ArrayBufferView, offset: number, length: number, position: ReadPosition | null, callback: ReadCallback): void;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param options read options {buffer, offset, length, position}
 * @param callback callback (err, bytesRead, buffer)
 */
export function read<B extends NodeJS.ArrayBufferView>(fd: number, options: ReadAsyncOptions<B>, callback: ReadCallback<B>): void;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param buffer output buffer [Buffer.alloc(16384)]
 * @param offset buffer offset [0]
 * @param length read length [buffer.length - offset]
 * @param position file position [null ⇒ current]
 * @returns read status {bytesRead, buffer}
 */
export function read(fd: number, buffer?: NodeJS.ArrayBufferView, offset?: number, length?: number, position?: ReadPosition | null): Promise<ReadResult>;

/**
 * Read data from a file.
 * @param fd file descriptor
 * @param options read options {buffer, offset, length, position}
 * @returns read status {bytesRead, buffer}
 */
export function read<B extends NodeJS.ArrayBufferView = NodeJS.ArrayBufferView>(fd: number, options?: ReadAsyncOptions<B>): Promise<ReadResult<B>>;

export function read(...args: any[]): void | Promise<ReadResult> {
  if (typeof args[args.length-1]==="function") F.read.apply(null, args);
  else return readAsync.apply(null, args);
}




// WRITE
// -----

export interface WriteResult<B = NodeJS.ArrayBufferView> {
  /** Number of bytes writtem. */
  bytesWritten: number,
  /** Input buffer. */
  buffer: B,
}


/**
 * Get results of write().
 * @param err write error
 * @param bytesWritten number of bytes written
 * @param buffer input buffer
 */
export type WriteCallback<B = NodeJS.ArrayBufferView> = (err: NodeJS.ErrnoException, bytesWritten?: number, buffer?: B) => void;


// Write data to a file.
export {writeSync} from "fs";


/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer input buffer
 * @param offset buffer offset [0]
 * @param length write length [buffer.length - offset]
 * @param position file position [null ⇒ current]
 * @returns write status {bytesWritten, buffer}
 */
export function writeAsync<B extends NodeJS.ArrayBufferView>(fd: number, buffer: B, offset?: number, length?: number, position?: number | null): Promise<WriteResult<B>>;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer string data
 * @param position file position [null ⇒ current]
 * @param encoding string encoding [utf8]
 * @returns write status {bytesWritten, buffer}
 */
export function writeAsync(fd: number, buffer: string, position?: number | null, encoding?: BufferEncoding): Promise<WriteResult<string>>;

export function writeAsync(...args: any[]): Promise<WriteResult<string | NodeJS.ArrayBufferView>> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    F.write(...args, (err: NodeJS.ErrnoException, bytesWritten: number, buffer: NodeJS.ArrayBufferView | string) => {
      if (err) reject(err);
      else resolve({bytesWritten, buffer});
    });
  });
}


/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer input buffer
 * @param callback callback (err, bytesWritten, buffer)
 */
export function write<B extends NodeJS.ArrayBufferView>(fd: number, buffer: B, callback: WriteCallback<B>): void;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer input buffer
 * @param offset buffer offset [0]
 * @param callback callback (err, bytesWritten, buffer)
 */
export function write<B extends NodeJS.ArrayBufferView>(fd: number, buffer: B, offset: number, callback: WriteCallback<B>): void;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer input buffer
 * @param offset buffer offset [0]
 * @param length read length [buffer.length - offset]
 * @param callback callback (err, bytesWritten, buffer)
 */
export function write<B extends NodeJS.ArrayBufferView>(fd: number, buffer: B, offset: number, length: number, callback: WriteCallback<B>): void;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer input buffer
 * @param offset buffer offset [0]
 * @param length read length [buffer.length - offset]
 * @param position file position [null ⇒ current]
 * @param callback callback (err, bytesWritten, buffer)
 */
export function write<B extends NodeJS.ArrayBufferView>(fd: number, buffer: B, offset: number, length: number, position: ReadPosition | null, callback: WriteCallback<B>): void;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer string data
 * @param callback callback (err, bytesWritten, buffer)
 */
export function write(fd: number, buffer: string, callback: WriteCallback<string>): void;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer string data
 * @param position file position [null ⇒ current]
 * @param callback callback (err, bytesWritten, buffer)
 */
export function write(fd: number, buffer: string, position: number | null, callback: WriteCallback<string>): void;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer string data
 * @param position file position [null ⇒ current]
 * @param encoding string encoding [utf8]
 * @param callback callback (err, bytesWritten, buffer)
 */
export function write(fd: number, buffer: string, position: number | null, encoding: BufferEncoding, callback: WriteCallback<string>): void;

/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer input buffer
 * @param offset buffer offset [0]
 * @param length read length [buffer.length - offset]
 * @param position file position [null ⇒ current]
 * @returns write status {bytesWritten, buffer}
 */
export function write<B extends NodeJS.ArrayBufferView>(fd: number, buffer: B, offset: number, length: number, position: ReadPosition | null): Promise<WriteResult<B>>;


/**
 * Write data to a file.
 * @param fd file descriptor
 * @param buffer string data
 * @param position file position [null ⇒ current]
 * @param encoding string encoding [utf8]
 * @returns write status {bytesWritten, buffer}
 */
export function write(fd: number, buffer: string, position?: number | null, encoding?: BufferEncoding): Promise<WriteResult<string>>;

export function write(...args: any[]): void | Promise<WriteResult<NodeJS.ArrayBufferView | string>> {
  if (typeof args[args.length-1]==="function") F.write.apply(null, args);
  else return writeAsync.apply(null, args);
}




// READV
// -----

/**
 * Get results of readv().
 * @param err readv error
 * @param bytesRead number of bytes read
 * @param buffers output buffers
 */
export type ReadVCallback = (err: NodeJS.ErrnoException, bytesRead?: number, buffers?: NodeJS.ArrayBufferView[]) => void;


// Read an array of buffers from file.
export {readvSync} from "fs";


/**
 * Read an array of buffers from file.
 * @param fd file descriptior
 * @param buffers output buffers
 * @param position file position [null ⇒ current]
 * @returns readv status {bytesRead, buffers}
 */
export function readvAsync(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position?: number | null): Promise<ReadVResult> {
  return new Promise((resolve, reject) => {
    F.readv(fd, buffers, position, (err, bytesRead, buffers) => {
      if (err) reject(err);
      else resolve({bytesRead, buffers});
    });
  });
}


/**
 * Read an array of buffers from file.
 * @param fd file descriptior
 * @param buffers output buffers
 * @param callback callback (err, bytesRead, buffers)
 */
export function readv(fd: number, buffers: readonly NodeJS.ArrayBufferView[], callback: ReadVCallback): void;

/**
 * Read an array of buffers from file.
 * @param fd file descriptior
 * @param buffers output buffers
 * @param position file position [null ⇒ current]
 * @param callback callback (err, bytesRead, buffers)
 */
export function readv(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position: number, callback: ReadVCallback): void | Promise<ReadVResult>;

/**
 * Read an array of buffers from file.
 * @param fd file descriptior
 * @param buffers output buffers
 * @param position file position [null ⇒ current]
 * @returns readv status {bytesRead, buffers}
 */
export function readv(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position?: number): Promise<ReadVResult>;

export function readv(...args: any[]): void | Promise<ReadVResult> {
  if (typeof args[args.length-1]==="function") F.readv.apply(null, args);
  else return readvAsync.apply(null, args);
}




// WRITEV
// ------

/**
 * Get results of writev().
 * @param err writev error
 * @param bytesWritten number of bytes written
 * @param buffers input buffers
 */
export type WriteVCallback = (err: NodeJS.ErrnoException, bytesWritten?: number, buffers?: NodeJS.ArrayBufferView[]) => void;


// Write an array of buffers to file.
export {writevSync} from "fs";


/**
 * Write an array of buffers to file.
 * @param fd file descriptior
 * @param buffers input buffers
 * @param position file position [null ⇒ current]
 * @returns writev status {bytesWritten, buffers}
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
 * Write an array of buffers to file.
 * @param fd file descriptior
 * @param buffers input buffers
 * @param callback callback (err, bytesWritten, buffers)
 */
export function writev(fd: number, buffers: readonly NodeJS.ArrayBufferView[], callback: WriteVCallback): void;

/**
 * Write an array of buffers to file.
 * @param fd file descriptior
 * @param buffers input buffers
 * @param position file position [null ⇒ current]
 * @param callback callback (err, bytesWritten, buffers)
 */
export function writev(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position: number, callback: WriteVCallback): void;

/**
 * Write an array of buffers to file.
 * @param fd file descriptior
 * @param buffers input buffers
 * @param position file position [null ⇒ current]
 * @returns writev status {bytesWritten, buffers}
 */
export function writev(fd: number, buffers: readonly NodeJS.ArrayBufferView[], position?: number): Promise<WriteVResult>;

export function writev(...args: any[]): void | Promise<WriteVResult> {
  if (typeof args[args.length-1]==="function") F.writev.apply(null, args);
  else return writevAsync.apply(null, args);
}




// FDATASYNC
// ---------

// Flush file data to storage.
export {fdatasyncSync} from "fs";


/**
 * Flush file data to storage.
 * @param fd file descriptor
 */
export function fdatasyncAsync(fd: number): Promise<void> {
  return new Promise((resolve, reject) => {
    F.fdatasync(fd, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


/**
 * Flush file data to storage.
 * @param fd file descriptor
 * @param callback callback (err)
 */
export function fdatasync(fd: number, callback: NoParamCallback): void;

/**
 * Flush file data to storage.
 * @param fd file descriptor
 */
export function fdatasync(fd: number): Promise<void>;

export function fdatasync(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.fdatasync.apply(null, args);
  else return fdatasyncAsync.apply(null, args);
}




// FSYNC
// -----

// Flush file data and metadata (inode) to storage.
export {fsyncSync} from "fs";


/**
 * Flush file data and metadata (inode) to storage.
 * @param fd file descriptor
 */
export function fsyncAsync(fd: number): Promise<void> {
  return new Promise((resolve, reject) => {
    F.fsync(fd, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


/**
 * Flush file data and metadata (inode) to storage.
 * @param fd file descriptor
 * @param callback callback (err)
 */
export function fsync(fd: number, callback: NoParamCallback): void;

/**
 * Flush file data and metadata (inode) to storage.
 * @param fd file descriptor
 */
export function fsync(fd: number): Promise<void>;

export function fsync(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.fsync.apply(null, args);
  else return fsyncAsync.apply(null, args);
}




// FTRUNCATE
// ---------

// Shorten (truncate) a file.
export {ftruncateSync} from "fs";


/**
 * Shorten (truncate) a file.
 * @param fd file descriptor
 * @param len maximum length of file [0]
 */
export function ftruncateAsync(fd: number, len?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    F.ftruncate(fd, len, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


/**
 * Shorten (truncate) a file.
 * @param fd file descriptor
 * @param callback callback (err)
 */
export function ftruncate(fd: number, callback: NoParamCallback): void;

/**
 * Shorten (truncate) a file.
 * @param fd file descriptor
 * @param len maximum length of file
 * @param callback callback (err)
 */
export function ftruncate(fd: number, len: number, callback: NoParamCallback): void;

/**
 * Shorten (truncate) a file.
 * @param fd file descriptor
 * @param len maximum length of file [0]
 */
export function ftruncate(fd: number, len?: number): Promise<void>;

export function ftruncate(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.ftruncate.apply(null, args);
  else return ftruncateAsync.apply(null, args);
}




// FUTIMES
// -------

// Change the file system timestamps of a file.
export {futimesSync} from "fs";


/**
 * Change the file system timestamps of a file.
 * @param fd file descriptor
 * @param atime last access time
 * @param mtime last modified time
 */
export function futimesAsync(fd: number, atime: TimeLike, mtime: TimeLike): Promise<void> {
  return new Promise((resolve, reject) => {
    F.futimes(fd, atime, mtime, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


/**
 * Change the file system timestamps of a file.
 * @param fd file descriptor
 * @param atime last access time
 * @param mtime last modified time
 * @param callback callback (err)
 */
export function futimes(fd: number, atime: TimeLike, mtime: TimeLike, callback: NoParamCallback): void;

/**
 * Change the file system timestamps of a file.
 * @param fd file descriptor
 * @param atime last access time
 * @param mtime last modified time
 */
export function futimes(fd: number, atime: TimeLike, mtime: TimeLike): Promise<void>;

export function futimes(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.futimes.apply(null, args);
  else return futimesAsync.apply(null, args);
}




// FSTAT
// -----

// Get information about a file.
export {fstatSync} from "fs";


/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @returns stats
 */
export function fstatAsync(fd: number, options?: StatOptions): Promise<Stats | BigIntStats>;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @returns stats
 */
export function fstatAsync(fd: number, options: StatOptions & {bigint?: false}): Promise<Stats>;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @returns stats
 */
export function fstatAsync(fd: number, options: StatOptions & {bigint: true}): Promise<BigIntStats>;

export function fstatAsync(fd: number, options?: StatOptions): Promise<Stats | BigIntStats> {
  return new Promise((resolve, reject) => {
    F.fstat(fd, options, (err, stats) => {
      if (err) reject(err);
      else resolve(stats);
    });
  });
}


/**
 * Get information about a file.
 * @param fd file descriptor
 * @param callback callback (err, stats)
 */
export function fstat(fd: number, callback: StatCallback): void;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @param callback callback (err, stats)
 */
export function fstat(fd: number, options: StatOptions, callback: StatCallback): void;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @param callback callback (err, stats)
 */
export function fstat(fd: number, options: StatOptions & {bigint?: false}, callback: StatCallback<Stats>): void;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @param callback callback (err, stats)
 */
export function fstat(fd: number, options: StatOptions & {bigint: true}, callback: StatCallback<BigIntStats>): void;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @returns stats
 */
export function fstat(fd: number, options?: StatOptions): Promise<Stats | BigIntStats>;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @returns stats
 */
export function fstat(fd: number, options: StatOptions & {bigint?: false}): Promise<Stats>;

/**
 * Get information about a file.
 * @param fd file descriptor
 * @param options fstat options
 * @returns stats
 */
export function fstat(fd: number, options: StatOptions & {bigint: true}): Promise<BigIntStats>;

export function fstat(...args: any[]): void | Promise<Stats | BigIntStats> {
  if (typeof args[args.length-1]==="function") F.fstat.apply(null, args);
  else return fstatAsync.apply(null, args);
}




// FCHMOD
// ------

// Set the permissions of a file.
export {fchmodSync} from "fs";


/**
 * Set the permissions of a file.
 * @param fd file descriptor
 * @param mode permission mode
 */
export function fchmodAsync(fd: number, mode: Mode): Promise<void> {
  return new Promise((resolve, reject) => {
    F.fchmod(fd, mode, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


/**
 * Set the permissions of a file.
 * @param fd file descriptor
 * @param mode permission mode
 * @param callback callback (err)
 */
export function fchmod(fd: number, mode: Mode, callback: NoParamCallback): void;

/**
 * Set the permissions of a file.
 * @param fd file descriptor
 * @param mode permission mode
 */
export function fchmod(fd: number, mode: Mode): Promise<void>;

export function fchmod(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.fchmod.apply(null, args);
  else return fchmodAsync.apply(null, args);
}




// FCHOWN
// ------

// Set the owner of a file.
export {fchownSync} from "fs";


/**
 * Set the owner of a file.
 * @param fd file descriptor
 * @param uid user id
 * @param gid group id
 */
export function fchownAsync(fd: number, uid: number, gid: number): Promise<void> {
  return new Promise((resolve, reject) => {
    F.fchown(fd, uid, gid, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


/**
 * Set the owner of a file.
 * @param fd file descriptor
 * @param uid user id
 * @param gid group id
 * @param callback callback (err)
 */
export function fchown(fd: number, uid: number, gid: number, callback: NoParamCallback): void;

/**
 * Set the owner of a file.
 * @param fd file descriptor
 * @param uid user id
 * @param gid group id
 */
export function fchown(fd: number, uid: number, gid: number): Promise<void>;

export function fchown(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.fchown.apply(null, args);
  else return fchownAsync.apply(null, args);
}
