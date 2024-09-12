import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


function Forget() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values) => {
    
     try {
       const formData = new FormData();
       formData.append("email", values.email);
       const response = await axios.post("auth/reset_password/", formData);
       console.log(response);
       console.log("Email sent successfully");

       Swal.fire({
         icon: "success",
         title: "Request Sent Successfully",
         text: "An email has been sent to reset your password.",
       });

       navigate("/done");
     } catch (error) {
       console.error(
         "Request failed:",
         error.response ? error.response.data : error.message
       );

       Swal.fire({
         icon: "error",
         title: "Request Failed",
         text: error.response ? error.response.data.message : error.message,
       });
     }
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

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
        <div className="parent">
          <div className="login-section">
            <div className="img-heading">
              <img
                src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                alt="logo"
              />
              <h4>Forgot Password</h4>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className="text-fild"
                  validate={validateEmail}
                />
                <ErrorMessage name="email" component="div" className="error" />
                <div className="center">
                  <button type="submit" className="login-btn">
                    Send
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

export default Forget;
