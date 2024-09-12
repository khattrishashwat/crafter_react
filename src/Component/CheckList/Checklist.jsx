import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function Checklist() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchClient, setSearchClient] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    name: "",
    checklists: [
      {
        question: "",
        answer: "",
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    checklists: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        answer: Yup.string().required("Choices are required"),
      })
    ),
  });

  const getToken = () => {
    const token = localStorage.getItem("WorkMen-Token");
    if (!token) {
      console.error(t("error: No token found"));
      return null;
    }
    return token;
  };

  const Check = async (value) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await axios.post("workmen/checklist/", value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        closeModal();
        fetchData();
      }
    } catch (error) {
      console.error("Error during checklist request:", error);
    }
  };

  const fetchData = async () => {
    const token = getToken();
    if (!token) return;

    try {
      let response;
      if (searchClient) {
        console.log("Fetching filtered data");
        response = await axios.get(
          `workmen/checklist/?search=${searchClient}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        console.log("Fetching all data");
        setIsLoading(true);
        response = await axios.get(
          `workmen/checklist/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response && response.data && response.data.data) {
        setCheckList(response.data.data);
      } else {
        console.error(t("error: Invalid response structure"), response);
      }
    } catch (error) {
      console.error(t("error: Fetching Data"), error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchClient, t]);

  const TypeChange = (index, setFieldValue) => (event) => {
    const { value } = event.target;
    setFieldValue(`checklists[${index}].answer`, value); // Update 'answer' field
  };

  const CheckDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are sure to delete the checklist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        console.log("Deleting item with id:", id);
        const token = localStorage.getItem("WorkMen-Token");

        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        const payload = { id };
        await axios.delete("workmen/checklist/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: payload,
        });

        fetchData(); // Call after successful delete
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire(
          "Error!",
          "There was an error deleting the checklist.",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <div className="big-containe">
        <div className="small-container">
          <div className="Institution-main-parent checklist-grid">
            <div className="Institution-grid-2 bg">
              <div className="compan">
                <h4 className="mt-41">{t("Additional modules")}</h4>
                <div className="user-flex">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#add-pdf-template"
                    onClick={openModal}
                  >
                    {t("Add")}
                  </a>
                  <input
                    type="text"
                    placeholder="Search with CheckList Name"
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                    className="users"
                  />
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
                                      <th scope="col">{t("Name")}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {isLoading ? (
                                      <tr>
                                        <td colSpan="8" className="text-center">
                                          <Loader />
                                        </td>
                                      </tr>
                                    ) : checkList.length > 0 ? (
                                      checkList.map((item, index) => (
                                        <tr key={index}>
                                          <td className="projects fnt">
                                            {item.name}
                                            <span className="float-end">
                                              <i
                                                className="fa fa-trash"
                                                onClick={() => {
                                                  CheckDelete(item.id);
                                                }}
                                              />
                                            </span>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="8" className="text-center">
                                          No Check list Found
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
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal1 checklist ${isModalOpen ? "show" : ""}`}
        id="add-pdf-template"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-pdf-template"
        aria-hidden="true"
        style={{ display: isModalOpen ? "block" : "none" }}
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
            <div className="modal-body">
              <div className="checklist-popup">
                <div className="heading">
                  <h5>{t("Checklist")}</h5>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={Check}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="input-1 work-order">
                      <label htmlFor="name">{t("Name")}</label>
                      <Field type="text" id="name" name="name" placeholder="" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="checklist-instruction">
                      <p className="mb-3">
                        {t(
                          "Set your own checklists here. Fill in question, and then choose the type of answer the user should be able to answer enter."
                        )}
                      </p>
                      <p>{t("Dividing the checklist into subheadings")}</p>
                      <p className="mb-3">
                        {t(
                          "To keep large checklists organized, you can work with subheadings. Add a line and type in the question statement-field the title of your interhead. Then choose 'title header' as the answer type."
                        )}
                      </p>
                      <p>{t("Own selection choice")}</p>
                      <p>
                        {t(
                          "If you choose the selection choice answer type, you can define the answers that the user can select. This you then enter choices in the 'selection choices' field. Separate these choices by means of comma."
                        )}
                      </p>
                    </div>
                    <FieldArray name="checklists">
                      {(arrayHelpers) => (
                        <div className="checklist-field">
                          {values.checklists.map((checklist, index) => (
                            <div
                              key={index}
                              className="checklist-option customer_records"
                            >
                              <span>
                                <i className="fa-solid fa-bars" />
                              </span>
                              <div className="input-1 work-order">
                                <label
                                  htmlFor={`checklists[${index}].question`}
                                >
                                  {t("Question statement*")}
                                </label>
                                <Field
                                  type="text"
                                  id={`checklists[${index}].question`}
                                  name={`checklists[${index}].question`}
                                  placeholder={t(
                                    "Is everything finished to your liking?"
                                  )}
                                />
                                <ErrorMessage
                                  name={`checklists[${index}].question`}
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="input-1 work-order">
                                <label htmlFor={`checklists[${index}].answer`}>
                                  {t("Type of answer*")}
                                </label>
                                <Field
                                  as="select"
                                  id={`checklists[${index}].answer`}
                                  name={`checklists[${index}].answer`}
                                  onChange={TypeChange(index, setFieldValue)}
                                >
                                  <option>{t("Select th option")}</option>
                                  <option value="Yes">{t("Yes")}</option>
                                  <option value="No">{t("No")}</option>
                                  <option value="Other">{t("Other")}</option>
                                </Field>
                                <ErrorMessage
                                  name={`checklists[${index}].answer`}
                                  component="div"
                                  className="error"
                                />
                              </div>

                              {values.checklists[index].answer === "Other" && (
                                <div className="input-1 work-order">
                                  <label
                                    htmlFor={`checklists[${index}].selection`}
                                  >
                                    {t("Selection choices")}
                                  </label>
                                  <Field
                                    type="text"
                                    id={`checklists[${index}].selection`}
                                    name={`checklists[${index}].selection`}
                                    placeholder=""
                                  />
                                  <ErrorMessage
                                    name={`checklists[${index}].selection`}
                                    component="div"
                                    className="error"
                                  />
                                </div>
                              )}
                              {index > 0 && (
                                <a
                                  type="button"
                                  className="remove-field btn-remove-customer"
                                  onClick={() => arrayHelpers.remove(index)}
                                />

                                // </button>
                              )}
                            </div>
                          ))}
                          <span
                            className="extra-fields-customer add-new mb-3"
                            onClick={() =>
                              arrayHelpers.push({
                                question: "",
                                choices: ["Yes", "No", "Other"],
                              })
                            }
                          >
                            {t("+ New rule")}
                          </span>
                        </div>
                      )}
                    </FieldArray>
                    <button type="submit" className="btn btn-primary">
                      {t("Save")}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checklist;
