const fs = require("fs");
const str = "夏江";

fs.open('1.txt','w',0o666,(err,fd)=>{
    let buff = Buffer.from(str);
    //当我们用write 方法写文件的时候，并不会直接写入物理文件，而是先写入缓存区，再批量写入物理文件
    fs.write(fd,buff,0,3,0,(err,bytesWritten)=>{
        fs.write(fd,buff,3,3,3,(error,bytesWritten2)=>{
            //fs.fsync  迫使操作系统立马把缓存区的内容写入物理文件 
            fs.fsync(fd,()=>{
                fs.close(fd,()=>{
                    console.log('关闭完成!');
                })
            })
        })
    })
})