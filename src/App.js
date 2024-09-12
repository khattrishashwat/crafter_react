import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import React, { Suspense, lazy } from "react";

import axios from "axios";
import Loader from "./Component/Loader/Loader";
import Subcodinator from "./Component/Data/Subcodinator";
import SaleOrder from "./Component/Sale/SaleOrder";
import CustomerAddress from "./Component/Relationship/Customer-Address";
import Contactperson from "./Component/Relationship/Contactperson";
import Addresses from "./Component/Relationship/Addresses";
import Location from "./Component/Relationship/Location";
import SubId from "./Component/Relationship/SubId";
import EmailTemplates from "./utils/EmailTemplates";

// Lazy load components
const Dashboard = lazy(() => import("./Component/Dashboard/Dashboard"));
const Sale = lazy(() => import("./Component/Sale/Sale"));

const Projects = lazy(() => import("./Component/Performance/Projects"));
const Action = lazy(() => import("./Component/Performance/Action"));
const Orders = lazy(() => import("./Component/Performance/Orders"));
const Gps = lazy(() => import("./Component/Performance/Gps"));
const Planning = lazy(() => import("./Component/Performance/Planning"));

const Hour = lazy(() => import("./Component/Hours/Hour"));
const Other = lazy(() => import("./Component/Hours/Other"));
const Invoice = lazy(() => import("./Component/Invoice/Invoice"));
const Data = lazy(() => import("./Component/Data/Data"));

const Objects = lazy(() => import("./Component/Relationship/Objects"));
const Contacts = lazy(() => import("./Component/Relationship/Contacts"));
const Customers = lazy(() => import("./Component/Relationship/Customers"));
const Sublocations = lazy(() =>
  import("./Component/Relationship/Sublocations")
);

const Signup = lazy(() => import("./Component/Auth/Signup"));
const Sucess = lazy(() => import("./Component/Auth/Sucess"));
const Login = lazy(() => import("./Component/Auth/Login"));
const Forget = lazy(() => import("./Component/Auth/Forget"));
const NewPassword = lazy(() => import("./Component/Auth/NewPassword"));
const Done = lazy(() => import("./Component/Auth/Done"));
const Logout = lazy(() => import("./Component/Logout/Logout"));
const ProtectRoute = lazy(() => import("./ProtectRoute"));
const Checklist = lazy(() => import("./Component/CheckList/Checklist"));

const ActiveUser = lazy(() =>
  import("./Component/Philip/Institution/User Account/ActiveUser")
);
const InactiveUser = lazy(() =>
  import("./Component/Philip/Institution/User Account/InactiveUser")
);
const Couples = lazy(() =>
  import("./Component/Philip/Institution/User Account/Couples")
);
const Groups = lazy(() =>
  import("./Component/Philip/Institution/User Account/Groups")
);

const Actions = lazy(() =>
  import("./Component/Philip/Institution/Master/Actions")
);
const Category = lazy(() =>
  import("./Component/Philip/Institution/Master/Category")
);
const Dates = lazy(() => import("./Component/Philip/Institution/Master/Dates"));
const Protypes = lazy(() => import("./Component/Philip/Institution/Master/Protypes"));
const Equipment = lazy(() =>
  import("./Component/Philip/Institution/Master/Equipment")
);
const Item = lazy(() => import("./Component/Philip/Institution/Master/Item"));
const Master = lazy(() =>
  import("./Component/Philip/Institution/Master/Master")
);
const Rates = lazy(() => import("./Component/Philip/Institution/Master/Rates"));
const Services = lazy(() =>
  import("./Component/Philip/Institution/Master/Services")
);
const Skills = lazy(() =>
  import("./Component/Philip/Institution/Master/Skills")
);
const Status = lazy(() =>
  import("./Component/Philip/Institution/Master/Status")
);
const Sublocate = lazy(() =>
  import("./Component/Philip/Institution/Master/Sublocate")
);
const Type = lazy(() => import("./Component/Philip/Institution/Master/Type"));
const Vat = lazy(() => import("./Component/Philip/Institution/Master/Vat"));

const Import = React.lazy(() =>
  import("./Component/Philip/Institution/Import/Import")
);

const Additional = React.lazy(() =>
  import("./Component/Philip/Institution/Additional/Additional")
);
const Information = React.lazy(() =>
  import("./Component/Philip/Institution/Additional/Information")
);
const Iteams = React.lazy(() =>
  import("./Component/Philip/Institution/Additional/Iteams")
);
const PackageTy = React.lazy(() =>
  import("./Component/Philip/Institution/Additional/PackageTy")
);
const Packages = React.lazy(() =>
  import("./Component/Philip/Institution/Additional/Packages")
);
const Quotattion = React.lazy(() =>
  import("./Component/Philip/Institution/Additional/Quotattion")
);
const Tasks = React.lazy(() =>
  import("./Component/Philip/Institution/Additional/Tasks")
);

