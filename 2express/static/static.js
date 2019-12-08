// 内置中间件 static 静态文件中间件 
const path = require("path");
const express = require('express');
const app = express();
const fs = require("fs");
const url = require("url");
const mime = require("mime");

app.use(static(path.join(__dirname, 'public'),{
    setHeaders(req,res,callback){
        res.setHeader("time",Date.now());
    }
}));

app.get("/user",function(req,res){ 
    res.end("user");
});

function static(root,options = {}){
    let { dotfiles = "ignore" ,etag=true,lastModified,maxAge=0, setHeaders } = options;
    return function(req,req,next){
        let { pathname } = url.parse(req.url,true);
        let file = path.join(root,pathname);
        let parts = file.split(path.sep);
        let isDotFile = parts[parts.length-1][0]==".";
        if(isDotFile&& dotfiles=="deny"){  //拒绝访问.文件
            res.setHeader("Content-Type","text/html");
            res.statusCode = 403;
            return res.end(http.STATUS_CODES[403]);
        }
        fs.stat(file,function(error,stat){
            if(error){
                next()
            }else{
                if(etag){
                    res.setHeader("ETag",stat.mtime.toLocaleDateString());
                }
                if(lastModified){
                    res.setHeader("Last-Modified",stat.mtime.toUTCString())
                }
                if(typeof setHeaders =='function'){
                    setHeaders(req,req,function(params){
                        console.log(params);
                    });
                }
                res.setHeader("Cache-Control",`max-age=${maxAge}`);
                res.setHeader("Content-Type",mime.getType(file)) 
                fs.createReadStream(file).pipe(res);
            }
        })
    }
};

app.listen(8080);