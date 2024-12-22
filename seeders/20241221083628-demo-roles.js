"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserting predefined roles into the Roles table
    await queryInterface.bulkInsert("Roles", [
      {
        name: "admin", // Name of the role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "user", // Name of the role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "manager", // Name of the role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "organizer", // Name of the role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Reverting the changes by deleting the inserted roles
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
