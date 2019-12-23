// let t = 10;

// function a(params){
//   let d = 1;
//   d += params;
//   return d;
// }

// function b(){
//   return a(t)
// }

// let result = b();
// console.log(result);

const express = require("express");
const app = express();

app.get('/',(req,res)=>{
  res.send("这是一个初始页面")
})

app.listen(3000,()=>{
  console.log('server start at  http://localhost:3000');
})












// let t = 10;

// function a(params){
//   let d = 1;
//   d += params;
//   return d;
// }

// function b(){
//   return a(t)
// }

// let result = b();
// console.log(result);

