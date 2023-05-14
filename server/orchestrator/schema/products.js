const axios = require("axios");

const redis = require("../config/connectRedis");
const baseUrlApp =
  process.env.BASE_URL_PRODUCT || "http://localhost:4002/courses";

const typeDefs = `#graphql
  type Product {
    id: String
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    authorId: String
    categoryId: Int
    Category: Category
    Images: [Image]
  }

  type Category {
    name: String
  }

  type Image {
    imgUrl: String
  }

  type Query {
    products: [Product]
    product(id: ID):Product
  }

  input InputProduct {
    name: String
    description: String
    price: Int
    mainImg: String
    authorId: String
    categoryId: Int
    images: [InputImage]
    userId: Int
  }

  input InputImage {
    imgUrl: String
  }

  type Mutation {
    addProduct( InputProduct: InputProduct ): Product
    editProduct(id: ID, InputProduct: InputProduct ): Product
    deleteProduct(id: ID): Product
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      try {
        const cache = await redis.get("app:products");
        if (cache) {
          console.log("cache");
          return JSON.parse(cache);
        } else {
          console.log("no cache");
          const { data } = await axios.get(baseUrlApp);
          await redis.set("app:products", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        throw err;
      }
    },
    product: async (_, args) => {
      try {
        // console.log(args);
        const { id } = args;
        const { data } = await axios.get(`${baseUrlApp}/${id}`);
        // console.log(data);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        const { data } = await axios.post(baseUrlApp, {
          ...args.InputProduct,
        });
        await redis.del("app:products");
        return data;
      } catch (err) {
        throw err;
      }
    },
    editProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.put(`${baseUrlApp}/${id}`, {
          ...args.InputProduct,
        });
        await redis.del("app:products");
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`${baseUrlApp}/${id}`);
        await redis.del("app:products");
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
