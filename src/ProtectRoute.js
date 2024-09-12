import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Component/Header/Header";

function ProtectRoute() {
  const [auth, setAuth] = useState(localStorage.getItem("WorkMen-Token"));

  console.log("tokens--?", auth);
 

  return (
    <div>
      {auth && <Header />}
      {auth ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
}

export default ProtectRoute;
