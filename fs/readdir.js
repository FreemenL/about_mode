const fs  = require("fs");
const path = require("path");
fs.readdir('./a',function(err,files){
    files.forEach(file=>{
        let child = path.join("a",file);
        fs.stat(child,function(err,stat){
            console.log(stat);
            //stat  文件信息
            // {
            //     dev: 16777220, //设备号
            //     mode: 16877,  
            //     nlink: 2,   
            //     uid: 501,  // 用户id
            //     gid: 20,   //用户组id
            //     rdev: 0,
            //     blksize: 4194304,
            //     ino: 8880296,
            //     size: 64,
            //     blocks: 0,
            //     atimeMs: 1551535852915.9565,
            //     mtimeMs: 1551535852801.7656,
            //     ctimeMs: 1551535852801.7656,  //
            //     birthtimeMs: 1551535852801.7656,
            //     atime: 2019-03-02T14:10:52.916Z,  //文件访问事件
            //     mtime: 2019-03-02T14:10:52.802Z,  //文件更新事件
            //     ctime: 2019-03-02T14:10:52.802Z,   // 文件内容更新事件
            //     birthtime: 2019-03-02T14:10:52.802Z } //创建时间
        })
    })
})