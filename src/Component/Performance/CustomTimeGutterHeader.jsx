// CustomTimeGutterHeader.js
import React from "react";

const CustomTimeGutterHeader = ({ employees }) => {
  return (
    <div className="rbc-time-gutter rbc-time-column">
      {employees.map((employee, index) => (
        <div key={index} className="rbc-timeslot-group">
          <div className="rbc-time-slot">
            <span className="rbc-label">{employee}</span>
          </div>
          <div className="rbc-time-slot"></div>
        </div>
      ))}
    </div>
  );
};

export default CustomTimeGutterHeader;
