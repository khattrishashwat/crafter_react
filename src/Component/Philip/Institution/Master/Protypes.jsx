import React from "react";
import { Link } from "react-router-dom";

function Protypes() {
  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/master">Articles</Link>
              </li>
              <li>
                <Link to="/item">Item Group</Link>
              </li>
              <li>
                <Link to="/equipment">Equipment</Link>
              </li>
              <li>
                <Link to="/type">Equipment Types</Link>
              </li>
              <li>
                <Link to="/vat">VAT Rates</Link>
              </li>
              <li>
                <Link to="/skills">Skills</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/protypes" className='activ'>Project Types</Link>
              </li>
              <li>
                <Link to="/status">Project Statuses</Link>
              </li>
              <li>
                <Link to="/dates">Dates</Link>
              </li>
              <li>
                <Link to="/actions">Actions</Link>
              </li>
              <li>
                <Link to="/category">Leave Categories</Link>
              </li>
              <li>
                <Link to="/rates">Hourly Rates</Link>
              </li>
              <li>
                <Link to="/sublocate">Sublocations / Objects</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="big-containe">
        <div className="small-container">
          <div className="Institution-main-parent">
            <div className="Institution-grid-1 bg">
              <Link to="/genral" className="company">
                <div className="unser-heads">
                  <h5>Company Details</h5>
                  <i className="fa-solid fa-chevron-right" />
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
              <Link to="/master" className="company details">
                <div className="unser-heads">
                  <h5 className="main-clr">Master Data</h5>
                  <i className="fa-solid fa-chevron-right" />
                </div>
              </Link>
              <Link to="/additional" className="company details">
                <div className="unser-heads">
                  <h5>Additional Modules</h5>
                  <i className="fa-solid fa-chevron-right main-clr" />
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
                <h4 className="mt-41">Master Data</h4>
                <p>
                  With a project type you can divide projects by type of work,
                  for example 'maintenance', 'new construction', or
                  'renovation'. You can then filter by this in the projects and
                  work orders list.
                </p>
              </div>
              <section className="intro mt-6">
                <div className="bg-image h-100">
                  <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-12 my-pd-re">
                          <div className="card shadow-2-strong">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                  <thead className="my-thead-1">
                                    <tr>
                                      <th scope="col">Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      className="modal-open my-bot"
                                      data-modal="modal-1"
                                    >
                                      <td scope="row" className="project">
                                        No data entered
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="boths-btn">
                <Link to="">
                  <i className="fa-solid fa-chevron-left" />
                </Link>
                <Link to="">
                  <i className="fa-solid fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protypes;
