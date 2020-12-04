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
    case 'android':
      return 'linux';
    case 'darwin':
    case 'sunos':
      return 'mac';
    case 'win32':
      return 'win';
  }
};

const name = get();

module.exports = { name };