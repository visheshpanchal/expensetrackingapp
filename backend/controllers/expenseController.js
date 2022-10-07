const sequelize = require("../utils/database");

const Expense = sequelize.models.expense;
const Category = sequelize.models.category;
const Order = sequelize.models.order;
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRETE_KEY;

async function checkPremiumUser(req) {
  let token = req.headers.token;
  let isPremium = 0;
  if (token) {
    let decryptedToken = jwt.decode(JSON.parse(token), SECRET_KEY);
    try {
      let res = await Order.count({ where: { userId: decryptedToken.userId } });
      if (res > 0) {
        isPremium = 1;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return isPremium;
}

exports.getExpenses = async (req, res, next) => {
  let token = req.headers.token;
  let page = req.query.page;
  console.log(req.query.limit);
  let limit = req.query.limit ? Number(req.query.limit) : 10;
  if (token) {
    let decryptedToken = jwt.decode(JSON.parse(token), SECRET_KEY);
    if (page) {
      let count = await Expense.count({
        where: { userId: decryptedToken.userId },
      });

      let data = await Expense.findAll({
        offset: (page - 1) * limit,
        limit: limit,
        where: { userId: decryptedToken.userId },
        include: {
          model: Category,
        },
      });

      res.status(200).json({
        status: "success",
        data: data,
        totalItems: count,
        premium: await checkPremiumUser(req),
      });
    } else {
      try {
        let data = await Expense.findAll({
          where: { userId: decryptedToken.userId },
          include: {
            model: Category,
          },
        });
        res.json({
          status: "success",
          data: data,
          premium: await checkPremiumUser(req),
        });
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    res.status(404).json({ status: "error", message: "User Not Found" });
  }
};

exports.getExpensesByMonth = async (req, res, next) => {
  let token = req.headers.token;
  let month = req.params.month;

  if (token) {
    let decryptedToken = jwt.decode(JSON.parse(token), SECRET_KEY);
    try {
      let data = await Expense.findAll({
        where: {
          userId: decryptedToken.userId,
          createdAt: sequelize.where(
            sequelize.fn("month", sequelize.col("createdAt")),
            month
          ),
        },
        include: {
          model: Category,
        },
      });

      res.json({ data: data, premium: await checkPremiumUser(req) });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(404).json({ status: "error", message: "User Not Found" });
  }
};

exports.getSingleExpense = async (req, res, next) => {
  let id = req.params.id;
  try {
    let data = await Expense.findAll({
      where: {
        _id: id,
      },
    });
    res.status(200).json({ data: data, premium: await checkPremiumUser(req) });
  } catch (err) {}
};

exports.postExpenses = async (req, res, next) => {
  let token = req.headers.token;

  if (token) {
    try {
      let decryptedToken = jwt.decode(JSON.parse(token), SECRET_KEY);
      let body = req.body;
      let categoryId = body.category;
      let cat;
      let data = await Expense.create({
        ...body,
        categoryId: categoryId,
        userId: decryptedToken.userId,
      });
      res.status(201).json(data._id);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(404).json({ status: "error", message: "User Not Found" });
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    let body = req.body;
    let categoryId = body.category;
    let id = req.params.id;
    console.log(body);
    let data = await Expense.update(
      { ...body, categoryId: categoryId },
      {
        where: {
          _id: id,
        },
      }
    );

    res.status(201).json({ Update: "Done" });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    let id = req.params.id;

    let data = await Expense.destroy({ where: { _id: id } });

    res.status(200).json({});
  } catch (err) {
    console.log(err);
  }
};
