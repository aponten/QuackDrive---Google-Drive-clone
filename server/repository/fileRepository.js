import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs"; 
import path from "path";

const FILES_DIR = path.resolve("./server/storage");

if (!existsSync(FILES_DIR)) {
    mkdirSync(FILES_DIR, { recursive: true });
}

function sanitizeFilename(filename) {
    const basename = path.basename(filename);
    return basename;
}

export async function getAllFiles() {
    try {
        const filenames = await fs.readdir(FILES_DIR);
        const filePromises = filenames.map(async (name) => {
            const stats = await fs.stat(path.join(FILES_DIR, name));
            return {
                name,
                date: stats.mtime,
                type: name.split(".").pop(),
                size: stats.size
            };
        });
        return await Promise.all(filePromises);
    } catch (err) {
        return [];
    }
}

export async function deleteFile(filename) {
    const safeName = sanitizeFilename(filename);
    const filePath = path.join(FILES_DIR, safeName);
    try {
        await fs.unlink(filePath);
    } catch (err) {}
}
