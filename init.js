import fs from "fs/promises";
import os from "os";
import { writeJSON } from "./constants/index.js";
import { directoryExists } from "./helpers/helper.js";
import {
  commitsDir,
  historyFile,
  stagingDir,
  vcsDir,
} from "./constants/constants.js";

const init = async () => {
  if (await directoryExists(vcsDir)) {
    console.log("VCS is already initialized.");
    return;
  }

  await fs.mkdir(vcsDir);
  await fs.mkdir(commitsDir);
  await fs.mkdir(stagingDir);
  await writeJSON(historyFile, []);

  if (os.platform() === "win32") {
    // Dynamic import for child_process
    const { exec } = await import("child_process");
    exec(`attrib +h ${vcsDir}`);
  }

  console.log("Initialized empty VCS repository.");
};

export default init;
