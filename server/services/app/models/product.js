"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "authorId" });
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.hasMany(models.Image,{ foreignKey: "productId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required" },
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Price is required" },
          min: {
            args: [50000],
            msg: "Price must be at least 50000",
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Main image is required" },
          notEmpty: { msg: "Main image cannot be empty" },
        },
      },
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate: (product) => {
          product.slug = slugify(product.name);
        },
        beforeUpdate: (product) => {
          product.slug = slugify(product.name);
        },
      },
    }
  );
  return Product;
};
