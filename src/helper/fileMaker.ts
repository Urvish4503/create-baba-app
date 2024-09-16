import * as fs from "fs";
import * as path from "path";
import { logger } from "../utils/logger.js";

function makeProject(projectInfo) {
  const dirPath = path.resolve(process.cwd(), projectInfo.name);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  } else {
    logger.error("File already exists...");
    return;
  }

  if (projectInfo.eslint) {
    fs.writeFileSync(`${dirPath}/.eslint.js`, "hihihi", "utf-8");
  }
}
