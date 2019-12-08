const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser("MYwSECRET"));
 
app.get("/write",function(req,res){
    res.cookie = function(key,value,options){
        let { domain ,path ,maxAge ,expires ,httpOnly}  = options;
        let parts = [`${key}=${value}`];
        if(path){
            parts.push(`path=${path}`)
        }
        if(domain){
            parts.push(`Domain=${domain}`)
        }
        if(maxAge){
            parts.push(`Max-Age=${maxAge}`)
        }
        if(httpOnly){
            parts.push(`HttpOnly`)
        }
        if(expires){
            parts.push(`Expires=${expires.toUTCString()}`)
        }
        parts = parts.join("; ")
        res.setHeader("Set-Cookie",parts);
    }
    res.cookie('name', 'tobi', { 
        signed: true ,
        httpOnly:true, //防止客户端篡改
        // path:"/read1"
        // maxAge: 10*1000,
        //expires: new Date(Date.now()+10*1000),
    });
    res.end("write ok");
})

app.get("/read",function(req,res){
    let cookie = req.signedCookies;
    res.send(cookie);
})
app.get("/read1",function(req,res){
    let cookie = req.signedCookies;
    res.send(cookie);
})

app.listen(8080,function(){
    console.log("server started!");
})
