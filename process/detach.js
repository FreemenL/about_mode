// detach 默认情况下父进程会等待所有的子进程完成后才能退出，但如果子进程设置了detach =true 
//的话 则此子进程可以单独存在；

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const fd = fs.openSync(path.join(__dirname,'msg.txt'),"w");
const p1 = spawn("node",["test4.js"],{
    stdio:["ignore",fd,"ignore"],
    cwd:path.join(__dirname,"test1"),
    detached:true
})

p1.on("error",function(err){
    console.log(err)
})
//让父进程先退出 子进程继续执行
p1.unref();