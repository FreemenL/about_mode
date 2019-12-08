const net = require("net");
// 创建一个服务器 
// 广播 
// 私聊 
// 列出在线用户列表
// 修改昵称
let clients = {}
let server = net.createServer(function(socket){
    let key = socket.remoteAddress+socket.remotePort;
    socket.write(`欢迎光临本聊天室，你的昵称是${key}\n`);
    clients[key]={
        nickname:"niming",
        socket
    }
    socket.setEncoding("utf8");
    socket.on("data",function(data){
        data = data.replace(/\r|\n/,'');
        let type = data.slice(0,1);
        switch(type){
            case "b":
              let text = data.slice(2);
              boardcast(text);
              break;
            case "c":
                let values = data.split(':');
                let toUser = values[1];
                let toText = values[2];
                sendTo(toUser,toText)
              break;
            case "l":
                list();
              break;
            case "n":
              let newName = data.slice(2);
              let oldObj = clients[key];
              oldObj["nickname"] = newName;
              socket.write("您的用户名已经被修改为："+newName);
              break;
            default :
                socket.write("此命令不能识别！");
            break
        }
    })
    socket.on('end',function(){
        socket.destroy();
        delete clients[key];
    })
    function list(){
        let result = '在线用户列表:\n'
        for(let user in clients){
            result+=clients[user]['nickname']+'\n';
        }
        socket.write(result);
    }
    function sendTo(toUser,text){
        let toUserObject;
        for(let user in clients){
            if(clients[user]['nickname']==toUser){
                toUserObject =  [user];
            }
        }
        if(toUserObject){
            const { nickname } = clients[key]
            toUserObject.socket.write(`${nickname}:${text}`)
        }else{
            socket.write("用户名不正确或对方已经下线！");
        }
    }
    function boardcast(text){
      let { nickname } = clients[key];
      for(let user in clients){
          if(clients.hasOwnProperty(user)&& user!==key){
            clients[user].socket.write(`${nickname}:${text}`);
          }
      } 
    }
})

server.listen(8080,function(){
    console.log('server start......');
})



