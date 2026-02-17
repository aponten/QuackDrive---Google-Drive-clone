import React from "react";
import noFilesImg from "../../assets/nofiles.png";

function EmptyState() {
    return (
        <div className="empty-state">
            <img src={noFilesImg} alt="Inga filer" />
            <p>Inga filer att visa</p>
        </div>
    );
}

export default EmptyState;
