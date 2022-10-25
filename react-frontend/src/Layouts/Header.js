import React from "react";
import { Link } from "react-router-dom";
import { authAction } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuth);
  const dispatcher = useDispatch();
  const logoutHandler = () => {
    dispatcher(authAction.logout());
    localStorage.removeItem("token");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {isAuth && (
                <Link
                  to="/"
                  className="nav-link text-light fs-4"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              )}
              {!isAuth && (
                <Link to="/login" className="nav-link text-light fs-4">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
