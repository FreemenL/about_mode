const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const zlib = require("zlib");
const mime = require("mime");
const { promisify } = require('util');
const stat = promisify(fs.stat);

http.createServer(async function(req,res){
    let { pathname } = url.parse(req.url);
    let filepath = path.join(__dirname,pathname);
    try{
        const statObj = await stat(filepath);
        res.setHeader("Content-Type",mime.getType(pathname));
        const acceptEncoding = req.headers['accept-encoding'];
        if(acceptEncoding){
            if(acceptEncoding.match(/\bgzip\b/)){
                res.setHeader('Content-Encoding',"gzip");
                fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res);
            }else if(acceptEncoding.match(/\bdeflate\b/)){
                res.setHeader('Content-Encoding',"deflate");
                fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res);
            }else{
                fs.createReadStream(filepath).pipe(res);
            }
        }else{
            fs.createReadStream(filepath).pipe(res);
        }
    }catch(err){
        res.statusCode = 404;
        res.end()
    }
}).listen(8081);