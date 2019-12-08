const fs = require('fs');
//可写流 
const ws = fs.createWriteStream('./2.txt',{
    flags:"w",
    start:0,
    highWaterMark:3,
    mode:0o666
});

let flag = ws.write("1");
console.log(flag)
flag = ws.write("2");
console.log(flag)
flag = ws.write("3");
console.log(flag)
flag = ws.write("4");
console.log(flag)
flag = ws.write("5");
console.log(flag)