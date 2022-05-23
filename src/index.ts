export {constants}   from "fs";
export * as promises from "./promises";




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




// TYPES
// =====

export {FsError as Error} from "./_all";




// METHODS
// =======

export * from "./_fd";
export * from "./_file";
export * from "./_link";
export * from "./_dir";
export * from "./_any";
