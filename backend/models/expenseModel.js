const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const expenseModel = (sequelize) => {
  return sequelize.define("expense", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
module.exports = expenseModel;
