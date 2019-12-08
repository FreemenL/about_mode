// console.log(require.extensions);


// console.log('process.mainModule :', process.mainModule === require.main);
// console.log('require.main:', require.main);
// const vm = require("vm");
// const content = 'const a = 1';

// const result = vm.runInThisContext(`(function (exports, require, module, __filename, __dirname) { 
//   ${content}
// });`)

// console.log('result :', result);

// console.log(mod"ule.exports === exports);
const a = require("./test1.js")

console.log(module.id.trim()===".");
console.log(require.main === module);
console.log(module === process.mainModule);


