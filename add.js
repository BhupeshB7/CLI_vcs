import fs from "fs/promises";
import path from "path";
import { directoryExists, isIgnored,  filesAreIdentical } from "./helpers/helper.js";
import { readJSON,getAllFiles } from "./constants/index.js";
import {  commitsDir, historyFile, stagingDir } from "./constants/constants.js";
const add = async (filename) => {
  await readJSON(historyFile);

  if (filename === ".") {
    const allFiles = await getAllFiles(process.cwd());
    for (const filePath of allFiles) {
      const relativeFilePath = path.relative(process.cwd(), filePath);
      if (await isIgnored(relativeFilePath)) {
        console.log(`Ignored: ${relativeFilePath}`);
        continue;
      }

      const stagedPath = path.join(stagingDir, relativeFilePath);
      const lastCommitPath = path.join(commitsDir, relativeFilePath);

      if (
        (await directoryExists(lastCommitPath)) &&
        (await filesAreIdentical(filePath, lastCommitPath))
      ) {
        console.log(`${relativeFilePath} is already up to date.`);
      } else {
        await fs.mkdir(path.dirname(stagedPath), { recursive: true });
        await fs.copyFile(filePath, stagedPath);
        console.log(`Added ${relativeFilePath} to the staging area.`);
      }
    }
  } else {
    const filePath = path.join(process.cwd(), filename);
    if (await isIgnored(filename)) {
      console.log(`${filename} is ignored by .vcsIgnore.`);
      return;
    }

    const stagedPath = path.join(stagingDir, filename);
    const lastCommitPath = path.join(commitsDir, filename);

    if (
      (await directoryExists(lastCommitPath)) &&
      (await filesAreIdentical(filePath, lastCommitPath))
    ) {
      console.log(`${filename} is already up to date.`);
    } else {
      await fs.mkdir(path.dirname(stagedPath), { recursive: true });
      await fs.copyFile(filePath, stagedPath);
      console.log(`Added ${filename} to the staging area.`);
    }
  }
};

export default add;