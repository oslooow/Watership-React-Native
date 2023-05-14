const { MongoClient } = require("mongodb");
const { hashPassword } = require("../helpers/hashing");
const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://oslooow:41Sj6PYImvyGzNnP@cluster0.anhx0yq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db ;

// async function insertAdmin() {
//   try {
//     const database = await connect();
//     const users = database.collection("users");
//     const admin = await users.findOne({ username: "admin" });
//     if (!admin) {
//       const hashedPassword = await hashPassword("admin");
//       const query = {
//         username: "admin",
//         password: hashedPassword,
//         role: "admin",
//         phoneNumber: "1234567890",
//         address: "Slipi",
//       };
//       await users.insertOne(query);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

async function connect() {
  try {
    const db = client.db("WatershipDB");
    return db;
  } catch (err) {
    console.log(err);
    await client.close();
  }
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};

// connect()
// .then(() => {
//   insertAdmin();
// })
// .catch((err) => {
//   console.log(err);
// });
