let net = require("net");
let clientSocket = new net.Socket();

clientSocket.connect(8080,"localhost",function(){
    clientSocket.write('hello');

})

clientSocket.setEncoding("utf8");

clientSocket.on("data",function(data){
    console.log(data);
})

setTimeout(function(){
    //要求关闭跟服务器的连接
    clientSocket.end();
},5000)