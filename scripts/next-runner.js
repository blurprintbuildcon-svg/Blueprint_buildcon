const fs = require('node:fs');
const cp = require('node:child_process');

// On Windows, resolve process.cwd() to its exact on-disk casing
// to prevent multiple React module instances from being loaded by bundlers.
if (process.platform === 'win32') {
  try {
    const nativeCwd = fs.realpathSync.native(process.cwd());
    if (nativeCwd !== process.cwd()) {
      process.chdir('C:\\');
      process.chdir(nativeCwd);
    }
  } catch {}
}

const args = process.argv.slice(2);
const child = cp.spawn('npx', ['next', ...args], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
