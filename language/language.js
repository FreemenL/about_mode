const http = require("http");
const server = http.createServer(request);
server.listen(8080);
const lanPack = {
    en:{
        title:"welcome"
    },
    zh:{
        title:"欢迎光临"
    },
    default:"en"
}
function request(req,res){
    // 实现服务器和客户端的协议
    // Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,jp;q=0.7
    let acceptLanguage = req.headers['accept-language'];
    if(acceptLanguage){
        let lans = acceptLanguage.split(",").map(item=>{
            let values = item.split(';');
            let name = values[0];
            let q = values[1]?parseFloat(values[1]):1;
            return {
                name,
                q
            }
        }).sort((a,b)=>b.q-a.q);
        let lan = lanPack['default']
        for(let i=0;i<lans.length;i++){
            if(lanPack[lans[i]["name"]]){
                lan = lans[i]["name"];
                break;
            }
        }
        res.setHeader("Content-Type","text;charset=utf-8");
        res.end(lanPack[lan]["title"]);
    }
}