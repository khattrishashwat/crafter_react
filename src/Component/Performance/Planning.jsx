import React, { useEffect, useState, useContext } from "react";
import AppointmentsScheduler from "./AppointmentsScheduler";
import Draggable from "devextreme-react/draggable";
import Scheduler from "devextreme-react/scheduler";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../LanguageContext";
import "./Planing.css";

function Planning() {
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);

  return (
    <div>
      <div className="big-container bg-1">
        <div className="small-container">
          <div className="same-as-head">
            <ul>
              <li>
                <Link to="/planning" className="actives">
                  {t("Planning")}
                </Link>
              </li>
              <li>
                <Link to="/projects">{t("Projects")}</Link>
              </li>
              <li>
                <Link to="/orders">{t("Work Orders")}</Link>
              </li>
              <li>
                <Link to="/action">{t("Action")}</Link>
              </li>
              <li>
                <Link to="/gps">GPS</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AppointmentsScheduler />
      <div className="dx-viewport demo-container">
        {/* <div id="scroll">
          <div id="list">
            {tasks &&
              tasks.map((value) =>
                // <h4>{value.text}</h4>
                createItemElement(value)
              )}
          </div>
        </div> */}
        <div id="scheduler"></div>
      </div>
    </div>
  );
}

export default Planning;
