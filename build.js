const build = require('extra-build');

const owner   = 'nodef';
const srcts   = 'index.ts';
const LOCATIONS = [
  'src/_all.ts',
  'src/_fd.ts',
  'src/_link.ts',
  'src/_file.ts',
  'src/_dir.ts',
  'src/_any.ts',
  'src/index.ts',
  'src/promise.ts',
];




// Get keywords for main/sub package.
function keywords(ds) {
  var m = build.readMetadata('.');
  var s = new Set([...m.keywords, ...ds.map(d => d.name)]);
  return Array.from(s);
}


// Publish root package to NPM, GitHub.
function publishRoot(ds, ver) {
  var _package = build.readDocument('package.json');
  var m = build.readMetadata('.');
  m.version  = ver;
  m.keywords = keywords(ds);
  build.writeMetadata('.', m);
  build.publish('.');
  try { build.publishGithub('.', owner); }
  catch {}
  build.writeDocument(_package);
}


// Deploy root package to NPM, GitHub.
function deployRoot(ds, ver) {
  build.bundleScript(`.build/${srcts}`);
  publishRoot(ds, ver);
}


// Get sub package description.
function subDescription(nam) {
  if (!fs.existsSync(`wiki/${nam}.md`)) return '';
  var txt = fs.readFileTextSync(`wiki/${nam}.md`);
  return txt.replace(/\n[\s\S]*/g, '').replace(/<br>/g, '');
}


// Publish sub package to NPM, GitHub.
function publishSub(nam, sym, ver) {
  fs.restoreFileSync('package.json', () => {
    var m    = package.read();
    var desc = `${m.description.slice(0, -1)} {${nam}}.`;
    m.name = `@${m.name}/${nam}`;
    m.description = subDescription(nam) || desc;
    m.version  = ver;
    m.keywords = keywords(`${nam}.ts`);
    if (sym) { m.name += '.web'; }
    fs.restoreFileSync('README.md', () => {
      var txt = fs.readFileTextSync('README.md');
      if (sym) txt = txt.replace(/\[Files\]\((.*?)\/\)/g, '[Files]($1.web/)');
      fs.writeFileTextSync('README.md', txt);
      package.write('.', m);
      package.publish('.');
      package.publishGithub('.', owner);
    });
  });
}


// Deploy root package to NPM, GitHub.
function deployRoot(ds, ver) {
  build.bundleScript(`.build/${srcts}`);
  publishRoot(ds, ver);
}


// Deploy sub package to NPM, GitHub.
function deploySub(ver) {
  var m = package.read();
  for (var f of fs.readdirSync('src')) {
    if (/^_|index\.ts/.test(f)) continue;
    var nam = f.replace(/\..*/, '');
    var sym = path.symbolname(`${m.name}-${nam}`);
    fs.restoreFileSync('README.md', () => {
      var md = `wiki/${nam}.md`;
      if (fs.existsSync(md)) fs.copyFileSync(md, 'README.md');
      generateMain(f, '');
      publishSub(nam, '', ver);
      // generateMain(f, sym);
      // publishSub(nam, sym, ver);
    });
  }
}


// Deploy root, sub packages to NPM, GitHub.
function deployAll(ds) {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  build.exec(`tsc`);
  build.updateGithubRepoDetails();
  build.generateDocs(`src/${srcts}`);
  build.publishDocs();
  deployRoot(ds, ver);
}


// Generate wiki for all exported symbols.
function generateWiki() {
  // createWikiFiles();
  // generateWikiFiles();
}


// Get README index descriptions.
function readmeDescription(d) {
  var rkind = /function/i;
  var sname = /a?sync$/i;
  if (!rkind.test(d.kind)) return '';
  if (sname.test(d.name) && d.name!=='spawnAsync') return '';
  var a = d.description.replace(/`(\w+)\s+`/g, '`$1`');
  if (d.name==='createReadStream')  a = 'Create a readable stream with 64kb `highWaterMark`.';
  if (d.name==='createWriteStream') a = 'Create a writeable stream from a desired `start` position.';
  return a;
}


// Sort docs details by original order.
function compareLocation(a, b) {
  if (a.kind!==b.kind) return 0;
  var alocn = a.location.replace(/.*?@types\/node.*?\:/, 'src/_file.ts:');
  var blocn = b.location.replace(/.*?@types\/node.*?\:/, 'src/_file.ts:');
  var [afile] = alocn.split(':');
  var [bfile] = blocn.split(':');
  return LOCATIONS.indexOf(afile) - LOCATIONS.indexOf(bfile) || alocn.localeCompare(blocn);
}


// Update README.
function updateReadme(ds) {
  var m  = build.readMetadata('.');
  var repo = m.name;
  var ds = ds.slice().sort(compareLocation);
  var dm = new Map(ds.map(d => [d.name, d]));
  var txt = build.readFileText('README.md');
  txt = build.wikiUpdateIndex(txt, dm, readmeDescription);
  txt = build.wikiUpdateLinkReferences(txt, dm, {owner, repo});
  build.writeFileText('README.md', txt);
}


function main(a) {
  var p  = build.loadDocs([`src/${srcts}`]);
  var ds = p.children.map(build.docsDetails);
  if (a[2] === 'deploy') deployAll(ds);
  else if (a[2] === 'wiki') generateWiki(ds);
  else if (a[2] === 'readme') updateReadme(ds);
  else build.bundleScript(`.build/${srcts}`);
}
main(process.argv);
