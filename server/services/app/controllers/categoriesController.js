const { Product, Image, Category } = require("../models/index");


class categoriesController {
  static async getCategories(req, res, next) {
    try {
      let categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async postCategory(req, res, next) {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await Category.update({ name }, { where: { id } });
      res.status(201).json({ msg: `Category has been updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);

      if (!category) {
        throw { name: "Not Found" };
      }

      await Category.destroy({ where: { id } });

      res.status(200).json({ msg: `${category.name} has been deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async detailCategory(req, res, next) {
    const { id } = req.params;
    try {
      let category = await Category.findOne({ where: { id } });
      if (!category) {
        throw { name: "Not Found" };
      }
      // console.log(category);
      res.status(200).json(category);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = categoriesController;
