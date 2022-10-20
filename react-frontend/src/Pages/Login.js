import React, { useRef } from "react";
import { baseURL } from "../Config/basic";
import axios from "../Config/axios";
import { Link } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();

  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(`${baseURL}user/login`, { email, password })
      .then((res) => {
        if (res.data.status === "success") {
          alert("Login Successfully Done");
          console.log(res.headers.token);
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
              <label className="form-label">Email</label>
              <input type="text" className="form-control" ref={emailRef} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" ref={passwordRef} />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
            <div className="mb-3">
              <Link to="/signup" className="btn btn-dark">
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
