const axios = require("axios");
const redis = require("../config/connectRedis");
const baseUrlUsers = process.env.BASE_URL_USERS || "http://localhost:4001/user";

class Controller {
  static async postUser(req, res, next) {
    try {
      const { data } = await axios.post(baseUrlUsers, {
        ...req.body,
      });
      await redis.del("users:users");

      res.status(201).json(data);
    } catch (err) {
      res.status(err.response.status).json(err.response.data.message);
    }
  }
  static async getAllUsers(req, res, next) {
    try {
      const cache = await redis.get("users:users");
      if (cache) {
        const data = JSON.parse(cache);
        res.status(200).json(data);
      } else {
        const { data } = await axios.get(baseUrlUsers);
        await redis.set("users:users", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(err.response.status).json(err.response.data.message);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(`${baseUrlUsers}/${id}`);
      await redis.del("users:users");

      res.status(200).json(`User with id ${id} has been deleted`);
    } catch (err) {
      res.status(err.response.status).json(err.response.data.message);
    }
  }
}

module.exports = Controller;
