import React from "react";
import { Link } from "react-router-dom";

function Qoutes() {
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
                <Link to="/qoutes" className="actives">
                  Quotes, orders and invoices
                </Link>
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
                <h4>Company details</h4>
                <p>
                  The invoicing function allows you to convert checked work
                  orders directly into an invoice.
                </p>
                <a href="">Save</a>
              </div>
              <div className="compan-mid align-items-start">
                <div>
                  <form>
                    <label>Invoice type</label>
                    <select>
                      <option>Invoice with numbering</option>
                      <option>Invoice specification</option>
                    </select>
                  </form>
                  <form>
                    <label>Can show subtotals</label>
                    <select>
                      <option>At</option>
                      <option>Out</option>
                    </select>
                  </form>
                  <form>
                    <label>Addressing</label>
                    <select>
                      <option>-----------</option>
                      <option>Regarding administration</option>
                      <option>To contact person</option>
                      <option>No addressing</option>
                    </select>
                  </form>
                  <form>
                    <label>Payment term</label>
                    <select>
                      <option>7 days</option>
                      <option>14 days</option>
                      <option>30 days</option>
                      <option>45 days</option>
                    </select>
                  </form>
                  <form>
                    <label>Invoice footer</label>
                    <textarea
                      rows={4}
                      className="text-area"
                      defaultValue={" \n                            "}
                    />
                  </form>
                  <form>
                    <label>Invoice footer (G-account)</label>
                    <textarea
                      rows={4}
                      className="text-area"
                      defaultValue={" \n                            "}
                    />
                  </form>
                  <form>
                    <label>
                      Copy the quote footer to the order when converting.
                    </label>
                    <select>
                      <option>Copy footer</option>
                      <option>Stander footer</option>
                    </select>
                  </form>
                  <form>
                    <label>
                      Convert hour rules to items when converting an order to a
                      work order.
                    </label>
                    <select>
                      <option>Convert time rules</option>
                      <option>Do not convert time rules</option>
                    </select>
                  </form>
                  <form>
                    <label>
                      Copy item descriptions to the item lines on the work order
                      when converting an order or quote into a work order
                    </label>
                    <select>
                      <option>Copy description</option>
                      <option>Do not copy description</option>
                    </select>
                  </form>
                  <form>
                    <label>Standard article group </label>
                    <select>
                      <option>---------</option>
                    </select>
                  </form>
                </div>
                <div>
                  <form>
                    <label>Chamber of Commerce number</label>
                    <input type="text" placeholder=" " />
                  </form>
                  <form>
                    <label>VAT number</label>
                    <input type="text" placeholder="" />
                  </form>
                  <form>
                    <label>IBAN</label>
                    <input type="text" placeholder="" />
                  </form>
                  <form>
                    <label>G-account</label>
                    <input type="text" placeholder="" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qoutes;
