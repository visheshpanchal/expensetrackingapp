const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.UNAME, process.env.PASSWORD, {
  dialect: "mysql",
  host: process.env.HOST,
});

// Add All Database here
const dbs = [require("../models/userModel"), require("../models/expenseModel"), require("../models/categoryModel"), require("../models/premiumUserDetailsModel")];

for (const db of dbs) {
  db(sequelize);
}

const User = sequelize.models.user;
const Expense = sequelize.models.expense;
const Category = sequelize.models.category;
const Order = sequelize.models.order;

// User to Expense (One to Many Relation Ship)
User.hasMany(Expense, {
  onDelete: "CASCADE",
});
Expense.belongsTo(User);

// Adding Expense
Category.hasOne(Expense, {
  onDelete: "CASCADE",
});
Expense.belongsTo(Category);

// Premium User
User.hasOne(Order, {
  onDelete: "CASCADE",
});
Order.belongsTo(User);

module.exports = sequelize;
