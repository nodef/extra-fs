import {assertEquals} from "@std/assert";
import {join} from "@std/path";
import {format, LF, CRLF, EOL} from "@std/fs";
import * as fs from "./index.ts";




/** Run a test body inside a fresh temporary directory, removed afterwards. */
async function withTempDir(fn: (dir: string) => Promise<void>): Promise<void> {
  const dir = await Deno.makeTempDir();
  try { await fn(dir); }
  finally { await Deno.remove(dir, {recursive: true}); }
}




//#region 1. READ TEXT FILE
const GITIGNORE_DATA = "# Source only\r\n.gitmodules\r\n.github/\r\n";


Deno.test("readTextFile() normalizes CRLF to LF", () => withTempDir(async dir => {
  const path = join(dir, ".npmignore");
  await Deno.writeTextFile(path, GITIGNORE_DATA);
  assertEquals(await fs.readTextFile(path), format(GITIGNORE_DATA, LF));
}));


Deno.test("readTextFileSync() normalizes CRLF to LF", () => withTempDir(async dir => {
  const path = join(dir, ".npmignore");
  await Deno.writeTextFile(path, GITIGNORE_DATA);
  assertEquals(fs.readTextFileSync(path), format(GITIGNORE_DATA, LF));
}));


Deno.test("readTextFile() leaves LF text unchanged", () => withTempDir(async dir => {
  const path = join(dir, "lf.txt");
  await Deno.writeTextFile(path, "a\nb\n");
  assertEquals(await fs.readTextFile(path), "a\nb\n");
}));


Deno.test("writeTextFile() writes platform line endings", () => withTempDir(async dir => {
  const path = join(dir, "out.txt");
  await fs.writeTextFile(path, "a\nb\n");
  assertEquals(await Deno.readTextFile(path), `a${EOL}b${EOL}`);
}));


Deno.test("writeTextFileSync() writes platform line endings", () => withTempDir(async dir => {
  const path = join(dir, "out.txt");
  fs.writeTextFileSync(path, "a\r\nb\r\n");
  assertEquals(await Deno.readTextFile(path), `a${EOL}b${EOL}`);
}));


Deno.test("writeTextFile() then readTextFile() round-trips LF text", () => withTempDir(async dir => {
  const path = join(dir, "round.txt");
  const text = "one\ntwo\nthree\n";
  await fs.writeTextFile(path, text);
  assertEquals(await fs.readTextFile(path), text);
}));
//#endregion




//#region 2. READ JSON FILE
const PACKAGE_JSON = {
  name: "extra-fs",
  version: "3.0.0",
  description: "Useful additions to inbuilt fs module.",
  keywords: ["fs", "extra"],
};
const PACKAGE_TEXT = JSON.stringify(PACKAGE_JSON, null, 2) + "\n";


Deno.test("readJsonFile() parses a JSON file", () => withTempDir(async dir => {
  const path = join(dir, "package.json");
  await Deno.writeTextFile(path, PACKAGE_TEXT);
  assertEquals(await fs.readJsonFile(path), PACKAGE_JSON);
}));


Deno.test("readJsonFileSync() parses a JSON file", () => withTempDir(async dir => {
  const path = join(dir, "package.json");
  await Deno.writeTextFile(path, PACKAGE_TEXT);
  assertEquals(fs.readJsonFileSync(path), PACKAGE_JSON);
}));


Deno.test("readJsonFile() handles CRLF-formatted JSON", () => withTempDir(async dir => {
  const path = join(dir, "package.json");
  await Deno.writeTextFile(path, format(PACKAGE_TEXT, CRLF));
  assertEquals(await fs.readJsonFile(path), PACKAGE_JSON);
}));


Deno.test("writeJsonFile() writes 2-space indented JSON", () => withTempDir(async dir => {
  const path = join(dir, "package.json");
  await fs.writeJsonFile(path, PACKAGE_JSON);
  const data = await Deno.readTextFile(path);
  const expt = JSON.stringify(PACKAGE_JSON, null, 2).replaceAll("\n", EOL) + EOL;
  assertEquals(data, expt);
  assertEquals(await fs.readJsonFile(path), PACKAGE_JSON);
}));


Deno.test("writeJsonFileSync() writes 2-space indented JSON", () => withTempDir(async dir => {
  const path = join(dir, "package.json");
  fs.writeJsonFileSync(path, PACKAGE_JSON);
  const data = await Deno.readTextFile(path);
  const expt = JSON.stringify(PACKAGE_JSON, null, 2).replaceAll("\n", EOL) + EOL;
  assertEquals(data, expt);
  assertEquals(fs.readJsonFileSync(path), PACKAGE_JSON);
}));
//#endregion




