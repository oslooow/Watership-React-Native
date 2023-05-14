"use strict";

const { hashPassword } = require("../helpers/hashing");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the passwords for the users
    const password = await hashPassword("admin");

    // Seed the users
    return queryInterface.bulkInsert("Users", [
      {
        username: "Oslo Ottawa",
        email: "admin@admin.com",
        password: password,
        role: "admin",
        phoneNumber: "08080808080",
        address: "Slipi, Palmerah, Jakarta Barat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Admin Admin",
        email: "admin2@admin.com",
        password: password,
        role: "admin",
        phoneNumber: "09090909090",
        address: "Senayan, Jakarta Selatan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the seeded users
    return queryInterface.bulkDelete("Users", null, {});
  },
};
