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
export {access} from "./_any";
export {accessAsync} from "./_any";




// TYPES
// =====

export {ExistsCallback} from "./_any";
export {ReadFileTextCallback}   from "./_file";
export {ReadJsonCallback}   from "./_file";


// CLASSES
// =======

export {FsError} from "./_common";




// METHODS
// =======

// COPY
// export {copySync} from "./_common";
// export {copy}     from "./_common";

// MOVE
// export {moveFileSync} from "./_common";
// export {moveFile}     from "./_common";
// export {moveSync}     from "./_common";
// export {move}         from "./_common";

// TEXT
export {readFileTextSync}  from "./_file";
export {readFileText}      from "./_file";
export {writeFileTextSync} from "./_file";
export {writeFileText}     from "./_file";

// JSON
export {readJsonSync}  from "./_file";
export {readJson}      from "./_file";
export {writeJsonSync} from "./_file";
export {writeJson}     from "./_file";

// DEHUSK
export {dehuskdirSync} from "./_dir";
export {dehuskdir}     from "./_dir";
