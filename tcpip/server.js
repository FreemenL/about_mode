let net = require("net");

// socket 是一个可读可写的流  ，是一个双工流  是stream 的实例
let server = net.createServer({},function(socket){

    //限制客户端最大连接数 
    server.maxConnections = 2;

    server.getConnections((err,count)=>{
        console.log('现在的客户端总连接数是'+count+'个,最大连接数是'+server.maxConnections);
    });

    // setTimeout(function(){
    //     //在8秒之后关掉此服务器 不再接受新的客户端了；
    //     server.close();
    // },8000);
    socket.setEncoding("utf8");

    socket.on("data",function(data){
        console.log('服务器接收到客户端发过来的数据：',data);
        socket.write("服务器回应："+data);
    });

    socket.on("end",function(){
        console.log("客户端开始关闭...");
        server.unref();
    });

    socket.on("close",function(hasError){
        console.log(hasError);
        console.log("客户端真正关闭...");
    })

    socket.on("error",function(error){
        console.log(error);
    })
});

server.listen(8080,function(){
    console.log(server.address());
    console.log('server start.....');
})

server.on("close",function(){
    console.log("server end.....");
})
server.on("error",function(error){
    console.log(error);
})