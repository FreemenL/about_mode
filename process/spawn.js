const { spawn } = require("child_process");
const path = require("path");

let p1  = spawn("node",["test1.js",'llll'],{
    cwd:path.join(__dirname,"test1"),
    stdio:[process.stdin,process.stdout,"pipe"]
});

// p1.on("close",function(){
//     console.log("子进程1关闭")
// });
// p1.on("exit",function(){
//     console.log("子进程1退出")
// });