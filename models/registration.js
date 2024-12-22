"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define(
    "Registration",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // foreign key to User
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Events", // foreign key to Event
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ticketId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Set this to false if required
        references: {
          model: "Tickets", // foreign key to Tickets
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      tableName: "Registrations",
    }
  );

  Registration.associate = function (models) {
    // associations can be defined here
    Registration.belongsTo(models.User, { foreignKey: "userId" });
    Registration.belongsTo(models.Event, { foreignKey: "eventId" });
    Registration.belongsTo(models.Ticket, {
      foreignKey: "ticketId",
      onDelete: "SET NULL",
    });
  };

  return Registration;
};
