import {constants as C} from "fs";


// File Access Constants
export const F_OK = C.F_OK;
export const R_OK = C.R_OK;
export const W_OK = C.W_OK;
export const X_OK = C.X_OK;


// File Copy Constants
export const COPYFILE_EXCL          = C.COPYFILE_EXCL;
export const COPYFILE_FICLONE       = C.COPYFILE_FICLONE;
export const COPYFILE_FICLONE_FORCE = C.COPYFILE_FICLONE_FORCE;


// File Open Constants
export const O_RDONLY    = C.O_RDONLY;
export const O_WRONLY    = C.O_WRONLY;
export const O_RDWR      = C.O_RDWR;
export const O_CREAT     = C.O_CREAT;
export const O_EXCL      = C.O_EXCL;
export const O_NOCTTY    = C.O_NOCTTY;
export const O_TRUNC     = C.O_TRUNC;
export const O_APPEND    = C.O_APPEND;
export const O_DIRECTORY = C.O_DIRECTORY;
export const O_NOATIME   = C.O_NOATIME;
export const O_NOFOLLOW  = C.O_NOFOLLOW;
export const O_SYNC      = C.O_SYNC;
export const O_DSYNC     = C.O_DSYNC;
export const O_SYMLINK   = C.O_SYMLINK;
export const O_DIRECT    = C.O_DIRECT;
export const O_NONBLOCK  = C.O_NONBLOCK;


// File Type Constants
export const S_IFMT   = C.S_IFMT;
export const S_IFREG  = C.S_IFREG;
export const S_IFDIR  = C.S_IFDIR;
export const S_IFCHR  = C.S_IFCHR;
export const S_IFBLK  = C.S_IFBLK;
export const S_IFIFO  = C.S_IFIFO;
export const S_IFLNK  = C.S_IFLNK;
export const S_IFSOCK = C.S_IFSOCK;


// File Mode Constants
export const S_IRWXU = C.S_IRWXU;
export const S_IRUSR = C.S_IRUSR;
export const S_IWUSR = C.S_IWUSR;
export const S_IXUSR = C.S_IXUSR;
export const S_IRWXG = C.S_IRWXG;
export const S_IRGRP = C.S_IRGRP;
export const S_IWGRP = C.S_IWGRP;
export const S_IXGRP = C.S_IXGRP;
export const S_IRWXO = C.S_IRWXO;
export const S_IROTH = C.S_IROTH;
export const S_IWOTH = C.S_IWOTH;
export const S_IXOTH = C.S_IXOTH;
export const UV_FS_O_FILEMAP = C.UV_FS_O_FILEMAP;


// File Move Constants
/** Flag indicating the destination file should not be overwritten if it already exists. */
export const MOVEFILE_EXCL = C.COPYFILE_EXCL;
