class AsyncHook{

    constructor(){
        this.hooks = [];
    }
    tapAsync(name,fn){
        this.hooks.push({name,fn});
    }
    callAsync(...args){
        const task = args[0];
        const done = args[args.length-1];
        let index = 0;
        const next = (result)=>{      
            this.hooks[index]?this.hooks[index]["fn"](this.hooks[index]["name"],task,result,next):done(task,result);
            index++;
        }   
        next();
    }
}

const hooks = () => new AsyncHook;

module.exports = hooks;