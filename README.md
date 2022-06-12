Useful additions to inbuilt [fs] module.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-fs),
📜 [Files](https://unpkg.com/extra-fs/),
📰 [Docs](https://nodef.github.io/extra-fs/).

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

<br>

```javascript
const fs = require('extra-fs');
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


[fs]: https://nodejs.org/api/fs.html
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
