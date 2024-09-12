import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Sucess() {
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${
          axios.defaults.staticbaseURL + "Image/bacck.png"
        })`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="big-container">
        <div className="parent">
          <div className="login-section">
            <div className="img-heading">
              <img
                src={
                  axios.defaults.staticbaseURL +
                  "crafter/static/Image/New-logo.png"
                }
                alt="logo"
              />
            </div>
            <p className="mt-3">Your account has been created successfully.</p>
            <div className="center">
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sucess;
