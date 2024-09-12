import React,{useState,useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function Schedule() {
  // Initial form values
  const [initialValues, setInitialValues] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    appointment_standard_all_day: "",
    standard_start_time: "",
    standard_end_time: "",
    workstock: "",
    daily_overview: "",
    group_filter: "",
    open_work_stock_automatically: "",
    show_rushing_time_in_calendar: "",
    show_travel_time_in_calendar: "",
    show_breaks_in_calendar: "",
    date_color: "",
    appointment_text: "",
    allowing_scheduling_of_the_work_receipt_immediately: "",
    pause_time_based_on_grid: "",
  });

  const [isExistingRecord, setIsExistingRecord] = useState(false); // Track if it's a PATCH or POST request

  // Fetch initial data (GET API)
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("WorkMen-Token");

      try {
        const response = await axios.get(`workmen/planning/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data.data[0];
          console.log("data", data);

          setInitialValues(data); // Set fetched data as initial values
          setIsExistingRecord(true); // Set to PATCH
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setIsExistingRecord(false); // No data, will trigger POST
        }
      }
    };

    fetchData();
  }, []);


  // Handle form submission (POST/PATCH API)
  const planed = async (values) => {
    const token = localStorage.getItem("WorkMen-Token");
    const url = `workmen/planning/`;

    try {
      const response = await axios({
        method: isExistingRecord ? "patch" : "post",
        url: url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          text: "Work receipt saved successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response ? error.response.data.message : error.message,
      });
    }
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
                <Link to="/schedule" className="actives">
                  Schedule
                </Link>
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
              <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={planed}
              >
                <Form>
                  <div className="compan">
                    <h4>Company Information</h4>
                    <p>
                      By means of these, you can change the display of the Set
                      up the calendar.
                    </p>
                    <button type="submit">Save</button>
                  </div>
                  <div className="mt-schedule mt-schedule-grid">
                    <div>
                      <Field type="checkbox" className="remove" name="monday" />
                      <label className="schedule">Monday</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="tuesday"
                      />
                      <label className="schedule">Tuesday</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="wednesday"
                      />
                      <label className="schedule">Wednesday</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="thursday"
                      />
                      <label className="schedule">Thursday</label>
                    </div>
                    <div>
                      <Field type="checkbox" className="remove" name="friday" />
                      <label className="schedule">Friday</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="saturday"
                      />
                      <label className="schedule">Saturday</label>
                    </div>
                    <div>
                      <Field type="checkbox" className="remove" name="sunday" />
                      <label className="schedule">Sunday</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="appointment_standard_all_day"
                      />
                      <label className="schedule">
                        Appointments all day by default
                      </label>
                    </div>
                  </div>
                  <div className="compan-mid">
                    <div>
                      <label>Default start time</label>
                      <Field type="text" name="standard_start_time" />
                    </div>
                    <div>
                      <label>Default end time</label>
                      <Field type="text" name="standard_end_time" />
                    </div>
                  </div>
                  <div className="mt-schedule mt-schedule-grid">
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="workstock"
                      />
                      <label className="schedule">Work Load</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="daily_overview"
                      />
                      <label className="schedule">Day overview</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="group_filter"
                      />
                      <label className="schedule">Groups filter</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        className="remove"
                        name="open_work_stock_automatically"
                      />
                      <label className="schedule">
                        Open Workload Automatically
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="lable">
                      Show schedule time in calendar
                    </label>
                    <Field
                      as="select"
                      className="selects"
                      name="show_rushing_time_in_calendar"
                    >
                      <option value="true">On</option>
                      <option value="false">Off</option>
                    </Field>
                  </div>
                  <div className="mt-schedule">
                    <Field
                      type="checkbox"
                      className="remove"
                      name="show_travel_time_in_calendar"
                    />
                    <label className="schedule">
                      Show travel time in calendar
                    </label>
                    <Field
                      type="checkbox"
                      className="remove"
                      name="show_breaks_in_calendar"
                    />
                    <label className="schedule">Show breaks in calendar</label>
                  </div>
                  <div className="compan-mid">
                    <div>
                      <label>Appointment color</label>
                      <Field as="select" name="date_color">
                        <option value="1">Based on status</option>
                        <option value="2">
                          Based on project or service type
                        </option>
                      </Field>
                    </div>
                    <div>
                      <label>Appointment text</label>
                      <Field as="select" name="appointment_text">
                        <option value="1">Start time</option>
                        <option value="2">Client</option>
                        <option value="3">Work Location</option>
                        <option value="4">Client + Location</option>
                        <option value="5">Reference Client</option>
                        <option value="6">Reference Work Location</option>
                        <option value="7">Work Order Number</option>
                        <option value="8">Short description</option>
                        <option value="9">
                          Work Order Number + description
                        </option>
                        <option value="10">Custom + description</option>
                        <option value="11">Custom + Project</option>
                        <option value="12">Project</option>
                      </Field>
                    </div>
                  </div>
                  <div>
                    <label className="lable">
                      Allow immediate scheduling of work orders
                    </label>
                    <p className="frm-para">
                      If this is disabled, work orders can only be added to the
                      work inventory when created.
                    </p>
                    <Field
                      as="select"
                      className="selects"
                      name="allowing_scheduling_of_the_work_receipt_immediately"
                    >
                      <option value="true">At</option>
                      <option value="false">Out</option>
                    </Field>
                  </div>
                  <div>
                    <label className="lable">
                      Break time based on the schedule
                    </label>
                    <p className="frm-para">
                      Automatically include the break time from the schedule
                      when scheduling work orders in the schedule.
                    </p>
                    <Field
                      as="select"
                      className="selects"
                      name="pause_time_based_on_grid"
                    >
                      <option value="true">At</option>
                      <option value="false">Out</option>
                    </Field>
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

export default Schedule;
