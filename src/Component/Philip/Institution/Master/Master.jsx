import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Master() {
  
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
                <Link to="/master" className='activ'>Articles</Link>
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
                <Link to="/protypes">Project Types</Link>
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
              <Link to="/additional" className="company">
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
                <p>Set custom project statuses here</p>
                <div className="user-flex">
                  <div className="user-boths-flexs">
                    <Link to="">Add</Link>
                    {/* <Link to="" className="price-btn">
                      Price increase
                    </Link> */}
                  </div>
                  <input type="text" placeholder="Search" className="users" />
                </div>
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
                                      <th scope="col" className="pd-right">
                                        Branches/brands
                                      </th>
                                      <th scope="col" className="pd-right">
                                        Article no.
                                      </th>
                                      <th scope="col" className="pd-right">
                                        EAN
                                      </th>
                                      <th scope="col" className="pd-right">
                                        Item group
                                      </th>
                                      <th scope="col" className="pd-right">
                                        Unit
                                      </th>
                                      <th scope="col" className="pd-right">
                                        Purchase Unit
                                      </th>
                                      <th scope="col" className="pd-right">
                                        Selling Price
                                      </th>
                                      <th scope="col" className="pd-right">
                                        VAT Rate
                                      </th>
                                      <th scope="col" className="pd-right">
                                        General ledger account (sales)
                                      </th>
                                      <th scope="col" className="pd-right">
                                        General ledger account (costs)
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="my-bot">
                                      <td className="pd-right">
                                        <Link to="" className="project">
                                          Cutting disc 115x1x22mm flat Dronco
                                          Evolution AS60V
                                        </Link>
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="project" />
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="project" />
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="project">
                                          da
                                        </Link>
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="project">
                                          Alverstraat 7, Rotterdam-Hoogvliet
                                        </Link>
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="project" />
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="project" />
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="project" />
                                      </td>
                                      <td className="pd-right">
                                        <Link to="" className="progress-1-light">
                                          To Be Planned
                                        </Link>
                                      </td>
                                      <td>
                                        <Link to="" className="project">
                                          <i className="fa-solid fa-trash" />
                                        </Link>
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

export default Master;
