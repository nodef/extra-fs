import {PathLike} from "fs";
import {TimeLike} from "fs";
import {OpenMode} from "fs";
import {Mode}     from "fs";
import {Dir}      from "fs";
import {Dirent}   from "fs";
import {Stats}            from "fs";
import {BigIntStats}      from "fs";
import {EncodingOption}       from "fs";
import {BufferEncodingOption} from "fs";
import {ObjectEncodingOptions} from "fs";
import {OpenDirOptions}      from "fs";
import {RmDirOptions}      from "fs";
import {ReadPosition}     from "fs";
import {MakeDirectoryOptions} from "fs";
import {ReadVResult}      from "fs";
import {WriteVResult}     from "fs";
import {NoParamCallback}  from "fs";
import {StatCallback}     from "./_common";
import * as F from "fs";
import * as P from "fs/promises";




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
