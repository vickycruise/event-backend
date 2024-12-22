"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Events",
      [
        {
          title: "Tech Conference 2024",
          statDate: new Date("2024-05-01T09:00:00"),
          endDate: new Date("2024-05-01T17:00:00"),
          location: "Grand Hall, City Center",
          description: "A major tech conference with talks and workshops.",
          avenueId: 1, // assuming the 'Avenue' with ID 1 exists in your database
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Health and Wellness Expo",
          statDate: new Date("2024-06-10T10:00:00"),
          endDate: new Date("2024-06-10T18:00:00"),
          location: "Main Auditorium, Health Center",
          description:
            "A health and wellness expo focusing on fitness and well-being.",
          avenueId: 2, // assuming the 'Avenue' with ID 2 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Business Networking Gala",
          statDate: new Date("2024-07-20T18:00:00"),
          endDate: new Date("2024-07-20T23:00:00"),
          location: "Conference Room A, Business Hub",
          description:
            "An exclusive business networking event for professionals.",
          avenueId: 3, // assuming the 'Avenue' with ID 3 exists
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
