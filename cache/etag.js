/** 
 * 1.第一次访问服务器的时候，服务器会返回资源和缓存的标识，客户端则会把此资源缓存在本地的缓存数据库中。
 * 2.第二次客户端需要此数据的时候，要取得缓存的标识，然后去问下服务器我的资源是否是最新的。
 * 如果是最新的则直接使用缓存数据，如果不是最新的则服务器返回新的资源和缓存规则，客户端根据新的规则缓存新的数据
 */
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const mime  = require("mime");

http.createServer(function(req,res){
    const { pathname } = url.parse(req.url,true);
    const filepath = path.join(__dirname,pathname);
    fs.stat(filepath,(err,stat)=>{
        if(err){
           return sendErr(req,res)
        }else{
            const ifNoneMatch = req.headers['if-none-match'];
            const out = fs.createReadStream(filepath);
            const md5 = crypto.createHash("md5");
            out.on("data",function(data){
                md5.update(data)
            })
            out.on("end",function(data){
                /**
                * mad5 ：
                * 相同的输入 相同的输出。
                * 不同的输入不同的输出。
                * 不能从输出反推输入
                */
               const Etag = md5.digest("hex");
               if(ifNoneMatch == Etag){
                   res.writeHead(304);
                   res.end();
               }else{
                   return send(req,res,filepath,Etag)
               }
            })
        }
    })
}).listen(8080);

function sendErr(req,res){
    res.end('Not Found');
}

function send(req,res,filepath,Etag){
    res.setHeader("Content-Type",mime.getType(filepath));
    //第一次服务器返回的时候，会把文件的内容算出来一个标识，发给客户端，
    //客户端看到Etag的时候，会把此标识符存在客户端，下次再访问服务器的时候，发给服务器
    res.setHeader("Etag",Etag);
    fs.createReadStream(filepath).pipe(res);
}