//应用层 http 服务器是继承自传输层的tcp ；
//它对请求和响应进行了包装

const http = require("http");
const url = require("url");

//req  可读流
//res  可写流
/**
POST / HTTP/1.1
Host: localhost:8080
User-Agent: curl/7.54.0
Accept: 
Content-Length: 9
Content-Type: application/x-www-form-urlencoded
*/
const server = http.createServer();

server.on('connection',function(socket){
    console.log('客户端连接')
})

server.on('request',function(req,res){
    console.log(req.method);   //请求方法
    let urlobj = url.parse(req.url,true);//请求路径
    console.log(urlobj);
    console.log(urlobj.format(urlobj));
    console.log(req.headers);  //请求头
    let result = [];
    req.on("data",function(data){
        result.push(data);
    })
    req.on("end",function(){
       let r =  Buffer.concat(result);
       console.log(r.toString());
       res.end(r);
    })
})

server.on('close',function(req,res){
    console.log('服务器关闭')
})
server.on('error',function(error){
    console.log('服务器错误')
})
server.listen(8080,function(){
    console.log("http server started http://localhost:8080")
})


//urlobj
/*{
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?id=9',
    query: 'id=9',
    pathname: '/user',
    path: '/user?id=9',
    href: '/user?id=9' 
}*/