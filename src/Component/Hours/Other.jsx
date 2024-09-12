import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function Other() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setIsOpen(false);
    }
  };

  const handleRemoveClick = (option) => {
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );
    setSelectedOptions(updatedOptions);
  };

  const initialValues = {
    type: "",
    description: "",
    date: "",
    starttime: "",
    endtime: "",
    pauselength: "",
    addtools: "",
  };

  const onSaved = async (values) => {
    const token = localStorage.getItem("WorkMen-Token");
    let string = values.addtools.join(",");
    values.addtools = string;

    try {
      const res = await axios.post("crafter/appointment/", values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Show success alert if request succeeds
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Appointment saved successfully",
      }).then(() => {
        // Close the modal after 5 seconds
        setTimeout(() => {
          closeModal();
        }, 5000);
      });

      console.log(res);
    } catch (err) {
      // Show error alert if request fails
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save appointment",
      });

      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("WorkMen-Token");
    if (token) {
      fetchData(token);
    }
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await axios.get(
        `crafter/appointment/?lang=${selectedLanguage}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const tools = ["principle", "framer", "photoshop", "Invision"];

  return (
    <div>
      <div className="big-container bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/hour">Hour</Link>
              </li>
              <li>
                <Link to="/other" className="actives">
                  Other Activities
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg my-bots">
        <div className="work-flex">
          <div className="work">
            <h4>Other Activities</h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input type="text" placeholder="To Search" className="ser" />
            </div>
            <div className="input-1">
              <input type="date" id="start" name="trip-start" />
            </div>
            <div className="input-1">
              <input type="date" id="endtime" name="trip-end" />
            </div>
            <div className="input-1">
              <select name="cars" id="cars">
                <option value="volvo">All Professionals</option>
                <option value="saab">Piotr Bednardz</option>
                <option value="saab">Bjorn Goveia</option>
              </select>
            </div>
          </div>
        </div>
      </div>
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
                            <tr onClick={openModal}>
                              <th scope="col" className="pd-right my-padding">
                                Type
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                Description
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                Crb aftsman
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                Date
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                Duration
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data &&
                              data.map((item, index) => (
                                <tr key={index} className="my-bot">
                                  <td className="pd-right">
                                    <Link to="" className="project">
                                      {item.type}
                                    </Link>
                                  </td>
                                  <td className="pd-right">
                                    <Link to="" className="project">
                                      {item.description}
                                    </Link>
                                  </td>
                                  <td className="pd-right">
                                    <Link to="" className="project">
                                      {item.addtools}
                                    </Link>
                                  </td>
                                  <td className="pd-right">
                                    <Link to="" className="project">
                                      {item.starttime.slice(0, 5)} -{" "}
                                      {item.endtime.slice(0, 5)}{" "}
                                    </Link>
                                  </td>
                                  <td className="pd-right">
                                    <Link to="" className="project">
                                      {item.pauselength.slice(0, 5)}
                                    </Link>
                                  </td>
                                  <td>
                                    <Link to="" className="project">
                                      <i className="fa-solid fa-trash" />
                                    </Link>
                                  </td>
                                </tr>
                              ))}
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
      {/* <div className="boths-btn">
        <Link to="">
          <i className="fa-solid fa-chevron-left" />
        </Link>
        <Link to="">
          <i className="fa-solid fa-chevron-right" />
        </Link>
      </div> */}
      <div>
        <div className={`popup ${modalVisible ? "active" : ""}`} id="popup-1">
          <Formik initialValues={initialValues} onSubmit={onSaved}>
            <Form>
              <div className="overlay" />
              <div className="content">
                <div className="close-btn" onClick={closeModal}>
                  ×
                </div>
                <h1 className="ant">Another Appointment</h1>
                <div className="contents-112">
                  <div className="timesheet-1-oth">
                    <Field as="select" name="type">
                      <option value="">Type</option>
                      <option value="Travle Time">Travel Time</option>
                      <option value="Working Time">Working Time</option>
                      <option value="Pause">Pause</option>
                    </Field>
                  </div>
                  <Field
                    id="description"
                    name="description"
                    rows={3}
                    cols={50}
                    className="texts"
                  />
                  <div className="timesheet-flex-1">
                    <div className="input-11-oths">
                      <label className="labels">Date</label>
                      <Field type="date" id="date" name="date" />
                    </div>
                    <div className="input-11-oths">
                      <label className="labels">Start Time</label>
                      <Field type="time" id="starttime" name="starttime" />
                    </div>
                    <div className="input-11-oths">
                      <label className="labels">End Time</label>
                      <Field type="time" id="endtime" name="endtime" />
                    </div>
                    <div className="input-11-oths">
                      <label className="labels">Pause Length</label>
                      <Field type="time" id="pauselength" name="pauselength" />
                    </div>
                  </div>
                  <div className={`selectMultiple ${isOpen ? "open" : ""}`}>
                    <div>
                      <span className={selectedOptions.length ? "hide" : ""}>
                        Add tools
                        <select
                          multiple
                          onChange={(e) => {
                            setSelectedOptions(
                              Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              )
                            );
                            console.log("Selected options:", selectedOptions);
                          }}
                          value={selectedOptions}
                        >
                          {tools.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </span>
                      {selectedOptions.map((option) => (
                        <a
                          key={option}
                          className="notShown shown"
                          onClick={() => handleRemoveClick(option)}
                        >
                          <em>{option}</em>
                        </a>
                      ))}
                      <div className="arrow" onClick={toggleDropdown}></div>
                    </div>
                    {isOpen && (
                      <ul>
                        {tools.map((option) => (
                          <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                          >
                            {selectedOptions.includes(option) ? null : (
                              <a
                                className="remove"
                                onClick={() => handleRemoveClick(option)}
                              >
                                <em>{option}</em>
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="modal-footer my-flex-oth">
                  <button type="reset" className="wids-11 rd">
                    Delete
                  </button>
                  <button type="submit" className="wids-11">
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Other;
