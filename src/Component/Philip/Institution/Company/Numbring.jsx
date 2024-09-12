import React from "react";
import { Link} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";


function Numbring() {
  
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
                <Link to="/pdf">PDF Layouts</Link>
              </li>
              <li>
                <Link to="/apps">App Settings</Link>
              </li>
              <li>
                <Link to="/numbring" className="actives">
                  Numbering
                </Link>
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
              <Formik>
                <Form>
                  <div className="compan">
                    <h4>Company Details</h4>
                    <p>
                      Here you will find the templates for the different number
                      series.
                    </p>
                    <Link to="/legends">Legend</Link>
                    <button type="submit" style={{ cursor: "pointer" }}>
                      Save
                    </button>{" "}
                  </div>
                  <div className="mt-4">
                    <label className="mt-13">Work order</label>
                    <Field
                      type="text"
                      placeholder="W{nummer}"
                      className="work-input"
                    />
                    <h4 className="head-4">Example: 000001</h4>
                  </div>
                  <div className="mt-4">
                    <label className="mt-13">Customer</label>
                    <Field
                      type="text"
                      placeholder="K{nummer}"
                      className="work-input"
                    />
                    <h4 className="head-4">Example: 000001</h4>
                  </div>
                  <div className="mt-4">
                    <label className="mt-13">Project</label>
                    <Field
                      type="text"
                      placeholder="P{nummer}"
                      className="work-input"
                    />
                    <h4 className="head-4">Example: 000001</h4>
                  </div>
                  <div className="mt-4">
                    <label className="mt-13">Quotation</label>
                    <Field
                      type="text"
                      placeholder="O{nummer}"
                      className="work-input"
                    />
                    <h4 className="head-4">Example: 000001</h4>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Numbring;
