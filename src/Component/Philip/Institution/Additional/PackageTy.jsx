import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function PackageTy() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/additional">Checklists</Link>
              </li>
              <li>
                <Link to="/tasks">Standard Tasks</Link>
              </li>
              <li>
                <Link to="/iteams">Standard Items</Link>
              </li>
              <li>
                <Link to="/quotattion">Quotation Templates</Link>
              </li>
              <li>
                <Link to="/packages">Work packages</Link>
              </li>
              <li>
                <Link to="/packagety" className="actives">Work Package Types</Link>
              </li>
              <li>
                <Link to="/information">Information Pages</Link>
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
                  <i className="fa-solid fa-chevron-right main-clr" />
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
              <Link to="/additional" className="company details">
                <div className="unser-heads">
                  <h5 className="main-clr">Additional Modules</h5>
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
                <h4 className="mt-41">Additional modules</h4>
                <p>
                  In this menu you can add work packages. You can build a work
                  package from multiple items, such as articles and hours. You
                  can select the work packages based on quotes and invoices.
                </p>
                <div className="user-flex">
                  <Link to="">Add</Link>
                  <input type="text" placeholder="Search" className="users" />
                </div>
              </div>
              <section className="intro mt-6">
                <div className="bg-image h-100">
                  <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-12">
                          <div className="card shadow-2-strong">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                  <thead className="my-thead-1">
                                    <tr>
                                      {/* <th scope="col">
                                                                  <div class="form-check">
                                                                      <input class="form-check-input" type="checkbox" value=""
                                                                          id="flexCheckDefault" />
                                                                  </div>
                                                              </th> */}
                                      <th scope="col">Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="modal-open">
                                      <td className="projects fnt">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageTy;
