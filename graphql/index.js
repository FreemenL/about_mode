const app = new (require('koa'));
const mount =require('koa-mount')
const static = require("koa-static");
const graphqlHTTP = require("koa-graphql");

app.use(
  graphqlHTTP({
    schema:require("./schema.js")
  })
)

app.listen(3000,()=>{
  console.log('server start');
})