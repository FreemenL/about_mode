const express = require("./express");
const app = express();

app.param('userid', function(req, res, next, userid) {
    req.user = getUser(userid);
    next();
});

app.use("/water",function(req,res,next){
    console.log("过滤杂质");
    next();
});

function getUser(userId){
    return {
        userId, 
        age:8,
        name:"lxj111"
    }
}

function setUser(user){

}

app.get('/username/:userid/:name',function(req,res){
    console.log(req.user);
    console.log(req.params);
    req.user.name = req.params.name;
    setUser(req.user);
    res.end("update username success!");
});

app.get('/username/:userid/:age',function(req,res){
    req.user.age = req.params.age;
    setUser(req.user);
    res.end("update username success!");
});


app.get("/user",function(req,res){
    console.log(req.query);
    console.log(req.path);
    console.log(req.hostname);
});

app.listen(8888);

