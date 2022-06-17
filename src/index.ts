import {EventEmitter} from "events";
import {EOL}      from "os";
import {join}     from "path";
import {Dir}      from "fs";
import {Dirent}   from "fs";
import {PathLike} from "fs";
import {TimeLike} from "fs";
import {OpenMode} from "fs";
import {Mode}     from "fs";
import {Stats}    from "fs";
import {BigIntStats}  from "fs";
import {StatOptions}  from "fs";
import {ReadPosition} from "fs";
import {CopyOptions}  from "fs";
import {RmOptions}    from "fs";
import {ReadAsyncOptions} from "fs";
import {ReadVResult}      from "fs";
import {WriteVResult}     from "fs";
import {NoParamCallback}  from "fs";
import {OpenDirOptions}        from "fs";
import {RmDirOptions}          from "fs";
import {MakeDirectoryOptions}  from "fs";
import {EncodingOption}        from "fs";
import {BufferEncodingOption}  from "fs";
import {ObjectEncodingOptions} from "fs";
import {WriteFileOptions}      from "fs";
import {PathOrFileDescriptor}  from "fs";
import {constants as C}        from "fs";
import * as F from "fs";
import * as P from "fs/promises";



// TYPES (BUILTIN)
// ===============

export {
  BigIntOptions,
  BigIntStats,
  BufferEncodingOption,
  CopyOptions,
  Dir,
  Dirent,
  EncodingOption,
  FSWatcher,
  MakeDirectoryOptions,
  Mode,
  NoParamCallback,
  ObjectEncodingOptions,
  OpenDirOptions,
  OpenMode,
  PathLike,
  PathOrFileDescriptor,
  ReadAsyncOptions,
  ReadPosition,
  ReadStream,
  ReadSyncOptions,
  ReadVResult,
  RmDirOptions,
  RmOptions,
  StatOptions,
  StatSyncFn,
  StatSyncOptions,
  StatWatcher,
  Stats,
  StatsBase,
  TimeLike,
  WatchEventType,
  WatchFileOptions,
  WatchListener,
  WatchOptions,
  WriteFileOptions,
  WriteStream,
  WriteVResult,
} from "fs";




// NAMESPACES (BUILTIN)
// ====================

export {constants}   from "fs";
export * as promises from "fs/promises";




// TYPES
// =====

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








// FD
// ==

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

/** Get results of [f/l]stat(). */
export type StatCallback<T = Stats | BigIntStats> = (err: NodeJS.ErrnoException, stats?: T) => void;


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








// LINK
// ====

// LINK
// ----

// Create a hard link to a file or directory.
export {linkSync} from "fs";
// Create a hard link to a file or directory.
export {link as linkAsync} from "fs/promises";


/**
 * Create a hard link to a file or directory.
 * @param target existing path
 * @param path new path
 * @param callback callback (err)
 */
export function link(target: PathLike, path: PathLike, callback: NoParamCallback): void;

/**
 * Create a hard link to a file or directory.
 * @param target existing path
 * @param path new path
 */
export function link(target: PathLike, path: PathLike): Promise<void>;

export function link(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.link.apply(null, args);
  else return P.link.apply(null, args);
}




// SYMLINK
// -------

/** Symlink type (win32 only). */
export type SymlinkType = "file" | "dir" | "junction";


// Create a symbolic link to a file or directory.
export {symlinkSync} from "fs";
// Create a symbolic link to a file or directory.
export {symlink as symlinkAsync} from "fs/promises";


/**
 * Create a symbolic link to a file or directory.
 * @param target target path
 * @param path symlink path
 * @param callback callback (err)
 */
export function symlink(target: PathLike, path: PathLike, type: SymlinkType, callback: NoParamCallback): void;

/**
 * Create a symbolic link to a file or directory.
 * @param target target path
 * @param path symlink path
 * @param type symlink type (dir, file, junction)
 * @param callback callback (err)
 */
export function symlink(target: PathLike, path: PathLike, type: SymlinkType, callback: NoParamCallback): void;

/**
 * Create a symbolic link to a file or directory.
 * @param target target path
 * @param path symlink path
 * @param type symlink type (dir, file, junction)
 */
export function symlink(target: PathLike, path: PathLike, type?: SymlinkType): Promise<void>;

