const query  = require("./query.js");

query(`{hello}`).then(res=>{
  console.log(res)
})