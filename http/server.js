const http = require('http');
const querystring = require('querystring');
const server = http.createServer();

server.on("request",function(req,res){
    const result = [];
    req.on("data",function(data){
        result.push(data);
    })
    req.on("end",function(){
        console.log("dara");
        const str = Buffer.concat(result).toString();
        console.log("dara");
        const contentType = req.headers["content-type"];
        const handle = {
            "application/x-www-form-urlencoded":function(datas){
                return querystring.parse(datas);
            },
            "application/json":function(datas){
                return JSON.parse(datas);
            }
        }
        const response = handle[contentType](str);
        res.end(JSON.stringify(response));

    })
    // res.end(`{"name":"夏季昂"}`);
})

server.listen(8080);