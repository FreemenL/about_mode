const http = require("http");
const url = require("url");

function httpServer(){
    const app = (req,res)=>{
        const { pathname } = url.parse(req.url,true);
        let index = 0;
        function next(err){
            if(index >= app.routers.length){
                return res.end(`cannot find ${req.method}---${pathname}`);
            }
            let route = app.routers[index++];
            const { methods ,cb ,path} = route;
            if(err){
                if( methods == "middle" ){
                    if(path=='/'||pathname.startsWith(path+"/")||path==pathname){
                        if(cb.length==4){
                           cb(err,req,res,next);
                        }else{
                            next(err);
                        }
                    }
                }else{
                    next(err);
                }
            }else{
                if( methods=="middle" ){
                    cb(req,res,next);
                }else{
                    if(route.paramsNames){
                        let machers = pathname.match(path);
                        if(machers){
                            let params = {};
                            for(let i=0; i < route.paramsNames.length;i++){
                                params[route.paramsNames[i]] = machers[i+1];
                            }
                            req.params = params;
                            for(let j=0;j<route.paramsNames.length;j++){
                                let name = route.paramsNames[j];
                                let handle = app.paramhandlers[route.paramsNames[j]];
                                if(handle){
                                    return handle(req,res,()=>route.cb(req,res),req.params[name]);
                                }
                            }
                        }else{
                            next();
                        }
                    }
                    if((route["path"] == pathname||route["path"]=="*")&&(req.method.toLocaleLowerCase() == route["methods"]|| route['methods']== "all" )){
                        return cb(req,res);
                    }else{
                        next();
                    }
                }
            }
        }
        next();
    }

    app.paramhandlers = {};
    app.param = function(name,handler){
        app.paramhandlers[name] = handler;
    }

    app.routers = [];

    app.listen = (...rest)=>{
        const server = http.createServer(app);
        server.listen(...rest);
    }
    
    http.METHODS.forEach( method => {
        const methods = method.toLocaleLowerCase();
        app[ methods ] = function(path,cb){
            const layer = { methods, path, cb };
            if(path.includes(":")){
               let paramsNames = [];
               path = path.replace(/:([^\/]+)/g,function(){
                   paramsNames.push(arguments[1]);
                   return '([^\/]+)'
               })
               layer.path = new RegExp(path);
               layer.paramsNames = paramsNames;
            }
            app.routers.push(layer)
        }
    })

    app.all = function(path,cb){
        app.routers.push({
            methods:"all",
            path,
            cb
        })
    }
    app.use = function(path,cb){
        if(typeof cb !=="function"){
            let middle = path;
            cb = middle;
            path = '/';
        }
        app.routers.push({
            methods:"middle",
            path,
            cb
        })
    }
    // 内置中间件用来提供格式化后的请求参数
    app.use(function(req,res,next){
        const urlObj = url.parse(req.url,true);
        req.query  = urlObj.query;
        req.path  = urlObj.pathname;
        req.hostname  = req.headers['host'].split(":")[0];
        next();
    })
    return app;
}

module.exports = httpServer;