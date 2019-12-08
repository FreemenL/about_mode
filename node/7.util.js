const util = require("util");

const obj = {name:"test",home:{name:"shenzhen"}};

console.log(util.inspect(obj,{depth:0}))

console.log(util.isFunction("ssss"));