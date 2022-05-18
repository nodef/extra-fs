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




// STAT
// ----

/** Get results of [f/l]stat(). */
export type StatCallback<T = Stats | BigIntStats> = (err: NodeJS.ErrnoException, stats?: T) => void;




// METHODS
// =======




// ACCESS?
// -------
// STAT?
// -----
