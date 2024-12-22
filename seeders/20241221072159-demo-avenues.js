"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Avenues",
      [
        {
          name: "Grand Hall",
          address: "123 Grand Ave, City, Country",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Main Auditorium",
          address: "456 Main St, City, Country",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Conference Room A",
          address: "789 Conference Blvd, City, Country",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Avenues", null, {});
  },
};
