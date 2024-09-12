import React from 'react'
import { Link} from 'react-router-dom';

function Fgenral() {

   
  
  return (
    <div>
         <div className="big-containe bg-1">
  <div className="small-container">
    <div className="same-as-head">
      <ul>
        <li>
          <Link to="/fgenral" className='actives'>General</Link>
        </li>
        <li >
          <Link to="/mgenral" >
            Master Data
          </Link>
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
            Via this menu you can independently activate functions &amp; deploy
            in your area. Unavailable features require an upgrade, which you can
            do through the Subscription Management Settings menu.
          </p>
        </div>
        <form className="mt-3">
          <h5 className="sch">Schedule</h5>
          <label className="working-12">Graphic planning board</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the graphical planning board on or off.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Project Planning board</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to enable or disable the graphical planning board
            for projects.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Planning equipment</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This function allows you to add equipment to the package. A separate
            agenda appears for the equipment in the planning so that the
            equipment can be scheduled.
          </p>
        </form>
        {/*-------Another---------*/}
        <form className="mt-3">
          <h5 className="sch">Activities</h5>
          <label className="working-12">Add work orders</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This allows you to disable the add work order function. This can be
            useful if you work with a linked package and do not want planners to
            create work orders from Crafter.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Project management</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This module allows you to manage longer-term projects. You can add
            multiple work orders within a project.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Adjustable project statuses</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This function allows you to set a customizable status bar per
            project type
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Add other activities</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            With this function you can add other activities to the planning in
            addition to work orders. Other activities include days off,
            holidays, study days, etc.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Type of work</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This function allows you to set the type of work that you can link
            to the work order when adding it.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Objects and sublocations</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This function allows you to set objects (e.g. installations) and
            sub-locations (e.g. building parts or rooms) that belong to the work
            locations. This allows you to build up an extensive history.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Loose objects</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            By default, objects are linked to the work location to which they
            were added. If you enable this function, all objects can be selected
            individually.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Separate locations</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            By default, work locations are linked to the client to which they
            are added. If you enable this function, all work locations can be
            selected separately.
          </p>
        </form>
        {/*-------Another---------*/}
        {/*-------Another-1---------*/}
        <form className="mt-3">
          <h5 className="sch">Time registration</h5>
          <label className="working-12">
            Time registration function for payroll purposes
          </label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This function allows you to view, check and export the completed
            weekly statements of the professionals to Excel.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Calculate overtime times</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            Using this function you can automatically calculate overtime times
            based on the registered hours of the professionals.
          </p>
        </form>
        {/*-------Another-1---------*/}
        <form className="mt-3">
          <h5 className="sch">Other functions and menus</h5>
          <label className="working-12">Dashboard</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This allows you to turn the dashboard on or off. On the dashboard
            you will see an overview of today with the number of work orders to
            be rescheduled or checked.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Actions</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to turn the actions function on or off.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Order number</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to enable or disable the 'order number' field.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Reference</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to enable or disable the 'reference' field.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">GPS track and trace</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the GPS Track and Trace function on or
            off.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Skills</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This feature allows you to set and assign skills to the craftsmen.
            These skills are reflected in the planning.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Own fields</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the custom fields function on or off.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Standard tasks</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This allows you to turn the fixed tasks function on or off.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Standard items</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the standard article function on or off.
          </p>
        </form>
        {/*-------Another-1---------*/}
        <form className="mt-3">
          <h5 className="sch">App settings</h5>
          <label className="working-12">Add article in lock app</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            Using this feature you can lock the addition of new articles in the
            app. This allows the professional to only select existing items in
            his app and not add new ones. This prevents contamination of the
            item list.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Show prices in the app</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This feature allows you to set whether you want to show or hide
            prices in the app.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Register time per task/object</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            With this function you can set whether you want to register times
            for tasks/objects with the app. This allows you to split times per
            activity within the work order.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">
            Show work orders in the app's calendar
          </label>
          <select className="selects">
            <option>1 day</option>
            <option>1 week</option>
            <option>2 weeks</option>
            <option>Always</option>
          </select>
          <p className="frm-para-1">
            With this function you can set how far work orders are shown in the
            app.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Round up working time in the app</label>
          <select className="selects">
            <option>Do not complete</option>
            <option>A minute</option>
            <option>5 minute</option>
            <option>15 minute</option>
            <option>30 minute</option>
            <option>0'c Clock</option>
          </select>
          <p className="frm-para-1">
            With this function you can set how the working time in the app is
            rounded up.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Standard hourly rate</label>
          <select className="selects">
            <option>-------</option>
          </select>
          <p className="frm-para-1">
            With this function you can set the standard hourly rate for the app.
          </p>
        </form>
        {/*-------Another-1---------*/}
        <form className="mt-3">
          <h5 className="sch">Additional modules</h5>
          <label className="working-12">Contract management</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            Using this module you can set up recurring maintenance contracts or
            subscriptions. Work orders are automatically created from the set
            contracts based on the set cycle.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Customer portal</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            Using this module you can give customers access to a customer portal
            in your corporate identity. Customers can view their data here and
            report any malfunctions or complaints. The notifications end up
            directly in the notification box next to the schedule.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Workflows</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            Using this module you can create automatic action sequences or
            workflows. Based on the set workflows, actions are then
            automatically added to work orders.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Quotation function</label>
          <select className="selects">
            <option>At</option>
            <option>Out</option>
          </select>
          <p className="frm-para-1">
            This allows you to turn the quote function on or off.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Deals module</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the deals function on or off
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Order function</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the order function on or off.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Ticket module</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the tickets function on or off
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Billing</label>
          <select className="selects">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            Using this module you can invoice work orders immediately after
            completion.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Email messages</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            With this module you receive shipping statuses for emails and
            responses to emails are read and placed in the right place (with the
            right work order, customer, location or project). You also have an
            inbox for all your incoming emails.
          </p>
        </form>
        {/*-------Another-1---------*/}
        <form className="mt-3">
          <h5 className="sch">*Upgrade for this module is required.</h5>
          <label className="working-12">White label</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This module converts the design of crafter to your corporate
            identity.
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Orders</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to switch the orders function on or off
          </p>
        </form>
        <form className="mt-3">
          <label className="working-12">Multiple locations</label>
          <select className="selects" disabled="">
            <option>Out</option>
            <option>At</option>
          </select>
          <p className="frm-para-1">
            This allows you to add multiple locations to your environment.
          </p>
        </form>
        {/*-------Another-1---------*/}
        <form className="mt-3">
          <h5 className="sch">Clutch</h5>
          <label className="working-12">Clutch</label>
          <select className="selects">
            <option>Quickstart</option>
            <option>No</option>
            <option>Acceptonline</option>
            <option>Accountview</option>
          </select>
          <p className="frm-para-1">
            Here you can select a link with an external package.
          </p>
        </form>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Fgenral;