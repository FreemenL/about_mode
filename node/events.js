function EventEmitter(){
    this.events = {};
    this.maxListeners = 10;
}

EventEmitter.prototype.setMaxListeners = function(number){
    this.maxListeners = number;
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type,fn){
    if(this.events[type]){
        this.events[type].push(fn);
        if(this.maxListeners!=0&& this.events[type].length>this.maxListeners){
            console.error('error!')
        }
    }else{
        this.events[type] = [fn];
    }
}

EventEmitter.prototype.once = function(type,fn){
    const wrapper = (...args)=>{
        fn.apply(this,args);
        this.removeListener(type,wrapper);
    }
    this.on(type,wrapper);
}

EventEmitter.prototype.removeListener = function(type,fn){
    if(this.events[type]){
        this.events[type] = this.events[type].filter(l=>l!=fn);
    }
}
EventEmitter.prototype.emit = function(type,...args){
    if(this.events[type]&&this.events[type].length>0){
        this.events[type].forEach((listener)=>listener.apply(this,args))
    }
}

module.exports = EventEmitter;