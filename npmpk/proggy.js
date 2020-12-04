
console.log('Running console application...');

// Based on the stackoverflow thread at:
// https://stackoverflow.com/questions/33152533/bundling-precompiled-binary-into-electron-app

const platform = require('./platform').name;
const spawn = require('child_process').spawn;

const path = require('path');

var execPath = path.resolve(path.join(__dirname, './platforms', platform, './proggy'))

var processHandle = spawn(execPath, process.argv);
processHandle.stdout.on('data', data => {
    console.log('stdout: ' + data);
});

processHandle.stderr.on('data', data => {
    console.log('stderr: ' + data);
});

processHandle.on('exit', (code, signal) => {
    console.log('Console application exited with status ' + code +
        ' (signal: ' + signal + ').');
})