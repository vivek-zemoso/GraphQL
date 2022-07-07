const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query.js");
const { dateScalar } = require("../twitter/scalars/date");

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Date: dateScalar },
});

server.listen(4002).then(({ url }) => {
  console.log("server is ready at " + url);
});