const Fgenral = React.lazy(() =>
  import("./Component/Philip/Institution/Functions/Fgenral")
);
const Mgenral = React.lazy(() =>
  import("./Component/Philip/Institution/Functions/Mgenral")
);

const APps = React.lazy(() =>
  import("./Component/Philip/Institution/Company/APps")
);
const Email = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Email")
);
const Genral = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Genral")
);
const Legends = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Legends")
);
const Numbring = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Numbring")
);
const Oher = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Oher")
);
const PDF = React.lazy(() =>
  import("./Component/Philip/Institution/Company/PDF")
);
const Quick = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Quick")
);
const Schedule = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Schedule")
);
const Work = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Work")
);
const Qoutes = React.lazy(() =>
  import("./Component/Philip/Institution/Company/Qoutes")
);

axios.defaults.baseURL = "https://staging.webmobrildemo.com:8003/";
// axios.defaults.baseURL = "http://172.16.100.86:8000/";

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       localStorage.removeItem("WorkMen-Token");
//       window.location.reload();
//     }
//        return Promise.reject(error);
//   }
// );

const App = () => {
  return (
    <BrowserRouter basename="/work-men">
      <LanguageProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/load" element={<Loader />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sucess" element={<Sucess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget" element={<Forget />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/done" element={<Done />} />
            {/* Protected Routes */}
            <Route element={<ProtectRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/saleorder" element={<SaleOrder />} />
              {/* Performance */}

              <Route path="/projects" element={<Projects />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/action" element={<Action />} />
              <Route path="/gps" element={<Gps />} />
              <Route path="/planning" element={<Planning />} />

              {/* Hours */}
              <Route path="/hour" element={<Hour />} />
              <Route path="/subother" element={<Other />} />

              {/* Facts */}
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/checklist" element={<Checklist />} />

              {/* Data */}
              <Route path="/data" element={<Data />} />
              <Route path="/subcodinator" element={<Subcodinator />} />

              {/* Relationship */}
              <Route path="/customers" element={<Customers />} />
              <Route
                path="/customeraddress/:id"
                element={<CustomerAddress />}
              />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contactperson" element={<Contactperson />} />
              <Route path="/addresses" element={<Addresses />} />
              <Route path="/location" element={<Location />} />
              <Route path="/objects" element={<Objects />} />
              <Route path="/sublocations" element={<Sublocations />} />
              <Route path="/subid" element={<SubId />} />

              <Route path="/logout" element={<Logout />} />
              <Route path="/temp" element={<EmailTemplates />} />
              {/* User */}
              <Route path="/activeuser" element={<ActiveUser />} />
              <Route path="/inactiveuser" element={<InactiveUser />} />
              <Route path="/couples" element={<Couples />} />
              <Route path="/gropus" element={<Groups />} />
              {/* MasterUser */}
              <Route path="/actions" element={<Actions />} />
              <Route path="/category" element={<Category />} />
              <Route path="/dates" element={<Dates />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/item" element={<Item />} />
              <Route path="/master" element={<Master />} />
              <Route path="/protypes" element={<Protypes />} />
              <Route path="/rates" element={<Rates />} />
              <Route path="/services" element={<Services />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/sublocate" element={<Sublocate />} />
              <Route path="/status" element={<Status />} />
              <Route path="/type" element={<Type />} />
              <Route path="/vat" element={<Vat />} />
              {/* Import */}
              <Route path="/import" element={<Import />} />
              {/* Function */}
              <Route path="/fgenral" element={<Fgenral />} />
              <Route path="/Mgenral" element={<Mgenral />} />
              {/* Company */}
              <Route path="/apps" element={<APps />} />
              <Route path="/email" element={<Email />} />
              <Route path="/genral" element={<Genral />} />
              <Route path="/legends" element={<Legends />} />
              <Route path="/numbring" element={<Numbring />} />
              <Route path="/oher" element={<Oher />} />
              <Route path="/pdf" element={<PDF />} />
              <Route path="/quick" element={<Quick />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/work" element={<Work />} />
              <Route path="/qoutes" element={<Qoutes />} />
              {/* Addition */}
              <Route path="/additional" element={<Additional />} />
              <Route path="/information" element={<Information />} />
              <Route path="/iteams" element={<Iteams />} />
              <Route path="/iteams" element={<Packages />} />
              <Route path="/iteams" element={<PackageTy />} />
              <Route path="/quotattion" element={<Quotattion />} />
              <Route path="/tasks" element={<Tasks />} />
            </Route>
          </Routes>
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  );
};


export default App;
