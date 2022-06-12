Useful additions to inbuilt [fs] module.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-fs),
📜 [Files](https://unpkg.com/extra-fs/),
📰 [Docs](https://nodef.github.io/extra-fs/).

This package provides **async versions of functions** (in addition to the
existing *sync* and *callback*-based functions) in the inbuilt [fs] module,
exposed as `*Async()` from the `fs.promises` namespace. They can be used with
`Promise`-based asynchronous programming using the `await` keyword. In addition,
**callback-based functions**, such as [readFile], also **behave as async functions**
when a *callback* is **not provided**. The idea behind using `*Async()` function
names is to provide a **flat module**.

In addition, convenience functions such as [readFileText] and [readJson] are
included. For performing file/directory **existence check** *async* [exists],
[assertExists], and [assertNotExists] can be used. **Cleanup** of *one-item outer*
*directories* can be performed with [dehuskdir]. This package previously included
`which()`, which is now instead suitably included in [extra-child-process]
package.

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

[fs]: https://nodejs.org/api/fs.html
[extra-child-process]: https://www.npmjs.com/package/extra-child-process

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
  // → [
  // →   'index.ts',
  // →   'promises.ts',
  // →   '_all.ts',
  // →   ...
  // → ]
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
| ... |   |
| [link] | Create a hard link to a file or directory. |
| [symlink] | Create a symbolic link to a file or directory. |
| [readlink] | Read the contents of a symbolic link. |
| [realpath] | Get canonical pathname by resolving ., .. |
| [lutimes] | Change the file system timestamps of an object. |
| [lstat] | Get information about a file, without dereferencing symbolic links. |
| [lchown] | Set the owner of a symbolic link. |
| ... |   |
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
| ... |   |
| [mkdir] | Create a directory. |
| [mkdtemp] | Create a unique temporary directory. |
| [opendir] | Open a directory. |
| [readdir] | Open a directory. |
| [rmdir] | Remove a directory. |
| [dehuskdir] | Remove outer one-item directories. |
| ... |   |
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

- [Linux Commands](https://www.geeksforgeeks.org/linux-commands/)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [which](https://www.npmjs.com/package/which)
- [RegExr](https://regexr.com)

<br>
<br>

[![](https://img.youtube.com/vi/KqqxIP3mUw4/maxresdefault.jpg)](https://www.youtube.com/watch?v=KqqxIP3mUw4)


[open]: https://nodef.github.io/extra-fs/modules.html#open
[close]: https://nodef.github.io/extra-fs/modules.html#close
[read]: https://nodef.github.io/extra-fs/modules.html#read
[write]: https://nodef.github.io/extra-fs/modules.html#write
[readv]: https://nodef.github.io/extra-fs/modules.html#readv
[writev]: https://nodef.github.io/extra-fs/modules.html#writev
[ftruncate]: https://nodef.github.io/extra-fs/modules.html#ftruncate
[futimes]: https://nodef.github.io/extra-fs/modules.html#futimes
[fstat]: https://nodef.github.io/extra-fs/modules.html#fstat
[fchmod]: https://nodef.github.io/extra-fs/modules.html#fchmod
[fchown]: https://nodef.github.io/extra-fs/modules.html#fchown
[link]: https://nodef.github.io/extra-fs/modules.html#link
[symlink]: https://nodef.github.io/extra-fs/modules.html#symlink
[readlink]: https://nodef.github.io/extra-fs/modules.html#readlink
[realpath]: https://nodef.github.io/extra-fs/modules.html#realpath
[lutimes]: https://nodef.github.io/extra-fs/modules.html#lutimes
[lstat]: https://nodef.github.io/extra-fs/modules.html#lstat
[lchown]: https://nodef.github.io/extra-fs/modules.html#lchown
[readFile]: https://nodef.github.io/extra-fs/modules.html#readFile
[writeFile]: https://nodef.github.io/extra-fs/modules.html#writeFile
[appendFile]: https://nodef.github.io/extra-fs/modules.html#appendFile
[truncate]: https://nodef.github.io/extra-fs/modules.html#truncate
[unlink]: https://nodef.github.io/extra-fs/modules.html#unlink
[utimes]: https://nodef.github.io/extra-fs/modules.html#utimes
[stat]: https://nodef.github.io/extra-fs/modules.html#stat
[copyFile]: https://nodef.github.io/extra-fs/modules.html#copyFile
[readFileText]: https://nodef.github.io/extra-fs/modules.html#readFileText
[writeFileText]: https://nodef.github.io/extra-fs/modules.html#writeFileText
[readJson]: https://nodef.github.io/extra-fs/modules.html#readJson
[writeJson]: https://nodef.github.io/extra-fs/modules.html#writeJson
[watchFile]: https://nodef.github.io/extra-fs/modules.html#watchFile
[unwatchFile]: https://nodef.github.io/extra-fs/modules.html#unwatchFile
[watch]: https://nodef.github.io/extra-fs/modules.html#watch
[createReadStream]: https://nodef.github.io/extra-fs/modules.html#createReadStream
[createWriteStream]: https://nodef.github.io/extra-fs/modules.html#createWriteStream
[mkdir]: https://nodef.github.io/extra-fs/modules.html#mkdir
[mkdtemp]: https://nodef.github.io/extra-fs/modules.html#mkdtemp
[opendir]: https://nodef.github.io/extra-fs/modules.html#opendir
[readdir]: https://nodef.github.io/extra-fs/modules.html#readdir
[rmdir]: https://nodef.github.io/extra-fs/modules.html#rmdir
[dehuskdir]: https://nodef.github.io/extra-fs/modules.html#dehuskdir
[access]: https://nodef.github.io/extra-fs/modules.html#access
[chmod]: https://nodef.github.io/extra-fs/modules.html#chmod
[chown]: https://nodef.github.io/extra-fs/modules.html#chown
[rename]: https://nodef.github.io/extra-fs/modules.html#rename
[cp]: https://nodef.github.io/extra-fs/modules.html#cp
[rm]: https://nodef.github.io/extra-fs/modules.html#rm
[exists]: https://nodef.github.io/extra-fs/modules.html#exists
[assertExists]: https://nodef.github.io/extra-fs/modules.html#assertExists
[assertNotExists]: https://nodef.github.io/extra-fs/modules.html#assertNotExists
