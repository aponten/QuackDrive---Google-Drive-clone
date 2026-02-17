// Använd relativ URL i produktion (när backend serverar frontend) 
// eller localhost under utveckling.
const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:3001/api/files" 
    : "/api/files";

export async function getFiles(query = "") {
    const res = await fetch(`${API_URL}?q=${query}`);
    if (!res.ok) throw new Error("Failed to fetch files");
    return res.json();
}

export async function deleteFile(filename) {
    const res = await fetch(`${API_URL}/${filename}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete file");
}

export async function addFile(filename) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: filename })
    });
    if (!res.ok) throw new Error("Failed to add file");
    return res.json();
}

// Ladda upp fil till servern
export async function uploadFile(file) {
    const res = await fetch(`${API_URL}/${file.name}`, { 
        method: "PUT",
        headers: {"Content-Type": file.type || "application/octet-stream"}, // "application/octet-stream" för okända fil-typer
        body: await file.arrayBuffer() // Omvanldar filens innehåll till råa bytes, backend vill ha rådata (express.raw)
    });

    if (!res.ok) throw new Error("Failed to upload file");
    return res.json();
}
