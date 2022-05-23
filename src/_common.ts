import {Stats}       from "fs";
import {BigIntStats} from "fs";




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
