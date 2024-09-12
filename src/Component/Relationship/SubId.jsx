import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function SubId() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [actives, setActives] = useState("MakeNote");
  const [activeTab, setActiveTab] = useState("Timeline");
  const [activestabs, setActiveStabs] = useState("Everything");
  const [ModalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeT, setActiveT] = useState("London");

  const handleClick = (tabName) => {
    setActiveT(tabName);
  };
  const openPage = (pageName, event) => {
    setActiveTab(pageName);
  };

  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);
  const handleTabClick = (tabName, event) => {
    setActiveStabs(tabName);
  };

  const handle = (tabName) => {
    setActives(tabName);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const Modal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const closedModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <a className="actives">{t("Customers")}</a>
              </li>
              <li>
                <Link to="/contacts">{t("Contacts")}</Link>
              </li>
              <li>
                <Link to="/addresses">{t("Addresses")}</Link>
              </li>
              <li>
                <Link to="/sublocations">{t("Sublocations")}</Link>
              </li>
              <li>
                <Link to="/objects">{t("Objects")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="small-container">
        <div className="row ">
          <div className="col-md-12">
            <div className="bg my-bots">
              <div className="work-flex">
                <div className="work">
                  <h4>
                    <i className="fa-solid fa-building" /> Baker Enterprises
                  </h4>
                </div>
                <div className="fields">
                  <a href="#" className="merge-btn">
                    To Combine
                  </a>
                </div>
              </div>
            </div>
            <div className="big-containe bg-1">
              <div className="container">
                <div className="same-as-head">
                  <ul className="maintabhead flex-end">
                    <li
                      className={`tablink ${
                        activeTab === "Timeline" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Timeline", e)}
                      id="defaultOpen"
                      style={{
                        borderBottom:
                          activeTab === "Timeline" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Timeline")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Information" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Information", e)}
                      style={{
                        borderBottom:
                          activeTab === "Information"
                            ? "2px solid #f06522"
                            : "",
                      }}
                    >
                      {t("Information")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Working Order" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Working Order", e)}
                      style={{
                        borderBottom:
                          activeTab === "Working Order"
                            ? "2px solid #f06522"
                            : "",
                      }}
                    >
                      {t("Working Order")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Quotes" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Quotes", e)}
                      style={{
                        borderBottom:
                          activeTab === "Quotes" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Quotes")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Invoice" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Invoice", e)}
                      style={{
                        borderBottom:
                          activeTab === "Invoice" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Invoice")}
                    </li>

                    <li
                      className={`tablink ${
                        activeTab === "Document" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Document", e)}
                      style={{
                        borderBottom:
                          activeTab === "Document" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Document")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Photos" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Photos", e)}
                      style={{
                        borderBottom:
                          activeTab === "Photos" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("Photos")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "CheckList" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("CheckList", e)}
                      style={{
                        borderBottom:
                          activeTab === "CheckList" ? "2px solid #f06522" : "",
                      }}
                    >
                      {t("CheckList")}
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Standard tasks" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Standard tasks", e)}
                      style={{
                        borderBottom:
                          activeTab === "Standard tasks"
                            ? "2px solid #f06522"
                            : "",
                      }}
                    >
                      {t("Standard tasks")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="big-containe big-containe-padding">
              <div className="row">
                <div className="col-md-4">
                  <div className="">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className=" Institution-grid-2 bg  ">
                          <div className="d-flex justify-content-between align-items-center general">
                            <h4>Details</h4>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#add-article"
                              style={{ color: "black" }}
                            >
                              {" "}
                              <i className="fa fa-pencil" />
                            </a>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="label-names">Name</span>
                            <span className="label-input">Yash</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="label-names">
                              Street & house number.
                            </span>
                            <span className="label-input">Webmobril </span>
                          </div>

                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="label-names">Postcode + city</span>
                            <span className="label-input">Noida</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="Institution-grid-2 bg">
                          <div className="d-flex justify-content-between align-items-center general">
                            <h4>Contact</h4>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="label-names">Contact</span>
                            <span className="label-input">Mr.Karel De Wit</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="label-names">Phone number</span>
                            <span className="label-input">0612345678</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="label-names">Email</span>
                            <span className="label-input">
                              kareldewit@gmail.com
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="Institution-grid-2 bg">
                          <div className="d-flex justify-content-between align-items-center general">
                            <h4>Client</h4>
                          </div>
                          <hr />
                          <p className="ah-p">
                            {" "}
                            <a href="">Mr. Abhinav Goyal</a>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="Institution-grid-2 bg">
                          <div className="d-flex justify-content-between align-items-center general">
                            <h4>Sublocations &amp; Objects</h4>
                            <a
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#add-order"
                              style={{ color: "black" }}
                            >
                              {" "}
                              <i className="fa-solid fa-plus" />{" "}
                            </a>
                          </div>
                          <hr />
                          <div className="input-1">
                            <input
                              type="text"
                              placeholder="To Search"
                              className="w-100"
                            />
                          </div>
                          <p className="ah-p mt-2">
                            <a>
                              {" "}
                              <i className="fas fa-cube cr-browser-location-icon" />{" "}
                              City mall{" "}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="Institution-grid-2 bg">
                          <div className="d-flex justify-content-between align-items-center general">
                            <h4>Card</h4>
                          </div>
                          <hr />
                          <div className="map">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2773037.0516941547!2d-123.12484735946003!3d47.254842973530195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485e5ffe7c3b0f9%3A0x944278686c5ff3ba!2sWashington%2C%20USA!5e0!3m2!1sen!2sin!4v1622131495660!5m2!1sen!2sin"
                              width="100%"
                              height={200}
                              style={{ border: 0 }}
                              allowFullScreen=""
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div
                    id="Timeline"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Timeline" ? "block" : "none",
                    }}
                  >
                    <div id="parent">
                      <div id="parent ">
                        <div className="menu border">
                          <div className="d-flex gap-4 p-2 m-0">
                            <button
                              className={`tablinks ${
                                actives === "MakeNote" ? "active" : ""
                              }`}
                              onClick={() => handle("MakeNote")}
                            >
                              <i className="fa fa-book" /> Make note
                            </button>
                            <button
                              className={`tablinks ${
                                actives === "NewAction" ? "active" : ""
                              }`}
                              onClick={() => handle("NewAction")}
                            >
                              <i className="fa fa-check-square" /> New action
                            </button>
                            <button
                              className={`tablinks ${
                                actives === "SendEmail" ? "active" : ""
                              }`}
                              onClick={() => handle("SendEmail")}
                            >
                              <i className="fa fa-envelope" /> Send email
                            </button>
                          </div>
                        </div>
                        <div className="tabs">
                          <div
                            className={`tab tabv ${
                              actives === "MakeNote" ? "active" : ""
                            }`}
                          >
                            <div className="input-1 pt-4 px-2">
                              <textarea
                                className="input-group"
                                style={{ padding: "9px" }}
                                // value={notes}
                                // onChange={handleNoteChange}
                                placeholder="Type your note here..."
                              />
                            </div>
                            <div className="d-flex gap-3 justify-content-end mt-4">
                              <a className="add btn-danger px-2">Cancel</a>
                              <a className="add btn-success px-2">Save</a>
                            </div>
                          </div>
                          <div
                            className={`tab tabv ${
                              actives === "NewAction" ? "active" : ""
                            }`}
                          >
                            <div className="row px-2">
                              <div className="input-1 pt-4 px-2">
                                <textarea
                                  className="input-group"
                                  style={{ padding: "9px" }}
                                  // value={notes}
                                  // onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Descrition...."
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  placeholder="Employee"
                                  className="first-inp"
                                />
                              </div>
                              <div className="col-md-6">
                                <input type="date" className="first-inp" />
                              </div>
                              <div className="col-md-12 mt-2">
                                <label>Responsible</label>
                                <textarea
                                  className="input-group"
                                  style={{ padding: "9px" }}
                                  // value={actionNotes}
                                  // onChange={(e) => setActionNotes(e.target.value)}
                                  placeholder="Type your action note here..."
                                />
                              </div>
                              <div className="d-flex gap-3 justify-content-end mt-4">
                                <a className="add btn-danger px-2">Cancel</a>
                                <a className="add btn-success px-2">Save</a>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`tab tabv ${
                              actives === "SendEmail" ? "active" : ""
                            }`}
                          >
                            <div className="input-1 pt-4 px-2">
                              <input className="form-control w-100"></input>
                            </div>
                            <div className="input-1 pt-4 px-2">
                              <input className="form-control w-100"></input>
                            </div>
                            <div className="input-1 pt-4 px-2">
                              <textarea
                                className="input-group"
                                style={{ padding: "9px" }}
                                placeholder="Type your email here..."
                              />
                            </div>
                            <div class="mt-4">
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                              />
                            </div>
                            <div className="d-flex gap-3 justify-content-end mt-4">
                              <a className="add btn-danger px-2">Cancel</a>
                              <a className="add btn-success px-2">Save</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="same-as-head tabinner">
                      <ul className="tab">
                        <li
                          className={`tablinks ${
                            activestabs === "Everything" ? "active" : ""
                          }`}
                          onClick={(event) =>
                            handleTabClick("Everything", event)
                          }
                          id="defaultOpen"
                        >
                          Everything
                        </li>
                        <li
                          className={`tablinks ${
                            activestabs === "Update" ? "active" : ""
                          }`}
                          onClick={(event) => handleTabClick("Update", event)}
                        >
                          Update
                        </li>
                        <li
                          className={`tablinks ${
                            activestabs === "Notes" ? "active" : ""
                          }`}
                          onClick={(event) => handleTabClick("Notes", event)}
                        >
                          Notes
                        </li>
                        <li
                          className={`tablinks ${
                            activestabs === "Action" ? "active" : ""
                          }`}
                          onClick={(event) => handleTabClick("Action", event)}
                        >
                          Action
                        </li>
                        <li
                          className={`tablinks ${
                            activestabs === "Email" ? "active" : ""
                          }`}
                          onClick={(event) => handleTabClick("Email", event)}
                        >
                          Emails
                        </li>
                      </ul>
                    </div>
                    <div
                      id="Everything"
                      className="tabcontentt"
                      style={{
                        display:
                          activestabs === "Everything" ? "block" : "none",
                      }}
                    >
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div className="Institution-grid-2 bg">
                          {/* <div className="submenu">
          <ul>
            {status.length > 0 ? (
              status.map((status) => (
                <li className="border-inn" key={status.id}>
                  <div className="roundd category-button">
                    <p>{status.status}</p>
                    <br />
                    <p>{new Date(status.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border-inn">No Status</li>
            )}
          </ul>
        </div> */}
                        </div>
                      )}
                    </div>
                    <div
                      id="Update"
                      className="tabcontentt"
                      style={{
                        display: activestabs === "Update" ? "block" : "none",
                      }}
                    >
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div className="Institution-grid-2 bg">
                          {/* <div className="submenu">
          <ul>
            {status.length > 0 ? (
              status.map((status) => (
                <li className="border-inn" key={status.id}>
                  <div className="roundd category-button">
                    <p>{status.status}</p>
                    <br />
                    <p>{new Date(status.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border-inn">No Status</li>
            )}
          </ul>
        </div> */}
                        </div>
                      )}
                    </div>
                    <div
                      id="Action"
                      className="tabcontentt"
                      style={{
                        display: activestabs === "Action" ? "block" : "none",
                      }}
                    >
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div className="Institution-grid-2 bg">
                          {/* <div className="submenu">
          <ul>
            {status.length > 0 ? (
              status.map((status) => (
                <li className="border-inn" key={status.id}>
                  <div className="roundd category-button">
                    <p>{status.status}</p>
                    <br />
                    <p>{new Date(status.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border-inn">No Status</li>
            )}
          </ul>
        </div> */}
                        </div>
                      )}
                    </div>
                    <div
                      id="Notes"
                      className="tabcontentt"
                      style={{
                        display: activestabs === "Notes" ? "block" : "none",
                      }}
                    >
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div className="Institution-grid-2 bg">
                          {/* <div className="submenu">
          <ul>
            {status.length > 0 ? (
              status.map((status) => (
                <li className="border-inn" key={status.id}>
                  <div className="roundd category-button">
                    <p>{status.status}</p>
                    <br />
                    <p>{new Date(status.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border-inn">No Status</li>
            )}
          </ul>
        </div> */}
                        </div>
                      )}
                    </div>
                    <div
                      id="Emails"
                      className="tabcontentt"
                      style={{
                        display: activestabs === "Emails" ? "block" : "none",
                      }}
                    >
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div className="Institution-grid-2 bg">
                          {/* <div className="submenu">
          <ul>
            {status.length > 0 ? (
              status.map((status) => (
                <li className="border-inn" key={status.id}>
                  <div className="roundd category-button">
                    <p>{status.status}</p>
                    <br />
                    <p>{new Date(status.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border-inn">No Status</li>
            )}
          </ul>
        </div> */}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    id="Location"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Location" ? "block" : "none",
                    }}
                  >
                    <div className="Institution-grid-2 bg">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="input-1 w-100">
                            <input
                              type="text"
                              placeholder="To Search"
                              className="w-100"
                            />
                          </div>
                          <div className="location-div mt-4">
                            <p>
                              <a>
                                {" "}
                                <i className="fas fa-map-marker-alt" /> Near
                                news ankar colony 12, Gaziabad (Gaziabad){" "}
                              </a>
                            </p>
                            <p>
                              <a>
                                {" "}
                                <i className="fas fa-cube cr-browser-location-icon" />{" "}
                                City mall{" "}
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Working Order"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Working Order" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue=""
                                          id="flexCheckDefault"
                                        />
                                      </div>
                                    </th>
                                    <th scope="col">Coupon no.</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Craftsman</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <th scope="col">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue=""
                                          id="flexCheckDefault"
                                        />
                                      </div>
                                    </th>
                                    <td>W00001</td>
                                    <td>Decoration</td>
                                    <td>Robert van Drechts</td>
                                    <td>24-8-2024</td>
                                    <td>
                                      <a
                                        href=""
                                        className="progress-11 btn-success"
                                      >
                                        Concept
                                      </a>
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
                  <div
                    id="Offers"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Offers" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">Quotation number</th>
                                    <th scope="col">Quotation date</th>
                                    <th scope="col">Reference</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <th scope="col">concept #000022 </th>
                                    <td>August 26, 2024</td>
                                    <td>Quotation</td>
                                    <td>€0.00</td>
                                    <td>
                                      <a href="" className="progress-11">
                                        Concept
                                      </a>
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
                  <div
                    id="Invoice"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Invoice" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">Invoice number</th>
                                    <th scope="col">Invoice date</th>
                                    <th scope="col">Reference</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <td scope="col">No invoices found</td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Document"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Document" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">Private</th>
                                    <th scope="col">File name</th>
                                    <th scope="col">Date added</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <td scope="col">No documents added yet</td>
                                    <td> </td>
                                    <td> </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" col-md-12">
                        <div className="file-upload">
                          <label
                            htmlFor="upload"
                            className="file-upload__label"
                          >
                            + Drag/ select document
                          </label>
                          <input
                            id="upload"
                            className="file-upload__input"
                            type="file"
                            name="file-upload"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Quotes"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Quotes" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">Quotation number</th>
                                    <th scope="col">Quotation date</th>
                                    <th scope="col">Reference</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <th scope="col">concept #000022 </th>
                                    <td>August 26, 2024</td>
                                    <td>Quotation</td>
                                    <td>€0.00</td>
                                    <td>
                                      <a href="" className="progress-11">
                                        Concept
                                      </a>
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
                  <div
                    id="Photos"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Photos" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">File name</th>
                                    <th scope="col">Date added</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <td scope="col">No photos added yet</td>
                                    <td> </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="CheckList"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "CheckList" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">Checklist</th>
                                    <th scope="col">Work order</th>
                                    <th scope="col">Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <td scope="col">No checklists added yet</td>
                                    <td> </td>
                                    <td> </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Standard tasks"
                    className="tabcontentt"
                    style={{
                      display:
                        activeTab === "Standard tasks" ? "block" : "none",
                    }}
                  >
                    <div className="row justify-content-center mt-4">
                      <div className="col-12">
                        <div className="card shadow-2-strong">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th scope="col">Task to be performed</th>
                                    <th scope="col"> Linked checklist</th>
                                    <th>
                                      <a
                                        style={{ color: "black" }}
                                        onClick={openModal}
                                      >
                                        {" "}
                                        <i className="fa-solid fa-plus" />{" "}
                                      </a>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-pdf-template"
                                    className="sale-padding my-bot"
                                  >
                                    <td scope="col">
                                      No default tasks added yet
                                    </td>
                                    <td> </td>
                                    <td> </td>
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
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade  ${ModalOpen ? "show" : ""}`}
        id="add-article"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-article"
        style={{ display: ModalOpen ? "block" : "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-content1">
            <div className="modal-header">
              <h5 className="modal-title" id="add-article">
                Standard task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div id="" className="" style={{ display: "block" }}>
              <div className="modal-body">
                <div className="client-form">
                  <label className="mb-2">Project type</label>
                  <select className="first-inp mt-0 mb-2">
                    <option>---</option>
                  </select>
                </div>
                <div className="client-form">
                  <label className="mb-2">Type of service</label>
                  <select className="first-inp mt-0 mb-2">
                    <option>---</option>
                  </select>
                </div>
                <div className="client-form">
                  <label className="mb-2">Task description*</label>
                  <input
                    type="text"
                    placeholder=""
                    className="first-inp mt-0 mb-2 "
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">Linked checklist</label>
                  <select className="first-inp mt-0 mb-2">
                    <option>---</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <a href="" type="button" className="btn btn-primary">
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal fade  ${isModalOpen ? "show" : ""}`}
        id="add-articlea"
        data-bs-backdrop="statica"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-article"
        style={{ display: isModalOpen ? "block" : "none" }}
        aria-modal="true"
        role="dialog"
      ></div>
    </div>
  );
}

export default SubId;
