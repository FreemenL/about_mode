// 主进程
const fork = require("child_process").fork;
const cpus = require("os").cpus();

// 创建tcp server
const server = require("net").createServer();
server.listen(1337);

const workers = {}

// 创建进程的函数
const createWorker = () =>{
  const worker = fork(__dirname+"/work.js");
  // 监听进程退出事件 自动重启
  worker.on("exit",()=>{
    delete workers[worker.pid];
    console.log(worker.pid+"is delete");
    createWorker();
  })
  // 发送当前进程的句柄文件描述符
  worker.send("server",server)
  workers[worker.pid]= worker
  console.log('created worker :', worker.pid);
}

for (let index = 0; index < cpus.length; index++) {
  createWorker();
}

// 进程自己退出时，让所有工作进程退出 
process.on('exit', function () {
  for (var pid in workers) { 
    workers[pid].kill();
  } 
});

console.log('process.pid', process.pid)