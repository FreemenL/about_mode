// const fs = require('fs');

// const rs = fs.createReadStream('./a.txt',{
//     highWaterMark:3
// });
// const ws = fs.createWriteStream('./1.txt',{
//     highWaterMark:3
// });

// rs.pipe(ws);

const { Writable , Readable } = require('stream');
let i = 0;
let rs = Readable({
    highWaterMark:2,
    read(){
        if(i<10){
            this.push(""+i++);
        }else{
            this.push(null);
        }
    }
})
let ws = Writable({
    highWaterMark:2,
    write(chunk,encoding,callback){
        console.log(chunk.toString())
        callback()
    }
});

rs.pipe(ws);

setTimeout(function(){
    console.log(rs._readableState.length);
    console.log(ws._writableState.length);
})