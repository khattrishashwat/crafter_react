import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import { LanguageContext } from "../../LanguageContext";
import Swal from "sweetalert2";
import axios from "axios";
function Action() {
  const [searchClient, setSearchClient] = useState("");
  const [selectedResponsible, setSelectedResponsible] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [actionData, setActionData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const { t } = useTranslation();
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(10); 
  const [error, setError] = useState("");

  const { selectedLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const fetchAction = async () => {
      const token = localStorage.getItem("WorkMen-Token");
      if (!token) {
        console.error("error: No token found");
        return;
      }
      try {
        setIsLoading(true);
        let url = `/workmen/action/`;

        if (searchClient || startDate) {
          url += `?search=${searchClient}&date=${startDate}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setActionData(response.data.data);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAction();
  }, [searchClient, startDate]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = actionData.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(actionData.length / postsPerPage);


  const status = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("WorkMen-Token");
      const response = await axios.patch(
        `/workmen/action/`,
        { id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const Data = actionData.find((item) => item.id == id);
      console.log("idssss-->", Data);
      setActionData((prevActionData) =>
        prevActionData.map((item) =>
          item.id == id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const handleStatusClick = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to change the status?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "invoice",
        denyButtonText: "incomplete",
      });

      if (result.isConfirmed) {
        await status(id, "invoice");
        Swal.fire("Status changed to Invoice!", "", "success").then(() => {
          window.location.reload();
        });
      } else if (result.isDenied) {
        await status(id, "incomplete");
        Swal.fire("Status changed to Incomplete!", "", "success").then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error updating status", error);
      Swal.fire("Failed to update status", "", "error");
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
                <Link to="/projects">{t("Projects")}</Link>
              </li>
              <li>
                <Link to="/orders">{t("Work Orders")}</Link>
              </li>
              <li>
                <Link to="/action" className="actives">
                  {t("Action")}
                </Link>
              </li>
              <li>
                <Link to="/gps">GPS</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="work-flex">
          <div className="work">
            <h4>{t("Actions")}</h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input
                type="text"
                placeholder="To Search with Client name"
                className="ser"
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
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
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
                                  <th scope="col">{t("Reference")}</th>
                                  <th scope="col">{t("Client")}</th>
                                  <th scope="col">{t("Work Location")}</th>
                                  <th scope="col">{t("Sub Location")}</th>
                                  <th scope="col">{t("Project Details")}</th>
                                  <th scope="col">{t("Description")}</th>
                                  <th scope="col">{t("Deadline")}</th>
                                  <th scope="col">{t("Responsible")}</th>
                                  <th scope="col">{t("Status")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentPosts.length > 0 ? (
                                  currentPosts.map((item) => (
                                    <tr key={item.id}>
                                      <td>{item.reference}</td>
                                      <td>{item.client}</td>
                                      <td>
                                        {item.work_location?.substring(0, 20) +
                                          "..."}
                                      </td>
                                      <td>{item.types}</td>
                                      <td>{item.project_detail}</td>
                                      <td>
                                        {item.description?.substring(0, 30) +
                                          "..."}
                                      </td>
                                      <td>
                                        {item.end_date
                                          ? item.end_date.slice(0, 10)
                                          : ""}
                                      </td>
                                      <td>{item.responsible}</td>
                                      <td>
                                        <i
                                          className="fas fa-stream"
                                          onClick={() =>
                                            handleStatusClick(item.id)
                                          }
                                          style={{ cursor: "pointer" }}
                                        />
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="9" className="text-center">
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
        )}
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
    </div>
  );
}
export default Action;
