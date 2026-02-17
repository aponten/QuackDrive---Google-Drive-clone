import React from "react";
import FileRow from "./FileRow";

function FileList({ files, onSelect, selectedFiles, onDelete, onSelectAll }) {
  const isAllSelected = files.length > 0 && selectedFiles.length === files.length;

  const handleSelectAll = (e) => {
    if (isAllSelected) {
      onSelectAll([]);
    } else {
      onSelectAll(files.map(f => f.name));
    }
  };

  return (
    <div className="file-list">
      <div className="file-header">
        <div className="file-checkbox">
          <input 
            type="checkbox" 
            checked={isAllSelected} 
            onChange={handleSelectAll} 
          />
        </div>
        <div className="file-icon"></div>
        <div className="file-name">Namn</div>
        <div className="file-type">Filtyp</div>
        <div className="file-date">Senast ändrad</div>
        <div className="file-size">Storlek</div>
        <div className="file-actions">Åtgärder</div>
      </div>

      {files.map((file) => (
        <FileRow
          key={file.name}
          name={file.name}
          type={file.type}
          date={file.date}
          isSelected={selectedFiles.includes(file.name)}
          onClick={() => onSelect(file)}
          onDelete={() => onDelete(file)}
        />
      ))}
    </div>
  );
}

export default FileList;
