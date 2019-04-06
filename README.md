Support methods and Promise interface for [fs module].
> Need to remove the extra outer directory after extracting zip?<br>

```javascript
const fs = require('extra-fs');


// BEFORE:
// /home/user/app
//   - app-master
//     - package.json
//     - README.md

await fs.dehuskDir('/home/user/app');
// AFTER:
// /home/user/app
//   - package.json
//   - README.md
```
<br>


## reference

```javascript
const fs = require('extra-fs');
// : includes all functions of "fs-extra"


fs.dehuskDir(dir);
-> Promise
```


[![nodef](https://merferry.glitch.me/card/extra-fs.svg)](https://nodef.github.io)

[fs module]: https://nodejs.org/api/fs.html
