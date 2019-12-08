const fs = require('fs');
const path = require("path");
// fs.rename()  修改文件名
//截断文件内容
// fs.truncate('./1.txt',5,()=>{
//     console.log("截断文件内容...")
// })

//fs.unlink 删除文件 
//fs.rmdir 删除非空目录

// function rmdirSync(dir){
//     const files = fs.readdirSync(dir);
    // files.forEach(file=>{
    //     const content = path.join(dir,file);
    //     let child =  fs.statSync(content);
    //     if(child.isDirectory()){
    //         rmdirSync(content);
    //     }else{
    //         fs.unlinkSync(content);
    //     }
    // })
//     fs.rmdirSync(dir);
// }

// rmdirSync('a'); 
//异步版本
// function rmdir(dir){
//     return new Promise((resolve,reject)=>{
//         fs.readdir(dir,(err,files)=>{
//             let arr = [dir];
//             files.forEach((file,index)=>{
//                 const content = path.join(dir,file);
//                 let child =  fs.statSync(content);
//                 if(child.isDirectory()){
//                     arr.unshift(content);
//                 }else{
//                     fs.unlinkSync(content);
//                 }
//             })
//             resolve(arr);
//         }); 
//     }).then((fileList)=>{
//         fileList.forEach((file)=>fs.rmdirSync(file));
//     })
// }
// rmdir("a")


fs.watchFile('./a.txt',(newStat,preStat)=>{
    if(Date.parse(preStat.ctime)==0){
        console.log("create");
    }else if(Date.parse(preStat.ctime)!==Date.parse(newStat.ctime)){
        console.log("update")
    }else{
        console.log('delete');
    }
})