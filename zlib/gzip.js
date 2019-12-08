const fs = require('fs');
const zlib = require('zlib');
const path  = require("path");

function gzip(src){
    fs.createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(src+'.gz'));
}
// gzip(path.join(__dirname,"msg.txt"));

function gunzip(src){
    fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname,path.basename(src,".gz"))))
}
gunzip(path.join(__dirname,"msg.txt.gz"))