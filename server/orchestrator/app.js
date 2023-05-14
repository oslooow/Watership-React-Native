if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: productTypeDefs,
  resolvers: productsResolvers,
} = require("./schema/products");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schema/users");

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: [userTypeDefs, productTypeDefs],
  resolvers: [userResolvers, productsResolvers],
  introspection: true,
  cors: true,
});

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log(`Listening ${url}`);
});
