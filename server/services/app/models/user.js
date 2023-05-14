"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/hashing");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product,{ foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        isUnique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username cannot be empty",
          },
          notEmpty: {
            msg: "Username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email cannot be empty",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: true,
        },
        unique: {
          arg: true,
          msg: "Email is already registered.",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 16],
            msg: "Minimum length for password is 5 and maximum length is 16",
          },
          notNull: {
            msg: "Password cannot be empty",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "admin",
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          let hashed = await hashPassword(user.password);
          user.password = hashed;
        },
      },
    }
  );
  return User;
};
