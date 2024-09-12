import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2"; 


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_externalEmployee:"True",
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
  });
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("register/", values);

      if (response) {
        console.log(response.data);   
        console.log("Signup successful!");
        navigate("/sucess");
      } else {
        console.error("Signup failed. Status:", response.status);
      }
    }catch (error) {
    if (error.response && error.response.status === 403) {
       Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Email already exists. Please choose a different email.",
       });
      console.error("Email already exists. Please choose a different email.");
      } else {
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Something went wrong!",
         });
      console.error("Error:", error);
    }
  }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/Image/bacck.png"})`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="big-container login-rel">
        <div className="parent">
          <div className="login-section">
            <div className="img-heading">
              <img src="/Image/New-logo.png" alt="logo" />
              <h4>Try Alhra for free for 14 days!</h4>
            </div>
            <p>
              And discover for yourself why more than 1,500 users came before
              you.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Field
                  type="text"
                  name="first_name"
                  placeholder="First name*"
                  className="text-fild"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="error"
                />

                <Field
                  type="text"
                  name="last_name"
                  placeholder="Last name*"
                  className="text-fild"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="error"
                />

                <Field
                  type="text"
                  name="email"
                  placeholder="Email Address*"
                  className="text-fild"
                />
                <ErrorMessage name="email" component="div" className="error" />

                <div className="foreyeicon">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    className="text-fild"
                  />
                  <i
                    className={`fa-solid${
                      showPassword ? " fa-eye-slash iei" : " fa-eye iei"
                    } icon-ey`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />

                <div className="center">
                  <button type="submit" className="login-btn">
                    Signup for free
                  </button>
                  <h4 className="acnt">
                    Don't have an Account ?
                    <span>
                      <Link to="/login">Login</Link>
                    </span>
                  </h4>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
