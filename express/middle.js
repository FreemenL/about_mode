const express = require("./express");
const app = express();

app.use(function(req,res,next){
    console.log("没有路径的中间件");
    next();
});

app.use("/water",function(req,res,next){
    console.log("过滤杂质");
    next();
});

app.get("/water",function(req,res){
    res.end("water");
});

app.use(function(err,req,res,next){
    console.log(err);
    res.end("没有路径的中间件"+err);
});

app.listen(8080,function(){
    console.log("server started at 8080");
});