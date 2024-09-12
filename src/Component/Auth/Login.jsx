import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { messaging, getToken, onMessage } from "../firebase/firebaseConfig";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [deviceToken, setDeviceToken] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getTokenAndLog = async () => {
  //     try {
  //       const currentToken = await getToken(messaging, {
  //         vapidKey:
  //           "BBN-PlunpDw8m0iblLHO5m1_MXxaT5yMC2SqfwLh0gHrxhYPC5dXFl7N97KHwz-VKxUa0zYTcIuoxv4_xqG9b20",
  //       });
  //       if (currentToken) {
  //         console.log("Firebase Messaging Token:", currentToken);
  //         setDeviceToken(currentToken);
  //       } else {
  //         console.log(t("noRegistrationToken"));
  //       }
  //     } catch (error) {
  //       console.error(t("errorGeneratingToken"), error);
  //     }
  //   };

  //   const requestPermission = async () => {
  //     try {
  //       const permission = await Notification.requestPermission();
  //       if (permission === "granted") {
  //         getTokenAndLog();
  //       } else {
  //         console.log(t("permissionDenied"));
  //       }
  //     } catch (error) {
  //       console.error(t("errorRequestingPermission"), error);
  //     }
  //   };

  //   requestPermission();

  //   onMessage(messaging, (payload) => {
  //     console.log(t("messageReceived"), payload);
  //   });
  // }, [t]);
  //  useEffect(() => {
  //    const setupFirebaseMessaging = async () => {
  //      try {
  //        const currentToken = await getToken(messaging, {
  //          vapidKey:
  //            "BBN-PlunpDw8m0iblLHO5m1_MXxaT5yMC2SqfwLh0gHrxhYPC5dXFl7N97KHwz-VKxUa0zYTcIuoxv4_xqG9b20",
  //        });
  //        if (currentToken) {
  //          console.log("Firebase Messaging Token:", currentToken);
  //          setDeviceToken(currentToken);
  //        } else {
  //          console.log(
  //            "No registration token available. Request permission to generate one."
  //          );
  //        }
  //      } catch (error) {
  //        console.error("Error generating token:", error);
  //      }
  //    };

  //    const requestNotificationPermission = async () => {
  //      try {
  //        const permission = await Notification.requestPermission();
  //        if (permission === "granted") {
  //          setupFirebaseMessaging();
  //        } else {
  //          console.log("Permission for notifications denied");
  //        }
  //      } catch (error) {
  //        console.error("Error requesting permission:", error);
  //      }
  //    };

  //    requestNotificationPermission();
  //  }, []);


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t("Invalid Email")).required(t("Email Required")),
    password: Yup.string()
      // .min(8, t("Password Required"))
      .required(t("Password Required")),
  });

const onSubmit = async (values) => {
  setIsLoading(true);
  try {
    const response = await axios.post("auth/login/", {
      ...values,
      for_value: "workmen",
      
    });

     console.log("Login successful!");
      console.log("Response:", response.data);

       localStorage.setItem("WorkMen-Token", response.data.access_token);
       localStorage.setItem("name", response.data.name);
    

      Swal.fire({
        icon: "success",
        title: t("Login Successful"),
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/");
  } catch (error) {
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );

    // Display error alert
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.response ? error.response.data.message : error.message,
    });
  } finally {
    setIsLoading(false);
  }
};





  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <div className="big-container login-rel">
        <div className="parent">
          <div className="login-section">
            <div className="img-heading">
              <img
                src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                alt="logo"
              />
              <h4>{t("Welcome To Alhra")}</h4>
            </div>
            <p>{t("lets Get Started")}</p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  placeholder={t("Enter Your Email Id")}
                  className="text-fild"
                />
                <ErrorMessage name="email" component="div" className="error" />

                <div className="foreyeicon">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder={t("Enter Your Password ")}
                    className="text-fild"
                  />
                  <i
                    className={`fa-solid${
                      showPassword ? " fa-eye-slash iei" : " fa-eye iei"
                    } icon-eye`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />

                {/* <Link to="/forget" className="forgot"> */}
                  {/* {t("Forgot Password")} */}
                {/* </Link> */}
                <button
                  type="submit"
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? t("loggingIn") : t("login")}
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
