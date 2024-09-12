import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";


function Subcodinator() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [sub, setSub] = useState("");
  const [subs, setSubs] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
 

  const fetchsubcontractor = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("WorkMen-Token");

      let response;
      if (subs) {
        // Assuming you meant to use `subs` here
        response = await axios.get(`workmen/subcontractor/?search=${subs}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.get(`workmen/subcontractor/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setSub(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchsubcontractor();
  }, [subs, t]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const subcontractor = (Array.isArray(sub) ? sub : []).slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Calculate total pages
  const totalPages = Math.ceil(
    (Array.isArray(sub) ? sub.length : 0) / postsPerPage
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

   const handleChange = (e) => {
     const value = e.target.value;
     setSubs(value);
   };

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/data">{t("Articles")}</Link>
              </li>
              <li>
                <Link to="/subcodinator" className="actives">
                  Subcontactors
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="work-flex">
          <div className="work">
            <h4>Subcontractors</h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search with Company Name")}
                className="ser"
                onChange={handleChange}
              />{" "}
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
                              <th scope="col">First name</th>
                              <th scope="col">Last name</th>
                              <th scope="col">Company name</th>
                              <th scope="col">E-mail address</th>
                              <th scope="col">Phone number</th>
                              <th scope="col">Cost price</th>
                              <th scope="col">Code</th>
                            </tr>
                          </thead>
                          <tbody className="myies">
                            {isLoading ? (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  <Loader />
                                </td>
                              </tr>
                            ) : subcontractor.length > 0 ? (
                              subcontractor.map((item, index) => (
                                <tr className="my-bot" key={index}>
                                  <td className="pd-right">
                                    <a className="project">{item.first_name}</a>
                                  </td>
                                  <td className="pd-right">
                                    <a className="project">{item.last_name}</a>
                                  </td>
                                  <td className="pd-right">
                                    <a className="project">
                                      {item.company_name}
                                    </a>
                                  </td>
                                  <td className="pd-right">
                                    <a className="project">{item.email}</a>
                                  </td>
                                  <td className="pd-right">
                                    <a className="project">{item.mobile}</a>
                                  </td>
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
  );
}

export default Subcodinator;
