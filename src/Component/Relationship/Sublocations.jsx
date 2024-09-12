import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function Sublocations() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  const [sublocations, setSublocations] = useState([]);
  const { selectedLanguage } = useContext(LanguageContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSublocations = async () => {
      try {
        const token = localStorage.getItem("WorkMen-Token");
        const response = await axios.get(
          `crafter/clientplaceorder/?lang=${selectedLanguage}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSublocations(response.data.data.results || []);
      } catch (error) {
        console.error("Error fetching sublocations:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchSublocations();
  }, [page, selectedLanguage]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/customers">{t("Customers")}</Link>
              </li>
              {/* <li>
                <Link to="/contacts">{t("Contacts")}</Link>
              </li> */}
              <li>
                <Link to="/addresses" className="actives">
                  {t("Addresses")}
                </Link>
              </li>
              <li>
                <Link to="/sublocations" className="actives">
                  {t("Sublocations")}
                </Link>
              </li>
              <li>
                <Link to="/objects">{t("Objects")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="work-flex">
          <div className="work">
            <h4>{t("Sublocations")}</h4>
          </div>
          {/* <div className="fields">
            <div className="input-1">
              <input type="text" placeholder="To Search" className="ser" />
            </div>
            <div className="input-1">
              <select>
                <option>{t("All Types")}</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="loader-container">
            <p>
              <Loader />
            </p>
          </div>
        ) : (
          <section className="intro mt-6">
            {/* Your existing table and content */}
            <div className="bg-image h-100">
              <div className="mask d-flex align-items-center h-100">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <div className="card shadow-2-strong">
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                              {/* Table headers */}
                              <thead className="my-thead-1">
                                <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Description</th>
                                  <th scope="col">Type</th>
                                </tr>
                              </thead>
                              {/* Table body */}
                              {sublocations.length === 0 ? (
                                <tbody className="myies">
                                  <tr className="cr-table-no-results">
                                    <td colSpan={3}>
                                      <p className="cr-p-l mb-0 cr-textcolor-darkgray">
                                        No data entered
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  {sublocations.map((obj, index) =>
                                    obj.sublocations[0] ? (
                                      <tr key={index}>
                                        <td>{obj.sublocations[0].name}</td>
                                        <td>{obj.sublocations[0].remark}</td>
                                        <td>{obj.sublocations[0].type}</td>
                                      </tr>
                                    ) : null
                                  )}
                                </tbody>
                              )}
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
        )}
        {/* Pagination buttons */}
        <div className="boths-btn">
          <button onClick={handlePreviousPage} disabled={page <= 1}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button onClick={handleNextPage}>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sublocations;
