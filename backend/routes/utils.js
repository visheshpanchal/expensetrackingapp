const express = require("express");
const category = require("../controllers/category");
const router = express.Router();

router.get("/category", category.categoryList);

module.exports = router;
