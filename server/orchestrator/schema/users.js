const axios = require("axios");

const redis = require("../config/connectRedis");
const baseUrlUsers = process.env.BASE_URL_USERS || "http://localhost:4001/user";

const typeDefs = `#graphql
  type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    users: [User]
    user(_id: ID):User
  }

  input NewUser {
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Mutation {
    addUser( NewUser: NewUser ): User
    deleteUser(_id: ID): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      console.log("here")
      try {
        const cache = await redis.get("users:users");
        console.log(cache);
        if (cache) {
          console.log("cache here");
          return JSON.parse(cache);
        } else {
          console.log("no cache");
          const { data } = await axios.get(baseUrlUsers);
          console.log(data);
          await redis.set("users:users", JSON.stringify(data.data));
          return data.data;
        }
      } catch (err) {
        throw err;
      }
    },
    user: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.get(`${baseUrlUsers}/${_id}`);
        return data.data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { data } = await axios.post(baseUrlUsers, {
          ...args.NewUser,
        });
        await redis.del("users:users");
        return data.data;
      } catch (err) {
        throw err;
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios.delete(`${baseUrlUsers}/${_id}`);
        await redis.del("users:users");
        return data.data;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
