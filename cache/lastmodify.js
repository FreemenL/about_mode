/** 
 * 1.第一次访问服务器的时候，服务器会返回资源和缓存的标识，客户端则会把此资源缓存在本地的缓存数据库中。
 * 2.第二次客户端需要此数据的时候，要取得缓存的标识，然后去问下服务器我的资源是否是最新的。
 * 如果是最新的则直接使用缓存数据，如果不是最新的则服务器返回新的资源和缓存规则，客户端根据新的规则缓存新的数据
 */
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime  = require("mime");

http.createServer(function(req,res){
    const { pathname } = url.parse(req.url,true);
    const filepath = path.join(__dirname,pathname);
    fs.stat(filepath,(err,stat)=>{
        if(err){
           return sendErr(req,res)
        }else{
            const ifModifiedSince = req.headers['if-modified-since'];
            const LastModified = stat.ctime.toGMTString();
            if(ifModifiedSince == LastModified){
                res.writeHead(304);
                res.end();
            }else{
                return send(req,res,filepath,stat)
            }
        }
    })
}).listen(8080);

function sendErr(req,res){
    res.end('Not Found');
}
function send(req,res,filepath,stat){
    res.setHeader("Content-Type",mime.getType(filepath));
    //把文件的最后修改时间发给客户端，客户端会把此时间保存起来 ，次再获取此资源的时候会把这个时间再发给服务器
    res.setHeader("Last-Modified",stat.ctime.toGMTString());
    fs.createReadStream(filepath).pipe(res);
}