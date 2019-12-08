/**
 * 充分利用cup的资源同时启动在多个进程上启动服务 
*/
const cpus = require("os").cpus();
const fork = require("child_process").fork;
for (let index = 0; index < cpus.length; index++) {
  fork("./worker.js");
}
