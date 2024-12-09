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
 const overrideIds = (fileHeader) => {
        // Owned by root by default
        fileHeader.uid = 0;
        fileHeader.gid = 0;

        // But ensure everything is globally readable & runnable
        fileHeader.mode = 0o555;

        return fileHeader;
    };

tar.pack(currentDir, {map: overrideIds}).pipe(fs.createWriteStream(destFile));

console.info('written file to ' + destFile);
