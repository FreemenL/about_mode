const crypto  = require("crypto");
const path = require("path");
const fs = require("fs");
const key = fs.readFileSync(path.join(__dirname,"rsa_private.key"));
//密码123   加盐算法
const hmac = crypto.createHmac("sha1",key);
hmac.update("123");
const result = hmac.digest('hex');
console.log(result);