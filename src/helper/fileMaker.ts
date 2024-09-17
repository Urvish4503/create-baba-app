import * as fs from "fs";
import * as path from "path";
import { logger } from "../utils/logger.js";
import { ProjectConfig } from "../cli/index.js";

export function makeProject(projectInfo: ProjectConfig) {
  const dirPath = path.resolve(process.cwd(), projectInfo.name);

  console.log(dirPath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    logger.info(`Created directory: ${dirPath}`);
  } else {
    logger.error("Directory already exists...");
    return;
  }

  if (projectInfo.eslint) {
    try {
      fs.copyFileSync(
        path.join(process.cwd(), "/template/comman/_eslint.js"),
        `${dirPath}/.eslint.js`,
      );
      logger.info("eslint file copied");
    } catch (error) {
      logger.error("Error copying eslint file");
      console.error(error);
    }
  }
}
