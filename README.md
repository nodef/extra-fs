Useful additions to inbuilt [fs] module.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-fs),
📜 [Files](https://unpkg.com/extra-fs/),
📰 [Docs](https://nodef.github.io/extra-fs/).

The **file system** we use today has its origins in the [UNIX file system]. A
**file** is simply a *chunk of data (bytes)*. Each file has a *locally unique*
*name* and *associated properties* which can be grouped together in a *hierarchy*
of *directories*. A **directory** is a *list of files* and *other directories*,
and has a *parent directory* (except the *root directory* `/`). Given the
tree-structure, a file can be uniquely identified by its **full path**.

Access to a file is provided by the file system though the use of a **file**
**descriptor**. This can be obtained from [open] by providing the *file path*, and
*open mode (read/write)*. Once a file has been opened and necessary operations
performed, such as reading it with [read] or writing to it with [write], it
should be *closed* with [close]. Reading or writing *multiple blocks* of a file at a
time can be achieved with [readv] and [writev]. Once data is written to a file
beyond it current size, it is *automatically expanded*. However, to reduce the
size of a file (i.e., to *truncate* it), [ftruncate] is used. The **additional**
**properties** attached to a file, such as *access/update time*, *access permissions*,
or *ownership* of a file can be obtained with [fstat], and updated with [futimes],
[fchmod], and [fchown] respectively.

**Convenience methods** for accessing a file can also be used, which do not require
us to go through the process of *opening* and *closing* files, and meticulously
reading it or writing to it in blocks. These include [readFile], [writeFile],
[appendFile], [truncate], [stat], [utimes]. [chmod] and [chown] are applicable
or directories as well. A file can be opened as a **stream** for reading with
[createReadStream] and for writing with [createWriteStream], and copied to
another path with [copyFile]. Access to a file or directory can be checked with
[access], renamed/moved with [rename], copied to another path (recursively) with
[cp], and removed (recursively) with [rm].

Similar to opening/closing of a file, a **directory** can be *opened* (to read its
contents) with [opendir], and *read* with [readdir]. A *new directory* can be
created with [mkdir], and an *empty directory* can be *removed* with [rmdir] (a
non-empty directory can be recursively removed with [rm]). A *temporary directory*
(with a unique random suffix) can be created with [mkdtemp]. Changes to a file
or dierctory can be *observed* with [watch].

The file system also provides **symbolic links** and **hard links** which simply *point*
to an *existing file or directory*. *Symbolic (or soft) links* point to a file or
directory through its *path*, while *hard links* point *directly* to the file.
Therefore *renaming/moving* or *removing* the *original file* makes symbolic links
**dangling** (pointing to *non-existent file*, and thus will *not* work) but hard links
*continue to work* (think of them as *shared pointers* to a memory block). A *hard*
*link* can be *created* with [link], and a *symbolic link* (also called *symlink*) with
[symlink]. Note that *symlinks* are basically files containing the *path* of target
file or directory, and this path can be *read* with [readlink]. The *full path* of a
symlink can be *resolved* with [realpath]. *Hard links* point directly to files, and
thus do not have a *"target"* path. The *additional properties* attached to a
symlink, such as *access/update time*, or *ownership* of the symlink can be obtained
with [lstat], and updated with [lutimes], and [lchown] respectively. The *access*
*permissions* of a symlink *cannot* be changed.

This package provides **async versions of functions** (in addition to the
existing *sync* and *callback*-based functions) in the inbuilt [fs] module,
exposed as `*Async()` from the `fs.promises` namespace. They can be used with
`Promise`-based asynchronous programming using the `await` keyword. In addition,
**callback-based functions**, such as [readFile], also **behave as async functions**
when a *callback* is **not provided**. The idea behind using `*Async()` function
names is to provide a **flat module**.

In addition, convenience functions such as [readFileText], [writeFileText],
[readJson] and [writeJson] are included. For performing file/directory
**existence check** *async* [exists], [assertExists], and [assertNotExists] can
be used. **Cleanup** of *one-item outer directories* (which are usually
created upon extracting a compressed file) can be performed with [dehuskdir].
This package previously included `which()`, which is now instead suitably
included in [extra-child-process] package.

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[fs]: https://nodejs.org/api/fs.html
[extra-child-process]: https://www.npmjs.com/package/extra-child-process
[UNIX file system]: https://www.youtube.com/watch?v=tc4ROCJYbm0


<br>

```javascript
const fs = require('extra-fs');


// 1. Read file text.
async function example1() {
  var text = fs.readFileTextSync('.npmignore');
  var text = await fs.readFileText('.npmignore');
  // → # Source only
  // → .gitmodules
  // → .github/
  // → .docs/
  // → ...
}
example1();


// 2. Read JSON file.
async function example2() {
  var json = fs.readJsonSync('package.json');
  var json = await fs.readJson('package.json');
  // → {
  // →   name: 'extra-fs',
  // →   version: '3.0.27',
  // →   description: 'Useful additions to inbuilt fs module.',
  // →   ...
  // → }
}
example2();


// 3. Assert that a file exists.
async function example3() {
  if (!(await fs.exists('LICENSE'))) throw 'May I see you license sir?';
  await fs.assertExists('LICENSE');
}
example3();


// 4. Get contents of a directory.
async function example4() {
  var contents = fs.readdirSync('src');
  var contents = await fs.readdir('src');
  // → [ 'index.ts' ]
}
example4();
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [open] | Open a file. |
| [close] | Close a file. |
| [read] | Read data from a file. |
| [write] | Write data to a file. |
| [readv] | Read an array of buffers from file. |
| [writev] | Write an array of buffers to file. |
| [ftruncate] | Shorten (truncate) a file. |
| [futimes] | Change the file system timestamps of a file. |
| [fstat] | Get information about a file. |
| [fchmod] | Set the permissions of a file. |
| [fchown] | Set the owner of a file. |
| ... |  |
| [link] | Create a hard link to a file or directory. |
| [symlink] | Create a symbolic link to a file or directory. |
| [readlink] | Read the contents of a symbolic link. |
| [realpath] | Get canonical pathname by resolving ., .. |
| [lutimes] | Change the file system timestamps of an object. |
| [lstat] | Get information about a file, without dereferencing symbolic links. |
| [lchown] | Set the owner of a symbolic link. |
| ... |  |
| [readFile] | Read the entire contents of a file. |
| [writeFile] | Write data to the file, replace if it already exists. |
| [appendFile] | Append data to a file, create if it does not exist. |
| [truncate] | Shorten (truncate) a file. |
| [unlink] | Remove a file or symbolic link. |
| [utimes] | Change the file system timestamps of an object. |
| [stat] | Get file status. |
| [copyFile] | Copy source file to destination, overwite if exists. |
| [readFileText] | Read file text with Unix EOL. |
| [writeFileText] | Write file text with system EOL. |
| [readJson] | Read JSON file as value. |
| [writeJson] | Write object to JSON file. |
| [watchFile] | Watch for changes on `filename`. |
| [unwatchFile] | Stop watching for changes on `filename`. |
| [watch] | Watch for changes on `filename`, where `filename` is either a file or a directory. |
| [createReadStream] | Create a readable stream with 64kb `highWaterMark`. |
| [createWriteStream] | Create a writeable stream from a desired `start` position. |
| ... |  |
| [mkdir] | Create a directory. |
| [mkdtemp] | Create a unique temporary directory. |
| [opendir] | Open a directory. |
| [readdir] | Open a directory. |
| [rmdir] | Remove a directory. |
| [dehuskdir] | Remove outer one-item directories. |
| ... |  |
| [access] | Test a user's permissions for the file or directory. |
| [chmod] | Change the permissions of a file. |
| [chown] | Change owner and group of a file. |
| [rename] | Rename/move a file or directory. |
| [cp] | Copy source directory to destination, overwite if exists. |
| [rm] | Remove a file or directory. |
| [exists] | Check if file or directory exists. |
| [assertExists] | Assert that a file or directory exists. |
| [assertNotExists] | Assert that a file or directory does not exist. |

<br>
<br>

## References

- [Node.js File system API](https://nodejs.org/api/fs.html)
- [fs-extra package](https://www.npmjs.com/package/fs-extra)
- [Soft and Hard links in Unix/Linux](https://www.geeksforgeeks.org/soft-hard-links-unixlinux/)
- [Why do Linux/POSIX have lchown but not lchmod?](https://unix.stackexchange.com/q/224979/166668)
- [Linux Commands](https://www.geeksforgeeks.org/linux-commands/)
- [RegExr](https://regexr.com)

<br>
<br>

[![](https://img.youtube.com/vi/nA3x4vVEpKc/maxresdefault.jpg)](https://www.youtube.com/watch?v=nA3x4vVEpKc)
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
[![DOI](https://zenodo.org/badge/179787900.svg)](https://zenodo.org/badge/latestdoi/179787900)


[open]: https://nodef.github.io/extra-fs/functions/open.html
[close]: https://nodef.github.io/extra-fs/functions/close.html
[read]: https://nodef.github.io/extra-fs/functions/read.html
[write]: https://nodef.github.io/extra-fs/functions/write.html
[readv]: https://nodef.github.io/extra-fs/functions/readv.html
[writev]: https://nodef.github.io/extra-fs/functions/writev.html
[ftruncate]: https://nodef.github.io/extra-fs/functions/ftruncate.html
[futimes]: https://nodef.github.io/extra-fs/functions/futimes.html
[fstat]: https://nodef.github.io/extra-fs/functions/fstat.html
[fchmod]: https://nodef.github.io/extra-fs/functions/fchmod.html
[fchown]: https://nodef.github.io/extra-fs/functions/fchown.html
[link]: https://nodef.github.io/extra-fs/functions/link.html
[symlink]: https://nodef.github.io/extra-fs/functions/symlink.html
[readlink]: https://nodef.github.io/extra-fs/functions/readlink.html
[realpath]: https://nodef.github.io/extra-fs/functions/realpath.html
[lutimes]: https://nodef.github.io/extra-fs/functions/lutimes.html
[lstat]: https://nodef.github.io/extra-fs/functions/lstat.html
[lchown]: https://nodef.github.io/extra-fs/functions/lchown.html
[readFile]: https://nodef.github.io/extra-fs/functions/readFile.html
[writeFile]: https://nodef.github.io/extra-fs/functions/writeFile.html
[appendFile]: https://nodef.github.io/extra-fs/functions/appendFile.html
[truncate]: https://nodef.github.io/extra-fs/functions/truncate.html
[unlink]: https://nodef.github.io/extra-fs/functions/unlink.html
[utimes]: https://nodef.github.io/extra-fs/functions/utimes.html
[stat]: https://nodef.github.io/extra-fs/functions/stat.html
[copyFile]: https://nodef.github.io/extra-fs/functions/copyFile.html
[readFileText]: https://nodef.github.io/extra-fs/functions/readFileText.html
[writeFileText]: https://nodef.github.io/extra-fs/functions/writeFileText.html
[readJson]: https://nodef.github.io/extra-fs/functions/readJson.html
[writeJson]: https://nodef.github.io/extra-fs/functions/writeJson.html
[watchFile]: https://nodef.github.io/extra-fs/functions/watchFile.html
[unwatchFile]: https://nodef.github.io/extra-fs/functions/unwatchFile.html
[watch]: https://nodef.github.io/extra-fs/functions/watch.html
[createReadStream]: https://nodef.github.io/extra-fs/functions/createReadStream.html
[createWriteStream]: https://nodef.github.io/extra-fs/functions/createWriteStream.html
[mkdir]: https://nodef.github.io/extra-fs/functions/mkdir.html
[mkdtemp]: https://nodef.github.io/extra-fs/functions/mkdtemp.html
[opendir]: https://nodef.github.io/extra-fs/functions/opendir.html
[readdir]: https://nodef.github.io/extra-fs/functions/readdir.html
[rmdir]: https://nodef.github.io/extra-fs/functions/rmdir.html
[dehuskdir]: https://nodef.github.io/extra-fs/functions/dehuskdir.html
[access]: https://nodef.github.io/extra-fs/functions/access.html
[chmod]: https://nodef.github.io/extra-fs/functions/chmod.html
[chown]: https://nodef.github.io/extra-fs/functions/chown.html
[rename]: https://nodef.github.io/extra-fs/functions/rename.html
[cp]: https://nodef.github.io/extra-fs/functions/cp.html
[rm]: https://nodef.github.io/extra-fs/functions/rm.html
[exists]: https://nodef.github.io/extra-fs/functions/exists.html
[assertExists]: https://nodef.github.io/extra-fs/functions/assertExists.html
[assertNotExists]: https://nodef.github.io/extra-fs/functions/assertNotExists.html
