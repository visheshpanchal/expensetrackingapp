const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = User;
