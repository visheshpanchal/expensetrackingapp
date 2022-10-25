const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const premiumUserDetails = (sequelize) => {
  return sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.STRING,
      default: "",
    },
    paymentId: {
      type: DataTypes.STRING,
      default: "",
    },
  });
};
module.exports = premiumUserDetails;
