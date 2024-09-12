import React from "react";
import { Link} from "react-router-dom";
import { Formik,Form,Field } from "formik";


function APps() {
  
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
                <Link to="/apps" className="actives">
                  App Settings
                </Link>
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
              <Link to="/login" className="company">
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
                      With this function you determine which functions and
                      fields are required when completing a work order. If the
                      user selects a field If you forget, he or she will receive
                      a notification.
                    </p>
                    <button type="submit" style={{ cursor: "pointer" }}>
                      Save
                    </button>
                  </div>
                  <h5 className="heads-11">Required fields</h5>
                  <div className="mt-schedule">
                    <h4 className="working">Activities &amp; Tasks</h4>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      The work description must be completed.
                    </label>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="no1"
                      name="question_1"
                    />
                    <label className="schedule">
                      There is always at least one task to be completed.
                    </label>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="no1"
                      name="question_1"
                    />
                    <label className="schedule">
                      All tasks must always be checked off.
                    </label>
                  </div>
                  <hr />
                  <div className="mt-schedule">
                    <h4 className="working">Article</h4>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      At least one item must always be completed.
                    </label>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="no1"
                      name="question_1"
                    />
                    <label className="schedule">
                      All items must always be checked off.
                    </label>
                  </div>
                  <hr />
                  <div className="mt-schedule">
                    <h4 className="working">Times</h4>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      Entering travel time is mandatory.
                    </label>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="no1"
                      name="question_1"
                    />
                    <label className="schedule">
                      Entering working hours is mandatory.
                    </label>
                  </div>
                  <hr />
                  <div className="mt-schedule">
                    <h4 className="working">Wrapping up</h4>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      If the work order is incomplete, a comment should be made
                      entered.
                    </label>
                  </div>
                  <hr />
                  <div className="mt-schedule">
                    <h4 className="working">Signature</h4>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      The name of the contact person must be included when
                      signing entered.
                    </label>
                  </div>
                  <div>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      When signing, the email address of the contact person must
                      be included are completed.
                    </label>
                  </div>
                  <div>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      The work order must always be signed by the customer.
                    </label>
                  </div>
                  <div>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      The work order must always be signed by the professional.
                    </label>
                  </div>
                  <div>
                    <Field
                      type="checkbox"
                      className="remove"
                      id="yes1"
                      name="question_1"
                    />
                    <label className="schedule">
                      The tasks on an inspection list must all be checked off.
                    </label>
                  </div>
                  <hr />
                  <div className="compan">
                    <h4>Other options</h4>
                    <div className="mt-schedule">
                      <h4 className="working">Work inventory</h4>
                      <Field
                        type="checkbox"
                        className="remove"
                        id="yes1"
                        name="question_1"
                      />
                      <label className="schedule">
                        Show work orders in the App's work inventory. If you
                        turn this off, new work orders will no longer be visible
                        in the work inventory of the App.
                      </label>
                    </div>
                    <div className="mt-schedule">
                      <h4 className="working">Work order pdf</h4>
                      <Field
                        type="checkbox"
                        className="remove"
                        id="yes1"
                        name="question_1"
                      />
                      <label className="schedule">
                        Add PDF of work order including prices as a document in
                        the app.
                      </label>
                    </div>
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

export default APps;
