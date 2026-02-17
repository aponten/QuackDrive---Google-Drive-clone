import React from "react";

function DownloadButton({ filename }) {
    const handleDownload = (e) => {
        e.stopPropagation(); // Stoppar "onclick" att triggas från raden
        window.location.href = `http://localhost:3001/api/files/${filename}`; // Navigerar till filens url för att trigga download
    };
    return (
        <button
            className="download-btn"
            onClick={handleDownload}
            title="Ladda ner">
            📥
        </button>
    );

}

export default DownloadButton;