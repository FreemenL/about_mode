var net = require('net');
var server = net.createServer(function (socket) { 
    // 新的连接
    console.log('socket :', socket);
    //socket 是一个可读可写的stream对象 
    socket.on('data', function (data) {
    socket.write("你好"); });
    socket.on('end', function () {
        console.log('连接断开');
    });
    socket.write("欢迎光临《深入浅出Node.js》示例:\n"); 
});

server.listen(8124, function () { 
    console.log('server bound');
})

// tcp 是面向链接的  每个客户端与服务器通信都需要提供一个套接字      