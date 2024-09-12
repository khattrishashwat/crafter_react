import React from "react";
import { Link } from "react-router-dom";


function HelpCenter() {
  return (
    <div>
      <div className="big-containe bg">
        <div className="small-container">
          <div className="date-sec helping-cent">
            <h4 className="date-sec cnts1">How can we help ?</h4>
            <div className="help-center-search">
              <input type="text" placeholder="Search" />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          </div>
        </div>
      </div>
      <div className="small-container body-ps">
        <h5 className="tos">Loreum ipsum sit dolor</h5>
        <div className="three-boxes-my mag">
          <Link to="/help-1" className="white-box">
            Loreum ipsum sit dolor
            <i className="fa-solid fa-angle-right" />
          </Link>
          <Link to="/help-2" className="white-box">
            Loreum ipsum sit dolor
            <i className="fa-solid fa-angle-right" />
          </Link>
          <Link to="/help-3" className="white-box">
            Loreum ipsum sit dolor
            <i className="fa-solid fa-angle-right" />
          </Link>
          <Link to="/help-4" className="white-box">
            Loreum ipsum sit dolor
            <i className="fa-solid fa-angle-right" />
          </Link>
          <Link to="/help-5" className="white-box">
            Loreum ipsum sit dolor
            <i className="fa-solid fa-angle-right" />
          </Link>
        </div>
        <img src="./Image/new-logo-2.png" className="body-logo" />
      </div>
    </div>
  );
}

export default HelpCenter;
