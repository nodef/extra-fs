export * as constants from "./constants";
export * as promises  from "./promises";


// BUILTIN TYPES
// =============

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




// BUILT-IN METHODS
// ================

export {
  accessSync,
  appendFile,
  appendFileSync,
  chmod,
  chmodSync,
  chown,
  chownSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  cp,
  cpSync,
  createReadStream,
  createWriteStream,
  existsSync,
  fchmod,
  fchmodSync,
  fchown,
  fchownSync,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  lchown,
  lchownSync,
  link,
  linkSync,
  lstat,
  lstatSync,
  lutimes,
  lutimesSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  open,
  openSync,
  opendir,
  opendirSync,
  read,
  readFile,
  readFileSync,
  readSync,
  readdir,
  readdirSync,
  readlink,
  readlinkSync,
  readv,
  readvSync,
  realpath,
  realpathSync,
  rename,
  renameSync,
  rm,
  rmSync,
  rmdir,
  rmdirSync,
  stat,
  statSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unlink,
  unlinkSync,
  unwatchFile,
  utimes,
  utimesSync,
  watch,
  watchFile,
  write,
  writeFile,
  writeFileSync,
  writeSync,
  writev,
  writevSync,
} from "fs";


// ACCESS
export {access} from "./_common";
export {accessAsync} from "./_common";




// TYPES
// =====

export {ExistsCallback} from "./_common";
export {TextCallback}   from "./_common";
export {JsonCallback}   from "./_common";


// CLASSES
// =======

export {FsError} from "./_common";




// METHODS
// =======

// COPY
export {copySync} from "./_common";
export {copy}     from "./_common";

// MOVE
export {moveFileSync} from "./_common";
export {moveFile}     from "./_common";
export {moveSync}     from "./_common";
export {move}         from "./_common";

// TEXT
export {readFileTextSync}  from "./_common";
export {readFileText}      from "./_common";
export {writeFileTextSync} from "./_common";
export {writeFileText}     from "./_common";

// JSON
export {readJsonSync}  from "./_common";
export {readJson}      from "./_common";
export {writeJsonSync} from "./_common";
export {writeJson}     from "./_common";

// DEHUSK
export {dehuskdirSync} from "./_common";
export {dehuskdir}     from "./_common";
