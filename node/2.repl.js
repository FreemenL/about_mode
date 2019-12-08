const repl = require("repl");

let context = repl.start().context;

context.msg = "hellow";

context.hellow =  function(){
    console.log(context.msg);
}