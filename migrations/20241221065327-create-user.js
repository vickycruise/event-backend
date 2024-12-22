"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10); // Hashing the password for security

    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword, // Hashed password
        roleId: 1, // Role ID for admin (assuming the admin role has ID 1)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: hashedPassword, // Hashed password
        roleId: 2, // Role ID for user (assuming the user role has ID 2)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Guest User",
        email: "guest@example.com",
        password: hashedPassword, // Hashed password
        roleId: 3, // Role ID for guest (assuming the guest role has ID 3)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Deleting all users
    await queryInterface.bulkDelete("Users", null, {});
  },
};
