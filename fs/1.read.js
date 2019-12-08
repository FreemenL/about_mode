const fs = require("fs");

// fs.readFile('./1.txt',function(error,data){
//     if(error){
//         console.log(error);
//     }else{
//         console.log(data.toString());
//     }
// })
// 异步读文件
// fs.readFile('./1.txt',{ encoding:"utf8",flag:"r"},function(error,data){
//     if(error){
//         console.log(error);
//     }else{
//         console.log(data);
//     }
// })
//异步写入文件
/* 
   flag:a    追加写入 
   mode      linux 权限位 
*/
// fs.writeFile("./2.txt",'data',{encoding:"utf8",flag:"a",mode:0o666},function(error){
//     if(error){
//         console.log(error)
//     }
// })


// fs.appendFile("./2.txt",'data1',function(error){
//     if(error){
//         console.log(error)
//     }
// })
//精确的控制读取的字节
//fd  file descript   文件描述符 
// fs.open("./1.txt",'r',0o666,function(err,fd){
//     let buffer = Buffer.alloc(4);
//     // 读取文件部分内容
//     fs.read(fd,buffer,1,3,1,function(err,bytesRead,buffe){
//         console.log(buffe.toString());
//     })
// })

// fs.open("./2.txt",'a',0o666,function(err,fd){
//     fs.write(fd,Buffer.from("夏江"),0,6,0,function(err,bytesRead,buffe){
//         console.log(buffe.toString());
//     })
// })
//监听控制台输入  标准输入
// process.stdin.on("data",function(data){
//     console.log(data);
// })
//标准输出  consoel.log 对应 process.stdout.write
// console.log('hellow');
// process.stdout.write("hellow");
//错误输出  consoel.error 对应 process.stderr.write
// console.error('hellow');
// process.stderr.write("hellow");