export function symlink(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.symlink.apply(null, args);
  else return P.symlink.apply(null, args);
}




// READLINK
// --------

/**
 * Get results of readlink().
 * @param err readlink error
 * @param linkString path symlink points to
 */
export type ReadlinkCallback<T = string | Buffer> = (err: NodeJS.ErrnoException, linkString?: T) => void;


// Read the contents of a symbolic link.
export {readlinkSync} from "fs";
// Read the contents of a symbolic link.
export {readlink as readlinkAsync} from "fs/promises";


/**
 * Read the contents of a symbolic link.
 * @param path path of symbolic link
 * @param callback callback (err, linkString)
 */
export function readlink(path: PathLike, callback: ReadlinkCallback<string>): void;

/**
 * Read the contents of a symbolic link.
 * @param path path of symbolic link
 * @param options encoding option
 * @param callback callback (err, linkString)
 */
export function readlink(path: PathLike, options: EncodingOption, callback: ReadlinkCallback<string>): void;

/**
 * Read the contents of a symbolic link.
 * @param path path of symbolic link
 * @param options encoding option
 * @param callback callback (err, linkString)
 */
export function readlink(path: PathLike, options: BufferEncodingOption, callback: ReadlinkCallback<Buffer>): void;

/**
 * Read the contents of a symbolic link.
 * @param path path of symbolic link
 * @param options encoding option
 */
export function readlink(path: PathLike, options?: EncodingOption): Promise<string>;

/**
 * Read the contents of a symbolic link.
 * @param path path of symbolic link
 * @param options encoding option
 */
