//exec 一执行一个shell 命令
const { execFile } = require("child_process");
//用于使用 shell 执行命令
const p1 = execFile("node",[ "test6.js" ,"a","b","c"],{
    cwd:__dirname
},function(err, stdout ,stdin){
    console.log(err);
    console.log(stdout)
});