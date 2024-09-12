import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Loader from "../../../Loader/Loader";

const ActiveUser = () => {
  const [activeModal, setActiveModal] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [showPassword, setShowPassword] = useState(false);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const useractive = (Array.isArray(userdata) ? userdata : []).slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Calculate total pages
  const totalPages = Math.ceil(
    (Array.isArray(userdata) ? userdata.length : 0) / postsPerPage
  );

  // Calculate page numbers to display
  const pageNumbersToShow = 5;
  const startPage = Math.max(
    1,
    currentPage - Math.floor(pageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

  // Adjust start page if endPage is the last page
  const adjustedStartPage = Math.max(1, endPage - pageNumbersToShow + 1);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    costPrice: Yup.number().optional(),
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("auth/register/?value=active", {
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data.data;
        console.log("API Response:", data);
        setUserdata(data);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  const UserActive = async (values) => {
    console.log("active", values);

    try {
      const token = localStorage.getItem("WorkMen-Token");

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const response = await axios.post(`/auth/register/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        await Swal.fire({
          icon: "success",
          text: response.data.message,
          timer: 1000,
          timerProgressBar: false,
          willClose: () => {
            closeModal();
            fetchData();
          },
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/activeuser" className="actives">
                  Active user accounts
                </Link>
              </li>
              <li>
                <Link to="/inactiveuser">Inactive user accounts</Link>
              </li>
              <li>
                <Link to="/gropus">Groups</Link>
              </li>
              <li>
                <Link to="/couples">Couples</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="big-containe">
        <div className="small-container">
          <div className="Institution-main-parent">
            <div className="Institution-grid-1 bg">
              <Link to="/genral" className="company">
                <div className="unser-heads">
                  <h5>Company Details</h5>
                  <i className="fa-solid fa-chevron-right main-clr" />
                </div>
              </Link>
              <Link to="/fgenral" className="company">
                <div className="unser-heads">
                  <h5>Functions</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/activeuser" className="company details">
                <div className="unser-heads">
                  <h5 className="main-clr">User Accounts</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/master" className="company">
                <div className="unser-heads">
                  <h5>Master Data</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/additional" className="company">
                <div className="unser-heads">
                  <h5>Additional Modules</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/import" className="company">
                <div className="unser-heads">
                  <h5>Import Data</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
            </div>
            <div className="Institution-grid-2 bg">
              <div className="compan">
                <h4 className="mt-41">User accounts</h4>
                <div className="user-flex">
                  <a onClick={() => openModal()}>Save</a>
                  <input type="text" placeholder="Search" className="users" />
                </div>
              </div>
              <section className="intro mt-6">
                <div className="bg-image h-100">
                  <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-12">
                          <div className="card shadow-2-strong">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                  <thead className="my-thead-1">
                                    <tr onClick={() => openModal("modal-1")}>
                                      <th scope="col">First name</th>
                                      <th scope="col">Last name</th>
                                      <th scope="col">Comapny</th>
                                      <th scope="col">E-mail address</th>
                                      <th scope="col">Usage profile</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {isLoading ? (
                                      <tr>
                                        <td colSpan="8" className="text-center">
                                          <Loader />
                                        </td>
                                      </tr>
                                    ) : useractive.length > 0 ? (
                                      useractive.map((item, index) => (
                                        <tr className="my-bot" key={index}>
                                          <td className="projects">
                                            {item.first_name}
                                          </td>
                                          <td className="projects">
                                            {item.last_name}
                                          </td>
                                          <td className="projects">
                                            {item.company_name}
                                          </td>
                                          <td>{item.email}</td>
                                          {/* <td className="projects">{item.usageprofile}</td> */}
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="8" className="text-center">
                                          {t("No data available")}
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <nav className="checkout-pagination">
                <ul className="pagination">
                  {/* Previous button: only show if currentPage is greater than 1 */}
                  {currentPage > 1 && (
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePagination(currentPage - 1);
                        }}
                      >
                        &laquo;
                      </a>
                    </li>
                  )}

                  {/* Page numbers */}
                  {[...Array(totalPages).keys()]
                    .slice(adjustedStartPage - 1, endPage)
                    .map((pageNumber) => (
                      <li
                        key={pageNumber + 1}
                        className={`page-item ${
                          currentPage === pageNumber + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePagination(pageNumber + 1);
                          }}
                        >
                          {pageNumber + 1}
                        </a>
                      </li>
                    ))}

                  {/* Next button */}
                  {currentPage < totalPages && (
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePagination(currentPage + 1);
                        }}
                      >
                        &raquo;
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal ${activeModal ? "active" : ""}`} id="modal-1">
        <div className="cont-btn">
          <div className="modal-content">
            <h1>User account</h1>
            <h3>Facts</h3>
          </div>
          <div className="modal-actions" onClick={closeModal}>
            <button className="modal-close">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        <h3 className="inst-11">Usage Profile*</h3>
        <Formik
          initialValues={{
            is_supplier: false, // Supplier checkbox
            is_active: false, // Active checkbox
            is_client: false, // Client checkbox
            is_externalemployee: false, // External Employee checkbox
            is_workmen: false, // Admin/Workmen checkbox
            first_name: "",
            last_name: "",
            company_name: "",
            email: "",
            password: "",
            cost: "",
          }}
          // validationSchema={validationSchema}
          onSubmit={UserActive}
        >
          {({ values, setFieldValue }) => (
            <Form className="mt-schedule">
              <div>
                <Field
                  type="checkbox"
                  id="is_supplier"
                  name="is_supplier"
                  className="remove"
                  checked={values.is_supplier}
                  onChange={() => {
                    setFieldValue("is_supplier", !values.is_supplier);
                  }}
                />
                <label className="schedule">Supplier</label>

                <Field
                  type="checkbox"
                  id="is_sub"
                  name="is_sub"
                  className="remove"
                  checked={!values.is_supplier}
                  onChange={() => {
                    setFieldValue("is_supplier", false);
                  }}
                />
                <label className="schedule">Subcontractor</label>
              </div>

              {/* Personal Details */}
              <div>
                <label className="ac-label">First name*</label>
                <Field
                  type="text"
                  name="first_name"
                  placeholder="Piotr"
                  className="ac-name"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="error-message"
                />
              </div>

              <div>
                <label className="ac-label">Last name*</label>
                <Field
                  type="text"
                  name="last_name"
                  placeholder="Bednardz"
                  className="ac-name"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="error-message"
                />
              </div>

              <div>
                <label className="ac-label">Company Name</label>
                <Field
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="ac-name"
                />
              </div>

              <div>
                <label className="ac-label">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="alhrapiotr@gmail.com"
                  className="ac-name"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="foreyeicon">
                <label className="ac-label">Password*</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder={t("Enter Your Password ")}
                  className="ac-name"
                />
                <i
                  className={`fa-solid${
                    showPassword ? " fa-eye-slash iei" : " fa-eye iei"
                  } icon-eye`}
                  onClick={togglePasswordVisibility}
                ></i>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div>
                <label className="ac-label">Cost Price</label>
                <Field
                  type="text"
                  name="cost"
                  placeholder="Cost Price"
                  className="ac-name"
                />
                <ErrorMessage
                  name="cost"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Conditional Fields for Supplier */}
              {values.is_supplier && (
                <div className="mt-schedule">
                  {/* Active */}
                  <Field
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={values.is_active}
                    onChange={() =>
                      setFieldValue("is_active", !values.is_active)
                    }
                    className="remove"
                  />
                  <label className="schedule">Active</label>

                  {/* Client */}
                  <Field
                    type="checkbox"
                    id="no1"
                    name="is_client"
                    checked={values.is_client}
                    onChange={() =>
                      setFieldValue("is_client", !values.is_client)
                    }
                    className="remove"
                  />
                  <label className="schedule">Client</label>

                  {/* Admin/Workmen */}
                  <Field
                    type="checkbox"
                    id="admin_workmen"
                    name="is_workmen"
                    checked={values.is_workmen}
                    onChange={() =>
                      setFieldValue("is_workmen", !values.is_workmen)
                    }
                    className="remove"
                  />
                  <label className="schedule">Admin/Workmen</label>
                </div>
              )}

              {!values.is_supplier && (
                <div className="mt-schedule">
                  {/* Active */}
                  <Field
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={values.is_active}
                    onChange={() =>
                      setFieldValue("is_active", !values.is_active)
                    }
                    className="remove"
                  />
                  <label className="schedule">Active</label>

                  {/* Client */}
                  <Field
                    type="checkbox"
                    id="is_client"
                    name="is_client"
                    checked={values.is_client}
                    onChange={() =>
                      setFieldValue("is_client", !values.is_client)
                    }
                    className="remove"
                  />
                  <label className="schedule">Client</label>

                  {/* External Employee */}
                  <Field
                    type="checkbox"
                    id="is_externalemployee"
                    name="is_externalemployee"
                    checked={values.is_externalemployee}
                    onChange={() =>
                      setFieldValue(
                        "is_externalemployee",
                        !values.is_externalemployee
                      )
                    }
                    className="remove"
                  />
                  <label className="schedule">External Employee</label>

                  {/* Admin/Workmen */}
                  <Field
                    type="checkbox"
                    id="is_workmen"
                    name="is_workmen"
                    checked={values.is_workmen}
                    onChange={() =>
                      setFieldValue("is_workmen", !values.is_workmen)
                    }
                    className="remove"
                  />
                  <label className="schedule">Admin/Workmen</label>
                </div>
              )}

              <button type="submit" className="ac-save">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ActiveUser;
