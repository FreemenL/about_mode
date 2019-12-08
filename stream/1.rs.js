const fs = require("fs");
//可读流
const rs = fs.createReadStream('./a.txt',{
    mode:0o666,
    encoding:"utf8",
    flags:"r",
    start:3,
    end:8,
    highWaterMark:3
});
rs.on("open",function(data){
    console.log('open');
});
rs.on("data",function(data){
    console.log(data);
    rs.pause();
    setTimeout(function(){  
        rs.resume();
    },2000)
})
rs.on("end",function(data){
    console.log('end');
})

rs.on("error",function(data){
    console.log('error');
})
rs.on("close",function(data){
    console.log('close');
})