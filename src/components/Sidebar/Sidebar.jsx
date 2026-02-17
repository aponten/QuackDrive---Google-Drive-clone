import React from "react";
import NavButton from "./NavButton";

function Sidebar({ onDelete, theme, setTheme, files = [], onSelectFile, onAddFile, onUploadFile }) {
  const handleUploadClick = () => {
    document.getElementById("file-upload-input").click();
  };

  return (
    <div className="sidebar">

      {/* + Ladda upp knapp */}
      <div style={{ marginBottom: "0.5rem" }}>
        <NavButton
          label=" Ladda upp"
          icon="➕"
          onClick={handleUploadClick}
          className="new-file-button"
        />
      </div>

      {/* Dold file input */}
      <input
        type="file"
        id="file-upload-input"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const arrayBuffer = await file.arrayBuffer();
          const apiUrl = window.location.hostname === "localhost" 
            ? `http://localhost:3001/api/files/${file.name}` 
            : `/api/files/${file.name}`;

          fetch(apiUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/octet-stream" },
            body: arrayBuffer,
          })
            .then((res) => res.json())
            .then((data) => {
              onUploadFile(file.name);
            })
            .catch((err) => console.error("Upload failed", err));
        }}
      />

      {/* Övriga statiska knappar */}
      <NavButton label="Min enhet" icon="📁" />
      <NavButton label="Datorer" icon="💻" />
      <NavButton label="Delat med mig" icon="👥" />
      <NavButton label="Senaste" icon="🕒" />
      <NavButton label="Stjärnmärkta" icon="⭐" />
      <NavButton label="Papperskorg" icon="🗑️" />

      {/* Spacer som trycker ner theme-knappen */}
      <div className="sidebar-spacer" style={{ flex: 1 }} />

      {/* Theme-knappen längst ner */}
      <NavButton
        label={theme === "light" ? "Mörkt läge" : "Ljust läge"}
        icon="🌓"
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      />

    </div>
  );
}

export default Sidebar;
