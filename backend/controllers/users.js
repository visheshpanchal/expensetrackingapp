const sequelize = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = sequelize.models.user;
const Order = sequelize.models.order;

const SECRET_KEY = process.env.SECRET_KEY;
const R_SECRET = process.env.RAZORPAY_SECRET;
let razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY, // your `KEY_ID`
  key_secret: process.env.RAZORPAY_SECRET, // your `KEY_SECRET`
});

// GENERAL CONFIG
const SALT_ROUND = 10;

exports.singUpUser = (req, res, next) => {
  let body = req.body;
  let name = body.name;
  let email = body.email;
  let password = body.password;
  // Validation Not Completed Yet
  if (body) {
    bcrypt.hash(password, SALT_ROUND, async (err, result) => {
      if (err) {
        res.status(500).json({});
      }
      try {
        let _Object = await User.create({
          name: name,
          email: email,
          password: result,
        });
        res.status(201).json({ status: "success", message: { id: _Object.id } });
      } catch (err) {
        if (err.errors[0].message) {
          res.status(400).json({ status: "error", message: `${err.errors[0].message}` });
        } else {
          res.status(400).json({ status: "error", message: `${err}` });
        }
      }
    });
  } else {
    res.json({ Status: "error" });
  }
};

exports.loginUser = async (req, res, next) => {
  let body = req.body;
  let plainPassword = body.password;
  // Validation Not Completed Yet

  if (body) {
    try {
      let _Object = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (_Object) {
        bcrypt.compare(plainPassword, _Object.password, async (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({});
          }
          if (result) {
            // JWT WebToken Adding
            let jwtString = jwt.sign({ userId: _Object.id, name: _Object.name }, SECRET_KEY);

            res.set({ "Access-Control-Expose-Headers": "token" });
            res.set("token", jwtString);
            res
              .status(200) // 200 Successful Request
              .json({ status: "success", user: { name: _Object.name } });
          } else {
            res
              .status(401) // Error for password not match
              .json({ status: "error", message: "Password not matching" });
          }
        });
      } else {
        // 404 error for record not found
        res.status(404).json({ status: "error", message: "User Not Found." });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log(err);
  }
};

exports.isAuthenticatedUser = async (req, res, next) => {
  let token = req.headers.token;

  if (token) {
    let decryptedToken = jwt.decode(JSON.parse(token), SECRET_KEY);

    try {
      let user = await User.findOne({ id: decryptedToken.id });

      if (user) {
        res.status(200).json({ status: "success", data: { isAuthenticated: true, user: user } });
      } else {
        res.status(200).json({ status: "success", data: { isAuthenticated: false } });
      }
    } catch (err) {
      res.status(500).json({ status: "error", message: "Server Error" });
    }
  } else {
    res.status(200).json({ status: "success", data: { isAuthenticated: false } });
  }
};

exports.goPremium = async (req, res, next) => {
  let token = req.headers.token;

  if (token) {
    let decryptedToken = jwt.decode(JSON.parse(token), SECRET_KEY);

    try {
      let response = await razorpay.orders.create({
        // prettier-ignore

        amount: 500,

        currency: "INR",
        receipt: "Receipt #20",
      });
      try {
        let userResponse = await Order.create({
          orderId: response.id,
          userId: decryptedToken.userId,
        });

        res.status(201).json({ status: "success", data: userResponse });
      } catch (error) {
        console.log(error, "122");
      }
    } catch (error) {
      console.log(error, "125");
    }
  } else {
    res.status(404).json({ status: "error", message: "User not found." });
  }
};

exports.verifyTransaction = async (req, res, next) => {
  let body = req.body;
  let token = req.headers.token;
  if (body) {
    let decryptedToken = jwt.decode(JSON.parse(token), SECRET_KEY);
    let id = body.razorpay_order_id + "|" + body.razorpay_payment_id;
    let expectedSignature = crypto.createHmac("sha256", R_SECRET).update(id.toString()).digest("hex");

    if (expectedSignature === body.razorpay_signature) {
      let order = await Order.update({ paymentId: body.razorpay_payment_id }, { where: { userId: decryptedToken.userId } });

      res.json({ status: "success" });
    } else {
      res.json({ status: "error" });
    }
  } else {
    console.log("Payment Part");
  }
};
