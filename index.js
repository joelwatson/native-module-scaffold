const yargs = require('yargs');
const fs = require('fs-extra');
const path = require('path');
const versions = {
    "1.4.4": '50',
    "1.4.5": '50',
    "1.4.6": '50',
    "1.4.7": '50',
    "1.4.8": '50',
    "1.4.10": '50',
    "1.4.11": '50'
};


let argv = yargs
    .option('e', {
        alias: 'electronVersion',
        describe: 'Electron Version',
        type: 'string'
    })
    .option('o', {
        alias: 'outputFolder',
        describe: 'Output Folder Name',
        type: 'string'
    }).argv;

if (!argv.e) {
    throw new Error('Electron Version is required!');
}

if (!argv.o) {
    throw new Error('Output Folder is required!');
}

// make root directory
let basePath = fs.mkdirpSync(path.join(path.resolve(argv.o), 'compiled'));
let electronPath = fs.mkdirpSync(path.join(basePath, 'electron'));
let nodePath = fs.mkdirpSync(path.join(basePath, 'node'));
// process electron
let electronVersion = versions[argv.e];

if (electronVersion) {
    let versionPath = fs.mkdirpSync(path.join(electronPath, electronVersion));
    // now process platform
    let platformPath = fs.mkdirpSync(path.join(versionPath, process.platform));
    // finally architecture
    let archPath = fs.mkdirpSync(path.join(platformPath, process.arch));
} else {
    throw new Error('Electron ABI version not found');
}

// process node
let versionPath = fs.mkdirpSync(path.join(nodePath, process.versions.modules));
// now process platform
let platformPath = fs.mkdirpSync(path.join(versionPath, process.platform));
// finally architecture
let archPath = fs.mkdirpSync(path.join(platformPath, process.arch));
