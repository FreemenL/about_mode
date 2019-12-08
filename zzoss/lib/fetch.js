const request = require('request');

const fetch = function(options){
    return new Promise((resolve,reject)=>{
        request(options,function(error, response, body){
            if(error){
                reject(error)
            }
            resolve(response.body); 
        })
    }).catch((error)=>{
        throw error
    })
}

module.exports = fetch;