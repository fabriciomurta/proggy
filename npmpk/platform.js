'use strict';

// Based on the stackoverflow thread at:
// https://stackoverflow.com/questions/33152533/bundling-precompiled-binary-into-electron-app

const os = require('os');

function  get() {
  switch (os.platform()) {
    case 'aix':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
      if (os.arch() == 'x64') {
        return 'linux-x64';
      }
    case 'darwin':
      return 'osx-x64';
    case 'win32':
      if (os.arch() == 'x64') {
        return 'win-x64';
      }

      // It would usually be 'x86' but node likes 'x32' according to:
      // https://nodejs.org/docs/latest-v14.x/api/os.html#os_os_arch
      if (os.arch() == 'x32') {
        return 'win-x86';
      }
  }
  throw new Error('Unsupported platform/architecture: ' + os.platform() + '/' + os.arch());
};

// This would force the script to die very early if called from an unsupported OS.
const name = get();

module.exports = { name };