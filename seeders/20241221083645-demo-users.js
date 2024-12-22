"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10); // Hash password

    await queryInterface.bulkInsert("Users", [
      {
        name: "admin_user",
        email: "admin@example.com",
        password: hashedPassword, // Hashed password
        roleId: 1, // Admin role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "john_doe",
        email: "john.doe@example.com",
        password: hashedPassword, // Hashed password
        roleId: 2, // User role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "guest_user",
        email: "guest@example.com",
        password: hashedPassword, // Hashed password
        roleId: 3, // Guest role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
