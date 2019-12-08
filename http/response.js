const http = require("http");
/**
< HTTP/1.1 200 OK   
< Date: Mon, 04 Mar 2019 09:43:59 GMT   默认就有
< Connection: keep-alive
< Content-Length: 9
<  Transfer-Encoding: chunked  // 分块传输 
 */
const server = http.createServer(function(req,res){
    //writeHead 一旦调用会向客户端发送  setHeader 不会
    res.writeHead(200,"ok",{
        "Content-Type":"text/html;charset=utf8"
    });

    //当调用 writeHead 或者 write的时候向客户端发响应

    // res.statusCode = 200; // 设置状态码 
    // res.sendDate = false; // 响应头默认会设置 
    // res.setHeader("Content-Type","text/html;charset=utf8");
    // console.log(res.getHeader('Content-Type'));
    // res.removeHeader('Content-Type');
    // console.log(res.getHeader('Content-Type'));
    // res.write("hello");
    // res.write("world");
    // res.end();
});

server.listen(8080,function(){
    console.log("http server started http://localhost:8080")
})


