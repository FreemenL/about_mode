let fs = require("fs");
let path = require("path");
//返回一个指定大小且已初始化的 Buffer。 该方法比 Buffer.allocUnsafe(size) 慢，但能确保新创建的 Buffer 不会包含旧数据。
let buf = Buffer.alloc(1024*1024*256,8);
fs.writeFileSync(path.join(__dirname,'1.test'),buf);