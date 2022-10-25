const sequelize = require("../utils/database");
const { Op } = require("sequelize");
const Expense = sequelize.models.expense;
const Category = sequelize.models.category;
const Order = sequelize.models.order;
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "secret";

async function checkPremiumUser(req) {
  let token = req.headers.token;
  let isPremium = 0;
  if (token) {
    jwt.verify(token, SECRET_KEY, async function (err, d) {
      if (err) {
        console.log(err);
      }

      try {
        let res = await Order.count({ where: { userId: d.userId } });
        if (res > 0) {
          isPremium = 1;
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  return isPremium;
}

exports.getExpenses = async (req, res, next) => {
  let token = req.headers.token;
  let page = req.query.page;
  let index = req.query.lastIndex ? req.query.lastIndex : 0;
  console.log("-------------------------------------", index);

  let limit = req.query.limit ? Number(req.query.limit) : 10;
  if (token) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptedToken) {
      if (err) {
        console.log(err);
      }

      if (page) {
        let count = await Expense.count({
          where: { userId: decryptedToken.userId, [Op.gt]: index },
        });

        let data = await Expense.findAll({
          offset: (page - 1) * limit,
          limit: limit,
          where: { userId: decryptedToken.userId, _id: { [Op.gt]: index } },
          include: {
            model: Category,
          },
        });

        res.status(200).json({
          status: "success",
          data: data,
          totalItems: count,
          premium: checkPremiumUser(req),
        });
      } else {
        try {
          let data = await Expense.findAll({
            where: {
              userId: decryptedToken.userId,

              _id: {
                [Op.gt]: [index],
              },
            },
            include: {
              model: Category,
            },
          });
          res.json({
            status: "success",
            data: data,
            premium: checkPremiumUser(req),
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
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
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decryptToken) => {
      if (err) {
        res
          .status(200)
          .json({ status: "error", message: "USer is not authenticated" });
      }

      let id = req.params.id;
      try {
        let data = await Expense.findAll({
          where: {
            _id: id,
          },
        });
        res.status(200).json({
          status: "success",
          data: data,
          premium: checkPremiumUser(req),
        });
      } catch (err) {
        res.status(404).json({ status: "error", message: "Item not found." });
      }
    });
  } else {
    res
      .status(200)
      .json({ status: "error", message: "USer is not authenticated" });
  }
};

exports.postExpenses = async (req, res, next) => {
  let token = req.headers.token;
  console.log(SECRET_KEY);
  if (token) {
    try {
      jwt.verify(token, SECRET_KEY, async function (err, decryptedToken) {
        if (err) {
          console.log("Error JWT ", err);
        }
        let body = req.body;
        let categoryId = body.category;

        let data = await Expense.create({
          ...body,
          categoryId: categoryId,
          userId: decryptedToken.userId,
        });
        res.status(201).json(data._id);
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(404).json({ status: "error", message: "User Not Found" });
  }
};

exports.updateExpense = async (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decryptToken) => {
      if (err) {
        res
          .status(200)
          .json({ status: "error", message: "USer is not authenticated" });
      }
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
    });
  } else {
    res
      .status(200)
      .json({ status: "error", message: "USer is not authenticated" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decryptToken) => {
      if (err) {
        res
          .status(200)
          .json({ status: "error", message: "USer is not authenticated" });
      }

      try {
        let id = req.params.id;

        let data = await Expense.destroy({ where: { _id: id } });

        res.status(200).json({ status: "success", data: { id } });
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    res
      .status(200)
      .json({ status: "error", message: "USer is not authenticated" });
  }
};

// const token = req.headers.token;
// if (token)
// {
//   jwt.verify(token, SECRET_KEY, async (err, decryptToken) => {
//     if (err) {
//       res.status(200).json({ status: "error", message: "USer is not authenticated" });
//     }
//   });
//   }
//  else {
//    res.status(200).json({ status: "error", message: "USer is not authenticated" });
// }
