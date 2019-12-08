let EventEmitter = require("./events");  //node 原生模块 
let util = require("util");//node 原生模块

function Bell(){
    EventEmitter.call(this);
}

util.inherits(Bell,EventEmitter);

let bell  = new Bell();
bell.setMaxListeners(0); //移除最大事件绑定限制 

function stydents(number,home){
    console.log(`${number}stydents${home}`);
}
function teacher(number,home){
    console.log(`${number}stydents${home}`);
}
function once(number,home){
    console.log(`${number}=========${home}`);
}
bell.on("shijian",teacher);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.on("shijian",stydents);
bell.once("shijian",once);

bell.emit('shijian',"001","room")
bell.emit('shijian',"001","room")
















