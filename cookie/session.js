const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const app = express();

app.use(cookieParser());

const SESSION_KEY = "connect.sid";
const sessions = {};

app.get("/",function(req,res){
    let sessionid = req.cookies[SESSION_KEY];
    if(sessionid){
        let sessionObj = sessions[sessionid];
        if(sessionObj){
            sessionObj["residue"]-=10;
            res.send(`您的余额为${sessionObj["residue"]}`);
        }else{
            banka();
        }
    }else{
        banka();
    }
    function banka(){
        let sessionId = uuid.v4();
        sessions[sessionId] = {residue:100};
        res.cookie(SESSION_KEY,sessionId);
        res.send("您的余额为100");
    }
})

app.listen(8080,function(){
    console.log("server started!");
    
})
