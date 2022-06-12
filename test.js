const fs = require('./');


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
// example1();


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
// example2();


// 3. Assert that a file exists.
async function example3() {
  if (!(await fs.exists('LICENSE'))) throw 'May I see you license sir?';
  await fs.assertExists('LICENSE');
}
// example3();


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
