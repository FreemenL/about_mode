const lineReader  = require('./lineReader');
const reader = new lineReader('./1.txt','utf8');

reader.on("newLine",(data)=>{
    console.log(data);
})
reader.on("end",(data)=>{
    console.log("over");;
})