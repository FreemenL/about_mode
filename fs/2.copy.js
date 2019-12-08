// 边读边写 
const fs = require("fs"); 
const BUFFER_SIZE = 6;
function copy(src,target) {
    const buffer = Buffer.alloc(BUFFER_SIZE)
    fs.open(src,'r',0o666,function(error,readFd){
        fs.open(target,'w',0o666,function(err,writeFd){
            !function next(){
                fs.read(readFd,buffer,0,BUFFER_SIZE,null,function(err1,bytesRead){
                    if(bytesRead>0){
                        fs.write(writeFd,buffer,0,bytesRead,null,next)
                    }
                })
            }()
        })
    })
}

copy('./2.txt','./1.txt');