import React, { useRef } from "react";
import { baseURL } from "../Config/basic";
import axios from "../Config/axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    axios
      .post(`${baseURL}user/signup/`, { email, password, name })
      .then((res) => {
        if (res.data.status === "success") {
          alert("Register Successfully Done");
        } else {
          alert(res.data.message);
        }
        emailRef.current.value = "";
        nameRef.current.value = "";
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
          <h2 className="mb-3">Signup</h2>
          <form method="post" onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" ref={nameRef} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" ref={emailRef} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                ref={passwordRef}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
            <div className="mb-3">
              <Link to="/login" className="btn btn-dark">
                Already Account Login Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
