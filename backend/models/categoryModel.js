const { DataTypes } = require("sequelize");

const Category = (sequelize) => {
  sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
module.exports = Category;
