"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      avenueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Avenues", // foreign key to Avenue table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // or CASCADE based on your requirement
      },
    },
    {
      timestamps: true, // Enable createdAt and updatedAt fields
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      tableName: "Events",
    }
  );

  // Define associations
  Event.associate = function (models) {
    // An event can belong to one avenue
    Event.belongsTo(models.Avenue, {
      foreignKey: "avenueId",
      onDelete: "SET NULL",
    });

    // Add more associations as needed
  };

  return Event;
};
