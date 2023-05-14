const { Product, Image, Category, User } = require("../models/index");
const { sequelize } = require("../models");
const slugify = require("slugify");

class productsController {
  static async getCourses(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [
          {
            model: Image,
            attributes: ["imgUrl"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["username", "role"],
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailCourse(req, res, next) {
    let { id } = req.params;
    try {
      let product = await Product.findOne({
        where: { id },
        include: [
          {
            model: Image,
            attributes: ["imgUrl"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["username", "role"],
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!product) {
        throw { name: "Not Found" };
      }
      const response = {
        ...product.toJSON(),
        categoryName: product.Category.name,
        author: product.User.username,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async postCourse(req, res, next) {
    const { name, description, price, mainImg, categoryId, images, authorId } =
      req.body;
    const t = await sequelize.transaction();

    try {
      let slug = slugify(name);
      const product = await Product.create(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          categoryId,
          authorId,
        },
        { transaction: t }
      );
      images.forEach((el) => {
        el.productId = product.id;
      });

      await Image.bulkCreate(images, { transaction: t });

      await t.commit();

      res.status(201).json(product);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async editCourse(req, res, next) {
    const { id } = req.params;
    const { name, description, price, mainImg, categoryId ,authorId} = req.body;
    try {
      let slug = slugify(name);
      await Product.update(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          categoryId,
          authorId: authorId,
        },
        { where: { id } }
      );
      res.status(201).json({ msg: `Product has been updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCourse(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ where: { id } });

      if (!product) {
        throw { name: "Not Found" };
      }

      await Product.destroy({ where: { id } });

      res.status(200).json({ msg: `${product.name} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = productsController;
