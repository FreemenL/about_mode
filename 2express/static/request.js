const http = require("http");
const iconv = require("iconv-lite");
const options = {
    host:"localhost",
    port:8080,
    method:"POST",
    path:"/user",
    headers:{
        "Content-Type":"text/plain;charset=gbk"
        // "Content-Type":"application/x-www-form-urlencoded"
    }
};

const req = http.request(options,function(response){
    response.pipe(process.stdout);
}); 
// req.write("name=user");
// req.write("&age=10");
// req.end(`{"name":"xixi"}`);
req.end(iconv.encode("你好",'gbk'));