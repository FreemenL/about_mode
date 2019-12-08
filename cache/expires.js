/** 
 * 强缓存
 * 把资源缓存在客户端，如果客户端需要再次使用此资源的时候，先获取到缓存中的数据，看是否过期
 * 如果过期了再请求服务器。
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
            return send(req,res,filepath,stat)
        }
    })
}).listen(8080);

function sendErr(req,res){
    res.end('Not Found');
}
function send(req,res,filepath,stat){
    res.setHeader("Content-Type",mime.getType(filepath));
    res.setHeader("Cache-Control","max-age=30");
    fs.createReadStream(filepath).pipe(res);
}