let { Duplex } = require("stream");
let index = 0;
//双工流  
let s = Duplex({
    read(){
        while(index++<3){
            this.push('a');
        }
        this.push(null);
    },
    write(chunk,encoding,cb){
        console.log(chunk.toString().toUpperCase());
        cb();
    }
});

process.stdin.pipe(s).pipe(process.stdout);