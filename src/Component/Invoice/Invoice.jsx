import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import Loader from "../Loader/Loader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Invoice() {
  const [invoice, setInvoice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoiced, setSelectedInvoiced] = useState("");
  const [searchClient, setSearchClient] = useState("");
  const [filename, setFilename] = useState("Invoices");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);
  const [currentStatus, setCurrentStatus] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = (id, status) => {
    const invoices = invoice.find((item) => item.id === id);
    setSelectedInvoiced(invoices);
    setCurrentStatus(status);
    setIsModalOpen(true);
  };
  console.log(selectedInvoiced);
  
  // const fetchFilteredData = async (searchClient = null) => {
  //   try {
  //     setIsLoading(true);
  //     const token = localStorage.getItem("WorkMen-Token");
  //     let url = `client/invoices/?lang=${selectedLanguage}`;
  //     if (searchClient) {
  //       url += `&search=${searchClient}`;
  //     }
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response) {
  //       setInvoice(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error(t("error Fetching Data"), error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchFilteredData(searchClient);
  // }, [searchClient, selectedLanguage, t]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        console.error(t("error: No token found"));
        return;
      }

      try {
        setIsLoading(true);
        const url = searchClient
          ? `client/invoices/?search=${searchClient}`
          : `client/invoices/`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.data) {
          setInvoice(response.data.data);
        } else {
          console.error(t("error: Invalid response structure"), response);
        }
      } catch (error) {
        console.error(t("error Fetching Data"), error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchClient, t]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = invoice.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(
    (Array.isArray(invoice) ? invoice.length : 0) / postsPerPage
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

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(invoice);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataBlob, `${filename}.xlsx`);
  };

  const [actives, setActives] = useState("MakeNote");
  const [activeTab, setActiveTab] = useState("Quotation");
  const [activestabs, setActiveStabs] = useState("Everything");

  const [notes, setNotes] = useState([]);
  const [emails, setEmails] = useState([]);
  const [mails, setMails] = useState([]);
  const [note, setNote] = useState([]);
  const [actions, setActions] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [responsibleNotes, setResponsibleNotes] = useState([]);
  const [actionDate, setActionDate] = useState([]);
  const [sendTo, setSendTo] = useState([]);
  const [subject, setSubject] = useState([]);
  const [message, setMessage] = useState([]);
  const [mailFile, setMailFile] = useState([]);

  const openPage = (pageName, event) => {
    setActiveTab(pageName);
  };
  const handleTabClick = (tabName, event) => {
    setActiveStabs(tabName);
  };

  const handle = (tabName) => {
    setActives(tabName);
  };
  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <a className="actives">Invoice</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="work-flex">
          <div className="work">
            <h4>{t("Invoices")}</h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input
                type="text"
                placeholder="Search with Project no"
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
              />
            </div>
            <div className="input-1">
              <select>
                <option value="">All Statuses</option>
                <option value="">Concept</option>
                <option value="">Open</option>
                <option value="">Expired</option>
                <option value="">Paid</option>
                <option value="">Rememebred</option>
              </select>
            </div>
            <div className="input-1">
              <select>
                <option>All those Responsibles</option>
                <option>Aman Sinha</option>
              </select>
            </div>
            <a
              className="add"
              onClick={exportToExcel}
              style={{ cursor: "pointer" }}
            >
              {t("Export")}
            </a>
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
                                <th scope="col">{t("Project No")}</th>
                                <th scope="col">{t("Date")}</th>
                                <th scope="col">{t("Reference")}</th>
                                <th scope="col">{t("Client")}</th>
                                <th scope="col">{t("Project")}</th>
                                <th scope="col">{t("Amount")}</th>
                                <th scope="col">{t("Status")}</th>
                              </tr>
                            </thead>
                            <tbody className="myies">
                              {isLoading ? (
                                <tr>
                                  <td colSpan="6" className="text-center">
                                    <Loader />
                                  </td>
                                </tr>
                              ) : currentPosts.length > 0 ? (
                                currentPosts.map((item) => (
                                  <tr className="my-bot" key={item.id}>
                                    <td className="pd-right">
                                      <a className="project">
                                        {item.invoice_number}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {item?.invoice_date}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {item?.reference}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {item?.first_name} {item?.last_name}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {item?.project_name}
                                      </a>
                                    </td>
                                      <td>
                                        
                                      </td>
                                    <td className="pd-right">
                                      <a
                                        className={
                                          item.invoice_status.toLowerCase() ===
                                          "concept"
                                            ? "progress"
                                            : item.invoice_status.toLowerCase() ===
                                              "remembred"
                                            ? "progresblue progress-1"
                                            : item.invoice_status.toLowerCase() ===
                                              "paid"
                                            ? "progresgreen progress-1"
                                            : item.invoice_status.toLowerCase() ===
                                              "open"
                                            ? "progresorange progress-1"
                                            : item.invoice_status.toLowerCase() ===
                                              "expired"
                                            ? "progressred progress-1"
                                            : ""
                                        }
                                        onClick={() => {
                                          console.log(
                                            "Item invoice_status:",
                                            item.invoice_status
                                          );
                                          console.log("Item ID:", item.id);
                                          openModal(item.id, item.invoice_status);
                                        }}
                                      >
                                        {item.invoice_status.charAt(0).toUpperCase() +
                                          item.invoice_status.slice(1).toLowerCase()}
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="text-center">
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

      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        // className={`modal fade show`}
        id="add-pdf-template"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-pdf-template"
        aria-hidden={!isModalOpen}
        style={{ display: isModalOpen ? "block" : "none" }}
        // style={{ display: "block" }}
      >
        <div className="modal-dialog pdfmodal">
          <div className="modal-content">
            <div className="modal-header border-0 gap-3">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="steps mb-4">
              {currentStatus === "concept" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Open" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Expired" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Expired</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Remembred" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Expired</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Remembred</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Paid" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Remembred</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Paid</div>
                  </div>
                </React.Fragment>
              )}
            </div>

            <div className="big-container bg-1">
              <div className="container">
                <div className="same-as-head d-flex justify-content-between align-items-center">
                  <ul className="maintabhead">
                    <li
                      className="tablink active"
                      style={{ borderBottom: "2px solid #f06522" }}
                    >
                      Invoice
                    </li>
                  </ul>
                  <ul className="maintabhead">
                    {currentStatus === "Concept" && (
                      <>
                        <a className="add adda">Create credit Invoice</a>
                        <a className="add">Send Invoice</a>
                      </>
                    )}
                    {currentStatus === "Open" && (
                      <a className="add adda">Paid</a>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div
                    id="Invoice"
                    className="tabcontentt"
                    // style={{ display: isModalOpen ? "block" : "none" }}
                    style={{ display: "block" }}
                  >
                    <div className="Institution-grid-2 bg">
                      <div className="compan"></div>
                      <hr />
                      <div className="row">
                        <div className=" col-md-8">
                          <div className="">
                            <img
                              src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                              // className="w-100"
                              alt="Company Logo"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-right">
                            <p>Cooling system</p>
                            <p>Village street 12 </p>
                            <p>1012ab Amsterdam</p>
                            <p>jim@koelemaninstallaties.ni</p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-left">
                            <p>
                              {selectedInvoiced?.first_name}
                              {selectedInvoiced?.last_name}
                            </p>
                            <p>{selectedInvoiced?.email}</p>
                            <p>{selectedInvoiced?.phoneno}</p>
                            <p>
                              {selectedInvoiced?.address},
                              {selectedInvoiced?.location}
                            </p>
                            <p>{selectedInvoiced?.zipcode}</p>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-left">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4>Invoice Concept W{invoice?.data?.orderno}</h4>
                              <div className="invoice-date">
                                <span className="d-block">
                                  Invoice date: 27-10-2022{" "}
                                  <i className="fa fa-pencil " />
                                </span>
                                <span className="">
                                  Expiration: 26-11-2022{" "}
                                  <i className="fa fa-pencil " />
                                </span>
                              </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                              <p>Refrence: </p>
                              <p>
                                {selectedInvoiced?.reference}

                                {/* <i className="fa fa-pencil " /> */}
                              </p>
                            </div>
                            <div className="d-flex">
                              <p>Work Location: </p>
                              <p>{invoice?.data?.worklocation}</p>
                            </div>
                            <div className="d-flex">
                              <p>Amsterdam Manager: </p>
                              <p>
                                Jim koeleman <i className="fa fa-pencil " />
                              </p>
                            </div>
                            <div className="d-flex">
                              <p>Location / brand: </p>
                              <p>
                                {selectedInvoiced?.location}
                                {/* <i className="fa fa-pencil " /> */}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="text-left">
                            <div className="d-flex justify-content-between align-items-center">
                              <h4>
                                Activities on {selectedInvoiced?.date} (W
                                {selectedInvoiced?.orderno})
                              </h4>
                            </div>
                            <hr />
                            <p>Kettel does not heat up, gladly disolve</p>
                            <div className="d-flex justify-content-between">
                              <span>Number of Descriptions</span>
                              <div className="d-flex gap-3">
                                <span>Amount</span>
                                <span>Total</span>
                                <span>Vat</span>
                                <i className="fa fa-pencil" />
                              </div>
                            </div>
                            {selectedInvoiced?.article?.map((item) => (
                              <div
                                className="d-flex justify-content-between mt-3"
                                key={item.id}
                              >
                                <div className="d-flex gap-3">
                                  <span>{item.item}</span>
                                  <span>{item.name}</span>
                                  <span>{item.article_number}</span>
                                </div>
                                <div className="d-flex gap-3">
                                  <span>${item.price}</span>
                                  <span>${item.total_price}</span>
                                  <span>21%</span>
                                  <i className="fa fa-pencil" />
                                </div>
                              </div>
                            ))}
                            <div className="text-right total mt-3">
                              <span>Subtotal: $1,346.93</span>
                            </div>
                            <div className="text-right total mt-3">
                              <span>21% VAT: $282.86</span>
                            </div>
                            <div className="text-right total mt-3">
                              <span>Total: $1,629.93</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div id="parent">
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
                          <a
                            className="add btn-danger px-2"
                            // onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a
                            className="add btn-success px-2"
                            // onClick={NotesSave}
                          >
                            Save
                          </a>
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
                              // value={actions}
                              // onChange={(e) => setActions(e.target.value)}
                              placeholder="Description...."
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              placeholder="Employee"
                              className="first-inp"
                              // value={employee}
                              // onChange={(e) => setEmployee(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="date"
                              className="first-inp"
                              // value={actionDate}
                              // onChange={(e) => setActionDate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-12 mt-2">
                            <label>Responsible</label>
                            <textarea
                              className="input-group"
                              style={{ padding: "9px" }}
                              // value={responsibleNotes}
                              // onChange={(e) =>
                              //   setResponsibleNotes(e.target.value)
                              // }
                              placeholder="Type your action note here..."
                            />
                          </div>
                          <div className="d-flex gap-3 justify-content-end mt-4">
                            <a
                              className="add btn-danger px-2"
                              // onClick={toggleForm}
                            >
                              Cancel
                            </a>
                            <a
                              className="add btn-success px-2"
                              // onClick={ActionSave}
                            >
                              Save
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`tab tabv ${
                          actives === "SendEmail" ? "active" : ""
                        }`}
                      >
                        <div className="input-1 pt-4 px-2">
                          <input
                            className="form-control w-100"
                            placeholder="To..."
                            // value={sendTo}
                            // onChange={(e) => setSendTo(e.target.value)}
                          />
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <input
                            className="form-control w-100"
                            placeholder="Subject"
                            // value={subject}
                            // onChange={(e) => setSubject(e.target.value)}
                          />
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <textarea
                            className="input-group"
                            style={{ padding: "9px" }}
                            placeholder="Message"
                            // value={message}
                            // onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                        <div className="mt-4">
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            // onChange={(e) => setMailFile(e.target.files[0])}
                          />
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-4">
                          <a
                            className="add btn-danger px-2"
                            // onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a
                            className="add btn-success px-2"
                            // onClick={EmailSave}
                          >
                            Save
                          </a>
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
                        onClick={(event) => handleTabClick("Everything", event)}
                        id="defaultOpen"
                      >
                        Everything
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
                          activestabs === "Remark" ? "active" : ""
                        }`}
                        onClick={(event) => handleTabClick("Remark", event)}
                      >
                        External Exployee Remark
                      </li>
                    </ul>
                  </div>
                  <div
                    id="Everything"
                    className="tabcontentt"
                    style={{
                      display: activestabs === "Everything" ? "block" : "none",
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
            {Array.isArray(note) && note.length > 0 ? (
              note.map((noteItem) => (
                <li className="border-inn" key={noteItem.id}>
                  <div className="roundd category-button">
                    <p>{noteItem.notes}</p>
                    <br />
                    <p>{new Date(noteItem.created_at).toLocaleString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="border-inn">No Notes</li>
            )}
          </ul>
        </div> */}
                      </div>
                    )}
                  </div>
                  <div
                    id="Remark"
                    className="tabcontentt"
                    style={{
                      display: activestabs === "Remark" ? "block" : "none",
                    }}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="Institution-grid-2 bg">
                        {/* <div className="submenu">
          <ul>
            {homeOrder?.remark?.length > 1 ? (
              homeOrder?.remark.map((remark) => (
                <li className="border-inn" key={status.id}>
                  <div className="roundd category-button">
                    <p>{remark.remark}</p>
                    <br />
                  </div>
                </li>
              ))
            ) : (
              <li className="border-inn">No Remark</li>
            )}
          </ul>
        </div> */}
                      </div>
                    )}
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

export default Invoice;
