Useful additions to Deno's inbuilt file system API and [`@std/fs`].

▌
📦 [JSR](https://jsr.io/@nodef/extra-fs),
📦 [NPM](https://www.npmjs.com/package/@nodef/extra-fs),
📰 [Docs](https://jsr.io/@nodef/extra-fs/doc).

This package is a **single flat module** that **re-exports everything from
[`@std/fs`]** and adds a few functions on top. It does not wrap or re-export the
`Deno.*` functions above; use those directly. Following the `@std/fs` naming
convention, **asynchronous functions have a bare name** and **synchronous
functions carry a `Sync` suffix**.

The additions are:

- **Text files** with line-ending normalization: [`readTextFile()`] and
  [`writeTextFile()`].
- **JSON files**: [`readJsonFile()`] and [`writeJsonFile()`].
- **Cleanup** of *one-item outer directories* (which are usually created upon
  extracting a compressed file): [`unwrapDir()`].

[`@std/fs`]: https://jsr.io/@std/fs
[`exists()`]: https://jsr.io/@std/fs/doc/~/exists
[`copy()`]: https://jsr.io/@std/fs/doc/~/copy
[UNIX file system]: https://www.youtube.com/watch?v=tc4ROCJYbm0
[`readTextFile()`]: #readtextfile--readtextfilesync
[`writeTextFile()`]: #writetextfile--writetextfilesync
[`readJsonFile()`]: #readjsonfile--readjsonfilesync
[`writeJsonFile()`]: #writejsonfile--writejsonfilesync
[`unwrapDir()`]: #unwrapdir--unwrapdirsync


<br>

```ts
import * as xfs from "jsr:@nodef/extra-fs";


// 1. Read file text (always with "\n" line endings).
let text = xfs.readTextFileSync(".gitignore");
text = await xfs.readTextFile(".gitignore");
// → node_modules/
// → .vscode/
// → ...


// 2. Read and write a JSON file.
await xfs.writeJsonFile("data.json", {name: "extra-fs", tags: ["fs", "deno"]});
const json = await xfs.readJsonFile("data.json");
// → {name: "extra-fs", tags: ["fs", "deno"]}


// 3. Check that a file exists (from @std/fs).
if (!(await xfs.exists("LICENSE", {isFile: true}))) throw new Error("May I see your license, sir?");


// 4. Get contents of a directory (from Deno).
const contents = await Array.fromAsync(Deno.readDir("src"));
// → [{name: "mod.ts", isFile: true, isDirectory: false, isSymlink: false}]


// 5. Remove outer one-item directories.
// Before: extracted/project-1.2.3/src/...
const seed = await xfs.unwrapDir("extracted");
// → "extracted/project-1.2.3"
// After:  extracted/src/...
```

Run with the permissions you need, for example
`deno run --allow-read --allow-write example.ts`.

<br>
<br>


## Index

### Added by this package

| Property | Description |
|  ----  |  ----  |
| [readTextFile] | Read a text file and normalize line endings to `\n`. |
| [writeTextFile] | Write a text file with line endings normalized to the system's. |
| [readJsonFile] | Read a JSON file and parse it. |
| [writeJsonFile] | Write data to a JSON file (2-space indent, trailing newline). |
| [unwrapDir] | Remove outer one-item directories. |

### Re-exported from [`@std/fs`]

Everything that `@std/fs` exports is available from this module, for example:

| Property | Description |
|  ----  |  ----  |
| [exists] | Check if a file or directory exists. |
| [copy] | Copy a file or directory (recursively). |
| [move] | Move a file or directory. |
| [emptyDir] | Ensure a directory is empty (create it if missing). |
| [ensureDir] | Ensure a directory exists. |
| [ensureFile] | Ensure a file exists. |
| [ensureLink] | Ensure a hard link exists. |
| [ensureSymlink] | Ensure a symbolic link exists. |
| [walk] | Iterate over the entries of a directory tree. |
| [expandGlob] | Iterate over the files matching a glob. |
| [format], [detect], [LF], [CRLF], [EOL] | Line-ending helpers. |

See the [`@std/fs` docs](https://jsr.io/@std/fs/doc) for the complete list.

<br>
<br>


## Reference

### readTextFile / readTextFileSync

```ts
function readTextFile(path: string | URL): Promise<string>;
function readTextFileSync(path: string | URL): string;
```

Reads a text file and converts every line ending (`\r\n` or `\n`) to `\n`.

### writeTextFile / writeTextFileSync

```ts
function writeTextFile(path: string | URL, text: string): Promise<void>;
function writeTextFileSync(path: string | URL, text: string): void;
```

Writes a text file with every line ending converted to the system's (`\r\n` on
Windows, `\n` elsewhere).

> These two have the same names as `Deno.readTextFile()` and
> `Deno.writeTextFile()`, but normalize line endings and **do not accept
> options** (`signal`, `append`, `mode`, ...). Use the `Deno.*` versions when you
> need those, or when the file must keep its line endings as they are.

### readJsonFile / readJsonFileSync

```ts
function readJsonFile(path: string | URL): Promise<unknown>;
function readJsonFileSync(path: string | URL): unknown;
```

Reads a text file (as with [readTextFile]) and parses it as JSON. Throws a
`SyntaxError` if the content is not valid JSON.

### writeJsonFile / writeJsonFileSync

```ts
function writeJsonFile(path: string | URL, data: unknown): Promise<void>;
function writeJsonFileSync(path: string | URL, data: unknown): void;
```

Writes `data` as JSON with a 2-space indent and a trailing newline (as with
[writeTextFile]).

### unwrapDir / unwrapDirSync

```ts
function unwrapDir(dir: string | URL, depth = -1): Promise<string>;
function unwrapDirSync(dir: string | URL, depth = -1): string;
```

Removes outer one-item directories. Given `dir/a/b/c/` where `a` and `b` each
contain only one directory, `unwrapDir("dir")` moves `c` up to `dir` and returns
`"dir/a/b/c"` (the *seed* directory's path before it was moved).

- `depth` is the maximum number of levels to unwrap (a negative value means
  all) [`-1`].
- Unwrapping stops at the first directory that does not contain exactly one
  entry, or whose only entry is not a directory.
- If there is nothing to unwrap, `dir` is left untouched and returned as is.

<br>
<br>


## Story

The **file system** we use today has its origins in the [UNIX file system]. A
**file** is simply a *chunk of data (bytes)*. Each file has a *locally unique*
*name* and *associated properties* which can be grouped together in a *hierarchy*
of *directories*. A **directory** is a *list of files* and *other directories*,
and has a *parent directory* (except the *root directory* `/`). Given the
tree-structure, a file can be uniquely identified by its **full path**.

In Deno, access to a file is provided by an **`FsFile`** handle (the equivalent
of a file descriptor). It is obtained from `Deno.open()` by providing the *file
path* and *open options (read/write/append/create)*. Once a file has been opened
and necessary operations performed, such as reading it with `file.read()` or
writing to it with `file.write()`, it should be *closed* with `file.close()` (or
automatically, with a `using` declaration). Once data is written to a file
beyond its current size, it is *automatically expanded*. However, to reduce the
size of a file (i.e., to *truncate* it), `file.truncate()` is used. The
**additional properties** attached to a file, such as *access/update time* or
*size*, can be obtained with `file.stat()`, and updated with `file.utime()`.

**Convenience functions** for accessing a file can also be used, which do not
require us to go through the process of *opening* and *closing* files, and
meticulously reading it or writing to it in blocks. These include
`Deno.readFile()`, `Deno.writeFile()` (pass `{append: true}` to append),
`Deno.truncate()`, `Deno.stat()`, `Deno.utime()`. `Deno.chmod()` and
`Deno.chown()` are applicable to directories as well. A file can be copied to
another path with `Deno.copyFile()`, *renamed/moved* with `Deno.rename()`, and
removed (recursively, if a directory) with `Deno.remove()`. Copying a
*directory* (recursively) is done with [`copy()`] from `@std/fs`, and a
file's or directory's existence can be checked with [`exists()`].

A **directory** can be *read* with `Deno.readDir()`, a *new directory* can be
created with `Deno.mkdir()`, and a *temporary directory* (with a unique random
name) can be created with `Deno.makeTempDir()`. Changes to a file or directory
can be *observed* with `Deno.watchFs()`.

The file system also provides **symbolic links** and **hard links** which simply
*point* to an *existing file or directory*. *Symbolic (or soft) links* point to a
file or directory through its *path*, while *hard links* point *directly* to the
file. Therefore *renaming/moving* or *removing* the *original file* makes
symbolic links **dangling** (pointing to a *non-existent file*, and thus will
*not* work) but hard links *continue to work* (think of them as *shared pointers*
to a memory block). A *hard link* can be *created* with `Deno.link()`, and a
*symbolic link* (also called *symlink*) with `Deno.symlink()`. Note that
*symlinks* are basically files containing the *path* of the target file or
directory, and this path can be *read* with `Deno.readLink()`. The *full path*
of a symlink can be *resolved* with `Deno.realPath()`. The properties of a
symlink itself (rather than its target) can be obtained with `Deno.lstat()`.

<br>
<br>


## See also

- [Deno file system API](https://docs.deno.com/api/deno/file-system)
- [`@std/fs`](https://jsr.io/@std/fs)
- [`@std/path`](https://jsr.io/@std/path)
- [Soft and Hard links in Unix/Linux](https://www.geeksforgeeks.org/soft-hard-links-unixlinux/)
- [Linux Commands](https://www.geeksforgeeks.org/linux-commands/)
- [Node.js File system API](https://nodejs.org/api/fs.html)
- [fs-extra package](https://www.npmjs.com/package/fs-extra)
- [RegExr](https://regexr.com)

<br>
<br>

[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-fs)


[readTextFile]: #readtextfile--readtextfilesync
[writeTextFile]: #writetextfile--writetextfilesync
[readJsonFile]: #readjsonfile--readjsonfilesync
[writeJsonFile]: #writejsonfile--writejsonfilesync
[unwrapDir]: #unwrapdir--unwrapdirsync
[exists]: https://jsr.io/@std/fs/doc/~/exists
[copy]: https://jsr.io/@std/fs/doc/~/copy
[move]: https://jsr.io/@std/fs/doc/~/move
[emptyDir]: https://jsr.io/@std/fs/doc/~/emptyDir
[ensureDir]: https://jsr.io/@std/fs/doc/~/ensureDir
[ensureFile]: https://jsr.io/@std/fs/doc/~/ensureFile
[ensureLink]: https://jsr.io/@std/fs/doc/~/ensureLink
[ensureSymlink]: https://jsr.io/@std/fs/doc/~/ensureSymlink
[walk]: https://jsr.io/@std/fs/doc/~/walk
[expandGlob]: https://jsr.io/@std/fs/doc/~/expandGlob
[format]: https://jsr.io/@std/fs/doc/~/format
[detect]: https://jsr.io/@std/fs/doc/~/detect
[LF]: https://jsr.io/@std/fs/doc/~/LF
[CRLF]: https://jsr.io/@std/fs/doc/~/CRLF
[EOL]: https://jsr.io/@std/fs/doc/~/EOL
