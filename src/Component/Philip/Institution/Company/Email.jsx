import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

function Email() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
                <Link to="/work">Work Order</Link>
              </li>
              <li>
                <Link to="/email" className="actives">
                  E-mail
                </Link>
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
            <div className="">
              <div className="Institution-grid-2 bg mb-3 radioconetnt22">
                <Formik>
                  <Form>
                    <div className="compan">
                      <h4>E-mail settings</h4>
                      <p>
                        Set here how you want the eamil to be sent from the
                        package.
                      </p>
                      <button type="submit" style={{ cursor: "pointer" }}>
                        Save
                      </button>{" "}
                    </div>
                    <div className="compan-midnew compan-mid ">
                      <div className="">
                        <label>E-mail a copy of the work order</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field type="radio" name="yes" defaultChecked="" />
                          <p>Manual after checking</p>
                        </div>
                        <div className="d-flex ">
                          <Field type="radio" name="yes" />
                          <p>Automatically after completion</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="compan-midnew compan-mid ">
                      <div className="">
                        <label>E-mail work order to</label>
                      </div>
                      <div className="radioconetnt">
                        <div className="d-flex ">
                          <Field
                            type="checkbox"
                            className="remove"
                            name="Check1"
                            defaultValue="Value1"
                          />
                          <p className="">General e-mail address client</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="checkbox"
                            className="remove"
                            name="Check12"
                            defaultValue="Value1"
                          />
                          <p className="">Main contact person client</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="checkbox"
                            className="remove"
                            name="Check3"
                            defaultValue="Value1"
                          />
                          <p className="">On-site contact person</p>
                        </div>
                        <div className="d-flex ">
                          <Field
                            type="checkbox"
                            className="remove"
                            name="Check4"
                            defaultValue="Value1"
                          />
                          <p className="">Your own administration e-mail </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="compan-midnew compan-mid ">
                      <div className="">
                        <label>Your administration e-mail address</label>
                      </div>
                      <div className="radioconetnt">
                        <Field type="email" placeholder="philip@yopmail.com" />
                      </div>
                    </div>
                    <hr />
                    <div className="compan-midnew compan-mid ">
                      <div className="">
                        <label>Outgoing e-mail address</label>
                      </div>
                      <div className="radioconetnt">
                        <Field
                          type="email"
                          placeholder="info"
                          width=""
                          style={{ width: 240 }}
                        />{" "}
                      </div>
                    </div>
                    <div className="compan-midnew compan-mid ">
                      <div className="" />
                      <div className="">
                        <p>
                          This e-mail address will be used to send e-mails from
                          your Crafter environment. Your customer will see this
                          e-mail address. Because this e-mail address is
                          registered with us, we prevent your e-mails from
                          ending up in the SPAM box of your addressee. With the
                          field above you can personalize this e-mail address,
                          for example by entering your company name.
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="compan-midnew compan-mid ">
                      <div className="">
                        <label>E-mail font</label>
                      </div>
                      <div className="">
                        <select>
                          <option value="">Arial</option>
                          <option value="">Calibri</option>
                        </select>
                      </div>
                      <div className="" />
                      <div className="mt-4">
                        <p>
                          Fonts in emails depend on the email program and the
                          fonts available on the recipient's computer. As a
                          result, the email may not be displayed in the selected
                          font.
                        </p>
                      </div>
                      <div className="">
                        <label>E-mail letter format</label>
                      </div>
                      <div className="">
                        <Field type="email" placeholder={1.0} />
                      </div>
                    </div>
                    <hr />
                    <div className="compan-midnew compan-mid ">
                      <div className="">
                        <label>Your own e-mail domain</label>
                      </div>
                      <div className="">
                        <Field type="email" placeholder=".in" />
                      </div>
                      <div className="" />
                      <div className="mt-4">
                        <p>
                          If you want to use your own sending domain, a number
                          of records must be added to the DNS settings at your
                          hosting provider. Once you have entered and saved the
                          domain here, these required records will be listed
                          below.
                        </p>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
              <div className="Institution-grid-2 bg">
                <div className="compan">
                  <h4>E-mail Templates</h4>
                  <p>
                    Set up your e-mail templates here, for example for mailing
                    the copy of the work order, an appointment confirmation, or
                    reporting completion.
                  </p>
                  <a onClick={openModal} style={{ cursor: "pointer" }}>
                    Add
                  </a>
                </div>
                <table className="table table-responsive">
                  <thead className="my-thead-1">
                    <tr>
                      <th>Name</th>
                      <th>Kind</th>
                      <th>Subject</th>
                      <th>Mesaage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Philip</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        // className="modal fade show"
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="add-email-template"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-email-template"
        aria-hidden={!isModalOpen}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add-email-template">
                Email Template
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <Formik>
              {({ setFieldValue, errors, touched }) => (
                <Form>
                  <div className="modal-body">
                    <div>
                      <Field
                        type="text"
                        name="templateName"
                        placeholder="Template Name*"
                        className="first-inp"
                      />
                      {errors.templateName && touched.templateName && (
                        <div className="error">{errors.templateName}</div>
                      )}
                    </div>
                    <div className="reci">
                      <Field as="select" name="type" className="first-inp">
                        <option value="">Select type</option>
                        <option value="type1">type1</option>
                        <option value="type2">type2</option>
                      </Field>
                      {errors.type && touched.type && (
                        <div className="error">{errors.type}</div>
                      )}
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="subject"
                        placeholder="Subject*"
                        className="first-inp"
                      />
                      {errors.subject && touched.subject && (
                        <div className="error">{errors.subject}</div>
                      )}
                    </div>
                    <div className="reci">
                      <Field as="select" name="tag" className="first-inp">
                        <option value="">Select tag</option>
                        <option value="tag1">tag1</option>
                        <option value="tag2">tag2</option>
                      </Field>
                      {errors.tag && touched.tag && (
                        <div className="error">{errors.tag}</div>
                      )}
                    </div>
                    <div>
                      <Field
                        as="textarea"
                        rows={3}
                        name="message"
                        placeholder="Message*"
                        className="first-inp"
                      />
                      {errors.message && touched.message && (
                        <div className="error">{errors.message}</div>
                      )}
                    </div>
                    <div>
                      <label>Upload attachment</label>
                      <input
                        type="file"
                        name="attachment"
                        className="first-inp"
                        onChange={(event) => {
                          setFieldValue(
                            "attachment",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      {errors.attachment && touched.attachment && (
                        <div className="error">{errors.attachment}</div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Save
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

export default Email;
