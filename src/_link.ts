import {PathLike} from "fs";
import {TimeLike} from "fs";
import {Stats}                from "fs";
import {BigIntStats}          from "fs";
import {EncodingOption}       from "fs";
import {BufferEncodingOption} from "fs";
import {NoParamCallback}      from "fs";
import {StatOptions}          from "fs";
import {StatCallback}         from "./_all";
import * as F from "fs";
import * as P from "fs/promises";




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
