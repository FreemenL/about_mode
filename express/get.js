const express = require("express");
const app = express();

// app.get("/hello",function(req,res){
//     res.end("hello")
// })

// app.post("/world",function(req,res){
//   res.end("world")
// })

app.all("*",function(req,res){
    res.end("world")
})

app.listen(8080);