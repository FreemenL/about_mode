const { fork } = require("child_process");
const net = require("net");

let p1 = fork('tcpserver.js',[],{
    cwd:__dirname
});

const server = net.createServer(function(socket){
    if(Math.random()%2==0){
        p1.send('socket',socket);
    }else{
        let sum = 0;
        for(let i=0;i<100000;i++){
            sum+=i;
        }
        socket.write("father"+sum);
    }
});
server.listen(8080,function(){
    console.log("server start")
});