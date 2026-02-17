import React from "react";

function SearchField({ onSearch, className = "" }) {
    
  return (
    <input
      type="text"
      placeholder="Sök filer..."
      className={className}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchField;
