const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
//建立白名单
const whiteHost=[
    "172.20.10.2",
    "localhost",
];

http.createServer(function(req,res){
    const refer = req.headers['referer']||req.headers['refer'];
    if(refer){
        // 引用地址
        const referHostName = url.parse(refer,true).hostname;
        //当前资源的请求地址
        const currentHostName = url.parse(req.url,true).hostname;
        if(!whiteHost.includes(referHostName)){
            res.setHeader('Content-Type','image/png');
            fs.createReadStream(path.join(__dirname,"404.png")).pipe(res);
            return 
        }
    }
    res.setHeader('Content-Type','image/png');
    fs.createReadStream(path.join(__dirname,"base.png")).pipe(res);
}).listen(3000);
