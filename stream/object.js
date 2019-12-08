const { Transform } = require("stream");
const fs = require('fs');
const rs = fs.createReadStream("./test.json");

const toJSON = Transform({
    readableObjectMode:true, //可以往可读流里放对象 
    transform(chunk,encoding,cb){
        this.push(JSON.parse(chunk.toString()));
    }
})

const outJSON = Transform({
    writableObjectMode:true, //可以往可写流里放对象 
    transform(chunk,encoding,cb){
        console.log(chunk);
        cb();
    }
})
rs.pipe(toJSON).pipe(outJSON);