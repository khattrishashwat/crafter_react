import React from "react";
import { Link} from "react-router-dom";


function Contacts() {
  // const [data, setData] = useState();

  // const Delete = (index) => {   
  //   const newData = [...data];  
  //   newData.splice(index, 1);
  //   setData(newData);
  // };
  

  return (
    <div>
      <div className="big-containe bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
              <li>
                <Link to="/contacts" className="actives">Contacts</Link>
              </li>
              <li>
                <Link to="/addresses">Addresses</Link>
              </li>
              <li>
                <Link to="/sublocations">Sublocations</Link>
              </li>
              <li>
                <Link to="/objects">Objects</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg my-bots">
        <div className="work-flex">
          <div className="work">
            <h4>Customers</h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input type="text" placeholder="To Search" className="ser" />
            </div>
            {/* <a href="" class="add">Add</a> */}
          </div>
        </div>
      </div>
      <>
        <section className="intro mt-4">
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
                                <th scope="col" className="pd-right my-padding">
                                  Name
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  E-mail Address
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  Client
                                </th>
                                <th scope="col" className="pd-right my-padding">
                                  Work Location
                                </th>
                              </tr>
                            </thead>
                            {/* <tbody>
                            {data.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />
                                  </div>
                                </th>
                                <td>{item.Name}</td>
                                <td>{item.E-mail}</td>
                                <td>{item.client}</td>
                                <td >{item.worklocation}</td>
                                <td>
              <a href="#" className="project" onClick={() =>Delete(index)}>
                <i className="fa-solid fa-trash" />
              </a>
            </td>
                              </tr>
                            ))}
                          </tbody> */}
                            
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
          <a href="">
            <i className="fa-solid fa-chevron-left" />
          </a>
          <a href="">
            <i className="fa-solid fa-chevron-right" />
          </a>
        </div>
      </>
    </div>
  );
}

export default Contacts;
