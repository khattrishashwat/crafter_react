import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

function Work() {
  const [initialValues, setInitialValues] = useState({
    date_and_time: "",
    working_hours: "",
    travel_times: "",
    pause: "",
    urgency: "",
    show_planned_activities_on_pdf: "",
    show_time_at_fixed_price: "",
    display_payment_details_on_work_receipt: "",
    standard_settle_method: "",
    standard_footer_workbone: "",
    work_receipt_pdf_language: "",
  });

  const [isExistingRecord, setIsExistingRecord] = useState(false); // Track if it's a PATCH or POST request

  // Fetch initial data (GET API)
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("WorkMen-Token");

      try {
        const response = await axios.get(`workmen/work-receipt/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data.data[0];
          console.log("data1", data);

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

  // Handle form submission (POST/PATCH API)
  const WorkRecipt = async (values) => {
    const token = localStorage.getItem("WorkMen-Token");
    const url = `workmen/work-receipt/`;

    try {
      const response = await axios({
        method: isExistingRecord ? "patch" : "post",
        url: url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          text: response.data,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response ? error.response.data.message : error.message,
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
                <Link to="/genral">General</Link>
              </li>
              <li>
                <Link to="/schedule">Schedule</Link>
              </li>
              <li>
                <Link to="/work" className="actives">
                  Work Order
                </Link>
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
                onSubmit={WorkRecipt}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="compan">
                      <h4>Company Information</h4>
                      <p>
                        These settings allow you to control which data you do or
                        don't want to show of them on your work orders.
                      </p>
                      <button type="submit" style={{ cursor: "pointer" }}>
                        Save
                      </button>
                    </div>
                    <div className="compan-mid radioconetnt22">
                      <div>
                        <label>Date and time</label>
                      </div>
                      <div>
                        <Field
                          as="select"
                          className="selects"
                          name="date_and_time"
                        >
                          <option value="1">Show Date and Time</option>
                          <option value="2">Do not show times</option>
                          <option value="3">Show total time only</option>
                          <option value="4">Show date only</option>
                        </Field>
                      </div>
                      <div className="">
                        <label>Working Hours</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="working_hours"
                            value="true"
                          />{" "}
                          <p>Render</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="working_hours"
                            value="false"
                          />{" "}
                          <p>Don't Show</p>
                        </div>
                      </div>
                      <div className="">
                        <label>Working Hours</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="travel_times"
                            value="true"
                          />{" "}
                          <p>Render</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="travel_times"
                            value="false"
                          />{" "}
                          <p>Don't Show</p>
                        </div>
                      </div>
                      <div className="">
                        <label>Break</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field type="radio" name="pause" value="true" />{" "}
                          <p>Render</p>
                        </div>
                        <div className="d-flex ">
                          <Field type="radio" name="pause" value="false" />{" "}
                          <p>Don't Show</p>
                        </div>
                      </div>
                      <div className="">
                        <label>Urgency</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field type="radio" name="urgency" value="true" />{" "}
                          <p>Render</p>
                        </div>
                        <div className="d-flex ">
                          <Field type="radio" name="urgency" value="false" />{" "}
                          <p>Don't Show</p>
                        </div>
                      </div>
                      <div className="">
                        <label>Show all planned activities on the PDF</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="show_planned_activities_on_pdf"
                            value="true"
                          />{" "}
                          <p>Render</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="show_planned_activities_on_pdf"
                            value="false"
                          />{" "}
                          <p>Don't Show</p>
                        </div>
                      </div>
                      <div className="">
                        <label>Show times at fixed price</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="show_time_at_fixed_price"
                            value="true"
                          />{" "}
                          <p>Render</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="show_time_at_fixed_price"
                            value="false"
                          />{" "}
                          <p>Don't Show</p>
                        </div>
                      </div>
                      <div className="">
                        <label>View payment details on work order</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="display_payment_details_on_work_receipt"
                            value="true"
                          />{" "}
                          <p>Render</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="radio"
                            name="display_payment_details_on_work_receipt"
                            value="false"
                          />{" "}
                          <p>Don't Show</p>
                        </div>
                      </div>
                      <div>
                        <label>Default checkout method</label>
                      </div>
                      <div>
                        <Field
                          as="select"
                          className="selects"
                          name="standard_settle_method"
                        >
                          <option value="1">Fixed Price</option>
                          <option value="2">
                            Actual Calculation/Direction
                          </option>
                        </Field>
                      </div>
                      <div>
                        <label>Standard work order footer</label>
                      </div>
                      <div className="mb-4">
                        <Field
                          as="textarea"
                          className="textareas-1 mt-3"
                          name="standard_footer_workbone"
                        />
                      </div>
                      <div>
                        <label>Work order PDF language</label>
                      </div>
                      <div>
                        <Field
                          as="select"
                          className="selects"
                          name="work_receipt_pdf_language"
                        >
                          <option value="1">Dutch</option>
                          <option value="2">English</option>
                        </Field>
                      </div>
                    </div>
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

export default Work;
