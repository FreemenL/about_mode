//exec 执行一个shell 命令
const { exec } = require("child_process");
//用于使用 shell 执行命令
const p1 = exec("node test1.js a b c",{
    //timeOut:100000,
    // encoding:"utf8",
    cwd:__dirname
},function(err, stdout ,stdin){
    console.log(err);
    console.log(stdout)
});

p1.kill();