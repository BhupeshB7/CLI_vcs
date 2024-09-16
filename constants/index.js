import fs from "fs/promises"; 
import path from "path";
export const readJSON = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeJSON = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// Get all files in the directory recursively
export const getAllFiles = async (dir) => {
  let files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === ".vcs") continue; // Skip .vcs directory
      const nestedFiles = await getAllFiles(fullPath);
      files = files.concat(nestedFiles);
    } else {
      files.push(fullPath);
    }
  }

  return files;
};
 
