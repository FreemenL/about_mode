/**
 * 下面代码将会侦听1000到2000 之间的一个随机端口
*/
const port = Math.round((1+Math.random())*1000);
const http = require("http");
http.createServer((req,res)=>{
  res.writeHead(200, {'Content-type':'text/plan'});
  res.end('hello world \n');
}).listen(port,'127.0.0.1');

console.log('port :', port);