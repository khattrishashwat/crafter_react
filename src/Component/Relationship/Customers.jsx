import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function Customers() {
  const [ModalOpen, setModalOpen] = useState(false);
  const [coustomer, setCoustomer] = useState("");
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const postsPerPage = 10;
  const [email, setEmail] = useState("");
  const [clientno, setClientno] = useState("");
  // const [activeTab, setActiveTab] = useState("Home");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);

  const navigate = useNavigate();

  const openPage = (pageName) => {
    setActiveTab(pageName);
  };
  const [activeTab, setActiveTab] = useState("London");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabStyle = (tabName) => ({
    borderBottom: activeTab === tabName ? "2px solid rgb(240, 101, 34)" : "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("WorkMen-Token");

        const response = await axios.get(`client/search-client/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setCoustomer(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const token = localStorage.getItem("WorkMen-Token");

        const response = await axios.get(
          `client/search-client/?client_name=${clientno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response) {
          setCoustomer(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    };

    fetchFilteredData();
  }, [clientno]);

  const AddressNext = async (customerId) => {
    try {
      const token = localStorage.getItem("WorkMen-Token");

      const response = await axios.get(
        `client/search-client/?id=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cust = coustomer.find((item) => item.id === customerId);
      console.log("a", cust);

      navigate(`/customeraddress/${customerId}`, {
        state: {
          customerData: response.data,
          cust,
        },
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.includes("@")) {
      setEmail(value);
      setClientno("");
    } else {
      setClientno(value);
      setEmail("");
    }
  };

  const openModal = (id) => {
    console.log("Modal opened with customer ID:", id);
    setModalOpen(true);

    // const filterData = coustomer?.filter((obj) => obj.id === id);

    // if (filterData) {
    //   setData(filterData[0]);
    //   setModalOpen(true);
    // }
    // console.log("olp", filterData);
  };
  console.log("olpa", data);
  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = coustomer.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(
    (Array.isArray(coustomer) ? coustomer.length : 0) / postsPerPage
  );

  const pageNumbersToShow = 5;
  const startPage = Math.max(
    1,
    currentPage - Math.floor(pageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

  // Adjust start page if endPage is the last page
  const adjustedStartPage = Math.max(1, endPage - pageNumbersToShow + 1);

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
      <div className="bg my-bots">
        <div className="work-flex">
          <div className="work">
            <h4>{t("Customers")}</h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search With Client name or Email")}
                className="ser"
                onChange={handleInputChange}
              />
            </div>
            <a className="add" onClick={openModal}>
              Add
            </a>
          </div>
        </div>
      </div>
      <div>
        <section className="intro mt-4">
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
                                <th scope="col" className="pd-right my-padding">
                                  {t("Client Name")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Company Name")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Postal Code")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Address")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Phone Number")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("E-mail Address")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading ? (
                                <tr>
                                  <td colSpan="6" className="text-center">
                                    <Loader />
                                  </td>
                                </tr>
                              ) : coustomer.length > 0 ? (
                                currentPosts.map((customer, index) => (
                                  <tr
                                    className="my-bot"
                                    key={index}
                                    onClick={() => AddressNext(customer.id)}
                                  >
                                    <td className="pd-right">
                                      <a className="project">
                                        {customer.first_name}{" "}
                                        {customer.last_name}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {customer.company_name}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {customer.postal_code}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {customer.house_number},{" "}
                                        {customer.street}, {customer.address}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {customer.mobile}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {customer.email}
                                      </a>
                                    </td>
                                    {/* <td>
                                      <i
                                        className="fa-solid fa-up-right-from-square"
                                        onClick={() => {
                                          openModal(customer.id);
                                        }}
                                      />
                                    </td> */}
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="text-center">
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
      <div
        className={`modal fade ${ModalOpen ? "show" : ""}`}
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
                Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="btn-flex mt-4 mb-4">
              <p>Kind</p>
              <div className="tab">
                <button
                  className={`tablinks tablinksa ${
                    activeTab === "London" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("London")}
                >
                  <input
                    type="radio"
                    id="html"
                    value="HTML"
                    name="fav_language"
                  />
                  <label htmlFor="html">Commercial</label>
                </button>
                <button
                  className={`tablinks tablinksa ${
                    activeTab === "Paris" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Paris")}
                >
                  <input
                    type="radio"
                    id="html1"
                    value="HTML1"
                    name="fav_language"
                  />
                  <label htmlFor="html1">Private</label>
                </button>
              </div>
            </div>
            <div
              id="London"
              className="tabcontent"
              style={{ display: activeTab === "London" ? "block" : "none" }}
            >
              <div className="modal-body">
                <div className="client-form">
                  <label className="mb-2">Customer number*</label>
                  <input
                    type="text"
                    placeholder="K000001"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">(Company) name*</label>
                  <input
                    type="text"
                    placeholder="(Company) name"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <hr />
                <div className="client-form">
                  <label className="mb-2">Reference</label>
                  <input
                    type="text"
                    placeholder="Reference"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <hr />
                <div className="client-form1">
                  <label className="mb-2">Address*</label>
                  <input
                    type="text"
                    placeholder="Street"
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="No."
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Add."
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form2">
                  <label className="mb-2">Postcode + city</label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Place"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">Country*</label>
                  <select className="first-inp mt-0 mb-2">
                    <option>Netherlands</option>
                    <option>Afghanistan</option>
                    <option>Austria</option>
                    <option>Brazil</option>
                  </select>
                </div>
                <div className="client-form">
                  <label className="mb-2">Location Name*</label>
                  <input
                    type="text"
                    placeholder="Location Name"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <hr />
                <div className="client-form1">
                  <label className="mb-2">Contact person*</label>
                  <select className="first-inp mt-0 mb-2">
                    <option>---</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Fam</option>
                  </select>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">Telephone*</label>
                  <input
                    type="tel"
                    placeholder="Phone No."
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">E-mail*</label>
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
              </div>
            </div>
            <div
              id="Paris"
              className="tabcontent"
              style={{ display: activeTab === "Paris" ? "block" : "none" }}
            >
              <div className="modal-body">
                <div className="client-form">
                  <label className="mb-2">Customer number*</label>
                  <input
                    type="text"
                    placeholder="K000001"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form1">
                  <label className="mb-2">Contact person*</label>
                  <select className="first-inp mt-0 mb-2">
                    <option>---</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Fam</option>
                  </select>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">Phone number*</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">Email address*</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">Reference</label>
                  <input
                    type="text"
                    placeholder="Reference"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <hr />
                <div className="client-form1">
                  <label className="mb-2">Address*</label>
                  <input
                    type="text"
                    placeholder="Street"
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="No."
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Add."
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form2">
                  <label className="mb-2">Postcode + city</label>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="first-inp mt-0 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Place"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
                <div className="client-form">
                  <label className="mb-2">Country*</label>
                  <select className="first-inp mt-0 mb-2">
                    <option>Netherlands</option>
                    <option>Afghanistan</option>
                    <option>Austria</option>
                    <option>Brazil</option>
                  </select>
                </div>
                <div className="client-form">
                  <label className="mb-2">Location Name*</label>
                  <input
                    type="text"
                    placeholder="Location Name"
                    className="first-inp mt-0 mb-2"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

        </div>
  );
}

export default Customers;
