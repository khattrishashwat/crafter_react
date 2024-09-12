import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../Loader/Loader";

function Sale() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [quot, setQuot] = useState("");
  const [quots, setQuots] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [isPopupActive, setPopupActive] = useState(false);
  const [articles, setArticles] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [actives, setActives] = useState("MakeNote");
  const [activeTab, setActiveTab] = useState("Quotation");
  const [activestabs, setActiveStabs] = useState("Everything");
  const [formOpen, setFormOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [isResponsibleOpen, setIsResponsibleOpen] = useState(false);
  const [isExpOpen, setIsExpOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);
  const [isReferentieOpen, setIsReferentieOpen] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);

  const [headerText, setHeaderText] = useState("Add a header");
  const [footerText, setFooterText] = useState("Add a footer");
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState("Single Order");
  const [workLocation, setWorkLocation] = useState("Default Location");
  const [responsible, setResponsible] = useState("Robert van Drechten");
  const [establishmentBrand, setEstablishmentBrand] = useState("Esined");
  const [saleId, setSaleId] = useState("");

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
  const [articleNames, setArticleNames] = useState([
    // Populate with actual article data
    { id: "1", name: "Article 1", article_number: "12345" },
    { id: "2", name: "Article 2", article_number: "67890" },
  ]);

  const [clients, setClients] = useState({
    client: [],
  });

  const togglePopup = (status) => {
    setCurrentStatus(status);
    setPopupActive(true);
  };

  const openModal = async (id, status) => {
    const quotation = quot.find((item) => item.id === id);
    setSelectedQuotation(quotation);
    setSaleId(id);
    setCurrentStatus(status);
    setIsModalOpen(true);
  };
  console.log("idsss", saleId);
  console.log("news -.", selectedQuotation);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closePopup = () => {
    setPopupActive(false);
  };

  const openPage = (pageName, event) => {
    setActiveTab(pageName);
  };
  const handleTabClick = (tabName, event) => {
    setActiveStabs(tabName);
  };

  const handle = (tabName) => {
    setActives(tabName);
  };
  const hand = (event) => {
    event.preventDefault();
    setIsFormOpen(false);
  };

  const handleArticletoggle = () => {
    //  if (showArticleForm) {
    //    setShowArticleForm(false);
    //    setFoData([
    //      {
    //        id: "",
    //        name: "",
    //        article_number: "",
    //        quantity: "",
    //        selling_price: "",
    //        vat_percentage: "",
    //      },
    //    ]);
    //  }
    setShowArticleForm(!showArticleForm);
  };
  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted with data:", foData);
    setShowArticleForm(false);
  };
  const ArticleClean = (e) => {
    setShowArticleForm(false);
    setFoData([
      {
        id: "",
        name: "",
        article_number: "",
        quantity: "",
        selling_price: "",
        vat_percentage: "",
      },
    ]);
  };
  const [foData, setFoData] = useState([
    {
      id: "",
      name: "",
      article_number: "",
      quantity: "",
      selling_price: "",
      vat_percentage: "",
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newFoData = [...foData];
    newFoData[index][name] = value;

    if (name === "id" || name === "name") {
      const selectedArticle = articles.find(
        (article) => article.id === parseInt(value) || article.name === value
      );
      if (selectedArticle) {
        newFoData[index] = {
          ...newFoData[index],
          id: selectedArticle.id.toString(),
          name: selectedArticle.name,
          article_number: selectedArticle.article_number,
          selling_price: selectedArticle.selling_price,
          vat_percentage: selectedArticle.vat_percentage,
        };
      }
    }

    setFoData(newFoData);
  };
  const addForm = () => {
    setFoData((prevData) => [
      ...prevData,
      {
        id: "",
        name: "",
        article_number: "",
        quantity: "",
        selling_price: "",
        vat_percentage: "11",
      },
    ]);
  };

  const removeForm = (index) => {
    setFoData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const toggleForm = () => setIsFormOpen(!isFormOpen);
  const toggleReferentie = () => setIsReferentieOpen(!isReferentieOpen);
  const toggleDelivery = () => setIsDeliveryOpen(!isDeliveryOpen);
  const toggleWork = () => setIsWorkOpen(!isWorkOpen);
  const toggleTarget = () => setIsTargetOpen(!isTargetOpen);
  const toggleResponsible = () => setIsResponsibleOpen(!isResponsibleOpen);
  const toggleBrand = () => setIsBrandOpen(!isBrandOpen);
  const toggleQuotation = () => setIsQuotationOpen(!isQuotationOpen);
  const toggleExpire = () => setIsExpOpen(!isExpOpen);
  const toggleHeader = () => setIsHeaderOpen(!isHeaderOpen);
  const toggleFooter = () => setIsFooterOpen(!isFooterOpen);

  {
    /*POST APIS */
  }
  const Quotation = async (values) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        throw new Error("No token found in localStorage.");
      }

      // Make the API request to create a quotation
      const response = await axios.post("workmen/quotation/", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming setSaleId is a state updater function
      setSaleId(response.data.data);

      fetchcustomer();

      // Toggle the popup with the sale ID (ensure togglePopup is defined and handles the ID correctly)
      // togglePopup(response.data.data); // Pass the response data or ID directly
    } catch (error) {
      console.error("Error during quotation request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `An error occurred: ${error.message}`,
      });
    }
  };

  const QuotationPtach = async (values) => {
    try {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        throw new Error("No token found in localStorage.");
      }

      const response = await axios.patch(
        `workmen/quotation/`,
        { ...values, id: saleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("patch", response.data);
    } catch (error) {
      console.error("Error during quotation request:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      company_name: formData.get("company_name"),
      client_name: formData.get("client_name"),
      reference: formData.get("reference"),
      delivery_method: formData.get("delivery_method"),
      work_location: formData.get("work_location"),
      target_date: formData.get("target_date"),
      responsible: formData.get("responsible"),
      establishmentBrand: formData.get("establishmentBrand"),
      quotation_date: formData.get("quotation_date"),
      expiration_date: formData.get("expiration_date"),
      header: formData.get("header"),
    };

    const fields = [
      "company_name",
      "client_name",
      "reference",
      "delivery_method",
      "work_location",
      "target_date",
      "created_by",
      "establishmentBrand",
      "quotation_date",
      "expiration_date",
      "header",
      "remark",
      "section_title",
      "section_description",
      "location",
      "sub_location",
    ];

    const dataApi = fields.reduce((acc, key) => {
      const value = formData.get(key);
      if (value !== null && value !== "" && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
    console.log("Form values =", dataApi);

    await QuotationPtach(dataApi);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("WorkMen-Token");
        const response = await axios.get(`workmen/user-list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const fetchcustomer = async () => {
    const token = localStorage.getItem("WorkMen-Token");

    try {
      let response;

      if (searchClient) {
        response = await axios.get(
          `workmen/quotation/?search=${searchClient}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        setIsLoading(true);
        response = await axios.get(`workmen/quotation/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setQuot(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching customer:",
        error.response || error.message
      );
    } finally {
      setIsLoading(false); // Ensure the loader is hidden
    }
  };

  useEffect(() => {
    fetchcustomer();
  }, [searchClient]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = quot.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(quot.length / postsPerPage);

  {
    /*-----Notes Gets & Post-------*/
  }

  const handleNoteChange = (e) => {
    console.log("e----", e);
    setNotes(e.target.value);
  };

  const NotesSave = async () => {
    if (!String(notes).trim()) {
      Swal.fire({
        icon: "warning",
        title: "Note is empty",
        text: "Please fill in the note before saving.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        throw new Error("No token found in localStorage.");
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("notes", notes);
      formData.append("sale", saleId);

      const response = await axios.post("workmen/sale-note/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (Array.isArray(response.data.data)) {
        setNote(response.data.data);
      } else {
        console.error("Response data is not an array");
      }

      // await fetchNotes();
      setNotes("");
    } catch (error) {
      console.error("Error during the save request:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchNotes = async () => {
  //   setIsLoading(true);
  //   const token = localStorage.getItem("WorkMen-Token");
  //   try {
  //     const response = await axios.get(`/workmen/notes/?=${saleId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response) {
  //       console.log("Note", response.data.data);
  //       setNote(response.data.data);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Error fetching data:", error.response.data.message);
  //     } else if (error.request) {
  //       console.error(
  //         "Error fetching data, no response received:",
  //         error.request
  //       );
  //     } else {
  //       console.error("Error setting up the request:", error.message);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!saleId) return;
  //   fetchNotes();
  // }, [saleId]);

  const ActionSave = async () => {
    if (!String(actions).trim()) {
      Swal.fire({
        icon: "warning",
        title: "Action is empty",
        text: "Please fill in the action before saving.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        throw new Error("No token found in localStorage.");
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("description", actions);
      formData.append("sale", saleId);
      formData.append("date", actionDate);
      formData.append("action_type", employee);
      formData.append("responsible", responsibleNotes);

      const response = await axios.post("workmen/sale-action/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (Array.isArray(response.data.data)) {
        setNote(response.data.data);
      } else {
        console.error("Response data is not an array");
      }

      setNotes("");
    } catch (error) {
      console.error("Error during the save request:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const EmailSave = async () => {
    try {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        throw new Error("No token found in localStorage.");
      }

      setIsLoading(true);

      const formData = new FormData();
      formData.append("sale", saleId);
      formData.append("send_to", sendTo);
      formData.append("subject", subject);
      formData.append("message", message);
      formData.append("mail_file", mailFile);

      const response = await axios.post("workmen/sale-mail/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (Array.isArray(response.data.data)) {
        setMails(response.data.data);
      } else {
        console.error("Response data is not an array");
      }

      setEmails("");
    } catch (error) {
      console.error("Error during the save request:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  {
    /**----------Delete---- */
  }

  const handleDelete = async (id, quots, setQuots) => {
    try {
      console.log("Deleting item with ID:", id);

      const token = localStorage.getItem("WorkMen-Token");
      await axios.delete(`workmen/quotation/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id },
      });

      const newData = quots.filter((item) => item.id !== id);
      setQuots(newData);

      setIsLoading(true);

      await fetchcustomer();
    } catch (error) {
      console.error("Error deleting item:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the item.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id, quots, setQuots) => {
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
        handleDelete(id, quots, setQuots);
      }
    });
  };

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/sale" className="activ">
                  Quotation
                </Link>
              </li>
              <li>
                <Link to="/saleorder">Order</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="work-flex">
          <div className="work">
            <h4>Quotations</h4>
          </div>
          {/* <div className="fields">
            <a className="add" onClick={() => Quotation({})}>
            
              <i className="fa-solid fa-plus" />
            </a>
          </div> */}
          <div className="fields">
            <a className="add" onClick={togglePopup}>
              <i className="fa-solid fa-plus" />
              &nbsp;&nbsp;Select Template
            </a>
            <div className="input-1">
              <input
                type="text"
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
                placeholder="To Search"
              />
            </div>
            <div className="input-1">
              <input
                type="date"
                id="s_date"
                name="s_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="input-1">
              <input
                type="date"
                id="e_date"
                name="e_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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

                <option value="1">Concept</option>
                <option value="2">Open</option>
                <option value="3">Expired</option>
                <option value="4">Lost</option>
                <option value="5">Won</option>
              </select>
            </div>
            <div className="input-1">
              <select>
                <option>All Responsibles</option>
                <option>Frmae Repair Alhra</option>
                <option>Jeffrey Casteleins</option>
                <option>Bjorn Goveia</option>
                <option>Alhra Frames</option>
                <option>Marcel ven dar vijin</option>
                <option>Philip ven dar vijin</option>
              </select>
            </div>
          </div>
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
                              <th scope="col">Quotation no.</th>
                              <th scope="col">Invoice</th>
                              <th scope="col">Reference</th>
                              <th scope="col">Client</th>
                              <th scope="col">Project</th>
                              <th scope="col">Location</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isLoading ? (
                              <tr className="sale-padding my-bot">
                                <td colSpan="8" className="text-center">
                                  <Loader />
                                </td>
                              </tr>
                            ) : currentPosts.length > 0 ? (
                              currentPosts.map((item, index) => (
                                <tr className="sale-padding my-bot" key={index}>
                                  <th scope="row" className="project">
                                    {item.quotation_no}
                                  </th>
                                  <td>{item.quotation_date}</td>
                                  <td>{item.expiration_date}</td>
                                  <td>{item.client_name}</td>
                                  <td>{item.project_name}</td>
                                  <td>
                                    {item.work_location?.substring(0, 20) +
                                      "......"}
                                  </td>
                                  <td>{item.total}</td>
                                  <td className="pd-right">
                                    <a
                                      className={
                                        item.status.toLowerCase() === "concept"
                                          ? "progress"
                                          : item.status.toLowerCase() === "loss"
                                          ? "progresblue progress-1"
                                          : item.status.toLowerCase() === "won"
                                          ? "progresgreen progress-1"
                                          : item.status.toLowerCase() === "open"
                                          ? "progresorange progress-1"
                                          : item.status.toLowerCase() ===
                                            "in progress"
                                          ? "progressyellow progress-1"
                                          : item.status.toLowerCase() ===
                                            "expire"
                                          ? "progressred progress-1"
                                          : ""
                                      }
                                      onClick={() => {
                                        console.log(
                                          "Item status:",
                                          item.status
                                        );
                                        console.log("Item ID:", item.id);
                                        openModal(item.id, item.status);
                                      }}
                                    >
                                      {item.status.charAt(0).toUpperCase() +
                                        item.status.slice(1).toLowerCase()}
                                    </a>
                                  </td>
                                  {/* <td>
                                    <i
                                      className="fa-solid fa-up-right-from-square"
                                      onClick={() =>
                                        openModal(item.quotation_no)
                                      }
                                    />
                                  </td> */}
                                  <td className="project">
                                    <i
                                      className="fa-solid fa-trash"
                                      onClick={() =>
                                        handleDeleteClick(
                                          item.id,
                                          quot,
                                          setQuot
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  No Quotation Found
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

      <div
        className={`modal ${isPopupActive ? "show" : ""}`}
        id="add-pdf-template"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-pdf-template"
        aria-modal="true"
        role="dialog"
        style={{ display: isPopupActive ? "block" : "none" }}
      >
        <div className="modal-dialog pdfmodal">
          <div className="modal-content">
            <div className="modal-header border-0 gap-3">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closePopup}
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
              {currentStatus === "open" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "expire" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">expire</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "lose" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Expire</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Lose</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "incomplete" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Clanned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Incomplete</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "won" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Expire</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Lose</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Won</div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="big-containe bg-1">
              <div className="container">
                <div className="same-as-head d-flex justify-content-between align-items-center">
                  <ul className="maintabhead">
                    <li
                      className={`tablink ${
                        activeTab === "Quotation" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Quotation", e)}
                      id="defaultOpen"
                      style={{
                        borderBottom:
                          activeTab === "Quotation" ? "2px solid #f06522" : "",
                      }}
                    >
                      Quotation
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Documents" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Documents", e)}
                      style={{
                        borderBottom:
                          activeTab === "Documents" ? "2px solid #f06522" : "",
                      }}
                    >
                      Document
                    </li>
                  </ul>
                  <ul className="maintabhead">
                    <a className="add">Send Quotes</a>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div
                    id="Home"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Quotation" ? "block" : "none",
                    }}
                  >
                    <div className="row">
                      <div>
                        <div className="Institution-grid-2 bg">
                          <div className="compan compana ">
                            <a className="btn-primary position-relative">
                              Download PDF
                            </a>
                            <a className="btn-primary position-relative">
                              Duplicate
                            </a>
                            <a className="btn-primary position-relative">
                              Create Template
                            </a>
                            {/* <select className="no-select2 custom-select cr-select form-select">
                              <option>Prijzen weergave</option>
                              <option>Incl. BTW weergeven</option>
                              <option> Excl. BTW weergeven </option>
                            </select>
                            <select className="no-select2 custom-select cr-select form-select">
                              <option>Prijzen weergave</option>
                              <option>Incl. BTW weergeven</option>
                              <option> Excl. BTW weergeven </option>
                            </select> */}
                          </div>
                          <hr />
                          <div className="row">
                            <div className=" col-md-8">
                              <div className="">
                                <img
                                  src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                                  className="w-100"
                                  alt="Company Logo"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text-right">
                                <a className="Esined">
                                  Esined <i className="fa fa-pencil" />
                                </a>
                                <p>admin@crafter.com</p>
                              </div>
                            </div>
                            <div className="col-md-12 mt-5">
                              <div className="text-left">
                                <a className="Esined" onClick={toggleForm}>
                                  Recipient <i className="fa fa-pencil" />
                                </a>
                              </div>
                            </div>

                            {isFormOpen && (
                              <div className="data form-field-open">
                                <form onSubmit={handleSave}>
                                  <div className="customer_records">
                                    <div className="input-1 work-order input-grid">
                                      <label>Company Name</label>
                                      <select name="company_name">
                                        <option
                                          value="Company Name"
                                          className="select-selected"
                                        >
                                          Company Name
                                        </option>
                                        <option value="Object1">Object1</option>
                                        <option value="Object2">Object2</option>
                                      </select>
                                    </div>

                                    <div className="input-1 work-order input-grid mt-3 mb-4">
                                      <label>Contact Person</label>
                                      <select name="client_name">
                                        <option
                                          value="Contact Person"
                                          className="select-selected"
                                        >
                                          Contact Person
                                        </option>
                                        {clients.client.map((client) => (
                                          <option
                                            key={client.id}
                                            value={client.id}
                                          >
                                            {client.user}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="d-flex gap-3 justify-content-end">
                                    <a
                                      className="add btn-danger px-2"
                                      onClick={toggleForm}
                                    >
                                      Cancel
                                    </a>
                                    <button
                                      type="submit"
                                      className="add btn-success px-2"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            )}
                            <div className="row">
                              <div className="col-md-7">
                                <div className="text-left">
                                  <h4>Offerte concept #000022</h4>
                                  <hr />

                                  {/* Referentie Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Referentie:</p>
                                    <p
                                      className="text-right"
                                      onClick={toggleReferentie}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </p>
                                  </div>

                                  {isReferentieOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="reference"
                                            name="reference"
                                            className="form-control w-100"
                                            placeholder="Enter Reference"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleReferentie}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Delivery Method Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Delivery Method:</p>
                                    <p>
                                      {deliveryMethod}{" "}
                                      <span
                                        className="text-right float-end"
                                        onClick={toggleDelivery}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className="fa fa-pencil" />
                                      </span>
                                    </p>
                                  </div>

                                  {isDeliveryOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <select
                                            id="delivery_method"
                                            name="delivery_method"
                                            className="form-control w-100"
                                            // value={delivery_method}
                                            // onChange={(e) =>
                                            //   setDeliveryMethod(e.target.value)
                                            // }
                                          >
                                            <option value="1">
                                              Single Order
                                            </option>
                                          </select>
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleDelivery}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Work Location Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Work location:</p>
                                    <p className="text-right">
                                      {workLocation}{" "}
                                      <span
                                        onClick={toggleWork}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className="fa fa-pencil" />
                                      </span>
                                    </p>
                                  </div>

                                  {isWorkOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="work_location"
                                            name="work_location"
                                            className="form-control w-100"
                                            placeholder="Enter Work Location"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleWork}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Target Date Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Target date:</p>
                                    <p
                                      className="text-right"
                                      onClick={toggleTarget}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </p>
                                  </div>

                                  {isTargetOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="date"
                                            id="target_date"
                                            name="target_date"
                                            // value={target_date}
                                            // onChange={(e) =>
                                            //   setExpirationDate(e.target.value)
                                            // }
                                            className="form-control w-100"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleTarget}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Responsible Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Responsible:</p>
                                    <p>
                                      {responsible}{" "}
                                      <span
                                        className="text-right float-end"
                                        onClick={toggleResponsible}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className="fa fa-pencil" />
                                      </span>
                                    </p>
                                  </div>

                                  {isResponsibleOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="created_by"
                                            name="created_by"
                                            className="form-control w-100"
                                            placeholder="Enter Responsible Person"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleResponsible}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Brand Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Establishment brand:</p>
                                    <p
                                      className="text-right"
                                      onClick={toggleBrand}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </p>
                                  </div>

                                  {isBrandOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="establishmentBrand"
                                            name="establishmentBrand"
                                            className="form-control w-100"
                                            placeholder="Enter Establishment Brand"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleBrand}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-5 mt-5">
                                {" "}
                                {/* Quotation Section */}
                                <div className="d-flex justify-content-between">
                                  <p>Quotation date</p>
                                  <p>
                                    {/* {quotation_date}{" "} */}
                                    <span
                                      className="text-right float-end"
                                      onClick={toggleQuotation}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                                {isQuotationOpen && (
                                  <div className="data form-field-open form-field-open1">
                                    <form onSubmit={handleSave}>
                                      <div className="customer_records">
                                        <input
                                          type="date"
                                          id="quotation_date"
                                          name="quotation_date"
                                          className="form-control w-100"
                                          placeholder="Enter Quotation"
                                        />
                                      </div>
                                      <div className="d-flex gap-3 justify-content-end mt-4">
                                        <button
                                          type="button"
                                          className="btn btn-danger px-2"
                                          onClick={toggleQuotation}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-success px-2"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                )}{" "}
                                {/* Quotation Section */}
                                <div className="d-flex justify-content-between">
                                  <p>Expiry date:</p>
                                  <p>
                                    {/* {quotation_date}{" "} */}
                                    <span
                                      className="text-right float-end"
                                      onClick={toggleExpire}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                                {isExpOpen && (
                                  <div className="data form-field-open form-field-open1">
                                    <form onSubmit={handleSave}>
                                      <div className="customer_records">
                                        <input
                                          type="date"
                                          id="expiration_date"
                                          name="expiration_date"
                                          className="form-control w-100"
                                          placeholder="Enter Quotation"
                                        />
                                      </div>
                                      <div className="d-flex gap-3 justify-content-end mt-4">
                                        <button
                                          type="button"
                                          className="btn btn-danger px-2"
                                          onClick={toggleExpire}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-success px-2"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="header-note mt-5">
                              <div className="text-left">
                                <div className="justify-content-between">
                                  <p>
                                    {headerText}{" "}
                                    <span
                                      onClick={toggleHeader}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {isHeaderOpen && (
                                <div className="data form-field-open form-field-open1">
                                  <form onSubmit={handleSave}>
                                    <div className="customer_records">
                                      <div className="">
                                        <input
                                          type="text"
                                          id="header"
                                          name="header"
                                          className="form-control w-100"
                                          placeholder="Enter header text"
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end mt-4">
                                      <a
                                        className="add btn-danger px-2"
                                        onClick={toggleHeader}
                                      >
                                        Cancel
                                      </a>
                                      <button
                                        type="submit"
                                        className="add btn-success px-2"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              )}
                            </div>
                            <div className="table-responsive mt-4">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      Number
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                      style={{ width: 300 }}
                                      onClick={handleArticletoggle}
                                    >
                                      Description
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      Amount
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      Total
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      €0.00
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="pt-4">
                                    <th scope="tr" className="pt-4" />
                                    <th scope="tr" className="pt-4" />
                                    <th scope="tr" className="pt-4">
                                      Subtotal
                                    </th>
                                    <th scope="tr" className="pt-4">
                                      €0.00
                                    </th>
                                    <th scope="tr" className="pt-4" />
                                  </tr>
                                  <tr className="pt-5">
                                    <th scope="tr" className="pt-5" />
                                    <th scope="tr" className="pt-5" />
                                    <th scope="tr" className="pt-5">
                                      <b>Total</b>
                                    </th>
                                    <th scope="tr" className="pt-5">
                                      €0.00
                                    </th>
                                    <th scope="tr" className="pt-5" />
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {showArticleForm && (
                              <div className="data form-field-open">
                                <form onSubmit={handleSave}>
                                  {/* Section Title */}
                                  <div className="input-1 work-order article mt-3">
                                    <input
                                      type="text"
                                      name="section_title"
                                      className="form-control w-100"
                                      placeholder="Section title"
                                    />
                                  </div>

                                  {/* Section Description */}
                                  <div className="input-1 work-order article mt-3">
                                    <input
                                      type="text"
                                      name="section_description"
                                      className="form-control w-100"
                                      placeholder="Section Description"
                                    />
                                  </div>

                                  {/* Location */}
                                  <div className="input-1 work-order article mt-3">
                                    <input
                                      type="text"
                                      name="location"
                                      className="form-control w-100"
                                      placeholder="Location"
                                    />
                                  </div>

                                  {/* Sublocation */}
                                  <div className="input-1 work-order article mt-3 mb-4">
                                    <input
                                      type="text"
                                      name="sub_location"
                                      className="form-control w-100"
                                      placeholder="Sublocation"
                                    />
                                  </div>

                                  {/* Articles Section */}
                                  {foData.map((form, index) => (
                                    <div
                                      key={index}
                                      className="fields customer_records-extra mt-4"
                                    >
                                      <div className="input-1 work-order article">
                                        <label>Number</label>
                                        <input
                                          type="text"
                                          name={`articleNumber_${index}`}
                                          placeholder="Number"
                                        />
                                      </div>

                                      <div className="input-1 work-order article">
                                        <label>Article number</label>
                                        <select
                                          name="article_number"
                                          value={form.article_number}
                                          onChange={(e) =>
                                            handleInputChange(index, e)
                                          }
                                        >
                                          <option value="">
                                            Select Article Number
                                          </option>
                                          {articleNames.map((article, idx) => (
                                            <option
                                              key={idx}
                                              value={article.article_number}
                                            >
                                              {article.article_number}
                                            </option>
                                          ))}
                                        </select>
                                      </div>

                                      <div className="input-1 work-order">
                                        <label>Number Unit</label>
                                        <input
                                          type="text"
                                          name="quantity"
                                          placeholder="1"
                                        />
                                      </div>

                                      <div className="input-1 work-order">
                                        <label>Amount</label>
                                        <input
                                          type="text"
                                          name="selling_price"
                                          placeholder="0"
                                        />
                                      </div>

                                      <div className="input-1 work-order">
                                        <label>Total VAT</label>
                                        <div className="d-flex">
                                          <span>
                                            {/* Optionally, display calculated VAT here */}
                                          </span>
                                          <input
                                            type="number"
                                            name="vat_percentage"
                                            // value={form.vat_percentage}
                                            // onChange={(e) =>
                                            //   handleInputChange(index, e)
                                            // }
                                            placeholder="21%"
                                          />
                                        </div>
                                      </div>

                                      {index > 0 && (
                                        <button
                                          type="button"
                                          className="remove-field btn-remove-customer"
                                          onClick={() => removeForm(index)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </div>
                                  ))}

                                  <div className="option-btn d-flex justify-content-between">
                                    <div
                                      className="add task extra-fields-customer"
                                      onClick={addForm}
                                    >
                                      <span>+ Articles</span>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end">
                                      <button
                                        type="button"
                                        className="add btn-danger px-2"
                                        onClick={ArticleClean}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="add btn-success px-2"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}

                            <div className="header-note mt-4">
                              <div className="text-left">
                                <div className="justify-content-between">
                                  <p>
                                    {footerText}{" "}
                                    <span
                                      onClick={toggleFooter}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {isFooterOpen && (
                                <div className="data form-field-open form-field-open1">
                                  <form onSubmit={handleSave}>
                                    <div className="customer_records">
                                      <div className="">
                                        <input
                                          type="text"
                                          id="remark"
                                          name="remark"
                                          className="form-control w-100"
                                          // value={footerText}
                                          // onChange={(e) =>
                                          //   setFooterText(e.target.value)
                                          // }
                                          placeholder="Enter footer text"
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end mt-4">
                                      <a
                                        className="add btn-danger px-2"
                                        onClick={toggleFooter}
                                      >
                                        Cancel
                                      </a>
                                      <a className="add btn-success px-2">
                                        Save
                                      </a>
                                    </div>
                                  </form>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Documents"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Documents" ? "block" : "none",
                    }}
                  >
                    <div className="row">
                      <div>
                        <div className="Institution-grid-2 bg">
                          <div className="row">
                            <div className="col-md-4">
                              <h5>Private Filename</h5>
                              <p>
                                <i className="fa fa-eye float-start" />{" "}
                                &nbsp;Offer varley roller
                              </p>
                            </div>
                            <div className="col-md-4">
                              <h5>Date added</h5>
                              <p>26 October 2024 16:22</p>
                            </div>
                            <div className="col-md-4">
                              <h5>By</h5>
                              <p>
                                Office User{" "}
                                <i className="fa fa-trash float-end" />
                              </p>
                            </div>
                            <hr />
                            <div className="col-md-12">
                              <div className="file-upload">
                                <label
                                  htmlFor="upload"
                                  className="file-upload__label"
                                >
                                  + Drag/select document
                                </label>
                                <input
                                  id="upload"
                                  className="file-upload__input"
                                  type="file"
                                  name="file-upload"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label className="mb-2">
                                  Hyperlink text (Optional)
                                </label>
                                <input
                                  type="text"
                                  placeholder="Hyperlink text"
                                  className="first-inp mt-0 mb-2"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="mb-2">Hyperlink URL</label>
                                <input
                                  type="text"
                                  placeholder="Hyperlink URL"
                                  className="first-inp mt-0 mb-2"
                                />
                              </div>
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
                            value={notes}
                            onChange={handleNoteChange}
                            placeholder="Type your note here..."
                          />
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-4">
                          <a
                            className="add btn-danger px-2"
                            onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a
                            className="add btn-success px-2"
                            onClick={NotesSave}
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
                              value={actions}
                              onChange={(e) => setActions(e.target.value)}
                              placeholder="Description...."
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              placeholder="Employee"
                              className="first-inp"
                              value={employee}
                              onChange={(e) => setEmployee(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="date"
                              className="first-inp"
                              value={actionDate}
                              onChange={(e) => setActionDate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-12 mt-2">
                            <label>Responsible</label>
                            <textarea
                              className="input-group"
                              style={{ padding: "9px" }}
                              value={responsibleNotes}
                              onChange={(e) =>
                                setResponsibleNotes(e.target.value)
                              }
                              placeholder="Type your action note here..."
                            />
                          </div>
                          <div className="d-flex gap-3 justify-content-end mt-4">
                            <a
                              className="add btn-danger px-2"
                              onClick={toggleForm}
                            >
                              Cancel
                            </a>
                            <a
                              className="add btn-success px-2"
                              onClick={ActionSave}
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
                            type="emails"
                            className="form-control w-100"
                            placeholder="At   ..."
                            value={sendTo}
                            onChange={(e) => setSendTo(e.target.value)}
                          />
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <input
                            className="form-control w-100"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                          />
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <textarea
                            className="input-group"
                            style={{ padding: "9px" }}
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                        <div className="mt-4">
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => setMailFile(e.target.files[0])}
                          />
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-4">
                          <a
                            className="add btn-danger px-2"
                            onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a
                            className="add btn-success px-2"
                            onClick={EmailSave}
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

      <div
        // className={`modal ${isModalOpen ? "show" : ""}`}
        className="modal show"
        id="add-pdf-template"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-pdf-template"
        aria-modal="true"
        role="dialog"
        style={{ display: "none" }}
        // style={{ display: isModalOpen ? "block" : "none" }}
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
              {currentStatus === "Concept" && (
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
              {currentStatus === "Expire" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Expire</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Lose" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Expire</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Lose</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Incomplete" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Clanned</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Incomplete</div>
                  </div>
                </React.Fragment>
              )}
              {currentStatus === "Won" && (
                <React.Fragment>
                  <div className="step">
                    <div className="step__title">Concept</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Open</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Expire</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Lose</div>
                  </div>
                  <div className="step">
                    <div className="step__title">Won</div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="big-containe bg-1">
              <div className="container">
                <div className="same-as-head d-flex justify-content-between align-items-center">
                  <ul className="maintabhead">
                    <li
                      className={`tablink ${
                        activeTab === "Quotation" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Quotation", e)}
                      id="defaultOpen"
                      style={{
                        borderBottom:
                          activeTab === "Quotation" ? "2px solid #f06522" : "",
                      }}
                    >
                      Quotation
                    </li>
                    <li
                      className={`tablink ${
                        activeTab === "Documents" ? "active" : ""
                      }`}
                      onClick={(e) => openPage("Documents", e)}
                      style={{
                        borderBottom:
                          activeTab === "Documents" ? "2px solid #f06522" : "",
                      }}
                    >
                      Document
                    </li>
                  </ul>
                  <ul className="maintabhead">
                    <a className="add">Send Quotes</a>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div
                    id="Home"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Quotation" ? "block" : "none",
                    }}
                  >
                    <div className="row">
                      <div>
                        <div className="Institution-grid-2 bg">
                          <div className="compan compana ">
                            <a className="btn-primary position-relative">
                              Download PDF
                            </a>
                            <a className="btn-primary position-relative">
                              Duplicate
                            </a>
                            <a className="btn-primary position-relative">
                              Create Template
                            </a>
                            {/* <select className="no-select2 custom-select cr-select form-select">
                              <option>Prijzen weergave</option>
                              <option>Incl. BTW weergeven</option>
                              <option> Excl. BTW weergeven </option>
                            </select>
                            <select className="no-select2 custom-select cr-select form-select">
                              <option>Prijzen weergave</option>
                              <option>Incl. BTW weergeven</option>
                              <option> Excl. BTW weergeven </option>
                            </select> */}
                          </div>
                          <hr />
                          <div className="row">
                            <div className=" col-md-8">
                              <div className="">
                                <img
                                  src={`${process.env.PUBLIC_URL}/Image/logo.png`}
                                  className="w-100"
                                  alt="Company Logo"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text-right">
                                <a className="Esined">
                                  Esined <i className="fa fa-pencil" />
                                </a>
                                <p>admin@crafter.com</p>
                              </div>
                            </div>
                            <div className="col-md-12 mt-5">
                              <div className="text-left">
                                <a className="Esined" onClick={toggleForm}>
                                  Recipient <i className="fa fa-pencil" />
                                </a>
                              </div>
                            </div>

                            {isFormOpen && (
                              <div className="data form-field-open">
                                <form>
                                  <div className=" customer_records">
                                    <div className="input-1 work-order input-grid">
                                      <label className=" ">Company Name</label>
                                      <select>
                                        <option className="select-selected">
                                          Company Name
                                        </option>
                                        <option>Object1</option>
                                        <option>Object2</option>
                                      </select>
                                    </div>

                                    <div className="input-1 work-order input-grid mt-3 mb-4">
                                      <label className=" ">
                                        Contact Person
                                      </label>
                                      <select>
                                        <option className="select-selected">
                                          Contact Person
                                        </option>
                                        <option></option>
                                        <option></option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="d-flex gap-3 justify-content-end ">
                                    <a
                                      className="add btn-danger px-2"
                                      onClick={toggleForm}
                                    >
                                      Cancel
                                    </a>
                                    <a className="add btn-success px-2">Save</a>
                                  </div>
                                </form>
                              </div>
                            )}
                            <div className="row">
                              <div className="col-md-7">
                                <div className="text-left">
                                  <h4>Offerte concept #000022</h4>
                                  <hr />

                                  {/* Referentie Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Referentie:</p>
                                    <p
                                      className="text-right"
                                      onClick={toggleReferentie}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </p>
                                  </div>

                                  {isReferentieOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="referentie"
                                            name="referentie"
                                            className="form-control w-100"
                                            placeholder="Enter Referentie"
                                            // value={referentie}
                                            // onChange={(e) =>
                                            //   setReferentie(e.target.value)
                                            // }
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleReferentie}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Delivery Method Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Delivery Method:</p>
                                    <p>
                                      {deliveryMethod}{" "}
                                      <span
                                        className="text-right float-end"
                                        onClick={toggleDelivery}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className="fa fa-pencil" />
                                      </span>
                                    </p>
                                  </div>

                                  {isDeliveryOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <select
                                            id="delivery_method"
                                            name="delivery_method"
                                            className="form-control w-100"
                                            // value={delivery_method}
                                            // onChange={(e) =>
                                            //   setDeliveryMethod(e.target.value)
                                            // }
                                          >
                                            <option value="1">
                                              Single Order
                                            </option>
                                          </select>
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleDelivery}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Work Location Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Work location:</p>
                                    <p className="text-right">
                                      {workLocation}{" "}
                                      <span
                                        onClick={toggleWork}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className="fa fa-pencil" />
                                      </span>
                                    </p>
                                  </div>

                                  {isWorkOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="work_location"
                                            name="work_location"
                                            className="form-control w-100"
                                            // value={work_location}
                                            // onChange={(e) =>
                                            //   setWorkLocation(e.target.value)
                                            // }
                                            placeholder="Enter Work Location"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleWork}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Target Date Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Target date:</p>
                                    <p
                                      className="text-right"
                                      onClick={toggleTarget}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </p>
                                  </div>

                                  {isTargetOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="date"
                                            id="target_date"
                                            name="target_date"
                                            // value={target_date}
                                            // onChange={(e) =>
                                            //   setExpirationDate(e.target.value)
                                            // }
                                            className="form-control w-100"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleTarget}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Responsible Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Responsible:</p>
                                    <p>
                                      {responsible}{" "}
                                      <span
                                        className="text-right float-end"
                                        onClick={toggleResponsible}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className="fa fa-pencil" />
                                      </span>
                                    </p>
                                  </div>

                                  {isResponsibleOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="responsible"
                                            name="responsible"
                                            className="form-control w-100"
                                            // value={responsible}
                                            // onChange={(e) =>
                                            //   setResponsible(e.target.value)
                                            // }
                                            placeholder="Enter Responsible Person"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleResponsible}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}

                                  {/* Brand Section */}
                                  <div className="d-flex justify-content-between">
                                    <p>Establishment brand:</p>
                                    <p
                                      className="text-right"
                                      onClick={toggleBrand}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </p>
                                  </div>

                                  {isBrandOpen && (
                                    <div className="data form-field-open form-field-open1">
                                      <form onSubmit={handleSave}>
                                        <div className="customer_records">
                                          <input
                                            type="text"
                                            id="establishmentBrand"
                                            name="establishmentBrand"
                                            className="form-control w-100"
                                            // value={establishmentBrand}
                                            // onChange={(e) =>
                                            //   setEstablishmentBrand(
                                            //     e.target.value
                                            //   )
                                            // }
                                            placeholder="Enter Establishment Brand"
                                          />
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end mt-4">
                                          <button
                                            type="button"
                                            className="btn btn-danger px-2"
                                            onClick={toggleBrand}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="btn btn-success px-2"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-5 mt-5">
                                {" "}
                                {/* Quotation Section */}
                                <div className="d-flex justify-content-between">
                                  <p>Quotation date</p>
                                  <p>
                                    {/* {quotation_date}{" "} */}
                                    <span
                                      className="text-right float-end"
                                      onClick={toggleQuotation}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                                {isQuotationOpen && (
                                  <div className="data form-field-open form-field-open1">
                                    <form onSubmit={handleSave}>
                                      <div className="customer_records">
                                        <input
                                          type="date"
                                          id="quotation_date"
                                          name="quotation_date"
                                          className="form-control w-100"
                                          // value={quotation_date}
                                          // onChange={(e) =>
                                          //   setEstablishmentBrand(
                                          //     e.target.value
                                          //   )
                                          // }
                                          placeholder="Enter Quotation"
                                        />
                                      </div>
                                      <div className="d-flex gap-3 justify-content-end mt-4">
                                        <button
                                          type="button"
                                          className="btn btn-danger px-2"
                                          onClick={toggleQuotation}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-success px-2"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                )}{" "}
                                {/* Quotation Section */}
                                <div className="d-flex justify-content-between">
                                  <p>Expiry date:</p>
                                  <p>
                                    {/* {quotation_date}{" "} */}
                                    <span
                                      className="text-right float-end"
                                      onClick={toggleExpire}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                                {isExpOpen && (
                                  <div className="data form-field-open form-field-open1">
                                    <form onSubmit={handleSave}>
                                      <div className="customer_records">
                                        <input
                                          type="date"
                                          id="expiration_date"
                                          name="expiration_date"
                                          className="form-control w-100"
                                          // value={quotation_date}
                                          // onChange={(e) =>
                                          //   setEstablishmentBrand(
                                          //     e.target.value
                                          //   )
                                          // }
                                          placeholder="Enter Quotation"
                                        />
                                      </div>
                                      <div className="d-flex gap-3 justify-content-end mt-4">
                                        <button
                                          type="button"
                                          className="btn btn-danger px-2"
                                          onClick={toggleExpire}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-success px-2"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="header-note mt-5">
                              <div className="text-left">
                                <div className="justify-content-between">
                                  <p>
                                    {headerText}{" "}
                                    <span
                                      onClick={toggleHeader}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {isHeaderOpen && (
                                <div className="data form-field-open form-field-open1">
                                  <form onSubmit={handleSave}>
                                    <div className="customer_records">
                                      <div className="">
                                        <input
                                          type="text"
                                          id="header"
                                          name="header"
                                          className="form-control w-100"
                                          placeholder="Enter header text"
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end mt-4">
                                      <a
                                        className="add btn-danger px-2"
                                        onClick={toggleHeader}
                                      >
                                        Cancel
                                      </a>
                                      <a className="add btn-success px-2">
                                        Save
                                      </a>
                                    </div>
                                  </form>
                                </div>
                              )}
                            </div>
                            <div className="table-responsive mt-4">
                              <table className="table table-borderless mb-0">
                                <thead className="my-thead-1">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      Number
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                      style={{ width: 300 }}
                                      onClick={handleArticletoggle}
                                    >
                                      Description
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      Amount
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      Total
                                    </th>
                                    <th
                                      scope="col"
                                      className="pd-right my-padding"
                                    >
                                      €0.00
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="pt-4">
                                    <th scope="tr" className="pt-4" />
                                    <th scope="tr" className="pt-4" />
                                    <th scope="tr" className="pt-4">
                                      Subtotal
                                    </th>
                                    <th scope="tr" className="pt-4">
                                      €0.00
                                    </th>
                                    <th scope="tr" className="pt-4" />
                                  </tr>
                                  <tr className="pt-5">
                                    <th scope="tr" className="pt-5" />
                                    <th scope="tr" className="pt-5" />
                                    <th scope="tr" className="pt-5">
                                      <b>Total</b>
                                    </th>
                                    <th scope="tr" className="pt-5">
                                      €0.00
                                    </th>
                                    <th scope="tr" className="pt-5" />
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {showArticleForm && (
                              <div className="data form-field-open">
                                <form>
                                  {/* Section Title */}
                                  <div className="input-1 work-order article mt-3">
                                    <input
                                      type="text"
                                      name="sectionTitle"
                                      className="form-control w-100"
                                      placeholder="Section title"
                                      // value={sectionTitle}
                                      // onChange={(e) =>
                                      //   setSectionTitle(e.target.value)
                                      // }
                                    />
                                  </div>

                                  {/* Section Description */}
                                  <div className="input-1 work-order article mt-3">
                                    <input
                                      type="text"
                                      name="sectionDescription"
                                      className="form-control w-100"
                                      placeholder="Section Description"
                                      // value={sectionDescription}
                                      // onChange={(e) =>
                                      //   setSectionDescription(e.target.value)
                                      // }
                                    />
                                  </div>

                                  {/* Location */}
                                  <div className="input-1 work-order article mt-3">
                                    <input
                                      type="text"
                                      name="location"
                                      className="form-control w-100"
                                      placeholder="Location"
                                      // value={location}
                                      // onChange={(e) =>
                                      //   setLocation(e.target.value)
                                      // }
                                    />
                                  </div>

                                  {/* Sublocation */}
                                  <div className="input-1 work-order article mt-3 mb-4">
                                    <input
                                      type="text"
                                      name="sublocation"
                                      className="form-control w-100"
                                      placeholder="Sublocation"
                                      // value={sublocation}
                                      // onChange={(e) =>
                                      //   setSublocation(e.target.value)
                                      // }
                                    />
                                  </div>

                                  {/* Articles Section */}
                                  {foData.map((form, index) => (
                                    <div
                                      key={index}
                                      className="fields customer_records-extra mt-4"
                                    >
                                      <div className="input-1 work-order article">
                                        <label>Number</label>
                                        <input
                                          type="text"
                                          name={`articleNumber_${index}`}
                                          // value={form.number}
                                          // onChange={(e) =>
                                          //   handleInputChange(index, e)
                                          // }
                                          placeholder="Number"
                                        />
                                      </div>

                                      <div className="input-1 work-order article">
                                        <label>Article number</label>
                                        <select
                                          name="article_number"
                                          value={form.article_number}
                                          onChange={(e) =>
                                            handleInputChange(index, e)
                                          }
                                        >
                                          <option value="">
                                            Select Article Number
                                          </option>
                                          {articleNames.map((article, idx) => (
                                            <option
                                              key={idx}
                                              value={article.article_number}
                                            >
                                              {article.article_number}
                                            </option>
                                          ))}
                                        </select>
                                      </div>

                                      <div className="input-1 work-order">
                                        <label>Number Unit</label>
                                        <input
                                          type="text"
                                          name="quantity"
                                          // value={form.quantity}
                                          // onChange={(e) =>
                                          //   handleInputChange(index, e)
                                          // }
                                          placeholder="1"
                                        />
                                      </div>

                                      <div className="input-1 work-order">
                                        <label>Amount</label>
                                        <input
                                          type="text"
                                          name="selling_price"
                                          // value={form.selling_price}
                                          // onChange={(e) =>
                                          //   handleInputChange(index, e)
                                          // }
                                          placeholder="0"
                                        />
                                      </div>

                                      <div className="input-1 work-order">
                                        <label>Total VAT</label>
                                        <div className="d-flex">
                                          <span>
                                            {/* Optionally, display calculated VAT here */}
                                          </span>
                                          <input
                                            type="number"
                                            name="vat_percentage"
                                            // value={form.vat_percentage}
                                            // onChange={(e) =>
                                            //   handleInputChange(index, e)
                                            // }
                                            placeholder="21%"
                                          />
                                        </div>
                                      </div>

                                      {index > 0 && (
                                        <button
                                          type="button"
                                          className="remove-field btn-remove-customer"
                                          onClick={() => removeForm(index)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </div>
                                  ))}

                                  <div className="option-btn d-flex justify-content-between">
                                    <div
                                      className="add task extra-fields-customer"
                                      onClick={addForm}
                                    >
                                      <span>+ Articles</span>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end">
                                      <button
                                        type="button"
                                        className="add btn-danger px-2"
                                        onClick={ArticleClean}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="add btn-success px-2"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}

                            <div className="header-note mt-4">
                              <div className="text-left">
                                <div className="justify-content-between">
                                  <p>
                                    {footerText}{" "}
                                    <span
                                      onClick={toggleFooter}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {isFooterOpen && (
                                <div className="data form-field-open form-field-open1">
                                  <form onSubmit={handleSave}>
                                    <div className="customer_records">
                                      <div className="">
                                        <input
                                          type="text"
                                          id="remark"
                                          name="remark"
                                          className="form-control w-100"
                                          // value={footerText}
                                          // onChange={(e) =>
                                          //   setFooterText(e.target.value)
                                          // }
                                          placeholder="Enter footer text"
                                        />
                                      </div>
                                    </div>
                                    <div className="d-flex gap-3 justify-content-end mt-4">
                                      <a
                                        className="add btn-danger px-2"
                                        onClick={toggleFooter}
                                      >
                                        Cancel
                                      </a>
                                      <a className="add btn-success px-2">
                                        Save
                                      </a>
                                    </div>
                                  </form>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="Documents"
                    className="tabcontentt"
                    style={{
                      display: activeTab === "Documents" ? "block" : "none",
                    }}
                  >
                    <div className="row">
                      <div>
                        <div className="Institution-grid-2 bg">
                          <div className="row">
                            <div className="col-md-4">
                              <h5>Private Filename</h5>
                              <p>
                                <i className="fa fa-eye float-start" />{" "}
                                &nbsp;Offer varley roller
                              </p>
                            </div>
                            <div className="col-md-4">
                              <h5>Date added</h5>
                              <p>26 October 2024 16:22</p>
                            </div>
                            <div className="col-md-4">
                              <h5>By</h5>
                              <p>
                                Office User{" "}
                                <i className="fa fa-trash float-end" />
                              </p>
                            </div>
                            <hr />
                            <div className="col-md-12">
                              <div className="file-upload">
                                <label
                                  htmlFor="upload"
                                  className="file-upload__label"
                                >
                                  + Drag/select document
                                </label>
                                <input
                                  id="upload"
                                  className="file-upload__input"
                                  type="file"
                                  name="file-upload"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label className="mb-2">
                                  Hyperlink text (Optional)
                                </label>
                                <input
                                  type="text"
                                  placeholder="Hyperlink text"
                                  className="first-inp mt-0 mb-2"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="mb-2">Hyperlink URL</label>
                                <input
                                  type="text"
                                  placeholder="Hyperlink URL"
                                  className="first-inp mt-0 mb-2"
                                />
                              </div>
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
                            value={notes}
                            onChange={handleNoteChange}
                            placeholder="Type your note here..."
                          />
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-4">
                          <a
                            className="add btn-danger px-2"
                            onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a
                            className="add btn-success px-2"
                            onClick={NotesSave}
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
                              value={actions}
                              onChange={(e) => setActions(e.target.value)}
                              placeholder="Description...."
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              placeholder="Employee"
                              className="first-inp"
                              value={employee}
                              onChange={(e) => setEmployee(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              type="date"
                              className="first-inp"
                              value={actionDate}
                              onChange={(e) => setActionDate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-12 mt-2">
                            <label>Responsible</label>
                            <textarea
                              className="input-group"
                              style={{ padding: "9px" }}
                              value={responsibleNotes}
                              onChange={(e) =>
                                setResponsibleNotes(e.target.value)
                              }
                              placeholder="Type your action note here..."
                            />
                          </div>
                          <div className="d-flex gap-3 justify-content-end mt-4">
                            <a
                              className="add btn-danger px-2"
                              onClick={toggleForm}
                            >
                              Cancel
                            </a>
                            <a
                              className="add btn-success px-2"
                              onClick={ActionSave}
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
                            value={sendTo}
                            onChange={(e) => setSendTo(e.target.value)}
                          />
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <input
                            className="form-control w-100"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                          />
                        </div>
                        <div className="input-1 pt-4 px-2">
                          <textarea
                            className="input-group"
                            style={{ padding: "9px" }}
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                        <div className="mt-4">
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={(e) => setMailFile(e.target.files[0])}
                          />
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-4">
                          <a
                            className="add btn-danger px-2"
                            onClick={toggleForm}
                          >
                            Cancel
                          </a>
                          <a
                            className="add btn-success px-2"
                            onClick={EmailSave}
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

export default Sale;
