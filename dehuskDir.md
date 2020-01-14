Removes extra outer directories, say after extracting zip.

```bash
# BEFORE:
# /home/user/app
#   - app-master
#     - package.json
#     - README.md

edehuskdir /home/user/app
## Remove the extra "app-master" directory
# /home/user/app/app-master (seed directory)

# AFTER:
# /home/user/app
#   - package.json
#   - README.md
```
<br>
<br>

## reference

```bash
edehuskdir [options] directory...
# Options: 
# --help: show this help
# --silent: show only -1 on error
# -d, --depth: maximum number of extra directories to remove (-1 => unlimited)

# Environment variables: 
$EDEHUSKDIR_SILENT  # 0
$EDEHUSKDIR_DEPTH   # -1
```