export function readlink(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;

export function readlink(...args: any[]): void | Promise<string | Buffer> {
  if (typeof args[args.length-1]==="function") F.readlink.apply(null, args);
  else return P.readlink.apply(null, args);
}




// REALPATH
// --------

/**
 * Get results of realpath().
 * @param err realpath error
 * @param resolvedPath resolved path
 */
export type RealpathCallback<T = string | Buffer> = (err: NodeJS.ErrnoException, resolvedPath?: T) => void;


// Get canonical pathname by resolving ., .. and symbolic links.
export {realpathSync} from "fs";
// Get canonical pathname by resolving ., .. and symbolic links.
export {realpath as realpathAsync} from "fs/promises";


/**
 * Get canonical pathname by resolving ., .. and symbolic links.
 * @param path file or directory path
 * @param callback callback (err, resolvedPath)
 */
export function realpath(path: PathLike, callback: RealpathCallback<string>): void;

/**
 * Get canonical pathname by resolving ., .. and symbolic links.
 * @param path file or directory path
 * @param options encoding option
 * @param callback callback (err, resolvedPath)
 */
export function realpath(path: PathLike, options: EncodingOption, callback: RealpathCallback<string>): void;

/**
 * Get canonical pathname by resolving ., .. and symbolic links.
 * @param path file or directory path
 * @param options encoding option
 * @param callback callback (err, resolvedPath)
 */
export function realpath(path: PathLike, options: BufferEncodingOption, callback: RealpathCallback<Buffer>): void;

/**
 * Get canonical pathname by resolving ., .. and symbolic links.
 * @param path file or directory path
 * @param options encoding option
 */
export function realpath(path: PathLike, options?: EncodingOption): Promise<string>;

/**
 * Get canonical pathname by resolving ., .. and symbolic links.
 * @param path file or directory path
 * @param options encoding option
 */
export function realpath(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;

export function realpath(...args: any[]): void | Promise<string | Buffer> {
  if (typeof args[args.length-1]==="function") F.realpath.apply(null, args);
  else return P.realpath.apply(null, args);
}




// LUTIMES
// -------

// Change the file system timestamps of an object.
export {lutimesSync} from "fs";
// Change the file system timestamps of an object.
export {lutimes as lutimesAsync} from "fs/promises";


/**
 * Change the file system timestamps of an object.
 * @param path file path
 * @param atime last access time
 * @param mtime last modified time
 * @param callback callback (err)
 */
export function lutimes(path: PathLike, atime: TimeLike, mtime: TimeLike, callback: NoParamCallback): void;

/**
 * Change the file system timestamps of an object.
 * @param path file path
 * @param atime last access time
 * @param mtime last modified time
 */
export function lutimes(path: PathLike, atime: TimeLike, mtime: TimeLike): Promise<void>;

export function lutimes(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.lutimes.apply(null, args);
  else return P.lutimes.apply(null, args);
}




// LSTAT
// -----

// Get file status, without dereferencing symbolic links.
export {lstatSync} from "fs";
// Get file status, without dereferencing symbolic links.
export {lstat as lstatAsync} from "fs/promises";


/**
 * Get information about a file, without dereferencing symbolic links.
 * @param path file path
 * @param callback callback (err, stats)
 */
export function lstat(path: PathLike, callback: StatCallback): void;

/**
 * Get information about a file, without dereferencing symbolic links.
 * @param path file path
 * @param options lstat options
 * @param callback callback (err, stats)
 */
export function lstat(path: PathLike, options: StatOptions, callback: StatCallback): void;

/**
 * Get information about a file, without dereferencing symbolic links.
 * @param path file path
 * @param options lstat options
 * @param callback callback (err, stats)
 */
export function lstat(path: PathLike, options: StatOptions & {bigint?: false}, callback: StatCallback<Stats>): void;

/**
 * Get information about a file, without dereferencing symbolic links.
 * @param path file path
 * @param options lstat options
 * @param callback callback (err, stats)
 */
export function lstat(path: PathLike, options: StatOptions & {bigint: true}, callback: StatCallback<BigIntStats>): void;

/**
 * Get information about a file, without dereferencing symbolic links.
 * @param path file path
 * @param options stat options
 * @returns stats
 */
export function lstat(path: PathLike, options?: StatOptions): Promise<Stats | BigIntStats>;

/**
 * Get information about a file, without dereferencing symbolic links.
 * @param path file path
 * @param options stat options
 * @returns stats
 */
export function lstat(path: PathLike, options: StatOptions & {bigint?: false}): Promise<Stats>;

/**
 * Get information about a file, without dereferencing symbolic links.
 * @param path file path
 * @param options stat options
 * @returns stats
 */
export function lstat(path: PathLike, options: StatOptions & {bigint?: true}): Promise<BigIntStats>;

export function lstat(...args: any[]): void | Promise<Stats | BigIntStats> {
  if (typeof args[args.length-1]==="function") F.lstat.apply(null, args);
  else return P.lstat.apply(null, args);
}




// LCHOWN
// ------

// Set the owner of a symbolic link.
export {lchownSync} from "fs";
// Set the owner of a symbolic link.
export {lchown as lchownAsync} from "fs/promises";


/**
 * Set the owner of a symbolic link.
 * @param path file descriptor
 * @param uid user id
 * @param gid group id
 * @param callback callback (err)
 */
export function lchown(path: PathLike, uid: number, gid: number, callback: NoParamCallback): void;

/**
 * Set the owner of a symbolic link.
 * @param path file descriptor
 * @param uid user id
 * @param gid group id
 */
export function lchown(path: PathLike, uid: number, gid: number): Promise<void>;

export function lchown(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.lchown.apply(null, args);
  else return P.lchown.apply(null, args);
}








// FILE
// ====

// READ-FILE
// ---------

/**
 * Get results of readFile().
 * @param err error
 * @param data contents of file
 */
export type ReadFileCallback<T = string | Buffer> = (err: NodeJS.ErrnoException, data?: T) => void;


// Read the entire contents of a file.
export {readFileSync} from "fs";
// Read the entire contents of a file.
export {readFile as readFileAsync} from "fs/promises";


/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param callback callback (err, data)
 */
export function readFile(path: PathOrFileDescriptor, callback: ReadFileCallback<Buffer>): void;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 * @param callback callback (err, data)
 */
export function readFile(path: PathOrFileDescriptor, options: {encoding?: null, flag?: string} & EventEmitter.Abortable, callback: ReadFileCallback<Buffer>): void;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 * @param callback callback (err, data)
 */
export function readFile(path: PathOrFileDescriptor, options: BufferEncoding | ({encoding: BufferEncoding, flag?: string} & EventEmitter.Abortable), callback: ReadFileCallback<string>): void;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 * @param callback callback (err, data)
 */
export function readFile(path: PathOrFileDescriptor, options: BufferEncoding | (ObjectEncodingOptions & {flag?: string} & EventEmitter.Abortable), callback: ReadFileCallback): void;

/**
 * Read the entire contents of a file.
 * @param path directory path
 */
export function readFile(path: PathOrFileDescriptor): Promise<Buffer>;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 */
export function readFile(path: PathOrFileDescriptor, options: {encoding?: null, flag?: string} & EventEmitter.Abortable): Promise<Buffer>;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 */
export function readFile(path: PathOrFileDescriptor, options: BufferEncoding | ({encoding: BufferEncoding, flag?: string} & EventEmitter.Abortable)): Promise<string>;

/**
 * Read the entire contents of a file.
 * @param path directory path
 * @param options read file options
 */
export function readFile(path: PathOrFileDescriptor, options: BufferEncoding | (ObjectEncodingOptions & {flag?: string} & EventEmitter.Abortable)): Promise<string | Buffer>;

export function readFile(...args: any[]): void | Promise<string | Buffer> {
  if (typeof args[args.length-1]==="function") F.readFile.apply(null, args);
  else return P.readFile.apply(null, args);
}




// WRITE-FILE
// ----------

// Write data to the file, replace if it already exists.
export {writeFileSync} from "fs";
// Write data to the file, replace if it already exists.
export {writeFile as writeFileAsync} from "fs/promises";


/**
 * Write data to the file, replace if it already exists.
 * @param file filename or file descriptor
 * @param data data to write
 * @param fn callback (err)
 */
export function writeFile(file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, fn: NoParamCallback): void;

/**
 * Write data to the file, replace if it already exists.
 * @param file filename or file descriptor
 * @param data data to write
 * @param options options {encoding, mode, flag, signal}
 * @param fn callback (err)
 */
export function writeFile(file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions, fn: NoParamCallback): void;

/**
 * Write data to the file, replace if it already exists.
 * @param file filename or file descriptor
 * @param data data to write
 * @param options options {encoding, mode, flag, signal}
 */
export function writeFile(file: PathLike | P.FileHandle, data: string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | NodeJS.ReadableStream, options?: WriteFileOptions): Promise<void>;

export function writeFile(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.writeFile.apply(null, args);
  else return P.writeFile.apply(null, args);
}




// APPEND-FILE
// -----------

// Append data to a file, create if it does not exist.
export {appendFileSync} from "fs";
// Append data to a file, create if it does not exist.
export {appendFile as appendFileAsync} from "fs/promises";


/**
 * Append data to a file, create if it does not exist.
 * @param path filename or file descriptor
 * @param data string or buffer data
 * @param callback callback (err)
 */
export function appendFile(path: PathOrFileDescriptor, data: string | Uint8Array, callback: NoParamCallback): void;

/**
 * Append data to a file, create if it does not exist.
 * @param path filename or file descriptor
 * @param data string or buffer data
 * @param options write file options {encoding, mode, flag}
 * @param callback callback (err)
 */
export function appendFile(path: PathOrFileDescriptor, data: string | Uint8Array, options: WriteFileOptions, callback: NoParamCallback): void;

/**
 * Append data to a file, create if it does not exist.
 * @param path filename or file descriptor
 * @param data string or buffer data
 * @param options write file options {encoding, mode, flag}
 */
export function appendFile(path: PathOrFileDescriptor, data: string | Uint8Array, options?: WriteFileOptions): Promise<void>;

export function appendFile(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.appendFile.apply(null, args);
  else return P.appendFile.apply(null, args);
}




// TRUNCATE
// --------

// Shorten (truncate) a file.
export {truncateSync} from "fs";
// Shorten (truncate) a file.
export {truncate as truncateAsync} from "fs/promises";


/**
 * Shorten (truncate) a file.
 * @param path file path
 * @param callback callback (err)
 */
export function truncate(path: PathLike, callback: NoParamCallback): void;

/**
 * Shorten (truncate) a file.
 * @param path file path
 * @param len maximum length of file
 * @param callback callback (err)
 */
export function truncate(path: PathLike, len: number, callback: NoParamCallback): void;

/**
 * Shorten (truncate) a file.
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




// STAT
// ----

// Get file status.
export {statSync} from "fs";
// Get file status.
export {stat as statAsync} from "fs/promises";


/**
 * Get file status.
 * @param path file path
 * @param callback callback (err, stats)
 */
export function stat(path: PathLike, callback: StatCallback<Stats>): void;

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
 * @param callback callback (err, stats)
 */
export function stat(path: PathLike, options: StatOptions & {bigint?: false}, callback: StatCallback<Stats>): void;

/**
 * Get file status.
 * @param path file path
 * @param options stat options
 * @param callback callback (err, stats)
 */
export function stat(path: PathLike, options: StatOptions & {bigint: true}, callback: StatCallback<BigIntStats>): void;

/**
 * Get file status.
 * @param path file path
 */
export function stat(path: PathLike): Promise<Stats>;

/**
 * Get file status.
 * @param path file path
 * @param options stat options
 */
export function stat(path: PathLike, options: StatOptions): Promise<Stats | BigIntStats>;

/**
 * Get file status.
 * @param path file path
 * @param options stat options
 */
export function stat(path: PathLike, options: StatOptions & {bigint?: false}): Promise<Stats>;

/**
 * Get file status.
 * @param path file path
 * @param options stat options
 */
export function stat(path: PathLike, options: StatOptions & {bigint: true}): Promise<BigIntStats>;

export function stat(...args: any[]): void | Promise<Stats | BigIntStats> {
  if (typeof args[args.length-1]==="function") F.stat.apply(null, args);
  else return P.stat.apply(null, args);
}




// COPY-FILE
// ---------

// Copy source file to destination, overwite if exists.
export {copyFileSync} from "fs";
// Copy source file to destination, overwite if exists.
export {copyFile as copyFileAsync} from "fs/promises";


/**
 * Copy source file to destination, overwite if exists.
 * @param src source path
 * @param dest destination path
 * @param callback callback (err)
 */
export function copyFile(src: PathLike, dest: PathLike, callback: NoParamCallback): void;

/**
 * Copy source file to destination, overwite if exists.
 * @param src source path
 * @param dest destination path
 * @param mode copy mode (COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE)
 * @param callback callback (err)
 */
export function copyFile(src: PathLike, dest: PathLike, mode: number, callback: NoParamCallback): void;

/**
 * Copy source file to destination, overwite if exists.
 * @param src source path
 * @param dest destination path
 * @param mode copy mode (COPYFILE_EXCL, COPYFILE_FICLONE, COPYFILE_FICLONE_FORCE)
 */
export function copyFile(src: PathLike, dest: PathLike, mode?: number): Promise<void>;

export function copyFile(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.copyFile.apply(null, args);
  else return P.copyFile.apply(null, args);
}




// CREATE-(READ/WRITE)-STREAM
// --------------------------

export {createReadStream}  from "fs";
export {createWriteStream} from "fs";




// WATCH
// -----

// Watch for changes on file.
export {watchFile} from "fs";
// Stop watching for changes on file.
export {unwatchFile} from "fs";
// Watch for changes on file or directory.
export {watch} from "fs";








// DIR
// ===

// MKDIR
// -----

/**
 * Get results of mkdir().
 * @param err error
 * @param path first directory path created (if any)
 */
export type MakeDirectoryCallback = (err: NodeJS.ErrnoException, path?: string) => void;


// Create a directory.
export {mkdirSync} from "fs";
// Create a directory.
export {mkdir as mkdirAsync} from "fs/promises";



/**
 * Create a directory.
 * @param path directory path
 * @param callback callback (err, path?)
 */
export function mkdir(path: PathLike, callback: NoParamCallback): void;

/**
 * Create a directory.
 * @param path directory path
 * @param options make directory options
 * @param callback callback (err, path?)
 */
export function mkdir(path: PathLike, options: Mode | MakeDirectoryOptions, callback: MakeDirectoryCallback): void;

/**
 * Create a directory.
 * @param path directory path
 * @param options make directory options
 * @param callback callback (err, path?)
 */
export function mkdir(path: PathLike, options: Mode | MakeDirectoryOptions & {recursive?: false}, callback: NoParamCallback): void;

/**
 * Create a directory.
 * @param path directory path
 * @param options make directory options
 * @param callback callback (err, path?)
 */
export function mkdir(path: PathLike, options: Mode | MakeDirectoryOptions & {recursive: true}, callback: MakeDirectoryCallback): void;

/**
 * Create a directory.
 * @param path directory path
 */
export function mkdir(path: PathLike): Promise<void>;

/**
 * Create a directory.
 * @param path directory path
 * @param options make directory options
 * @returns first directory path created (if any)
 */
export function mkdir(path: PathLike, options: Mode | MakeDirectoryOptions): Promise<void | string>;

/**
 * Create a directory.
 * @param path directory path
 * @param options make directory options
 */
export function mkdir(path: PathLike, options: Mode | MakeDirectoryOptions & {recursive?: false}): Promise<void>;

/**
 * Create a directory.
 * @param path directory path
 * @param options make directory options
 * @returns first directory path created (if any)
 */
export function mkdir(path: PathLike, options: Mode | MakeDirectoryOptions & {recursive: true}, callback: MakeDirectoryCallback): Promise<string>;

export function mkdir(...args: any[]): void | Promise<void | string> {
  if (typeof args[args.length-1]==="function") F.mkdir.apply(null, args);
  else return P.mkdir.apply(null, args);
}




// MKDTEMP
// -------

/**
 * Get results of mkdtemp().
 * @param err error
 * @param path created directory path
 */
export type MakeDirectoryTemporaryCallback<T = string | Buffer> = (err: NodeJS.ErrnoException, path?: T) => void;


// Create a unique temporary directory.
export {mkdtempSync} from "fs";
// Create a unique temporary directory.
export {mkdtemp as mkdtempAsync} from "fs/promises";


/**
 * Create a unique temporary directory.
 * @param prefix directory prefix
 * @param callback callback (err, path)
 */
export function mkdtemp(prefix: string, callback: MakeDirectoryTemporaryCallback<string>): void;

/**
 * Create a unique temporary directory.
 * @param prefix directory prefix
 * @param options encoding options
 * @param callback callback (err, path)
 */
export function mkdtemp(prefix: string, options: EncodingOption, callback: MakeDirectoryTemporaryCallback<string>): void;

/**
 * Create a unique temporary directory.
 * @param prefix directory prefix
 * @param options encoding options
 * @param callback callback (err, path)
 */
export function mkdtemp(prefix: string, options: BufferEncodingOption, callback: MakeDirectoryTemporaryCallback<Buffer>): void;

/**
 * Create a unique temporary directory.
 * @param prefix directory prefix
 * @param options encoding options
 */
export function mkdtemp(prefix: string, options?: EncodingOption): Promise<string>;

/**
 * Create a unique temporary directory.
 * @param prefix directory prefix
 * @param options encoding options
 */
export function mkdtemp(prefix: string, options?: BufferEncodingOption): Promise<Buffer>;

export function mkdtemp(...args: any[]): void | Promise<string | Buffer> {
  if (typeof args[args.length-1]==="function") F.mkdtemp.apply(null, args);
  else return P.mkdtemp.apply(null, args);
}




// OPENDIR
// -------

/**
 * Get results of opendir().
 * @param err error
 * @param dir directory stream
 */
export type OpenDirCallback = (err: NodeJS.ErrnoException, dir?: Dir) => void;


// Open a directory.
export {opendirSync} from "fs";
// Open a directory.
export {opendir as opendirAsync} from "fs/promises";


/**
 * Open a directory.
 * @param path directory path
 * @param callback callback (err, dir)
 */
export function opendir(path: PathLike, callback: OpenDirCallback): void;

/**
 * Open a directory.
 * @param path directory path
 * @param options opendir options {encoding, bufferSize}
 * @param callback callback (err, dir)
 */
export function opendir(path: PathLike, options: OpenDirOptions, callback: OpenDirCallback): void;

/**
 * Open a directory.
 * @param path directory path
 * @param options opendir options {encoding, bufferSize}
 * @returns directory stream
 */
export function opendir(path: PathLike, options?: OpenDirOptions): Promise<Dir>;

export function opendir(...args: any[]): void | Promise<Dir> {
  if (typeof args[args.length-1]==="function") F.opendir.apply(null, args);
  else return P.opendir.apply(null, args);
}




// READDIR
// -------

export type ReadDirOptions = BufferEncoding | {
  /** Buffer encoding. */
  encoding: BufferEncoding;
  /** Return Dirent? */
  withFileTypes?: false;
};


/**
 * Get results of readdir().
 * @param err error
 * @param files contents of directory
 */
export type ReadDirCallback<T = string[] | Buffer[] | Dirent[]> = (err: NodeJS.ErrnoException, files?: T) => void;


// Open a directory.
export {readdirSync} from "fs";
// Open a directory.
export {readdir as readdirAsync} from "fs/promises";


/**
 * Open a directory.
 * @param path directory path
 * @param callback callback (err, dir)
 */
export function readdir(path: PathLike, callback: ReadDirCallback<string[]>): void;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 * @param callback callback (err, dir)
 */
export function readdir(path: PathLike, options: BufferEncoding | {encoding: BufferEncoding, withFileTypes?: false}, callback: ReadDirCallback<string[]>): void;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 * @param callback callback (err, dir)
 */
export function readdir(path: PathLike, options: "buffer" | {encoding: "buffer", withFileTypes?: false}, callback: ReadDirCallback<Buffer[]>): void;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 * @param callback callback (err, dir)
 */
export function readdir(path: PathLike, options: BufferEncoding | (ObjectEncodingOptions & {withFileTypes?: false}), callback: ReadDirCallback<string[]>): void;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 * @param callback callback (err, dir)
 */
export function readdir(path: PathLike, options: ObjectEncodingOptions & {withFileTypes: true}, callback: ReadDirCallback<Dirent[]>): void;

/**
 * Open a directory.
 * @param path directory path
 */
export function readdir(path: PathLike): Promise<string[]>;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 */
export function readdir(path: PathLike, options: BufferEncoding | {encoding: BufferEncoding, withFileTypes?: false}): Promise<string[]>;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 */
export function readdir(path: PathLike, options: "buffer" | {encoding: "buffer", withFileTypes?: false}): Promise<Buffer[]>;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 */
export function readdir(path: PathLike, options: BufferEncoding | (ObjectEncodingOptions & {withFileTypes?: false})): Promise<string[]>;

/**
 * Open a directory.
 * @param path directory path
 * @param options readdir options {encoding, withFileTypes}
 */
export function readdir(path: PathLike, options: ObjectEncodingOptions & {withFileTypes: true}): Promise<Dirent[]>;

export function readdir(...args: any[]): void | Promise<string[] | Buffer[] | Dirent[]> {
  if (typeof args[args.length-1]==="function") F.readdir.apply(null, args);
  else return P.readdir.apply(null, args);
}




// RMDIR
// -----

// Remove a directory.
export {rmdirSync} from "fs";
// Remove a directory.
export {rmdir as rmdirAsync} from "fs/promises";


/**
 * Remove a directory.
 * @param path directory to remove
 * @param callback callback (err)
 */
export function rmdir(path: PathLike, callback: NoParamCallback): void;

/**
 * Remove a directory.
 * @param path directory to remove
 * @param options rmdir options
 * @param callback callback (err)
 */
export function rmdir(path: PathLike, options: RmDirOptions, callback: NoParamCallback): void;

/**
 * Remove a directory.
 * @param path directory to remove
 * @param options rmdir options
 */
export function rmdir(path: PathLike, options?: RmDirOptions): Promise<void>;

export function rmdir(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") F.rm.apply(null, args);
  else return P.rm.apply(null, args);
}








// ANY
// ===

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








// FILE (ADDONS)
// =============

// TEXT
// ----
// ※ https://docs.microsoft.com/en-us/dotnet/api/system.io.file.readalltext
// ※ https://docs.microsoft.com/en-us/dotnet/api/system.io.file.writealltext

/** Get results of readFileText(). */
export type ReadFileTextCallback = (err: NodeJS.ErrnoException, text?: string) => void;


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


function readFileTextCb(path: string, fn: ReadFileTextCallback): void {
  F.readFile(path, "utf8", (err, text) => {
    if (err) return fn(err);
    fn(null, text.replace(/\r?\n/g, "\n"));
  });
}


/**
 * Read file text with Unix EOL.
 * @param path file path
 * @param fn callback (err, text)
 */
export function readFileText(path: string, fn: ReadFileTextCallback): void;

/**
 * Read file text with Unix EOL.
 * @param path file path
 * @returns file text
 */
export function readFileText(path: string): Promise<string>;

export function readFileText(...args: any[]): void | Promise<string> {
  if (typeof args[args.length-1]==="function") readFileTextCb.apply(null, args);
  else return readFileTextAsync.apply(null, args);
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


function writeFileTextCb(path: string, text: string, fn: NoParamCallback): void {
  var text = text.replace(/\r?\n/g, EOL);
  F.writeFile(path, text, fn);
}


/**
 * Write file text with system EOL.
 * @param path file path
 * @param text file text
 * @param fn callback (err)
 */
export function writeFileText(path: string, text: string, fn: NoParamCallback): void;

/**
 * Write file text with system EOL.
 * @param path file path
 * @param text file text
 */
export function writeFileText(path: string, text: string): Promise<void>;

export function writeFileText(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") writeFileTextCb.apply(null, args);
  else return writeFileTextAsync.apply(null, args);
}




// JSON
// ----
// ※ https://github.com/jprichardson/node-fs-extra/blob/master/docs/readJson.md
// ※ https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson.md

/** Get results of readJson(). */
export type ReadJsonCallback = (err: NodeJS.ErrnoException, json?: any) => void;


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


function readJsonCb(path: string, fn: ReadJsonCallback): void {
  readFileTextCb(path, (err, text) => {
    if (err != null) return fn(err);
    fn(null, JSON.parse(text));
  });
}


/**
 * Read JSON file as value.
 * @param path path of JSON file
 * @param fn callback (err, json)
 */
export function readJson(path: string, fn: ReadJsonCallback): void;

/**
 * Read JSON file as value.
 * @param path path of JSON file
 * @returns json value
 */
export function readJson(path: string): Promise<any>;

export function readJson(...args: any[]): void | Promise<any> {
  if (typeof args[args.length-1]==="function") readJsonCb.apply(null, args);
  else return readJsonAsync.apply(null, args);
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


function writeJsonCb(path: string, json: any, fn: NoParamCallback): void {
  writeFileText(path, JSON.stringify(json, null, 2) + "\n", fn);
}


/**
 * Write object to JSON file.
 * @param path path of JSON file
 * @param json json value
 * @param fn callback (err)
 */
export function writeJson(path: string, json: any, fn: NoParamCallback): void;

/**
 * Write object to JSON file.
 * @param path path of JSON file
 * @param json json value
 */
export function writeJson(path: string, json: any): Promise<void>;

export function writeJson(...args: any[]): void | Promise<void> {
  if (typeof args[args.length-1]==="function") writeJsonCb.apply(null, args);
  else return writeJsonAsync.apply(null, args);
}








// DIR (ADDONS)
// ============

// DEHUSK
// ------

/** Get results of dehuskdir(). */
export type DehuskDirCallback = (err: NodeJS.ErrnoException, seed?: string) => void;


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


function dehuskdirCb(...args: any[]): void {
  var dir   = args[0];
  var depth = typeof args[1]==="number"? args[1] : 0;
  var fn    = args[args.length-1];
  dehuskdirAsync(dir, depth).then(seed => fn(seed), fn);
}


/**
 * Remove outer one-item directories.
 * @param dir outer directory
 * @param fn callback (err, seed_directory)
 */
export function dehuskdir(dir: string, fn: DehuskDirCallback): void;

/**
 * Remove outer one-item directories.
 * @param dir outer directory
 * @param depth maximum depth
 * @param fn callback (err, seed_directory)
 */
export function dehuskdir(dir: string, depth: number, fn: DehuskDirCallback): void;

/**
 * Remove outer one-item directories.
 * @param dir outer directory
 * @param depth maximum depth (-1 => all)
 * @returns seed directory
 */
export function dehuskdir(dir: string, depth?: number): Promise<string>;

export function dehuskdir(...args: any[]): void | Promise<string> {
  if (typeof args[args.length-1]==="function") dehuskdirCb.apply(null, args);
  else return dehuskdirAsync.apply(null, args);
}








// ANY (ADDONS)
// ============

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
