// const spawn = require("cross-spawn");
const path = require("path");
// const args = `
// 			  var init = require('./test1.js');
//           	  init.apply(null, JSON.parse(process.argv[1]));
//         	 `;
// let p1  = spawn(process.execPath,["-e",args,'--','["/Users/jiayali/Desktop/emptyd/create-emptyd-app/insert","insert",null,"/Users/jiayali/Desktop/emptyd/create-emptyd-app",null]' ],{
//     cwd:__dirname,
//     stdio:[process.stdin,process.stdout,"pipe"]
// });

// p1.on("close",function(){
//     console.log("子进程1关闭")
// });

// p1.on("error",function(error){
//     console.log(error)
// });

// p1.on("exit",function(){
//     console.log("子进程1退出")
// });


console.log(path.basename("/etv/index"));