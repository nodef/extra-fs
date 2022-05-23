import {EOL}      from "os";
import {PathLike} from "fs";
import {TimeLike} from "fs";
import {Stats}            from "fs";
import {BigIntStats}      from "fs";
import {StatOptions}      from "fs";
import {ObjectEncodingOptions} from "fs";
import {WriteFileOptions}      from "fs";
import {PathOrFileDescriptor}  from "fs";
import {NoParamCallback}       from "fs";
import * as F from "fs";
import * as P from "fs/promises";
import {EventEmitter} from "events";
import {StatCallback} from "./_all";




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
