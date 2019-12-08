// send 方法的第二个参数 可以是 http server net socket 
const { fork } = require("child_process");
const os = require("os");

const http = require("http");
const server = http.createServer(function(req,res){
    res.setHeader("Content-type",'text/html;charset=utf8');
    res.end("请求在父进程被处理")
});

server.listen(8080);

for(let i=0;i<os.cpus().length;i++){
    let p1 = fork("server.js",[],{
        cwd:__dirname
    });
    p1.send(`server:${i}`,server);
}