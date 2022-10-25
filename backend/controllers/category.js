const sequelize = require("../utils/database");

const Category = sequelize.models.category;

exports.categoryList = async (req, res, next) => {
  try {
    let data = await Category.findAll();

    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    console.log(err);
  }
};
