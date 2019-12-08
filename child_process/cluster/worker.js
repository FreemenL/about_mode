var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('handled by child, pid is' + process.pid + '\n');
  throw new Error('throw exception'); 
});

var worker;
process.on('message', function (m, tcp) {
  if (m === 'server') {
    console.log('childserverstart')
    worker = tcp;
    worker.on('connection', function (socket) {
      server.emit('connection', socket); 
    });
  } 
});

process.on('uncaughtException', function () { // 停止接收新的连接
  process.send({act: 'suicide'});
  worker.close(function () {
    // 所有已有连接断开后，退出进程
    process.exit(1); 
  });
  // 5秒后退出进程
  setTimeout(function () {
    process.exit(1); 
  }, 5000);
});