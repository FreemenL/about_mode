const redis = require('redis');
const client = redis.createClient(6379,'localhost');

client.on('error',(err)=>{
  console.log('err :', err);
})

// client.set('home','beijing',(...reset)=>{
//   console.log(reset);
// })

// client.hset('p1','username','liuxiajiang','age','9',(...reset)=>{
//   console.log(reset);
// })

client.hkeys('p1',function(err,keys){
  console.log('keys :', keys);
  keys.forEach((key,index,keys)=>{
    client.hget('p1',key,(err,value)=>{
      console.log(key, ":",value);
    })
  })
})