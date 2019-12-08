function Click(){
    this.listener;
    process.nextTick(()=>{
        this.listener();
    });
}

Click.prototype.add = function(fn){
    this.listener = fn;
}

let c = new Click();

c.add(()=>console.log("ok!"));
