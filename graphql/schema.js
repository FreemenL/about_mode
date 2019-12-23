var { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Comment{
    id: Int
    avatar: String
    name: String
    isTop: Boolean
    content: String
    publishDate: String
    commentNum: Int
    praiseNumber: Int
  }
  type Query{
    comment:[Comment]
  }
`)

schema.getQueryType().getFields().comment.resolve = () => {
  return [{
    id: 1,
    avatar: "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg",
    name: "String",
    isTop: true,
    content: "测试",
    publishDate: "today",
    commentNum: 10,
    praiseNumber: 1
  }]
}

module.exports = schema;