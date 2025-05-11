import React from "react";
import "./Tooltip.css";

function Tooltip({ message, type = "info", visible }) {
  if (!visible) return null;

  return (
    <div className={`tooltip-container ${type}`}>
      {message}
    </div>
  );
}

export default Tooltip;
