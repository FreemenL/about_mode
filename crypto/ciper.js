//对称 加密
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const str =  "xx";
const pk = fs.readFileSync(path.join(__dirname,"rsa_private.key"));
//使用秘钥进行加密
const cipher = crypto.createCipher("blowfish",pk);
cipher.update(str,'utf8');
const result = cipher.final("hex");

const decipher = crypto.createDecipher("blowfish",pk);
decipher.update(result,"hex");
let r = decipher.final("utf8");
console.log(r);