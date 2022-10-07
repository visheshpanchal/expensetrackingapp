const validator = require("./validator");

const bd = {
  name: "Vishesh",
  email: "vishesh@gmail.com",
  password: "1234567",
};
validator.validator(bd, ["name", "email", "password"], ["password"]);
