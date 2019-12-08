const http = require("http");
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const options = {
    host:"localhost",
    port:8080,
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    }
}
const req = http.request(options);

req.on("response",function(res){
    console.log(res.statusCode);
    console.log(res.headers);
    const result = [];
    res.on("data",function(data){
        result.push(data);
    })
    res.on("end",function(data){
        const str = Buffer.concat(result);
        console.log(decoder.write(str));
    })

})
req.write(`{"name":"xiajiang"}`);

req.end();
