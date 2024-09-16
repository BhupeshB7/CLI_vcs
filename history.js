import { historyFile } from "./constants/constants.js";
import { readJSON } from "./constants/index.js";
const history = async () => {
  const historyData = await readJSON(historyFile);
  if (historyData.length === 0) {
    console.log("No commits yet.");
    return;
  }

  historyData.forEach((commit, index) => {
    console.log(`Commit #${index + 1}`);
    console.log(`Message: ${commit.message}`);
    console.log(`Timestamp: ${commit.timestamp}`);
    console.log(`Files: ${commit.files.join(", ")}`);
    console.log("------------------------");
  });
};

export default history;
