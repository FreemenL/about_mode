const express = require('express');
const app = express();
const iconv = require("iconv-lite");
const querystring = require("querystring");
const qs = require("qs");
const bodyParser = require("body-parser"); 
const type = require("content-type");
// app.use(urlencoded({extended:true}));
// app.use(json());
app.use(text());
// echo 回声服务    客户端发啥 响应啥
app.post("/user",function(req,res){
    let body = req.body;
    res.send(body);
})

function urlencoded(options){
    let { extended } = options;
    return function(req,res,next){
        let contentType = req.headers["content-type"];
        console.log(contentType);
        if(contentType=="application/x-www-form-urlencoded"){
            const buffer = [];
            req.on("data",function(data){
                buffer.push(data);
            });
            req.on("end",function(){
                let result = buffer.toString();
                if(extended){
                    //qs 可以支持嵌套对象；
                    req.body = qs.parse(result);
                }else{
                    req.body = querystring.parse(result);
                }
                next();
            })
        }else{
            next();
        }
    }
}   
function json(options){
    return function(req,res,next){
        let contentType = req.headers["content-type"];
        if(contentType=="application/json"){
            const buffer = [];
            req.on("data",function(data){
                buffer.push(data);
            });
            req.on("end",function(){
                let result = buffer.toString();
                req.body = JSON.parse(result);
                next()
            })
        }else{
            next();
        }
    }
}   

function text(options){
    return function(req,res,next){
        const contentType = type.parse(req.headers["content-type"]);
        const charset =  contentType.parameters.charset;
        const cType = contentType.type;
        if(cType=="text/plain"){
            const buffer = [];
            req.on("data",function(data){
                buffer.push(data);
            });
            req.on("end",function(){
                let r = Buffer.concat(buffer);
                if(charset=="gbk"){
                    req.body =  iconv.decode(r,charset);
                }else{
                    req.body = buffer.toString();
                }
                next()
            })
        }else{
            next();
        }
    }
}   
app.listen(8080);