//当客户端访问服务器的时候 服务器会发送给客户端一个文件 
let net  = require("net");
let path = require('path');
let rs = require("fs").createReadStream(path.join(__dirname,'1.test'));

net.createServer(function(socket){
    //监听数据
    rs.on("data",function(data){
        let flag = socket.write(data);// 可写流缓存区是否满了 
        console.log('flag=',flag);
        console.log('缓存的字节数=',socket.bufferSize);
    });
    //监听socket 缓存区排空事件 drain 事件是和 socket.write 的返回值强关联的  缓存区数据大于默认值16KB 时侯触发该事件 
    socket.on('drain',function(){
        console.log('tcp 缓存区的数据已经发送........................');
    });
    
}).listen(8080);
