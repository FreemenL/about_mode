const https = require("https");  
const hooks = require('./hooks');
const queue = hooks();
const { writeFileStream } = require("./utils");

const fetchStream = function(url,filename,end,hint="fetchStreamEnd"){
    https.get(url, function (res) {  
        let length = 0;
        res.on('data', function (data) { 
            length += data.length;
            let content = data.toString("utf8");
            queue.tapAsync(length, (tag, task, result, next) => {
                writeFileStream(filename,content,next) 
            })
        });  
        res.on("end", function(){ 
            queue.callAsync("fetchStream", (tag, task, result, next) => {
                console.log(hint);
                end&&end();
            });
        });  
    })
    .on("error", function (err) {  
        console.log(err);
    })
}

module.exports = fetchStream;
