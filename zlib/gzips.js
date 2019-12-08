const zlib = require('zlib');
const str = "hello";
// 压缩
zlib.gzip(str,(err,buffer)=>{
    console.log(buffer.length);
    // 解压缩
    zlib.unzip(buffer,(err,data)=>{
        console.log(data.toString());
    })
})