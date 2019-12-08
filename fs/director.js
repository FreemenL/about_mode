const fs = require("fs");
//递归删除非空目录   
function rmdir(dir){
    let files = fs.readdirSync(dir);
    files.forEach((file)=>{
        let current = dir+"/"+file;
        let child = fs.statSync(current);
        if(child.isDirectory()){
            rmdir(current);
        }else{
            fs.unlinkSync(current);
        }
    })
    fs.rmdirSync(dir)
}

rmdir('a');