import React from "react";
import { Link, useLocation } from "react-router-dom";


function Quick() {
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
                <Link to="/app">App Settings</Link>
              </li>
              <li>
                <Link to="/numbring">Numbering</Link>
              </li>
              <li>
                <Link to="/oher">Remainder</Link>
              </li>
              <li>
                <Link to="/quick" className="actives">
                  Quickstart
                </Link>
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
                  Set up the connection with SnelStart here. With the connection
                  all your customers, addresses and items imported from
                  SnelStart into Crafter, so that you can create work orders
                  with this. If you completed one in Crafter If you set the work
                  order to checked, it will be exported to SnelStart and An
                  invoice will be prepared for you there containing the work
                  order registered articles and hours.
                </p>
                <h5 className="heads-11">Required fields</h5>
                <p>
                  As a first step you must set the connection in SnelStart. Go
                  to it the links page in SnelStart
                  <Link to="" className="link-12">
                    https://web.snelstart.nl/couplings
                  </Link>
                  , and choose from the overview of applications for
                  'Customization' . Click then set to link. In the window that
                  follows the 'Client key' displayed. Enter this in the field
                  below.
                </p>
                <p>
                  It is important that before you click on 'Connect with
                  SnelStart' click, you first log out of SnelStart. To confirm
                  the activation of the link, After you click 'Connect with
                  SnelStart' clicked again must log in to SnelStart. Then the
                  connection is made and the import!
                </p>
              </div>
              <form className="mt-3">
                <label className="working-12">Client Key</label>
                <textarea className="textareas-1 mt-2" defaultValue={""} />
              </form>
              <form className="mt-3">
                <label className="working-12">Standard item code</label>
                <input type="text" placeholder="" className="work-input mt-1" />
                <p className="frm-para-1">
                  Enter an article code of an article from SnelStart here. This
                  is used when exporting a work order to an invoice in
                  SnelStart, when an article or hourly rate from Crafter does
                  not exist in SnelStart.
                </p>
              </form>
              <form className="mt-schedule">
                <input
                  type="checkbox"
                  className="remove"
                  id="yes1"
                  name="question_1"
                  defaultValue={5}
                />
                <label className="schedule">
                  Import sales orders as work orders?
                </label>
                <input
                  type="checkbox"
                  className="remove"
                  id="no1"
                  name="question_1"
                  defaultValue={5}
                />
                <label className="schedule">
                  Export customers created in crafter.
                </label>
              </form>
              <form className="mt-3">
                <label className="working-12">
                  Export sales orders as a type
                </label>
                <select className="selects">
                  <option>Order (Standard)</option>
                  <option>Quote</option>
                  <option>Confirmation</option>
                  <option>Work Order</option>
                  <option>Packing Slip</option>
                  <option>Collection Briefs</option>
                </select>
              </form>
              <form className="mt-3">
                <label className="working-12">
                  Only import orders of this type
                </label>
                <select className="selects">
                  <option>No Filters</option>
                  <option>Confirmation Only</option>
                </select>
              </form>
              <form className="mt-3">
                <label className="working-12">
                  Imported prices include VAT
                </label>
                <select className="selects">
                  <option>Exclusive at VAT</option>
                  <option>Including 9% VAT</option>
                  <option>Including 21% VAT</option>
                </select>
              </form>
              <h3 className="working-12 mt-3">Last import</h3>
              <h5 className="exp">May 25, 2023 3:14 PM</h5>
              <form className="mt-3">
                <label className="working-12">Manual last import date</label>
                <input
                  type="text"
                  placeholder="25-05-2023"
                  className="work-input mt-1 vlrs"
                />
              </form>
              <h3 className="working-12 mt-3">Last export</h3>
              <h5 className="exp">May 25, 2023 3:14 PM</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quick;
