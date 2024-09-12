import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik,Form,Field } from "formik";


function Oher() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
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
                <Link to="/pdf">PDF Layouts</Link>
              </li>
              <li>
                <Link to="/apps">App Settings</Link>
              </li>
              <li>
                <Link to="/numbring">Numbering</Link>
              </li>
              <li>
                <Link to="/oher" className="actives">
                  Remainder
                </Link>
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
                      Here you will find other settings in the environment, such
                      as number sequences.
                    </p>
                    <a href="">Save</a>
                  </div>
                  <div>
                    <label className="working-12">Timeline view</label>
                    <Field as='select' className="selects">
                      <option>Everything</option>
                      <option>Updates</option>
                      <option>Actions</option>
                      <option>Notes</option>
                      <option>Email</option>
                    </Field>
                  </div>
                  <div className="mt-3">
                    <label className="working-12">Standard hourly rate</label>
                    <Field as='select' className="selects">
                      <option>---------</option>
                    </Field>
                  </div>
                  <div className="mt-3">
                    <label className="working-12">Foreman support</label>
                    <Field as='select' className="selects">
                      <option>At</option>
                      <option>Out</option>
                    </Field>
                  </div>
                  <div className="mt-3">
                    <label className="working-12">Standard customer type</label>
                    <Field as='select' className="selects">
                      <option>Commercial</option>
                      <option>Private</option>
                    </Field>
                  </div>
                  <div className="mt-4">
                    <label className="working-12">API 2.1 Webhook</label>
                    <Field
                      type="text"
                      placeholder=""
                      className="work-input mt-1"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="working-12">API 2.1 Webhook token</label>
                    <Field
                      type="text"
                      placeholder=""
                      className="work-input mt-1"
                    />
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

export default Oher;
