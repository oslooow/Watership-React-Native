const { ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/hashing");
const { getDb } = require("../config/mongoConnection");
const { isEmail } = require("../helpers/emailValidator");

class User {
  static getUser() {
    return getDb().collection("users")
  }

  static async create(input) {
    if (!input.email) {
      throw {
        name: "Email Empty",
      };
    }
    if (!input.password) {
      throw {
        name: "Password Empty",
      };
    }
    if (input.password.length < 8) {
      throw {
        name: "Invalid Password Length",
      };
    }
    if (isEmail(input.email) === false) {
      throw {
        name: "Invalid Email Format",
      };
    }

    const users = this.getUser();
    const user = await users.findOne({
      email: input.email,
    });

    if (user) {
      throw {
        name: "Unique Email Constraint",
      };
    }

    return await users.insertOne({
      ...input,
      password: await hashPassword(input.password),
    });
  }

  static async findAll() {
    const users = this.getUser();
    return await users.find().toArray();
  }

  static async findOne(id) {
    const users = this.getUser();
    return await users.findOne({
      _id: new ObjectId(id),
    });
  }

  static async delete(id) {
    const users = this.getUser();
    return await users.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = { User };
