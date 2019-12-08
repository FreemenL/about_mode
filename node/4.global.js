console.log(process.cwd());  // 当前工作目录   /Users/jiayali/Desktop/30 
process.chdir("..");
console.log(process.cwd());  // 改变后的目录   /Users/jiayali/Desktop

console.log(process.memoryUsage()); 
/*   v8的内存量 1.7 G
{ rss: 20340736,   // 常驻内存 
  heapTotal: 6062080,  // 堆内存的申请总量 
  heapUsed: 3696456,  // 已经使用的量 
  external: 8272      // 外部内存的使用量 
}
*/