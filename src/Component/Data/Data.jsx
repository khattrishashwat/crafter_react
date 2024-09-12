import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

function Data() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [airt, setAirt] = useState();
  const [arts, setArts] = useState("");
  const [vats, setVats] = useState({ data: [] });
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [showServiceObjectType, setShowServiceObjectType] = useState(false);

  const handleCheckboxChange = (e) => {
    setShowServiceObjectType(e.target.checked);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = (resetForm) => {
    resetForm();
    setIsModalOpen(false);
  };

  const initialValues = {
    name: "",
    brand: "",
    definition: "",
    article_number: "",
    ean: "",
    article_group: "",
    unit: "",
    image: null,
    selling_price: "",
    cost: "",
    is_service: false,
    rate: "all",
    gla_sale: "",
    gla_expense: "",
    dependent_article: "",
    optional_article: "",
    combination_product: "",
  };

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    brand: Yup.string().required("Brand is required"),
    definition: Yup.string().required("Definition is required"),
    article_number: Yup.string().required("Article Number is required"),
    ean: Yup.string().required("EAN is required"),
    image: Yup.mixed()
      .required("Photograph is required")
      .test("fileFormat", "Use Only png,jpg,jpeg", (value) =>
        value ? SUPPORTED_FORMATS.includes(value.type) : true
      ),
    article_group: Yup.string().required("Article Group is required"),
    unit: Yup.string().required("Unit is required"),
    selling_price: Yup.string().required("Selling Price is required"),
    cost: Yup.string().required("Cost is required"),
  });

  const onAirtes = async (values) => {
    const token = localStorage.getItem("WorkMen-Token");

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    try {
      const response = await axios.post("workmen/article/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article is added successfully!",
          timer: 1000,
        }).then(() => {
          closeModal();
        });
        await fetchData(); // Wait for fetchData to complete before setting isLoading to false
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Server error. Please try again later.",
      });
    }
  };
  const Schemass = Yup.object({
    percentage: Yup.number()
      .required(t("Percentage is required"))
      .typeError(t("Percentage must be a number")),
    article_group: Yup.string().required(t("Article Group is required")),
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response;
      if (arts) {
        response = await axios.get(`workmen/article/?search=${arts}`);
      } else {
        response = await axios.get(`workmen/article/`);
      }
      setAirt(response.data.data || []); // Default to empty array if data is undefined
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [arts, t]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const articles = (Array.isArray(airt) ? airt : []).slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Calculate total pages
  const totalPages = Math.ceil(
    (Array.isArray(airt) ? airt.length : 0) / postsPerPage
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
    setArts(value);
  };

  const Vats = async (values) => {
    const token = localStorage.getItem("WorkMen-Token");
    try {
      const response = await axios.post("workmen/vat/", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Article is added successfully!",
          timer: 1000,
        }).then(() => {
          closeModal();
        });
        await fetchData(); // Wait for fetchData to complete before setting isLoading to false
        console.log(response.data);
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Server error. Please try again later.",
      });
    }
  };

  useEffect(() => {
    const fetchVats = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("WorkMen-Token");
        const response = await axios.get(`workmen/vat/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("YES1", response.data);
        setVats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setIsLoading(false);

      }
    };

    fetchVats();
  }, []);

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/data" className="actives">
                  {t("Articles")}
                </Link>
              </li>
              <li>
                <Link to="/subcodinator">Subcontactors</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg my-bots">
        <div className="work-flex">
          <div className="work">
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search with Article Number & Name")}
                className="ser"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="fields">
            <a
              href=""
              data-bs-toggle="modal"
              data-bs-target="#add-price"
              className="add"
              onClick={openModal}
            >
              {t("Price")}
            </a>
            <a
              href=""
              data-bs-toggle="modal"
              data-bs-target="#add-article"
              className="add"
              onClick={openModal}
            >
              {t("Add")}
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
                                  {t("Name")}
                                </th>
                                {/* <th scope="col" className="pd-right my-padding">
                                  {t("Brand")}
                                </th> */}
                                <th scope="col" className="pd-right my-padding">
                                  {t("Article Group")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Article Number")}
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  {t("Selling Price")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="myies">
                              {isLoading ? (
                                <tr>
                                  <td colSpan="8" className="text-center">
                                    <Loader />
                                  </td>
                                </tr>
                              ) : articles.length > 0 ? (
                                articles.map((item, index) => (
                                  <tr className="my-bot" key={index}>
                                    <td className="pd-right">
                                      <a className="project">{item.name}</a>
                                    </td>
                                    {/* <td className="pd-right">
                                      <a className="project">{item.brand}</a>
                                    </td> */}
                                    <td className="pd-right">
                                      <a className="project">
                                        {item.article_group}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {item.article_number}
                                      </a>
                                    </td>
                                    <td className="pd-right">
                                      <a className="project">
                                        {item.selling_price}
                                      </a>
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

      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="add-price"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-price"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <Formik
              initialValues={{ percentage: "", article_group: "" }}
              validationSchema={Schemass}
              onSubmit={Vats}
            >
              {({ resetForm }) => (
                <Form>
                  <div className="modal-header">
                    <h5 className="modal-title" id="add-price">
                      {t("Price")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => closeModal(resetForm)}
                    />
                  </div>
                  <div className="modal-body">
                    <div>
                      <label className="mb-2">{t("Percentage")}</label>
                      <Field
                        type="text"
                        name="percentage"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                      />
                      <ErrorMessage
                        name="percentage"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="reci">
                      <label className="mb-2">{t("Article Group")}</label>
                      <Field
                        type="text"
                        name="article_group"
                        placeholder={t("Enter Article Group Name")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="article_group"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      {t("Save")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="add-article"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-article"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validation}
              onSubmit={onAirtes}
            >
              {({ setFieldValue, resetForm }) => (
                <Form>
                  <div className="modal-header">
                    <h5 className="modal-title" id="add-article">
                      {t("Articles")}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => closeModal(resetForm)}
                    />
                  </div>
                  <div className="modal-body">
                    <div>
                      <label className="mb-2">{t("Name")}*</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Branches / Brands")}*</label>
                      <Field
                        type="text"
                        name="brand"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="brand"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Definition")}*</label>
                      <Field
                        type="text"
                        name="definition"
                        as="textarea"
                        rows={2}
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="definition"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Article Number")}*</label>
                      <Field
                        type="text"
                        name="article_number"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="article_number"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("EAN")}*</label>
                      <Field
                        type="text"
                        name="ean"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="ean"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Photograph")}*</label>
                      <input
                        type="file"
                        name="image"
                        className="first-inp mt-0 mb-2"
                        onChange={(e) =>
                          setFieldValue("image", e.target.files[0])
                        }
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="reci">
                      <label className="mb-2">{t("Article Group")}*</label>
                      <Field
                        as="select"
                        name="article_group"
                        className="first-inp mt-0 mb-2"
                      >
                        <option>{t("All Articles")}</option>
                        {vats?.data?.map((article_group) => (
                          <option
                            key={article_group.id}
                            value={article_group.id}
                          >
                            {article_group.article_group}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="article_group"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Unit")}*</label>
                      <Field
                        type="text"
                        name="unit"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="unit"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Selling Price")}*</label>
                      <Field
                        type="text"
                        name="selling_price"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="selling_price"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Purchase Price")}*</label>
                      <Field
                        type="text"
                        name="cost"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                      <ErrorMessage
                        name="cost"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <label className="mb-2">{t("Service Object")}</label>
                      <Field
                        type="checkbox"
                        name="is_service"
                        className="mt-0 mb-2"
                        onChange={handleCheckboxChange}
                      />
                    </div>

                    {showServiceObjectType && (
                      <div>
                        <label className="mb-2">
                          {t("Service object type*")}
                        </label>
                        <Field
                          as="select"
                          name="object"
                          className="first-inp mt-0 mb-2"
                        >
                          <option value="">{t("All types")}</option>
                          {/* Add other options here */}
                        </Field>
                      </div>
                    )}
                    <div>
                      <label className="mb-2">{t("VAT rate*")}</label>
                      <Field
                        type="text"
                        name="Vat_rate"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                    </div>
                    <div>
                      <label className="mb-2">
                        {t("General ledger account (Sales)")}
                      </label>
                      <Field
                        type="text"
                        name="gla_sale"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                    </div>
                    <div>
                      <label className="mb-2">
                        {t("General ledger account (Costs)")}
                      </label>
                      <Field
                        type="text"
                        name="gla_expense"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Dependent Articles")}</label>
                      <Field
                        type="text"
                        name="dependent_article"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                    </div>
                    <div>
                      <label className="mb-2">{t("Optional Items")}</label>
                      <Field
                        type="text"
                        name="optional_article"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                    </div>
                    <div>
                      <label className="mb-2">
                        {t("Combination Products")}
                      </label>
                      <Field
                        type="text"
                        name="combination_product"
                        placeholder={t("Enter Here")}
                        className="first-inp mt-0 mb-2"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      // disabled={isSubmitting}
                    >
                      {t("Save")}
                      {/* {isSubmitting ? t("Submitting") : t("Save")} */}
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

export default Data;
