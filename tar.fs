const tar = require('tar-fs')
const fs = require('node:fs')
const path = require('node:path');
const currentDir=process.argv[2];

if (!currentDir) {
 console.error('need to provide the directory to compress');
 process.exit(1);
}

console.log('currentDir is', currentDir);

// packing a directory
const destFile = path.resolve(currentDir,'build-context.tar');
tar.pack(currentDir).pipe(fs.createWriteStream(destFile));

console.info('written file to ' + destFile);
