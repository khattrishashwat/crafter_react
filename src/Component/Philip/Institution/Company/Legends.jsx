import React from "react";
import {Link} from "react-router-dom";
import { Formik,Form,Field } from "formik";

function Legends() {
  
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
                <h4>Company Details</h4>
                <p>
                  Here you will find the templates for the different number
                  series.
                </p>
                <Link to="/numbring">Legend</Link>
                <p>
                  For the tags that start with "number" are one number of
                  additional options:
                </p>
                <p>
                  It is possible to use the fixed number of digits to give. For
                  example: {"{"}number:4{"}"} results in a number of at least 4
                  digits: 0001. If there is no number numbers are entered, a
                  standard quantity is used.
                </p>
                <p>
                  It is possible to change the series of numbers from a start at
                  a certain point. This can be useful if you just you have
                  switched to crafter, and you already have an existing number
                  series your old system. For example: {"{"}number, start:123
                  {"}"} provides This number will count from number 123.
                </p>
                <p>
                  These additional options can also be combined. For example:{" "}
                  {"{"} number_per_month:3, start:123 {"}"}
                </p>
              </div>
              <Formik>
                <Form>
                  <div className="middle">
                    <h4>Legend</h4>
                    <div className="legend-first">
                      <h4>
                        {"{"}day{"}"}
                      </h4>
                      <h5>The current day (written out)</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}day_abbreviation{"}"}
                      </h4>
                      <h5>The current day (abbreviation)</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}day_number{"}"}
                      </h4>
                      <h5>The current day (number)</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}year{"}"}
                      </h4>
                      <h5>The current year</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}year_abbreviation{"}"}
                      </h4>
                      <h5>The current year (abbreviation)</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}month{"}"}
                      </h4>
                      <h5>The current month (written out)</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}month_abbreviation{"}"}
                      </h4>
                      <h5>The current month (abbreviation)</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}month_number{"}"}
                      </h4>
                      <h5>The current month (number)</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}number{"}"}
                      </h4>
                      <h5>A global number that counts</h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}number_per_day{"}"}
                      </h4>
                      <h5>
                        A number that resets to 1 at the start of each day
                      </h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}number_per_year{"}"}
                      </h4>
                      <h5>
                        A number that resets to 1 at the beginning of each year
                      </h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}number_per_month{"}"}
                      </h4>
                      <h5>
                        A number that resets to 1 at the beginning of each month
                      </h5>
                    </div>
                    <div className="legend-first">
                      <h4>
                        {"{"}week{"}"}
                      </h4>
                      <h5>The current week</h5>
                    </div>
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

export default Legends;
