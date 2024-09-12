import React from 'react';
import axios from 'axios';


function Done() {
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/Image/bacck.png)`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="big-container">
        <div className="parent ">
          <div className="login-section">
            <div className="img-heading">
              <img
                src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                alt="logo"
              />
            </div>
            <p className="mt-3">
              An email has been sent with instructions to reset your password.
            </p>
            <p>
              If it has not arrived, please check the spam folder of your email.
            </p>
            {/* 
          <div class="center">
              <a href="first.html" class="login-btn">Send</a>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Done;