import fs from "fs/promises";
import path from "path";
import { getAllFiles, readJSON, writeJSON } from "./constants/index.js"
import { commitsDir, historyFile, stagingDir } from "./constants/constants.js";

 const commit = async (message) => {
    const stagedFiles = await getAllFiles(stagingDir);
  
    if (stagedFiles.length === 0) {
      console.log(
        'No files staged for commit. Please add files using "vcs add".'
      );
      return;
    }
  
    for (const stagedFile of stagedFiles) {
      const relativeFilePath = path.relative(stagingDir, stagedFile);  
      const commitFilePath = path.join(commitsDir, relativeFilePath); 
  
      
      await fs.mkdir(path.dirname(commitFilePath), { recursive: true });
  
       
      await fs.rename(stagedFile, commitFilePath);
    }
    
    const history = await readJSON(historyFile);
    history.push({
      message,
      timestamp: new Date().toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
      files: stagedFiles.map((file) => path.relative(stagingDir, file)),
    });
    await writeJSON(historyFile, history);
  
    console.log(
      `Committed ${stagedFiles.length} files with message: "${message}"`
    );
  };
  export default commit;