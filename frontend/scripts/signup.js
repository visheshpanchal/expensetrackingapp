const signUpForm = document.getElementById("signup-form");

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let name = document.getElementById("name-signup");
  let email = document.getElementById("email-signup");
  let password = document.getElementById("password-signup");

  const data = {};
  data["name"] = name.value;
  data["email"] = email.value;

  data["password"] = password.value;

  axios({ method: "post", url: api + "user/" + "signup", data: data })
    .then(function (res) {
      console.log(res.data);
      alert("SignUp Successfully Done ...");
    })
    .catch(function (err) {
      alert(`${err.response.data.message}`);
    });
});