//#region 3. FILE EXISTS
Deno.test("exists() reports whether a file exists", () => withTempDir(async dir => {
  const path = join(dir, "LICENSE");
  assertEquals(await fs.exists(path), false);
  await Deno.writeTextFile(path, "MIT");
  assertEquals(await fs.exists(path), true);
}));


Deno.test("existsSync() reports whether a file exists", () => withTempDir(async dir => {
  const path = join(dir, "LICENSE");
  assertEquals(fs.existsSync(path), false);
  await Deno.writeTextFile(path, "MIT");
  assertEquals(fs.existsSync(path), true);
}));
//#endregion




//#region 4. DIRECTORY CONTENTS
Deno.test("walk() lists the contents of a directory", () => withTempDir(async dir => {
  const src = join(dir, "src");
  await fs.ensureDir(src);
  await Deno.writeTextFile(join(src, "index.ts"), "");
  const names: string[] = [];
  for await (const entry of fs.walk(src, {maxDepth: 1, includeDirs: false})) names.push(entry.name);
  assertEquals(names, ["index.ts"]);
}));


Deno.test("walkSync() lists the contents of a directory", () => withTempDir(async dir => {
  const src = join(dir, "src");
  await fs.ensureDir(src);
  await Deno.writeTextFile(join(src, "index.ts"), "");
  const names = [...fs.walkSync(src, {maxDepth: 1, includeDirs: false})].map(e => e.name);
  assertEquals(names, ["index.ts"]);
}));
//#endregion




//#region 5. UNWRAP DIRECTORY
/** Create `dir/a/b/c/file.txt` and return the path of `c`. */
async function makeWrapped(dir: string): Promise<string> {
  const c = join(dir, "a", "b", "c");
  await fs.ensureDir(c);
  await Deno.writeTextFile(join(c, "file.txt"), "hello");
  return c;
}


Deno.test("unwrapDir() moves the innermost directory up and returns the seed", () => withTempDir(async dir => {
  const c = await makeWrapped(dir);
  assertEquals(await fs.unwrapDir(dir), c);
  assertEquals(await Deno.readTextFile(join(dir, "file.txt")), "hello");
  assertEquals(await fs.exists(join(dir, "a")), false);
}));


Deno.test("unwrapDirSync() moves the innermost directory up and returns the seed", () => withTempDir(async dir => {
  const c = await makeWrapped(dir);
  assertEquals(fs.unwrapDirSync(dir), c);
  assertEquals(await Deno.readTextFile(join(dir, "file.txt")), "hello");
  assertEquals(fs.existsSync(join(dir, "a")), false);
}));


Deno.test("unwrapDir() honours a maximum depth", () => withTempDir(async dir => {
  await makeWrapped(dir);
  assertEquals(await fs.unwrapDir(dir, 1), join(dir, "a"));
  assertEquals(await Deno.readTextFile(join(dir, "b", "c", "file.txt")), "hello");
  assertEquals(await fs.exists(join(dir, "a")), false);
}));


Deno.test("unwrapDirSync() honours a maximum depth", () => withTempDir(async dir => {
  await makeWrapped(dir);
  assertEquals(fs.unwrapDirSync(dir, 1), join(dir, "a"));
  assertEquals(await Deno.readTextFile(join(dir, "b", "c", "file.txt")), "hello");
  assertEquals(fs.existsSync(join(dir, "a")), false);
}));


Deno.test("unwrapDir() with depth 0 does nothing", () => withTempDir(async dir => {
  await makeWrapped(dir);
  assertEquals(await fs.unwrapDir(dir, 0), dir);
  assertEquals(await fs.exists(join(dir, "a", "b", "c", "file.txt")), true);
}));


Deno.test("unwrapDir() stops when a directory has several entries", () => withTempDir(async dir => {
  await fs.ensureDir(join(dir, "a"));
  await fs.ensureDir(join(dir, "b"));
  assertEquals(await fs.unwrapDir(dir), dir);
  assertEquals(await fs.exists(join(dir, "a")), true);
  assertEquals(await fs.exists(join(dir, "b")), true);
}));


Deno.test("unwrapDir() stops when the only entry is a file", () => withTempDir(async dir => {
  await Deno.writeTextFile(join(dir, "only.txt"), "x");
  assertEquals(await fs.unwrapDir(dir), dir);
  assertEquals(await fs.exists(join(dir, "only.txt")), true);
}));
//#endregion
