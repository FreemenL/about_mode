const fs = require("fs");
//创建目录  创建目录的时候其父目录必须是存在的
fs.mkdir('a',0o666,function(error){
    console.log(error);
})