import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";

function PDF() {
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
                <Link to="/email">E-mail</Link>
              </li>
              <li>
                <Link to="/qoutes">Quotes, orders and invoices</Link>
              </li>
              <li>
                <Link to="/pdf" className="actives">
                  PDF Layouts
                </Link>
              </li>
              <li>
                <Link to="/apps">App Settings</Link>
              </li>
              <li>
                <Link to="/number">Numbering</Link>
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
              <div className="compan">
                <h4>Company Information</h4>
                <button className="btn btn-down">Download legend</button>
                <p>Add custom PDF layouts for the different...</p>
                <a onClick={openModal} style={{ cursor: "pointer" }}>
                  <i className="fa-solid fa-plus" />
                  &nbsp;&nbsp;Add
                </a>
              </div>
              <div className="compan-midd">
                <form>
                  <input
                    type="text"
                    className="w-100 input-1"
                    placeholder="Seek"
                  />
                </form>
              </div>
              <section className="intro mt-4">
                <div className="card shadow-2-strong">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <thead className="my-thead-1">
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Document type</th>
                            <th scope="col">Template file</th>
                          </tr>
                        </thead>
                        <tbody className="myies">
                          <tr className="cr-table-no-results">
                            <td colSpan={10}>
                              <p className="cr-p-l mb-0 cr-textcolor-darkgray">
                                No order found
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${isModalOpen ? "show" : ""}`}
        id="add-pdf-template"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-pdf-template"
        aria-hidden={!isModalOpen}
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add-pdf-template">
                PDF Layout
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
                      <label className="mb-2">Name</label>
                      <Field
                        type="text"
                        placeholder="Template Name*"
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="reci">
                      <label className="mb-2">Document Type</label>
                      <Field as="select" className="first-inp mt-0 mb-2">
                        <option>Select type</option>
                        <option>Checklist</option>
                      </Field>
                    </div>
                    <div>
                      <label className="mb-2">Template file (docx*)</label>
                      <Field
                        type="file"
                        placeholder="upload file"
                        className=" mb-2 mt-0 first-inp"
                      />
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

export default PDF;
