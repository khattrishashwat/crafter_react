import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function Projects() {
  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [selectedResponsible, setSelectedResponsible] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [page, setPage] = useState();
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const openPage = (pageName) => {
    setActiveTab(pageName);
  };

  const tabStyle = (tabName) => ({
    borderBottom: activeTab === tabName ? "2px solid rgb(240, 101, 34)" : "",
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const detailopenModal = (status, id) => {
    const item = data.find((item) => item.id === id);
    console.log("item", item);

    setCurrentStatus(status);
    setApiData(item);

    console.log(status, id);

    setIsModalOpen(true);
  };

  const detailcloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("WorkMen-Token");

    try {
      let response;
      if (searchClient || startDate || selectedStatus) {
        response = await axios.get(
          `client/filter-project/?order_status=${selectedStatus}&query=${searchClient}&date=${startDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        setIsLoading(true);
        response = await axios.get(`client/filter-project/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchClient, startDate, selectedStatus]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(data.length / postsPerPage);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting item with ID:", id);
      const token = localStorage.getItem("WorkMen-Token");
      await axios.delete(`client/filter-project/?order_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newData = data.filter((item) => item.id !== id);
      console.log(newData);
      setData(newData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id, data, setData);
      }
    });
  };

  // const pro = {
  //   projectname: "",
  //   client: "",
  //   type: "",
  //   budget: "",
  //   deadline: "",
  // };
  // const onAddPro = async (values, { resetForm }) => {
  //   const token = localStorage.getItem("WorkMen-Token");

  //   try {
  //     const response = await axios.post("crafter/project/", values, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response) {
  //       console.log("pro", response.data);

  //       // Show success message using Swal
  //       await Swal.fire({
  //         icon: "success",
  //         title: "Success!",
  //         text: "Project added successfully",
  //       });

  //       // Reset form fields if needed
  //       resetForm();

  //       // Close the modal (adjust as per your modal close logic)
  //       closeModal();

  //       // Reload window after 3 seconds
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Optionally show an error message using Swal
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: "Failed to add project",
  //     });
  //   }
  // };

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleCancelEdit = () => {
  //   setIsEditing(false);
  //   setSelectedProjectType(apiData.type); };

  // const handleSaveEdit = async () => {
  //   try {
  //     const token = localStorage.getItem("WorkMen-Token");
  //     const response = await axios.patch(
  //       ``,
  //       {
  //         type: selectedProjectType,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setIsEditing(false);
  //     } else {
  //       throw new Error("Failed to update project type");
  //     }
  //   } catch (error) {
  //     console.error("Error updating project type:", error);
  //   }
  // };

  const getProgressPercentage = (status) => {
    switch (status) {
      case "created":
        return 0;
      case "planned":
        return 20;
      case "in progress":
        return 40;
      case "completed":
        return 60;
      case "invoice":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div>
      <div className="big-container bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/planning">{t("Planning")}</Link>
              </li>
              <li>
                <Link to="/projects" className="actives">
                  {t("Projects")}
                </Link>
              </li>
              <li>
                <Link to="/orders">{t("Work Orders")}</Link>
              </li>
              <li>
                <Link to="/action">{t("Action")}</Link>
              </li>
              <li>
                <Link to="/gps">{t("GPS")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="work-flex">
          <div className="work">
            <h4>{t("Project")} </h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search Client")}
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
              />
            </div>
            <div className="input-1">
              <input
                type="date"
                id="date"
                name="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="input-1">
              <select
                id="status"
                name="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option>created</option>
                <option>planned</option>
                <option>in progress</option>
                <option>completed</option>
                <option>incomplete</option>
                <option>invoice</option>
              </select>
            </div>
            {/* <div>
              <button className="plus" onClick={openModal}>
                <i className="fa-solid fa-plus" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div>
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
                                <th scope="col">{t("Project no.")}</th>
                                <th scope="col">{t("Project name.")}</th>
                                <th scope="col">{t("Client")}</th>
                                <th scope="col">{t("Deadline")}</th>
                                <th scope="col">{t("Status")}</th>
                                <th scope="col">{t("Progress")}</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading ? (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    <Loader />
                                  </td>
                                </tr>
                              ) : data.length > 0 ? (
                                currentPosts.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      <Link to="" className="project">
                                        {item.project_number}
                                      </Link>
                                    </td>
                                    <td>
                                      <Link to="" className="project">
                                        {item.project_name}
                                      </Link>
                                    </td>
                                    <td>
                                      <Link to="" className="project">
                                        {item.client}
                                      </Link>
                                    </td>
                                    <td>
                                      <Link to="" className="project">
                                        {item.end_date.slice(0, 10)}
                                      </Link>
                                    </td>
                                    <td>
                                      <Link
                                        to=""
                                        className={
                                          item.order_status === "created"
                                            ? "progress"
                                            : item.order_status === "planned"
                                            ? "progresblue progress-1"
                                            : item.order_status === "completed"
                                            ? "progresgreen progress-1"
                                            : item.order_status ===
                                              "in progress"
                                            ? "progressyellow progress-1"
                                            : item.order_status === "incomplete"
                                            ? "progressred progress-1"
                                            : item.order_status === "invoice"
                                            ? "progresblue progress-1"
                                            : ""
                                        }
                                        onClick={() => {
                                          console.log("Clicked item:", item.id);
                                          detailopenModal(
                                            item.order_status,
                                            item.id
                                          );
                                        }}
                                      >
                                        {item.order_status
                                          .charAt(0)
                                          .toUpperCase() +
                                          item.order_status
                                            .slice(1)
                                            .toLowerCase()}
                                      </Link>
                                    </td>
                                    <td>
                                      <a
                                        className={
                                          item.order_status.toLowerCase() ===
                                          "created"
                                            ? "progress-1"
                                            : item.order_status.toLowerCase() ===
                                              "planned"
                                            ? "progresorange progress-1"
                                            : item.order_status.toLowerCase() ===
                                              "completed"
                                            ? "progresgreen progress-1"
                                            : item.order_status.toLowerCase() ===
                                              "in progress"
                                            ? "progressyellow progress-1"
                                            : item.order_status.toLowerCase() ===
                                              "invoice"
                                            ? "progresblue progress-1"
                                            : item.order_status.toLowerCase() ===
                                              "incomplete"
                                            ? "progressred progress-1"
                                            : ""
                                        }
                                      >
                                        {getProgressPercentage(
                                          item.order_status
                                        )}
                                        %
                                      </a>
                                    </td>
                                    <td>
                                      <i
                                        className="fa-solid fa-trash"
                                        onClick={() =>
                                          handleDeleteClick(item.id)
                                        }
                                      />
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    No data available
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
            {[...Array(totalPages).keys()].map((pageNumber) => (
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
            {currentPage < totalPages && (
              <li className="page-item">
                <a
                  className="next page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePagination(currentPage + 1);
                  }}
                >
                  »
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div
        className={`modal1 ${isModalOpen ? "show" : ""}`}
        // className='modal show'
        id="add-price"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-price"
        style={{ display: isModalOpen ? "block" : "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog pdfmodal">
          <div className="modal-content">
            <div className="modal-header border-0 gap-3">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={detailcloseModal}
              />
            </div>
            <p>Customers &nbsp;Project &nbsp;Details</p>
            <div className="steps mb-4">
              {currentStatus === "Created" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Planned" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "InProgress" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">InProgress</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Completed" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">InProgress</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Completed</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Invoice" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Invoice</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Created</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Planned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">InProgress</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Completed</div>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div className="big-containe bg-1">
              <div className="container">
                <div className="same-as-head">
                  <ul className="maintabhead flex-end">
                    <li
                      className={`tablink ${
                        activeTab === "Home" ? "active" : ""
                      }`}
                      onClick={() => openPage("Home")}
                      id="defaultOpen"
                      style={tabStyle("Home")}
                    >
                      Timeline
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Appointments" ? "active" : ""
                      }`}
                      onClick={() => openPage("Appointments")}
                      style={tabStyle("Appointments")}
                    >
                      Locations
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Documents" ? "active" : ""
                      }`}
                      onClick={() => openPage("Documents")}
                      style={tabStyle("Documents")}
                    >
                      Working hours (3)
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Photos" ? "active" : ""
                      }`}
                      onClick={() => openPage("Photos")}
                      style={tabStyle("Photos")}
                    >
                      Offers (0)
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Invoice" ? "active" : ""
                      }`}
                      onClick={() => openPage("Invoice")}
                      style={tabStyle("Invoice")}
                    >
                      Invoice (1)
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Documents1" ? "active" : ""
                      }`}
                      onClick={() => openPage("Documents1")}
                      style={tabStyle("Documents1")}
                    >
                      Documents
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Prices" ? "active" : ""
                      }`}
                      onClick={() => openPage("Prices")}
                      style={tabStyle("Prices")}
                    >
                      Prices
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-body ">
              <div className="row">
                <div className="col-md-5">
                  <div className="tabcontent-container">
                    {activeTab === "Home" && (
                      <div
                        id="Home"
                        className="tabcontentt"
                        style={{ display: "block" }}
                      >
                        <div className="Institution-grid-2 bg">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Details</h4>
                                <i
                                  className="fa fa-pencil"
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Project Type
                                </span>
                                <span className="label-input"></span>
                              </div>

                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Project Number
                                </span>
                                <span className="label-input">
                                  {apiData.project_number}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Client</span>
                                <span className="label-input">
                                  {apiData.client}
                                </span>
                              </div>
                              {/* <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Address</span>
                                <span className="label-input">
                                  Name location
                                </span>
                              </div> */}
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Progress</h4>
                                {/* <i className="fa-solid fa-plus" /> */}
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Budgeted Hours
                                </span>
                                <span className="label-input">
                                  Mr.Karel De Wit
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Hours Worked
                                </span>
                                <span className="label-input">0612345678</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Start Date</span>
                                <span className="label-input">
                                  kareldewit@gmail.com
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">End Date</span>
                                <span className="label-input">
                                  kareldewit@gmail.com
                                </span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Budgeted/Consumed</h4>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Labour wages
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Sub Contractor
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Material</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Matericel</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Remaining</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Total</span>
                                <span className="label-input" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "Appointments" && (
                      <div
                        id="Appointments"
                        className="tabcontentt"
                        style={{ display: "block" }}
                      >
                        <div className="Institution-grid-2 bg">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>General</h4>
                                <i className="fa fa-pencil" />
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Customer number
                                </span>
                                <span className="label-input">K000001</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Business name
                                </span>
                                <span className="label-input">
                                  Housing corporation
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Address</span>
                                <span className="label-input">
                                  City fellow 370 sarphati street
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Postcode/town
                                </span>
                                <span className="label-input">
                                  1018gw Amsterdam
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Country</span>
                                <span className="label-input">
                                  Name location
                                </span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Contact</h4>
                                <i className="fa-solid fa-plus" />
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Contact</span>
                                <span className="label-input">
                                  Mr.Karel De Wit
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Phone number
                                </span>
                                <span className="label-input">0612345678</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Email</span>
                                <span className="label-input">
                                  kareldewit@gmail.com
                                </span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Details</h4>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Chamber of Commerce
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Number VAT number
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Phone</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Email</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">VAT-shifted</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Wage share</span>
                                <span className="label-input" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "Documents" && (
                      <div
                        id="Documents"
                        className="tabcontentt"
                        style={{ display: "block" }}
                      >
                        <div className="Institution-grid-2 bg">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>General</h4>
                                <i className="fa fa-pencil" />
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Customer number
                                </span>
                                <span className="label-input">K000001</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Business name
                                </span>
                                <span className="label-input">
                                  Housing corporation
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Address</span>
                                <span className="label-input">
                                  City fellow 370 sarphati street
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Postcode/town
                                </span>
                                <span className="label-input">
                                  1018gw Amsterdam
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Country</span>
                                <span className="label-input">
                                  Name location
                                </span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Contact</h4>
                                <i className="fa-solid fa-plus" />
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Contact</span>
                                <span className="label-input">
                                  Mr.Karel De Wit
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Phone number
                                </span>
                                <span className="label-input">0612345678</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Email</span>
                                <span className="label-input">
                                  kareldewit@gmail.com
                                </span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Details</h4>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Chamber of Commerce
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Number VAT number
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Phone</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Email</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">VAT-shifted</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Wage share</span>
                                <span className="label-input" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "Photos" && (
                      <div
                        id="Photos"
                        className="tabcontentt"
                        style={{ display: "block" }}
                      >
                        <div className="Institution-grid-2 bg">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>General</h4>
                                <i className="fa fa-pencil" />
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Customer number
                                </span>
                                <span className="label-input">K000001</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Business name
                                </span>
                                <span className="label-input">
                                  Housing corporation
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Address</span>
                                <span className="label-input">
                                  City fellow 370 sarphati street
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Postcode/town
                                </span>
                                <span className="label-input">
                                  1018gw Amsterdam
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Country</span>
                                <span className="label-input">
                                  Name location
                                </span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Contact</h4>
                                <i className="fa-solid fa-plus" />
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Contact</span>
                                <span className="label-input">
                                  Mr.Karel De Wit
                                </span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Phone number
                                </span>
                                <span className="label-input">0612345678</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Email</span>
                                <span className="label-input">
                                  kareldewit@gmail.com
                                </span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="d-flex justify-content-between align-items-center general">
                                <h4>Details</h4>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Chamber of Commerce
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">
                                  Number VAT number
                                </span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Phone</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Email</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">VAT-shifted</span>
                                <span className="label-input" />
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="label-names">Wage share</span>
                                <span className="label-input" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "Invoice" && (
                      <div
                        id="Invoice"
                        className="tabcontentt"
                        style={{ display: "block" }}
                      >
                        <div className="Institution-grid-2 bg">
                          <div className="row">{/* Invoice Content */}</div>
                        </div>
                      </div>
                    )}
                    {activeTab === "Documents1" && (
                      <div id="Documents1" className="tabcontentt">
                        <div className="Institution-grid-2 bg">
                          <div className="row">{/* Documents1 Content */}</div>
                        </div>
                      </div>
                    )}
                    {activeTab === "Prices" && (
                      <div id="Prices" className="tabcontentt">
                        <div className="Institution-grid-2 bg">
                          <div className="row">{/* Prices Content */}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-7">
                  <div id="parent">
                    <div className="menu border">
                      <div className="d-flex gap-4 p-2 m-0">
                        <button className="active tablinks">
                          <i className="fa fa-book" /> Make note
                        </button>
                        <button className="tablinks">
                          <i className="fa fa-envelope" /> Send email
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="same-as-head tabinner">
                    <ul className="tab">
                      <li
                        className="tablinks active"
                        onclick="openCity(event, 'Alles')"
                      >
                        Alles
                      </li>
                      <li
                        className="tablinks"
                        onclick="openCity(event, 'Updated')"
                      >
                        Updated
                      </li>
                      <li
                        className="tablinks"
                        onclick="openCity(event, 'Action')"
                      >
                        Action
                      </li>
                      <li
                        className="tablinks"
                        onclick="openCity(event, 'Notes')"
                      >
                        Notes
                      </li>
                      <li
                        className="tablinks"
                        onclick="openCity(event, 'Emails')"
                      >
                        Emails
                      </li>
                    </ul>
                  </div>
                  <div
                    id="Alles"
                    className="tabcontent"
                    style={{ display: "block" }}
                  >
                    <div className="Institution-grid-2 bg">
                      <div className="submenu">
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00003 created</p>
                          <p>jm Koelman 27 october 2022 15:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00002 created</p>
                          <p>jm Koelman 26 october 2022 18:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO000021 created</p>
                          <p>jm Koelman 25 october 2022 14:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00004 created</p>
                          <p>jm Koelman 22 october 2022 16:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Client created</p>
                          <p>jm Koelman 22 october 2022 16:20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="Updated" className="tabcontent">
                    <div className="Institution-grid-2 bg">
                      <div className="submenu" style={{ display: "block" }}>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00003 created</p>
                          <p>jm Koelman 27 october 2022 15:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00002 created</p>
                          <p>jm Koelman 26 october 2022 18:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO000021 created</p>
                          <p>jm Koelman 25 october 2022 14:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00004 created</p>
                          <p>jm Koelman 22 october 2022 16:5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="Action" className="tabcontent">
                    <div className="Institution-grid-2 bg">
                      <div className="submenu" style={{ display: "block" }}>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00003 created</p>
                          <p>jm Koelman 27 october 2022 15:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00002 created</p>
                          <p>jm Koelman 26 october 2022 18:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO000021 created</p>
                          <p>jm Koelman 25 october 2022 14:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00004 created</p>
                          <p>jm Koelman 22 october 2022 16:5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="Notes" className="tabcontent">
                    <div className="Institution-grid-2 bg">
                      <div className="submenu" style={{ display: "block" }}>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00003 created</p>
                          <p>jm Koelman 27 october 2022 15:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00002 created</p>
                          <p>jm Koelman 26 october 2022 18:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO000021 created</p>
                          <p>jm Koelman 25 october 2022 14:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00004 created</p>
                          <p>jm Koelman 22 october 2022 16:5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="Emails" className="tabcontent">
                    <div className="Institution-grid-2 bg">
                      <div className="submenu" style={{ display: "block" }}>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00003 created</p>
                          <p>jm Koelman 27 october 2022 15:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00002 created</p>
                          <p>jm Koelman 26 october 2022 18:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO000021 created</p>
                          <p>jm Koelman 25 october 2022 14:5</p>
                        </div>
                        <div className="roundd category-button mb-3">
                          <p>Work order WO00004 created</p>
                          <p>jm Koelman 22 october 2022 16:5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
