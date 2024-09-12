import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Loader from "../../../Loader/Loader";
import { TextField, Chip, Stack } from "@mui/material";



function Groups() {
  const [activeModal, setActiveModal] = useState("");
  const [userdata, setUserdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [showPassword, setShowPassword] = useState(false);
  const [members, setMembers] = useState([]);

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

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

   const handleAddMember = (event) => {
     if (event.key === "Enter" && event.target.value) {
       setMembers([...members, event.target.value]);
       event.target.value = "";
     }
   };

   const handleDeleteMember = (memberToDelete) => {
     setMembers(members.filter((member) => member !== memberToDelete));
   };

   const saveNewTeam = async (values) => {
         try {
                const token = localStorage.getItem("WorkMen-Token");

           const response = await axios.post(          
             `/workmen/team/`,values,
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             },
           );
           Swal.fire({
             icon: "success",
             text:response.data,
             showConfirmButton: false,
             timer: 2000,
           });
         } catch (error) {
          Swal.fire({
            icon: "error",
            text: error.response?.data?.message || error.message,
            showConfirmButton: false,
            timer: 2000,
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
                <Link to="/activeuser">Active user accounts</Link>
              </li>
              <li>
                <Link to="/inactiveuser">Inactive user accounts</Link>
              </li>
              <li>
                <Link to="/gropus" className="actives">
                  Groups
                </Link>
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
                  <a onClick={() => openModal()}>Add</a>
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
                                    <tr>
                                      {/* <th scope="col">
                                                                  <div class="form-check">
                                                                      <input class="form-check-input" type="checkbox" value=""
                                                                          id="flexCheckDefault" />
                                                                  </div>
                                                              </th> */}
                                      <th scope="col">Name</th>
                                      {/* <th scope="col">Status</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="modal-open">
                                      <td className="projects fnt">
                                        No data entered
                                      </td>
                                    </tr>
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
            <h1>Group</h1>
          </div>
          <div className="modal-actions" onClick={closeModal}>
            <button className="modal-close">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        <Formik
          initialValues={{
            team_name: "",
            member: "",
            group: "",
          }}
          onSubmit={saveNewTeam}
        >
          {() => (
            <Form className="mt-schedule">
              <div>
                <label className="ac-label">Name*</label>
                <Field type="text" name="team_name" className="ac-name" />
                <ErrorMessage
                  name="team_name"
                  component="div"
                  className="error-message"
                />
              </div>

              <div>
                <label className="ac-label">Staff*</label>
                <TextField
                  onKeyDown={handleAddMember}
                  label="Add Staff"
                  variant="outlined"
                  className="ac-name"
                />
                <Stack direction="row" spacing={1} mt={1}>
                  {members.map((member, index) => (
                    <Chip
                      key={index}
                      label={member}
                      onDelete={() => handleDeleteMember(member)}
                    />
                  ))}
                </Stack>
                <ErrorMessage
                  name="member"
                  component="div"
                  className="error-message"
                />
              </div>

              <div>
                <label className="ac-label">Planning Group*</label>
                <Field
                  type="checkbox"
                  name="group"
                  placeholder="Bednardz"
                  className="ac-name"
                />
                <ErrorMessage
                  name="group"
                  component="div"
                  className="error-message"
                />
              </div>

              <button type="submit" className="ac-save">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Groups;
