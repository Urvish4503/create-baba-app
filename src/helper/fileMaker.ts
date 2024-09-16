import * as fs from "fs";
import * as path from "path";
import { logger } from "../utils/logger.js";
import { ProjectConfig } from "../cli/index.js";

function makeProject(projectInfo: ProjectConfig) {
  const dirPath = path.resolve(process.cwd(), projectInfo.name);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    logger.info(`Created directory: ${dirPath}`);
  } else {
    logger.error("Directory already exists...");
    return;
  }

  if (projectInfo.eslint) {
    const templatePath = path.resolve(
      __dirname,
      "src/template/comman/_esling.js",
    );
    const targetPath = path.join(dirPath, ".eslintrc.js");

    try {
      const eslintContent = fs.readFileSync(templatePath, "utf-8");
      fs.writeFileSync(targetPath, eslintContent, "utf-8");
      logger.info(`Created .eslintrc.js in ${dirPath}`);
    } catch (error) {
      logger.error(`Error creating .eslintrc.js: ${error}`);
    }
  }
  // TODO: make other files
}
