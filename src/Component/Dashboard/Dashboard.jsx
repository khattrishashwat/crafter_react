import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState("");
  const [projects, setProjects] = useState("");
  const [workOrder, setWorkOrder] = useState("");
  const [action, setAction] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("WorkMen-Token");

      try {
        const response = await axios.get(
          `workmen/home/`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("response", response.data.data);
        const InvoiceLength = response.data.data["invoice"];
        const Projects = response.data.data["project"];
        const WorkOrder = response.data.data["work_order"];
        const Action = response.data.data["action"];

        setInvoice(InvoiceLength);
        setProjects(Projects);
        setWorkOrder(WorkOrder);
        setAction(Action);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="big-containe bg">
        <div className="small-container">
          <div className="date-sec">
            <h4 className="date-sec">
              {t("Today's dashboard")}, {currentDate.toDateString()}
            </h4>
          </div>
        </div>
      </div>
      <div className="small-container body-ps">
        <div className="green-box">
          <h5>{t("Invoice")}</h5>
          <h6>{invoice}</h6>
        </div>
        <h5 className="tos">{t("To do")}</h5>
        <div className="three-boxes-my">
          <Link to="/projects" className="white-box">
            {t("Check Projects")} :{projects}
            <i className="fa-solid fa-angle-right" />
          </Link>
          <Link to="/orders" className="white-box">
            {t("Check Work Orders")} :{workOrder}
            <i className="fa-solid fa-angle-right" />
          </Link>
          <Link to="/action" className="white-box">
            {t("Check Actions")} :{action}
            <i className="fa-solid fa-angle-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
