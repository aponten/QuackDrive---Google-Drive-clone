import React from "react";

function NavButton({ label, icon, onClick, className = "" }) {
  return (
    <button className={`nav-button ${className}`} onClick={onClick}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </button>
  );
}

export default NavButton;
