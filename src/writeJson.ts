import {NoParamCallback} from "fs";
import {writeFileText} from "./_common";


/**
 * Write object to JSON file.
 * @param path path of JSON file
 * @param json json value
 * @param fn callback (err)
 */
 export function writeJson(path: string, json: any, fn: NoParamCallback): void {
  writeFileText(path, JSON.stringify(json, null, 2) + "\n", fn);
}
export default writeJson;
