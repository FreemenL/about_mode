const net  = require("net");
const path  = require("path");

const ws = require("fs").createWriteStream(path.join(__dirname,"msg.txt"));

const server = net.createServer(function(socket){
    socket.pause();
    socket.setTimeout(2*1000);
    socket.on("timeout",function(){
        socket.pipe(ws,{ end:false }); 
    })
    // setTimeout(function(){
    //     socket.pipe(ws,{ end:false }); 
    // },10*1000);
})

server.listen(8080);