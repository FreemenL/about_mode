const yargs = require("yargs");

let argv = yargs.options('n',{
    alias:"name",//别名
    demand:true,//必填
    default:'lxj',
    description:"请输入姓名"
})
.usage("hello [options]")
.help()
.example("hello -n lxj","执行hello 传入参数为lxj")
.alias("h","help")
.argv;

console.log(argv);
console.log(argv.name);