process.on("message",function(msg){
    process.send("子进程"+JSON.stringify(msg));
})
console.log("haha")