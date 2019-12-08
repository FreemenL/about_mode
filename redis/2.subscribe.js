const redis = require('redis');
const client1 = redis.createClient(6379,'localhost');
const client2 = redis.createClient(6379,'localhost');

client1.subscribe('food');
client1.subscribe('drink');

client1.on("message",function(channel,message){
  console.log(channel, message);
  client1.unsubscribe("food")
})

setTimeout(()=>{
  client2.publish("food",'面包');
  client2.publish("drink",'milk');
  setTimeout(()=>{
    client2.publish("food",'面包2');
    client2.publish("drink",'milk2');
  },1000)
},1000)
