const fs = require('fs');

fs.readFile('./index.json', () => {
  setTimeout(() => {
    console.log('fs =》timeout');
  });
  setImmediate(() => {
    console.log('fs =》setImmediate');
  });
});

setImmediate(function () {
    console.log('setImmediate延迟执行'); 
});

setTimeout(function () {
    console.log('setTimeout11111111延迟执行'); 
    setTimeout(function () {
        console.log('setTimeout22222222延迟执行');
        setTimeout(function () {
            console.log('setTimeout33333333延迟执行'); 
            setTimeout(function () {
                console.log('setTimeout44444延迟执行'); 
            });
        }); 
    });
});

process.nextTick(function () { 
    console.log('nextTick延迟执行');
});



// process.nextTick(function (){ 
//     console.log('nextTick延迟执行1'); 
// });

// process.nextTick(function () { 
//     console.log('nextTick延迟执行2');
// });

// setImmediate(function () {
//     console.log('setImmediate延迟执行1'); 
//     // 进入下次循环 
//     process.nextTick(function () {
//         console.log('强势插入'); 
//     });
// });

// setImmediate(function () {
//     console.log('setImmediate延迟执行2'); 
// });

// console.log('正常执行');

console.log('正常执行');