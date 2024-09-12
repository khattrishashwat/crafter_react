import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select";

function Genral() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("");

  const [initialValues, setInitialValues] = useState({
    company_name: "",
    street: "",
    postal_code: "",
    location: "",
    place: "",
    mobile: "",
    email: "",
    website: "",
    image: "",
  });

  const [companyImagePreview, setCompanyImagePreview] = useState(
    "images/user_icon.jpg"
  );

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setCompanyImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [isExistingRecord, setIsExistingRecord] = useState(false); // Track if it's a PATCH or POST request

  // Fetch initial data (GET API)
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("WorkMen-Token");

      try {
        const response = await axios.get(`auth/update_profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          console.log("data", data);

          setInitialValues(data); // Set fetched data as initial values
          setIsExistingRecord(true); // Set to PATCH
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setIsExistingRecord(false); // No data, will trigger POST
        }
      }
    };

    fetchData();
  }, []);
  const onCompany = async (values) => {
    const token = localStorage.getItem("WorkMen-Token");
    const url = `auth/update_profile/`; // Adjust URL as needed

    try {
      const formData = new FormData();
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      const response = await axios({
        method: isExistingRecord ? "put" : "post",
        url: url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          text: response.data.message, // Adjust message handling as needed
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/genral" className="actives">
                  General
                </Link>
              </li>
              <li>
                <Link to="/schedule">Schedule</Link>
              </li>
              <li>
                <Link to="/work">Work Order</Link>
              </li>
              <li>
                <Link to="/email">E-mail</Link>
              </li>
              <li>
                <Link to="/qoutes">Quotes, orders and invoices</Link>
              </li>
              <li>
                <Link to="/pdf">PDF Layouts</Link>
              </li>
              <li>
                <Link to="/apps">App Settings</Link>
              </li>
              <li>
                <Link to="/numbring">Numbering</Link>
              </li>
              <li>
                <Link to="/oher">Remainder</Link>
              </li>
              <li>
                <Link to="/quick">Quickstart</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="big-containe">
        <div className="small-container">
          <div className="Institution-main-parent">
            <div className="Institution-grid-1 bg">
              <Link to="/genral" className="company details">
                <div className="unser-heads">
                  <h5 className="main-clr">Company Details</h5>
                  <i className="fa-solid fa-chevron-right main-clr" />
                </div>
              </Link>
              <Link to="/fgenral" className="company">
                <div className="unser-heads">
                  <h5>Functions</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/activeuser" className="company">
                <div className="unser-heads">
                  <h5>User Accounts</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/master" className="company">
                <div className="unser-heads">
                  <h5>Master Data</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/additional" className="company">
                <div className="unser-heads">
                  <h5>Additional Modules</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/import" className="company">
                <div className="unser-heads">
                  <h5>Import Data</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
            </div>

            <div className="Institution-grid-2 bg">
              <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={onCompany}
              >
                {({ setFieldValue, errors, touched }) => (
                  <Form>
                    <div className="compan">
                      <h4>Company Information</h4>
                      <p>
                        Fill in your company details here and upload a logo.
                        These will appear on your work order.
                      </p>
                      <button type="submit" style={{ cursor: "pointer" }}>
                        Save
                      </button>{" "}
                    </div>
                    <div className="compan-mid">
                      <div>
                        <label>Branch name</label>
                        <Field type="text" name="company_name" />
                      </div>
                      <div>
                        <label>Street + House number</label>
                        <Field type="text" name="street" />
                      </div>
                      <div className="frm-boths">
                        <div>
                          <label>Zip Code</label>
                          <Field
                            type="text"
                            name="postal_code"
                            className="comp-edit"
                          />
                        </div>
                        <div>
                          <label>City</label>
                          <Field
                            type="text"
                            name="place"
                            className="comp-edit-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label>Country</label>
                        <ReactFlagsSelect
                          selected={selected}
                          onSelect={(code) => {
                            setSelected(code);
                            setFieldValue("location", code); // Update Formik field value
                          }}
                          placeholder="Select Country"
                          searchable
                          searchPlaceholder="select countries"
                        />
                      </div>
                      <div>
                        <label>Telephone Number</label>
                        <Field type="text" name="mobile" />
                      </div>
                      <div>
                        <label>E-mail Address</label>
                        <Field type="email" name="email" />
                      </div>
                      <div>
                        <label>Website</label>
                        <Field type="text" name="website" />
                      </div>
                    </div>
                    <div className="logo-link">
                      <h4>Logo</h4>
                    </div>
                    <div className="logo-cents">
                      <img
                        src={companyImagePreview}
                        alt="Company Logo Preview"
                      />
                    </div>
                    <div className="file-upload">
                      <label htmlFor="upload" className="file-upload__label">
                        Upload File
                      </label>
                      <input
                        id="upload"
                        className="file-upload__input"
                        type="file"
                        name="profile_image"
                        accept=".png, .jpg, .jpeg"
                        onChange={(event) =>
                          handleFileChange(event, setFieldValue)
                        }
                      />
                    </div>
                    <p className="last-para-comp">
                      Tip! Provide a .PNG file with a transparent background,
                      and always click save after editing.
                    </p>
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

export default Genral;
