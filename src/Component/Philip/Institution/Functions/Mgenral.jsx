import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function Mgenral() {
    const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
        <div className="big-containe bg-1">
  <div className="small-container">
    <div className="same-as-head">
      <ul>
      <li>
        <Link to="/fgenral">General</Link>
      </li>
      <li>
        <Link to="/mgenral" className='actives'>Master Data</Link>
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
        <Link to="/fgenral" className="company details">
          <div className="unser-heads">
            <h5 className="main-clr">Functions</h5>
            <i className="fa-solid fa-chevron-right main-clr" />
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
        <div className="compan">
          <h4>Functions</h4>
          <p>
            You can independently switch functions on and off in your
            environment via this menu. Unavailable features require an upgrade,
            which you can do through the Subscription Management Settings menu.
          </p>
          <Link to="">Save</Link>
        </div>
        <form className="mt-3">
          <label className="working-12">Add clients</label>
          <select className="selects">
            <option>At</option>
            <option>Out in app</option>
            <option>Off in dashboaard an app</option>
          </select>
          <p className="frm-para-1">
            Indicate where it should be possible to add clients.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Add locations</label>
          <select className="selects">
            <option>At</option>
            <option>Out in app</option>
            <option>Off in dashboaard an app</option>
          </select>
          <p className="frm-para-1">
            Indicate where it should be possible to add locations.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Add objects</label>
          <select className="selects">
            <option>At</option>
            <option>Out in app</option>
            <option>Off in dashboaard an app</option>
          </select>
          <p className="frm-para-1">
            Indicate where it should be possible to add objects.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Add contacts</label>
          <select className="selects">
            <option>At</option>
            <option>Out in app</option>
            <option>Off in dashboaard an app</option>
          </select>
          <p className="frm-para-1">
            Indicate where it should be possible to add contacts.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Add projects</label>
          <select className="selects">
            <option>At</option>
            <option>Out in app</option>
            <option>Off in dashboaard an app</option>
          </select>
          <p className="frm-para-1">
            Indicate where it should be possible to add projects.
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Mgenral;