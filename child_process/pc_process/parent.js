const cp = require("child_process")
const child1 = cp.fork("child.js");
const child2 = cp.fork('child.js');
const server = require("net").createServer();

server.on("connection",(socket)=>{
  socket.end('handled by parent\n');
})

server.listen(1337,()=>{
  child2.send('server', server);
  child1.send('server', server);
  server.close();
})

