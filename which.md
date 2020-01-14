Locates executable path of programs (synchronous).

```bash
ewhich node
## Look for the "node" program
# C:\Program Files\nodejs\node.exe

ewhich -r "no.*"
## Look for all programs starting with "no" (with regular expression)
# C:\Program Files\nodejs\node.exe
# C:\Program Files\nodejs\nodevars.bat

ewhich -f "p => p.startsWith('no')"
## Look for all programs starting with "no" (with function)
# C:\Program Files\nodejs\node.exe
# C:\Program Files\nodejs\nodevars.bat

ewhich -p "C:\Programs;%PATH%" "node"
## Look for the "node" program in given paths (C:\Programs;%PATH%)
# C:\Program Files\nodejs\node.exe
```
<br>
<br>

## reference

```bash
ewhich [options] program...
# Options: 
# --help: show this help 
# --silent: show only -1 on error
# -r, --regexp:   use regular expression for matching program name
# -f, --function: use function for matching program name
# -p, --paths:    set paths where to look program for
 
# Environment variables: 
$EWHICH_SILENT   # 0
$EWHICH_REGEXP   # 0
$EWHICH_FUNCTION # 0
$EWHICH_PATHS
```
