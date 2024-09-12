import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewPassword() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const passnew = async (values) => {
    try {
      // Check if passwords match
      if (values.password !== values.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      // Send the new password to the server
      const response = await axios.post("crafter/resetpassword/", {
        password: values.password,
      });

      console.log(response);
      console.log("Password reset successfully");
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters long";
    }
    return error;
  };

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}Image/bacck.png)`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="big-container">
        <div className="parent">
          <div className="login-section">
            <div className="img-heading">
              <img
                src={`${process.env.PUBLIC_URL}/Image/new-logo.png`}
                alt="logo"
              />
              <h4>Set New Password</h4>
            </div>
            <Formik initialValues={initialValues} onSubmit={passnew}>
              <Form>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter New Password"
                  className="text-fild"
                  validate={validatePassword}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="text-fild"
                  validate={validatePassword}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="center">
                  <button type="submit" className="login-btn">
                    Reset Password
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
