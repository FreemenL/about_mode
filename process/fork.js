// fork exec execFile 都是基于spwan的改进方法；
const { fork } = require("child_process");
//fork 新启一个nodejs 进程
let child = fork('fork1.js',['lxj'],{
    cwd:__dirname,
    silent:false,  //
});

child.on("message",function(data){
    console.log(data);
})
child.send({name:"hello"});