"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Web Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mobile Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Data Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Machine Learning",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
