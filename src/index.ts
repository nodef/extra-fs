export * as constants from "./constants";
export * as promises  from "./promises";
export * from "fs";


// TYPES
export {ExistsCallback} from "./_common";
export {TextCallback}   from "./_common";
export {JsonCallback}   from "./_common";


// CLASSES
export {FsError} from "./_common";


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
