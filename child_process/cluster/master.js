// // 事实上cluster模块就是child_process和net模块的组合应用
const cluster = require("cluster");
const cpus = require('os').cpus();

// 创建tcp server
const server = require("net").createServer();
server.listen(1337);

cluster.setupMaster({
  exec: "worker.js"
})

for(var i = 0; i < cpus.length; i++) {
  const worker = cluster.fork();
  worker.send("server",server)
  console.log('created worker :', worker.pid);
}
