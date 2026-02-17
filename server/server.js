import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAllFiles, deleteFile } from "./repository/fileRepository.js";

const app = express();
const PORT = process.env.PORT || 3001;
const FILES_DIR = path.resolve("./server/storage");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// CORS - Dynamic handling for production
app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:5173", "https://quackdrive.onrender.com"]; // Add your Render URL here
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

const sanitize = (name) => path.basename(name);

app.get("/api/files", async (req, res) => {
    try {
        const query = req.query.q?.toLowerCase() || "";
        const files = await getAllFiles();
        const filtered = files.filter(file => file.name.toLowerCase().includes(query));
        res.json(filtered);
    } catch (err) {
        res.status(500).json({ error: "Kunde inte hämta filer" });
    }
});

app.get("/api/files/:filename", (req, res) => {
    const safeName = sanitize(req.params.filename);
    const filePath = path.join(FILES_DIR, safeName);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Filen finns inte" });
    res.download(filePath);
});

app.put("/api/files/:filename", express.raw({ type: "*/*", limit: "50mb" }), async (req, res) => {
    try {
        const safeName = sanitize(req.params.filename);
        const filePath = path.join(FILES_DIR, safeName);
        await fs.promises.writeFile(filePath, req.body);
        res.json({ message: "Filen sparad" });
    } catch (err) {
        res.status(500).json({ error: "Kunde inte spara filen" });
    }
});

app.delete("/api/files/:name", async (req, res) => {
    try {
        await deleteFile(req.params.name);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: "Kunde inte ta bort filen" });
    }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
