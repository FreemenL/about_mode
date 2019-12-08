const querystring = require("querystring");
const qs = require("qs"); 
const r = qs.stringify({name:"lxj",home:{address:"shanxi"}});
console.log(r);