const http = require("http");
process.on("message",function(msg,server){
    const msgArr = msg.split(":");
    if(msgArr[0]=="server"){
        http.createServer(function(req,res){
            res.setHeader("Content-type",'text/html;charset=utf8');
            res.end("请求在子进程"+msgArr[1]+"被处理");
        }).listen(server)
    }
})