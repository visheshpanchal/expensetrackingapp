exports.validator = (body, fields, check) => {
  let err = { field: [] };

  // REGEX

  // Check Empty Field
  for (const key in body) {
    if (key in fields) {
      if (body[key] == "")
        err.field.push({ error: key, message: "Key is Empty" });
    }
  }

  // Structure Match

  return err;
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

console.log(makeid(64));
