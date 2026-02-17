import React, { useState, useEffect } from "react";

import FileList from "./components/FileView/FileList";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import EmptyState from "./components/FileView/EmptyState";


import { getFiles, deleteFile, addFile } from "./services/fileService";
import "./styles/layout.css";
import "./styles/light-theme.css";
import "./styles/dark-theme.css";


function App() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]); // Lista med filnamn

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getFiles(debouncedSearch)
            .then((data) => {
                setFiles(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch failed", err);
                setError("Kunde inte ansluta till servern. Kontrollera att backend körs.");
                setLoading(false);
            });
    }, [debouncedSearch]);

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleSelect = (file) => {
        setSelectedFiles((prev) => {
            if (prev.includes(file.name)) {
                return prev.filter((name) => name !== file.name);
            } else {
                return [...prev, file.name];
            }
        });
    };

    const handleDelete = async (fileToDelete) => {
        const filenames = fileToDelete ? [fileToDelete.name] : selectedFiles;
        if (filenames.length === 0) return;

        const confirmMsg = filenames.length === 1 
            ? `Är du säker på att du vill ta bort ${filenames[0]}?`
            : `Är du säker på att du vill ta bort ${filenames.length} filer?`;

        if (!window.confirm(confirmMsg)) return;

        try {
            for (const name of filenames) {
                await deleteFile(name);
            }
            setFiles((prev) => prev.filter((f) => !filenames.includes(f.name)));
            setSelectedFiles((prev) => prev.filter((name) => !filenames.includes(name)));
            setError(null);
        } catch (err) {
            console.error("Delete failed", err);
            setError("Kunde inte ta bort filerna. Försök igen senare.");
        }
    };

    const handleSearch = (query) => {
        setSearch(query);
    };

    async function onUploadFile(filename) {
        try {
            const files = await getFiles(); 
            setFiles(files); 
            setError(null);
        } catch (err) {
            setError("Filen laddades upp men listan kunde inte uppdateras.");
        }
    }

    return (
        <div className={`app ${theme}`}>
            <Topbar onSearch={handleSearch} />
            <div className="content">
                <Sidebar
                    onAddFile={() => {}} // Används ej längre
                    onDelete={() => handleDelete()}
                    theme={theme}
                    setTheme={setTheme}
                    files={files}
                    onUploadFile={onUploadFile}
                />
                <div className="main">
                    {error && (
                        <div className="error-banner" style={{
                            backgroundColor: "#fdecea",
                            color: "#d32f2f",
                            padding: "1rem",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <span>⚠️ {error}</span>
                            <button onClick={() => window.location.reload()} style={{
                                backgroundColor: "#d32f2f",
                                color: "white",
                                border: "none",
                                padding: "4px 12px",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}>Ladda om</button>
                        </div>
                    )}
                    <div className="welcome-row">
                        <div className="welcome-text">
                            <h2>Välkommen till QuackDrive</h2>
                        </div>
                        {selectedFiles.length > 0 && (
                            <button className="bulk-delete-btn" onClick={() => handleDelete()}>
                                🗑️ Ta bort markerade ({selectedFiles.length})
                            </button>
                        )}
                    </div>

                    <div className="main-content">
                        {loading ? (
                            <p>Laddar filer...</p>
                        ) : files.length === 0 && !error ? (
                            <EmptyState />
                        ) : (
                            <FileList 
                                files={files} 
                                onSelect={handleSelect} 
                                selectedFiles={selectedFiles}
                                onDelete={handleDelete}
                                onSelectAll={(allNames) => setSelectedFiles(allNames)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;