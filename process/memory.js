let  s = process.memoryUsage();
console.log(s)
//buffer的内存是单独分配的 
const buf = Buffer.alloc(1024*1024*1024);
const ss = process.memoryUsage();
console.log(ss)
/*
  rss: 20226048 常驻内存
  heapTotal: 6062080  堆的申请量
  heapUsed: 3653016  堆的使用量
  external: 8272     外部的内存使用量
*/

//node 一般不是很健壮 处理错误非常重要
setTimeout(function(){
    console.log("hello");
},2000);
// try{  
// }catch(err){
    // console.log(err);
// }

//uncaughtException 
process.on("uncaughtException",function(){
    console.log("uncaughtException");
})

nomethod();
