const crypto = require("crypto");
const str = "hello";
// console.log(crypto.getHashes());
const md5 = crypto.createHash("sha1");
//6adfb183a4a2c94a2f92dab5ade762a47889a5a1    sha1 40位
md5.update("hello");//指定要加密的值
md5.update("world");//指定要加密的值

console.log(md5.digest("hex")); //hex 十六进制 