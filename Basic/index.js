const http = require('http');
const server = http.createServer(function(req,res){
  const authorization = req.headers["authorization"];
  if(!authorization){
    res.writeHead(401,{
      "content-Type":"text/plan",
      "WWW-authenticate":'Basic realm="famly"'
    })
    res.end('');
  }else{
    const str = authorization.slice(6,authorization.length);
    const resStr =new Buffer(str,"base64").toString();
    if(resStr!=="xiajiang:123"){
      res.writeHead(401,{
        "content-Type":"text/plan",
        "WWW-authenticate":'Basic realm="famly"'
      })
      res.end('');
    }else{
      res.end("aaaaaaaaaaaaa")
    }
  }
});

server.listen(8080);
