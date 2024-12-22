"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10); // Hash password

    await queryInterface.bulkInsert("Users", [
      {
        name: "admin_user",
        email: "admin1@example.com",
        password: hashedPassword, // Hashed password
        roleId: 1, // Admin role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "john_doe",
        email: "john.doe1@example.com",
        password: hashedPassword, // Hashed password
        roleId: 2, // User role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "guest_user",
        email: "guest1@example.com",
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
