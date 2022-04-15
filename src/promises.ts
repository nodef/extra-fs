export * from "fs/promises";


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
