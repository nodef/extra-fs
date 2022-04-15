import * as os from "os";
import * as fs from "fs";
export * from "fs";




// TYPES
// =====

/**
 * Temporary file write function.
 * @param path file path
 * @param data file data
 */
type TemporaryWriter = (path: string, data: string) => void;




/**
 * Read file text with Unix EOL.
 * @param path file path
 * @returns file text
 */
export function readFileTextSync(path: string): string {
  var txt = fs.readFileSync(path, "utf8");
  return txt.replace(/\r?\n/g, "\n");
}


/**
 * Write file text with system EOL.
 * @param path file path
 * @param text file text
 */
export function writeFileTextSync(path: string, text: string): void {
  var text = text.replace(/\r?\n/g, os.EOL);
  fs.writeFileSync(path, text);
}


/**
 * Read JSON file as value.
 * @param path path of JSON file
 * @returns value
 */
export function readJsonSync(path: string): any {
  return JSON.parse(readFileTextSync(path));
}


/**
 * Write object to JSON file.
 * @param path path of JSON file
 * @param value value
 */
export function writeJsonSync(path: string, value: any): void {
  writeFileTextSync(path, JSON.stringify(value, null, 2) + "\n");
}


// REVERT?
/**
 * Restore a file after temporary operation.
 * @param path path of file
 * @param fn temporary file write function
 */
function restoreFileSync(path: string, fn: TemporaryWriter): void {
  var d = fs.existsSync(path)? fs.readFileSync(path, "utf8") : null;
  fn(path, d);
  if (d != null) fs.writeFileSync(path, d);
  else if (fs.existsSync(path)) fs.unlinkSync(path);
}
