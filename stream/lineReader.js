// 一行一行读文件内容
const fs = require("fs");
const EventEmitter = require("events");
const util = require("util");

const NEW_LINE = 0x0A; // /n换行
const RETURN = 0x0D;  // /r 回车
function lineReader(path,encoding){
    EventEmitter.call(this);
    this.encoding = encoding;
    this._reader = fs.createReadStream(path);
    this.on("newListener",(type,listener)=>{
        if(type === "newLine" ){
            let buffer = []
            this._reader.on("readable",()=>{
                let char; //Buffer 
                while(null != (char=this._reader.read(1))){
                    switch(char[0]){
                        case NEW_LINE:
                            this.emit('newLine',Buffer.from(buffer).toString(this.encoding));
                            buffer.length = 0;
                            break;
                        case RETURN:
                            this.emit('newLine',Buffer.from(buffer).toString(this.encoding));
                            buffer.length = 0;
                            let newChar = this._reader.read(1);
                            if(newChar[0]!=NEW_LINE){
                                buffer.push(newChar[0]);
                            }
                            break;
                        default:
                            buffer.push(char[0]);
                            break;
                    }
                }
            });
            this._reader.on("end",()=>{
                this.emit('newLine',Buffer.from(buffer).toString(this.encoding))
                this.emit('end');
            });
        }
    })
}

util.inherits(lineReader,EventEmitter);
module.exports = lineReader;