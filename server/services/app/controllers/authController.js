const { User } = require("../models");
const { comparePassword } = require("../helpers/hashing");
const { generateToken } = require("../helpers/jwt");

class authContoller {
  static async register(req, res, next) {
    let { username, email, password } = req.body;
    try {
      let newUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        message: `Admin with username ${username} has been created`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "Bad Request" };
      }
      if (!password) {
        throw { name: "Bad Request" };
      }

      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }

      let compare = comparePassword(password, user.password);
      if (!compare) {
        throw { name: "Unauthorized" };
      }

      let payload = { id: user.id };
      let access_token = generateToken(payload);
      let role = user.role;
      let username = user.username;
      res.status(200).json({ access_token, email, role, username });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = authContoller;
