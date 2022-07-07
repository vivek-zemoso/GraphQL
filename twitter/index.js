require("dotenv").config({ path: __dirname + "/.env" });
const { ApolloServer, AuthenticationError } = require("apollo-server");

const { typeDefs } = require("./schema");
const db = require("./db.json");

const { dateScalar } = require("./scalars/date");
const { Query } = require("./resolvers/Query");
const { Tweet } = require("./resolvers/Tweet");
const { Mutation } = require("./resolvers/Mutation");

const jwt = require("jsonwebtoken");

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Tweet, Mutation, Date: dateScalar },
  context: ({ req }) => {
    try {
      if (
        req.body.operationName === "Login" ||
        req.body.operationName === "IntrospectionQuery"
      )
        return { db };

      let user = null;
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      user = db.users.find((user) => user.id === decodedToken.userId);
      return { db, user };
    } catch (err) {
      throw new AuthenticationError("You are not logged in !!");
    }
  },
  csrfPrevention: true,
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen(4001).then(({ url }) => {
  console.log("server is ready at " + url);
});
