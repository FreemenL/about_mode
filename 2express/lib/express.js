const http = require("http");
const url = require("url");
//这是一个路由规则的容器
let router = [{
    path:"*", //这个路由规则可以匹配所有的路径
    method:"*",//这个规则可以匹配所有的方法
    handler(req,res){
        res.end(`Cannot ${req.method} ${req.url}`);
    }  
}];


function createApplicaion(){
     return{
        // 添加订阅
        get(path,handler){
            router.push({
                path,
                handler,
                method:"get"
            }) 
        },
        listen(){
           let server = http.createServer(function(req,res){
                let { pathname } = url.parse(req.url,true);
                //发布消息
                for(let i =1;i<router.length;i++){
                    let { path ,handler ,method } = router[i];
                    if(pathname==path&& method == req.method.toLocaleLowerCase()){
                        return handler(req,res);
                    }
                }
                router[0].handler(req,res);
           })  
           server.listen.apply(server,Array.from(arguments));
        }
     }
};

module.exports = createApplicaion;