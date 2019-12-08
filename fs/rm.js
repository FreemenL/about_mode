const fs = require("fs");

function rmdir(dir){
    const files = fs.readdirSync(dir);
    files.forEach(file=>{
        const current = dir+"/"+file;
        const child = fs.statSync(current);
        if(child.isDirectory()){
            rmdir(current) 
        }else{
            fs.unlinkSync(current)
        }
    })
    fs.rmdirSync(dir);
}
rmdir("a");