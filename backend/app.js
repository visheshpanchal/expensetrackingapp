const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const cors = require("cors");
const dotenv = require("dotenv");

// DOTENV
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Registering Routers

const routes = [
  require("./routes/user"),
  require("./routes/expenseRoute"),
  require("./routes/utils"),
];

for (const route of routes) {
  app.use(route);
}

sequelize // { alter: true }
  .sync()
  .then((res) => {
    app.listen(3000, () => {
      console.log("Listening From 3000 Port");
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
