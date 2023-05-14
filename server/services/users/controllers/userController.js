const { User } = require("../models/user");

class Controller {
  static async postUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      const user = await User.findOne(newUser.insertedId);

      res.status(201).json({ data: user });
    } catch (err) {
      next(err);
    }
  }
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      // console.log(users);
      res.status(200).json({
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);

      await User.delete(id);

      res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
