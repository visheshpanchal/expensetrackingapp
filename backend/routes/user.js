const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.get("/user/auth", userController.isAuthenticatedUser);
router.post("/user/signup", userController.singUpUser);
router.post("/user/login", userController.loginUser);

router.get("/user/order/premium", userController.goPremium);
router.post("/user/order/check", userController.verifyTransaction);
module.exports = router;
