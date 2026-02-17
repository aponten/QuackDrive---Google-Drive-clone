import React from "react";
import SearchField from "../FileView/SearchField";
import logo from "../../assets/drive-logo.png";

function Topbar({ onSearch }) {
    return (
        <div className="topbar">
            <div className="topbar-logo">
                <img src={logo} alt="Duck Drive logo" className="logo-img" />
            </div>

            <div className="topbar-search">
                <SearchField
                    onSearch={onSearch}
                    className="topbar-search-input"
                />
            </div>

            <div className="topbar-actions">
                <div className="topbar-icon-btn" title="Inställningar">⚙️</div>
                <div className="topbar-user-profile">
                    <div className="user-avatar">K</div>
                    <span className="user-name">Kalle Anka</span>
                </div>
            </div>
        </div>
    );
}

export default Topbar;