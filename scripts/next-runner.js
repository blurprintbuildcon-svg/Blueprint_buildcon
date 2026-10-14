const fs = require('node:fs');
const cp = require('node:child_process');
const path = require('node:path');

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
const nextBin = path.join(__dirname, '..', 'node_modules', '.bin', process.platform === 'win32' ? 'next.cmd' : 'next');
const command = fs.existsSync(nextBin) ? nextBin : 'next';

const child = cp.spawn(command, args, {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
  env: {
    ...process.env,
    NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --max-old-space-size=4096`.trim(),
  },
});


child.on('exit', (code) => {
  process.exit(code ?? 0);
});
