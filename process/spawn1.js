const { spawn } = require("child_process");
const path = require("path");

let p1  = spawn("node",["test3.js"],{
    cwd:path.join(__dirname,"test1"),
    stdio:["ipc",process.stdout,"ignore"]
});
// ipc 意味着父子之间通过消息进行通信
p1.on("message",function(msg){
    console.log(msg);
});

p1.send("hello");

// let p2 = spawn("node",["test1.js",'llll'],{
//     cwd:path.join(__dirname,"test1"),
//     stdio:["pipe","pipe","pipe"]
// });

// p1.on("close",function(){
//     console.log("子进程1关闭")
// });
// p1.on("exit",function(){
//     console.log("子进程1退出")
// });