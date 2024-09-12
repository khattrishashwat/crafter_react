import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";

function Addresses() {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal = () => {
    setIsModalOpen(true);
  };
  const closedModal = () => {
    setIsModalOpen(false);
  };
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
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/addresses" className="actives">
                  Addresses
                </Link>
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
            <h4>Addresses</h4>
          </div>
          <div className="fields">
            <div className="input-1">
              <input
                type="text"
                placeholder={t("Search With")}
                className="ser"
                // onChange={handleInputChange}
              />{" "}
            </div>
            <a className="add" onClick={Modal}>
              Add
            </a>
          </div>
        </div>
      </div>

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
                                Street
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                House no.
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                Postal Code
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                Place
                              </th>
                              <th scope="col" className="pd-right my-padding">
                                Client(s)
                              </th>
                            </tr>
                          </thead>
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
      <div
        className={`modal fade  ${isModalOpen ? "show" : ""}`}
        id="add-articlea"
        data-bs-backdrop="statica"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="add-article"
        style={{ display: isModalOpen ? "block" : "none" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-address-popup">
          <div className="modal-content modal-content1">
            <div className="modal-header">
              <h5 className="modal-title" id="add-article">
                Work location
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div id="" className="" style={{ display: "block" }}>
                  <div className="modal-body">
                    <h5>Address details</h5>
                    <div className="client-form2 mt-4">
                      <label className="mb-2">Search address</label>
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="first-inp mt-0 mb-2 "
                      />
                      <input
                        type="text"
                        placeholder="Place"
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <hr />
                    <div className="client-form">
                      <label className="mb-2">Location Name</label>
                      <input
                        type="text"
                        placeholder=""
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="client-form1">
                      <label className="mb-2">Street + house number.</label>
                      <input
                        type="text"
                        placeholder="Enter a location"
                        className="first-inp mt-0 mb-2"
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="first-inp mt-0 mb-2 "
                      />
                      <input
                        type="text"
                        placeholder=""
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="client-form2">
                      <label className="mb-2">Postcode + city</label>
                      <input
                        type="text"
                        placeholder=" "
                        className="first-inp mt-0 mb-2 "
                      />
                      <input
                        type="text"
                        placeholder=" "
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="client-form">
                      <label className="mb-2">Complex</label>
                      <input
                        type="text"
                        placeholder=" "
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="client-form">
                      <label className="mb-2">Region</label>
                      <input
                        type="tel"
                        placeholder=""
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="client-form">
                      <label className="mb-2">Reference</label>
                      <input
                        type="text"
                        placeholder="Email address"
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="client-form">
                      <label className="mb-2">branch</label>
                      <input
                        type="number"
                        placeholder="Esined"
                        className="first-inp mt-0 mb-2 "
                        disabled=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div id="" className="" style={{ display: "block" }}>
                  <div className="modal-body">
                    <h5>Belonging to</h5>
                    <div className="client-form mt-4">
                      <label className="mb-2">Clients*</label>
                      <input
                        type="text"
                        placeholder=" "
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className="client-form">
                      <label className="mb-2">Contact persons</label>
                      <input
                        type="text"
                        placeholder=" "
                        className="first-inp mt-0 mb-2 "
                      />
                    </div>
                    <div className=" mt-4 ">
                      <div className="d-flex justify-content-between align-items-center general">
                        <h4>Card</h4>
                      </div>
                      <div className="map mt-3">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2773037.0516941547!2d-123.12484735946003!3d47.254842973530195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485e5ffe7c3b0f9%3A0x944278686c5ff3ba!2sWashington%2C%20USA!5e0!3m2!1sen!2sin!4v1622131495660!5m2!1sen!2sin"
                          width="100%"
                          height={200}
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <a href="" type="button" className="btn btn-primary">
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
