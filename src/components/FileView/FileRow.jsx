import React from "react";
import DownloadButton from "./DownloadButton";

function FileRow({ name, type, date, onClick, isSelected, onDelete }) {
  const getIcon = (type) => {
    switch (type) {
      case "folder":
        return "📁";
      case "pdf":
        return "📄";
      case "pptx":
        return "📊";
      default:
        return "📄";
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Är du säker på att du vill ta bort ${name}?`)) {
      onDelete();
    }
  };

  return (
    <div className={`file-row ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="file-checkbox" onClick={(e) => e.stopPropagation()}>
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={onClick} 
        />
      </div>
      <div className="file-icon">{getIcon(type)}</div>
      <div className="file-name">{name}</div>
      <div className="file-type">{type}</div>
      <div className="file-date">
        {new Date(date).toLocaleString("sv-SE", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })}
        </div>
      <div className="file-size">
        {type === "folder" ? "--" : "1.2 MB"}
      </div>
      <div className="file-actions">
        <DownloadButton filename={name} />
        <button className="delete-btn" onClick={handleDeleteClick} title="Ta bort">
          🗑️
        </button>
      </div>
    </div>
  );
}

export default FileRow;
