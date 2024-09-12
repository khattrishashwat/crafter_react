import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Loader from "../Loader/Loader";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function Hour() {
  const [modalVisible, setModalVisible] = useState(false);
  const [hours, setHours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timetype, setTimetype] = useState("");
  const [ids, setIds] = useState("");
  const [minDate, setMinDate] = useState("");
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(
    {}
    // {
    //   id: "",
    //   colleague: "",
    //   status: "",
    //   project_number: "",
    //   start_time: "",
    //   // start_time_time: "",
    //   end_time: "",
    //   // end_time_time: "",
    //   is_approved: false,
    // }
  );

  const initialData = {
    id: ids,
    colleague: formData?.colleague || "",
    status: formData?.status || "",
    project_number: formData?.project_number || "",
    start_time_date: formData?.start_time
      ? formData.start_time.substring(0, 10)
      : "",
    start_time_time: formData?.start_time
      ? formData.start_time.substring(11, 16)
      : "",
    end_time_date: formData?.end_time ? formData.end_time.substring(0, 10) : "",
    end_time_time: formData?.end_time
      ? formData.end_time.substring(11, 16)
      : "",
    is_approved: formData?.is_approved || false,
  };

  const openModal = async (id) => {
    const set = hours.data.find((obj) => obj.id === id);
    console.log("item", set);
    setIds(id);
    if (set) {
      const updatedFormData = {
        ...set,
        status: mapStatusToValue(set.status),
      };
      setFormData(updatedFormData);
      setModalVisible(true);
      console.log("Updated formData", updatedFormData);
    }
  };

  const handleDateChange = (event, setFieldValue) => {
    const selectedDate = event.target.value;
    setFieldValue("start_time_date", selectedDate);

    setMinDate(selectedDate);
  };

  const mapStatusToValue = (status) => {
    switch (status.toLowerCase()) {
      case "driving":
        return 1;
      case "working":
        return 3;
      case "break":
        return 2;
      default:
        return status;
    }
  };

  console.log("ID ", ids);

  const closeModal = () => {
    setModalVisible(false);
  };

  const validationSchema = Yup.object().shape({
    start_time_date: Yup.string().required("Start date is required"),
    start_time_time: Yup.string().required("Start time is required"),
    end_time_date: Yup.string().required("End date is required"),
    end_time_time: Yup.string()
      .required("End time is required")
      .test(
        "is-greater",
        "End time must be greater than start time",
        function (value) {
          const { start_time_date, start_time_time, end_time_date } =
            this.parent;
          if (start_time_date === end_time_date) {
            return value > start_time_time;
          }
          return true;
        }
      ),
  });

  const onSubmit = async (values) => {
    console.log("Submitted values:", values);

    // Combine date and time into datetime strings
    const start_time = `${values.start_time_date}T${values.start_time_time}`;
    const end_time = `${values.end_time_date}T${values.end_time_time}`;

    const data = {
      ...values,
      start_time,
      end_time,
    };

    const token = localStorage.getItem("WorkMen-Token");

    try {
      const res = await axios.patch("workmen/hour/", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Patch response:", res);
      if (res.status === 200) {
        setModalVisible(false);
        fetchData(); // Call fetchData to reload the data
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("WorkMen-Token");
    if (!token) {
      console.error("error: No token found");
      return;
    }

    try {
      let response;

      if (timetype || startDate || endDate) {
        response = await axios.get(
          `workmen/hour/?status=${timetype}&start_date=${startDate}&end_date=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        setIsLoading(true);
        response = await axios.get(`workmen/hour/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Update the state with the fetched data
      setHours(response.data || { data: [] }); // Default to empty object with data key
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timetype, startDate, endDate]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ensure hours.data is an array before using slice
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(hours.data)
    ? hours.data.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  const totalPages = Math.ceil(
    (Array.isArray(hours.data) ? hours.data.length : 0) / postsPerPage
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

  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <div className="big-container bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <a className="actives">{t("Hours")}</a>
              </li>
              {/* <li>
                <Link to="/other">{t("Other Activities")}</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg my-bots">
        <div className="work-flex">
          <div className="work">
            <h4>{t("Time Duration of all Projects")}</h4>
          </div>
          <div className="fields">
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
                name="type"
                id="type"
                value={timetype && timetype}
                onChange={(e) => setTimetype(e.target.value)}
              >
                <option value="">All Time</option>
                <option value="1">Driving</option>
                <option value="2">Break</option>
                <option value="3">Working</option>
              </select>
            </div>

            {/* <div className="input-1">
              <select name="cars" id="cars">
                <option value="volvo">Status</option>
                <option value="saab">Entered</option>
                <option value="saab">Approved</option>
              </select>
            </div> */}
            {/* <input type="text" placeholder="" className="hour-inpu" /> */}
          </div>
        </div>
      </div>
      {/* <div className="center-date hour-1">
        <h2>Total hours: 11 hours</h2>
        <h2>Total working hours: 08 hours</h2>
        <h2>Total travel hours: 02 hours</h2>
        <h2>Total break hours:01 hours</h2>
      </div> */}
      <div className="center-date hour-1">
        <h2>
          {t("Total hours:")} {Number(hours.total_hours).toFixed(2)} hours
        </h2>
        <h2>
          {t("Total working hours:")}
          {Number(hours.total_working_hours).toFixed(2)} hours
        </h2>
        <h2>
          {t("Total travel hours:")} {hours.total_driving_hours} hours
        </h2>
        <h2>
          {t("Total break hours:")} {hours.total_break_hours} hours
        </h2>
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
                                <th scope="col" className="pd-right my-padding">
                                  {t("Start Date")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("End Date")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Time")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Hour Type")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Colleague")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Project / Work order")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Status")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading ? (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    <Loader />
                                  </td>
                                </tr>
                              ) : currentPosts.length > 0 ? (
                                currentPosts.map((item) => (
                                  <tr key={item.id} className="my-bot">
                                    <td className="pd-right">
                                      <Link to="" className="project">
                                        {item.start_time?.substring(0, 10)}
                                      </Link>
                                    </td>
                                    <td className="pd-right">
                                      <Link to="" className="project">
                                        {item.end_time?.substring(0, 10)}
                                      </Link>
                                    </td>
                                    <td className="pd-right">
                                      <Link to="#" className="project">
                                        {item.start_time?.substring(11, 16)} -{" "}
                                        {item.end_time?.substring(11, 16)}&nbsp;
                                      </Link>
                                    </td>
                                    <td className="pd-right">
                                      <Link to="" className="project">
                                        {item.status}
                                      </Link>
                                    </td>
                                    <td className="pd-right">
                                      <Link to="" className="project">
                                        {item.colleague}
                                      </Link>
                                    </td>
                                    <td className="pd-right">
                                      <Link to="" className="project">
                                        {item.project_number}
                                      </Link>
                                    </td>
                                    <td>
                                      <a
                                        className={
                                          item.is_approved
                                            ? "progreess "
                                            : "appprocess"
                                        }
                                        onClick={() => {
                                          openModal(item.id);
                                          console.log("sdfsd", item.id);
                                          window.scrollTo(0, 0);
                                        }}
                                      >
                                        {item.is_approved
                                          ? "Approved"
                                          : "Entered"}
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    {t("No Hour available")}
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
      <div>
        <div className={`popup ${modalVisible ? "active" : ""}`} id="popup-1">
          <div className="overlay" />
          <div className="content">
            <Formik
              initialValues={initialData}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form>
                  <div
                    className="close-btn"
                    onClick={() => setModalVisible(false)}
                  >
                    ×
                  </div>
                  <h1 className="ant">{t("Edit timesheet")}</h1>
                  <div className="contents-112">
                    <div className="timesheet-flex">
                      <div className="timesheet-1">
                        <label className="labels">{t("Colleague")}</label>
                        <Field
                          type="text"
                          name="colleague"
                          className="input-1"
                          placeholder="colleague"
                          disabled
                        />
                      </div>
                      <div className="timesheet-2">
                        <label className="labels">{t("Status")}</label>
                        <Field as="select" name="status">
                          <option value="">Select status</option>
                          <option value={1}>Driving</option>
                          <option value={2}>Travel</option>
                          <option value={3}>Break</option>
                        </Field>
                      </div>
                    </div>
                    <div className="timesheet-flex-1">
                      <div className="input-11">
                        <label className="labels">{t("Start Date")}</label>
                        <Field
                          type="date"
                          name="start_time_date"
                          className="input-1"
                          onChange={(event) =>
                            handleDateChange(event, setFieldValue)
                          }
                        />
                        {errors.start_time_date && touched.start_time_date ? (
                          <div className="raws">{errors.start_time_date}</div>
                        ) : null}
                      </div>
                      <div className="input-11">
                        <label className="labels">{t("Start Time")}</label>
                        <Field
                          type="time"
                          name="start_time_time"
                          className="input-1"
                        />
                        {errors.start_time_time && touched.start_time_time ? (
                          <div className="raws">{errors.start_time_time}</div>
                        ) : null}
                      </div>
                      <div className="input-11">
                        <label className="labels">{t("End Date")}</label>
                        <Field
                          type="date"
                          name="end_time_date"
                          className="input-1"
                          min={values.start_time_date || minDate}
                        />
                        {errors.end_time_date && touched.end_time_date ? (
                          <div className="raws">{errors.end_time_date}</div>
                        ) : null}
                      </div>
                      <div className="input-11">
                        <label className="labels">{t("End Time")}</label>
                        <Field
                          type="time"
                          name="end_time_time"
                          className="input-1"
                        />
                        {errors.end_time_time && touched.end_time_time ? (
                          <div className="raws">{errors.end_time_time}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="timesheet-flex-2">
                      <div className="input-11">
                        <label className="labels">{t("Project Number")}</label>
                        <Field
                          type="text"
                          name="project_number"
                          className="input-1"
                          disabled
                        />
                      </div>
                      <div className="input-12">
                        <label className="labels">{t("Approved")}</label>
                        <Field
                          type="checkbox"
                          name="is_approved"
                          className="input-1"
                          checked={values.is_approved}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer mdls">
                    <button type="submit" className="save">
                      {t("Save")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hour;
