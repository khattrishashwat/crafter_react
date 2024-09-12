import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import axios from "axios";
import * as Yup from "yup";
import Select from "react-select";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const libraries = ["places"];

function Header() {
  const navigate = useNavigate();
  const useractive = useLocation();
  console.log("hhhhhh", useractive.pathname);
  const [firstName, setFirstName] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleOption, setScheduleOption] = useState("");
  const [clients, setClients] = useState({
    client: [],
    external_employee: [],
  });
  const [projects, setProjects] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");

  const toggleLanguage = (e, lang) => {
    e.preventDefault();
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    sendLanguageToAPI(lang);
  };
  const sendLanguageToAPI = async (lang) => {
    const token = localStorage.getItem("WorkMen-Token");

    try {
      const response = await axios.patch(
        "auth/language/",
        { selected_language: lang },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Language updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update language:", error);
    }
  };

  const [initialValues, setInitialValues] = useState({
    client: "",
    project: "",
    project_detail: "",
    description: "",
    schedule: "",
    external_employee: "",
    start_date: "",
    end_date: "",
  });

  //  const validationSchema = Yup.object({
  //    client: Yup.string().required("Client is required"),
  //    project: Yup.string().required("project Required"),
  //    project_detail: Yup.string().required("project  detail Required"),
  //    schedule: Yup.string().required("Schedule  Required"),
  //    external_employee: Yup.string().required("project Required"),

  //   //  start_date: Yup.string().required("Please select start date"),
  //   //  end_date: Yup.string().required("Please select end date"),
  //  });
  const validationSchema = Yup.object().shape({
    client: Yup.string().required(t("Client is required")),
    project: Yup.string().required(t("Project is required")),
    project_detail: Yup.string().required(t("Project detail is required")),
    description: Yup.string().required(t("Description is required")),
    schedule: Yup.string().required(t("Schedule is required")),
    // start_date: Yup.date().required("Date is required"),
    // end_date: Yup.date()
    //   .min(Yup.ref("start_date"), "End date can't be before start date")
    //   .required("Required"),
    // times: Yup.string()
    //   .test("is-future-time", function (value) {
    //     const { start_date } = this.parent;
    //     const currentDate = new Date();
    //     const selectedDate = new Date(start_date);

    //     if (selectedDate.toDateString() === currentDate.toDateString()) {
    //       const [hours, minutes] = value.split(":");
    //       const selectedTime = new Date();
    //       selectedTime.setHours(hours, minutes);

    //       if (selectedTime <= currentDate) {
    //         return false;
    //       }
    //     }
    //     return true;
    //   })
    //   .required("Time is required"),
    // external_employee: Yup.string().when("schedule", {
    //   is: "2",
    //   then: Yup.string().required(t("External employee is required")),
    //   otherwise: Yup.string().notRequired(),
    // }),
    // start_date: Yup.date().when("schedule", {
    //   is: "2",
    //   then: Yup.date().required(t("Start Date is required")),
    // }),
    // end_date: Yup.date()
    //   .when("schedule", {
    //     is: "2",
    //     then: Yup.date().required(t("End Date is required")),
    //   })
    //   .test(
    //     "is-greater",
    //     t("End Date should be greater than Start Date"),
    //     function (value) {
    //       const { start_date } = this.parent;
    //       return value && start_date && new Date(value) > new Date(start_date);
    //     }
    //   ),
    // times: Yup.string().when("schedule", {
    //   is: "2",
    //   then: Yup.string().required(t("Start Time is required")),
    // }),
    // e_time: Yup.string()
    //   .when("schedule", {
    //     is: "2",
    //     then: Yup.string().required(t("End Time is required")),
    //   })
    //   .test(
    //     "is-greater",
    //     t("End Time should be greater than Start Time"),
    //     function (value) {
    //       const { times } = this.parent;
    //       return value && times && value > times;
    //     }
    //   ),
  });
  const handleDateChange = (event, setFieldValue) => {
    const selectedDate = event.target.value;
    setFieldValue("start_date", selectedDate);

    setMinDate(selectedDate); // Update minDate for end_date

    const today = new Date().toISOString().split("T")[0];
    if (selectedDate === today) {
      const now = new Date();
      const currentTime = now.toTimeString().split(" ")[0].slice(0, 5);
      setMinTime(currentTime);
    } else {
      setMinTime("00:00");
    }
  };
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData(); // Remove HTML tags
    setEditorData(data);
  };
  let descript = editorData; // Assuming editorData is where your description is stored

  // Condition to strip <p> tags if description starts and ends with <p> and </p>
  if (descript.startsWith("<p>") && descript.endsWith("</p>")) {
    descript = descript.slice(3, -4);
  }

  console.log("oky", descript);
  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("yu",editorData);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = (resetForm) => {
    setModalOpen(false);

    setSelectedClient("");
    setSelectedProjects("");
    setSelectedLocation("");
    setSelectedSubLocation("");
    setScheduleOption("");
    setEditorData("");
    // resetForm();
  };

  const handleScheduleChange = (event) => {
    setScheduleOption(event.target.value);
  };
  useEffect(() => {
    const storedFirstName = localStorage.getItem("name");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  // const onPlaceChanged = () => {
  //   if (autocompleteRef.current !== null) {
  //     const place = autocompleteRef.current.getPlace();
  //     if (place.geometry) {
  //       const lat = place.geometry.location.lat();
  //       const lng = place.geometry.location.lng();
  //       const formattedAddress = place.formatted_address;
  //       console.log("worklocation", formattedAddress);
  //       initialValues.worklocation = formattedAddress;
  //       initialValues.altitude = lat;
  //       initialValues.longtitude = lng;
  //     } else {
  //       console.log(
  //         t("No geometry information available for the selected place.")
  //       );
  //     }
  //   } else {
  //     console.log(t("Autocomplete is not loaded yet!"));
  //   }
  // };
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("WorkMen-Token");
        const response = await axios.get(
          // `workmen/user-list/?lang=${selectedLanguage}`,
          `workmen/user-list/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClients(response.data.data);
        console.log(response.data.data);
      } catch (error) {}
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!selectedClient || !selectedClient.value) return;

      try {
        const token = localStorage.getItem("WorkMen-Token");
        const response = await axios.get(
          `workmen/project-list/?user_id=${selectedClient.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(response.data);
        console.log("ji haa", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [selectedClient]);

  const handleProjectChange = (selectedOption) => {
    setSelectedProjects(selectedOption);
    const project = projects.data.find(
      (project) => project.id === selectedOption.value
    );
    if (project) {
      setSelectedLocation({ value: project.id, label: project.location_name });
      setSelectedSubLocation({
        value: project.id,
        label: project.sub_location_name,
      });
    } else {
      setSelectedLocation(null);
      setSelectedSubLocation(null);
    }
  };

  // const vali
  const onOrder = async (values) => {
    console.log("Form values before submission:", values);

    const token = localStorage.getItem("WorkMen-Token");

    // Adjust values based on the selected schedule
    if (values.schedule === "2") {
      values.start_date = `${values.start_date}T${values.times}`;
      values.end_date = `${values.end_date}T${values.e_time}`;
    }

    values.project = selectedProjects?.value;
    values.client = selectedClient?.value;
    values.schedule = scheduleOption;

    if (values.schedule === "1") {
      // Remove fields not needed for "Work to the Inventory"
      delete values.external_employee;
      delete values.times;
      delete values.end_date;
      delete values.e_time;
      delete values.start_date;
    }

    console.log("Submitting values:", values);

    try {
      const res = await axios.post(`/workmen/create-agenda/`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          text: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.reload();
          navigate("/orders");
          closeModal();
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response ? error.response.data.message : error.message,
        });
      }
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <section>
        <header className="header-section">
          <nav className={isFixed ? "fixed-header" : ""}>
            <div className="nav-area">
              <div className="logo">
                <Link to="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/Image/logo.png`} // Use WebP format if possible
                    alt="logo"
                    width="200" // Set appropriate width
                    height="40" // Set appropriate height
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="abc">
                <ul>
                  <li>
                    <Link
                      to="/sale"
                      className={
                        useractive.pathname == "/sale" ? "userActive" : "heelo"
                      }
                    >
                      {t("Sale")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className={
                        [
                          "/orders",
                          "/planning",
                          "/action",
                          "/gps",
                          "/projects",
                        ].includes(useractive.pathname)
                          ? "userActive"
                          : "heelo"
                      }
                    >
                      {t("Performance")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hour"
                      className={
                        useractive.pathname == "/hour" ? "userActive" : "heelo"
                      }
                    >
                      {t("Hours")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/invoice"
                      className={
                        useractive.pathname == "/invoice"
                          ? "userActive"
                          : "heelo"
                      }
                    >
                      {t("Invoice")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/data"
                      className={
                        useractive.pathname == "/data" ? "userActive" : "heelo"
                      }
                    >
                      {t("Articles")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customers"
                      className={
                        useractive.pathname == "/customers"
                          ? "userActive"
                          : "heelo"
                      }
                    >
                      {t("Relationship")}
                    </Link>
                  </li>
                  <li className="navbar-dropdown">
                    <Link to="#" className="one heelo">
                      {firstName ? `${firstName} ` : ""}
                      <i className="fa fa-chevron-down" aria-hidden="true" />
                    </Link>
                    <div className="dropdown">
                      <Link to="/checklist">{t("CheckList")}</Link>
                      <Link to="/genral">Institution</Link>
                      <Link to="#">Report a Product Requirement</Link>
                      <Link to="/helpcenter">Help Center</Link>
                      <Link to="/logout">{t("Logout")}</Link>
                    </div>
                  </li>
                </ul>
                {/* <Link to="#" className="serch">
                  <i className="fa-solid fa-magnifying-glass" />
                </Link> */}
                <button className="plus" onClick={openModal}>
                  <i className="fa-solid fa-plus" />
                </button>
                <div className="langu">
                  <a>
                    <i className="fa fa-language" aria-hidden="true" />
                    <div className="dropdown">
                      <a
                        href="#"
                        onClick={(e) => toggleLanguage(e, "en")}
                        className={selectedLanguage === "en" ? "selected" : ""}
                      >
                        English
                      </a>
                      <a
                        href="#"
                        onClick={(e) => toggleLanguage(e, "nl")}
                        className={selectedLanguage === "nl" ? "selected" : ""}
                      >
                        Dutch
                      </a>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <section className="mobile-menu">
          <header className="header" id="header">
            <nav className="navbar container fixed-header">
              <div className="navbar-inner">
                <a className="brand">
                  <img src={`${process.env.PUBLIC_URL}/Image/logo.png`} />
                </a>
                <div className="d-flex align-items-center burger-box">
                  <div className="abc">
                    {/* <Link to="#" className="serch">
                      <i className="fa-solid fa-magnifying-glass" />
                    </Link> */}
                    <a href="#" className="plus" onClick={openModal}>
                      <i className="fa-solid fa-plus" />
                    </a>
                    <a href="#" className="langu">
                      <i className="fa fa-language" />
                    </a>
                  </div>
                  <div
                    className={`burger ${isModalOpen ? "is-active" : ""}`}
                    id="burger"
                    onClick={toggleOpenModal}
                  >
                    <span className="burger-line" />
                    <span className="burger-line" />
                    <span className="burger-line" />
                  </div>
                </div>
              </div>
              <div
                className={`navbar-block ${isModalOpen ? "is-active" : ""}`}
                id="menu"
              >
                <ul className="menu">
                  <li className="menu-item">
                    <Link to="/sale" className="menu-link">
                      {t("Sale")}
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/orders" className="menu-link">
                      {t("Performance")}
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/hour" className="menu-link">
                      {t("Hours")}
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/invoice" className="menu-link">
                      {t("Invoices")}
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/data" className="menu-link">
                      {t("Articles")}
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/customers" className="menu-link">
                      {t("Relationship")}
                    </Link>
                  </li>
                  <li className="btn-group menu-item menu-item-dropdown">
                    <Link
                      to="#"
                      type="button"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {firstName ? `${firstName} ` : ""}&nbsp;
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/checklist" className="dropdown-item">
                          {t(" CheckList")}
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/genral" className="dropdown-item">
                          Institution
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-item">
                          Report a Product Requirement
                        </Link>
                      </li>
                      <li>
                        <Link to="/helpcenter" className="dropdown-item">
                          Help Center
                        </Link>
                      </li> */}
                      <li>
                        <Link to="/logout" className="dropdown-item">
                          {t("Logout")}
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </section>
      </section>
      {modalOpen && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onOrder}
        >
          {({
            errors,
            touched,
            values,
            resetForm,
            setFieldValue,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <div
                className={`modal fade ${modalOpen ? "show" : ""}`}
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-modal="true"
                role="dialog"
                style={{ display: "block", paddingLeft: 0 }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        {t("Work Order")}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => closeModal(resetForm)}
                      />
                    </div>
                    <div className="modal-body">
                      <div className="reci">
                        <h4>{t("Recipient")}</h4>
                        <div className="form-group">
                          <Select
                            options={
                              clients?.client?.map((client) => ({
                                value: client.id,
                                label: client.user,
                              })) || []
                            }
                            value={selectedClient}
                            isSearchable
                            placeholder={t("Select your Client")}
                            noOptionsMessage={() => t("No clients found")}
                            onChange={(selectedOptions) => {
                              setFieldValue("client", selectedOptions.value);
                              setSelectedClient(selectedOptions);
                            }}
                            onBlur={handleBlur("client")}
                          />
                          <ErrorMessage
                            name="client"
                            component="div"
                            className="error-message"
                          />
                        </div>
                        <div className="form-group">
                          <Select
                            options={projects?.data?.map((project) => ({
                              value: project.id,
                              label: project.project_name,
                            }))}
                            value={selectedProjects}
                            isSearchable
                            placeholder={t("Select your project")}
                            noOptionsMessage={() => t("No projects found")}
                            onChange={(selectedOptions) => {
                              setFieldValue("project", selectedOptions.value);
                              handleProjectChange(selectedOptions);
                            }}
                            onBlur={handleBlur("project")}
                          />
                          <ErrorMessage
                            name="project"
                            component="div"
                            className="error-message"
                          />
                        </div>
                        <div className="form-group">
                          <Select
                            options={projects?.data?.map((project) => ({
                              value: project.id,
                              label: project.location_name,
                            }))}
                            placeholder={t("Enter Location Name")}
                            value={selectedLocation}
                            onChange={(selectedOption) => {
                              setFieldValue("location", selectedOption.value);
                              setSelectedLocation(selectedOption);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <Select
                            placeholder={t("Enter Sublocation")}
                            options={projects?.data?.map((project) => ({
                              value: project.id,
                              label: project.sub_location_name,
                            }))}
                            value={selectedSubLocation}
                            onChange={(selectedOption) => {
                              setFieldValue(
                                "sub_location",
                                selectedOption.value
                              );
                              setSelectedSubLocation(selectedOption);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            className="form-control"
                            type="text"
                            name="project_detail"
                            placeholder={t("Project detail")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="project_detail"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="orde">
                        <h4>{t("Order")}</h4>
                        <div className="form-group">
                          <Field
                            className="form-control"
                            as="textarea"
                            name="description"
                            placeholder={t("Description")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="Schedule">
                        <h4>{t("Schedule")}</h4>
                        <div className="form-group">
                          <Field
                            as="select"
                            className="first-inp"
                            name="schedule"
                            value={scheduleOption}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFieldValue("schedule", value);
                              setScheduleOption(value);
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="">{t("Schedule*")}</option>
                            <option value="1">
                              {t("Work to the inventory")}
                            </option>
                            <option value="2">
                              {t("Scheduled in the Agenda")}
                            </option>
                          </Field>
                          <ErrorMessage
                            name="schedule"
                            component="div"
                            className="error-message"
                          />
                        </div>

                        {scheduleOption === "2" && (
                          <>
                            <div className="form-group">
                              <Field
                                as="select"
                                name="external_employee"
                                className="first-inp"
                              >
                                <option>{t("Search External Employee")}</option>
                                {clients.external_employee.map(
                                  (external_employee) => (
                                    <option
                                      key={external_employee.id}
                                      value={external_employee.id}
                                    >
                                      {`${external_employee.user} `}
                                    </option>
                                  )
                                )}
                              </Field>
                              <ErrorMessage
                                name="external_employee"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="form-group">
                              <Field
                                className="form-control"
                                type="date"
                                name="start_date"
                                placeholder={t("Start Date")}
                                // onChange={handleChange}
                                onBlur={handleBlur}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(event) =>
                                  handleDateChange(event, setFieldValue)
                                }
                              />
                              <ErrorMessage
                                name="start_date"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="form-group">
                              <Field
                                className="form-control"
                                type="date"
                                name="end_date"
                                placeholder={t("End Date")}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                min={values.start_date || minDate}
                              />
                              <ErrorMessage
                                name="end_date"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="form-group">
                              <Field
                                className="form-control"
                                type="time"
                                name="times"
                                placeholder={t("Start Time")}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <ErrorMessage
                                name="times"
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="form-group">
                              <Field
                                className="form-control"
                                type="time"
                                name="e_time"
                                placeholder={t("End Time")}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <ErrorMessage
                                name="e_time"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      {/* <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => closeModal(resetForm)}
                      >
                        {t("Close")}
                      </button> */}
                      <button type="submit" className="btn btn-primary">
                        {t("Submit")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default Header;
