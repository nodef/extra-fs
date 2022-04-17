// BUILTIN-TYPES
export {CreateReadStreamOptions}  from "fs/promises";
export {CreateWriteStreamOptions} from "fs/promises";
export {FileChangeInfo}  from "fs/promises";
export {FileHandle}      from "fs/promises";
export {FileReadOptions} from "fs/promises";
export {FileReadResult}  from "fs/promises";
export {FlagAndOpenMode} from "fs/promises";

// BUILTIN-METHODS
export {access} from "fs/promises";
export {appendFile} from "fs/promises";
export {chmod} from "fs/promises";
export {chown} from "fs/promises";
export {copyFile} from "fs/promises";
export {cp} from "fs/promises";
export {lchown} from "fs/promises";
export {link} from "fs/promises";
export {lstat} from "fs/promises";
export {lutimes} from "fs/promises";
export {mkdir} from "fs/promises";
export {mkdtemp} from "fs/promises";
export {open} from "fs/promises";
export {opendir} from "fs/promises";
export {readFile} from "fs/promises";
export {readdir} from "fs/promises";
export {readlink} from "fs/promises";
export {realpath} from "fs/promises";
export {rename} from "fs/promises";
export {stat} from "fs/promises";
export {symlink} from "fs/promises";
export {truncate} from "fs/promises";
export {unlink} from "fs/promises";
export {utimes} from "fs/promises";
export {watch} from "fs/promises";
export {writeFile} from "fs/promises";


// COPY
export {copyAsync as copy} from "./_common";

// MOVE
export {moveFileAsync as moveFile} from "./_common";
export {moveAsync     as move}     from "./_common";

// TEXT
export {readFileTextAsync  as readFileText}  from "./_common";
export {writeFileTextAsync as writeFileText} from "./_common";

// JSON
export {readJsonAsync  as readJson}  from "./_common";
export {writeJsonAsync as writeJson} from "./_common";
