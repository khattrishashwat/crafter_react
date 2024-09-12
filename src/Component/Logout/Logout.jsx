import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Logout() {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    // localStorage.removeItem(access_token);
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    setLoggedIn(false);
    navigate("/login");
    // window.location.reload();
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="small-container body-ps mbt">
        <div className="logout-cent-box">
          <img src={`${process.env.PUBLIC_URL}/Image/logo.png`} alt="logo" />
          <h4>{t("Are you sure you want to Logout Alhra ?")}</h4>
          <div className="both-two-btn">
            <Link to="/login" onClick={handleLogout}>
              {t("Logout")}
            </Link>
            <Link to="#" className="log-can-clr" onClick={goBack}>
              {t(" Cancel")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
