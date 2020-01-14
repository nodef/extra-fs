Useful additions to inbuilt [fs module].

## console

Programs:

| Name                | Action
|---------------------|-------
| [edehuskdir]        | Removes extra outer directories, say after extracting zip.
| [ewhich]            | Locates executable path of programs.

<br>
<br>

## javascript

```javascript
const fs = require('extra-fs');
// : includes all functions of "fs-extra"
// fs.which(program, [options], [callback])
// fs.whichSync(program, [options])
// ...
```

Methods:

| Name                | Action
|---------------------|-------
| [dehuskDir]         | Removes extra outer directories, say after extracting zip (asynchronous).
| [dehuskDirSync]     | Removes extra outer directories, say after extracting zip (synchronous).
| [which]             | Locates executable path of programs (asynchronous).
| [whichSync]         | Locates executable path of programs (synchronous).

<br>
<br>

## references

- [Linux Commands](https://www.geeksforgeeks.org/linux-commands/)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [which](https://www.npmjs.com/package/which)
- [RegExr](https://regexr.com)

<br>
<br>

[![nodef](https://merferry.glitch.me/card/extra-fs.svg)](https://nodef.github.io)

[fs module]: https://nodejs.org/api/fs.html
[dehuskDir]: https://github.com/nodef/extra-fs/wiki/dehuskDir
[dehuskDirSync]: https://github.com/nodef/extra-fs/wiki/dehuskDirSync
[which]: https://github.com/nodef/extra-fs/wiki/which
[whichSync]: https://github.com/nodef/extra-fs/wiki/whichSync
[edehuskdir]: https://github.com/nodef/extra-fs/blob/master/dehuskDir.md
[ewhich]: https://github.com/nodef/extra-fs/blob/master/which.md
