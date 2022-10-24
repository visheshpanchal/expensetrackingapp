import React, { useRef } from "react";
import { baseURL } from "../Config/basic";
import axios from "../Config/axios";
import { Link, useHistory } from "react-router-dom";
import FormField from "../components/FormField";
import { authAction } from "../store/auth";
import { useDispatch } from "react-redux";
const Login = () => {
  const emailRef = useRef();
  const history = useHistory();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(`${baseURL}user/login`, { email, password })
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("token", res.headers.token);
          dispatch(authAction.login());
          alert("Login Successfully Done");
          history.push("/expense");
        } else {
          alert(res.data.message);
        }
        emailRef.current.value = "";
        passwordRef.current.value = "";
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <React.Fragment>
      <div className="container d-flex justify-content-center mt-5">
        <div className="w-50 shadow rounded p-5">
          <h2 className="mb-2">Login Page</h2>
          <form method="post" onSubmit={submitHandler}>
            <div className="mb-3">
              <FormField typeName={"text"} ref={emailRef} label={"Email"} />
            </div>
            <div className="mb-3">
              <FormField typeName={"password"} ref={passwordRef} label="Password" />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
            <div className="mb-3">
              <Link to="/" className="btn btn-dark">
                Signup Page
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
