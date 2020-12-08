#!/usr/bin/env node

console.log('Running console application...');

// Based on the stackoverflow thread at:
// https://stackoverflow.com/questions/33152533/bundling-precompiled-binary-into-electron-app

const platform = require('./platform').name;
const spawn = require('child_process').spawn;

const path = require('path');

var execPath = path.resolve(path.join(__dirname, './platforms', platform, './proggy'))

var args = [];

if (process.argv.length > 2) {
    // Skips the two first commandline arguments (which are node executable and
    // js script path)
    for (var i=2; i < process.argv.length; i++) {
        args.push(process.argv[i]);
    }
}

var processHandle = spawn(execPath, args);
processHandle.stdout.on('data', data => {
    process.stdout.write(data);
});

processHandle.stderr.on('data', data => {
    process.stderr.write(data);
});

processHandle.on('exit', (code, signal) => {
    console.log('Console application exited with status ' + code +
        ' (signal: ' + signal + ').');
    // Forwards called program exit status.
    process.exit(code);
})