import fs from "fs/promises";
import crypto from "crypto";
import path from "path";
export const directoryExists = async (dirPath) => {
    try {
      await fs.access(dirPath);
      return true;
    } catch {
      return false;
    }
  };

  export const isIgnored = async (filename) => {
    const ignorePath = path.join(process.cwd(), ".vcsIgnore");
    try {
      const ignorePatterns = await fs.readFile(ignorePath, "utf-8");
      const ignoreList = ignorePatterns
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      return ignoreList.some((pattern) => filename.includes(pattern));
    } catch {
      return false; // If no .vcsIgnore file exists, don't ignore any files
    }
  };
  
export const generateFileHash = async (filePath) => {
  const content = await fs.readFile(filePath, "utf-8");
  return crypto.createHash("sha1").update(content).digest("hex");
};

export const filesAreIdentical = async (file1, file2) => {
  try {
    const hash1 = await generateFileHash(file1);
    const hash2 = await generateFileHash(file2);
    return hash1 === hash2;
  } catch {
    return false;
  }
};
 