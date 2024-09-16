#!usr/bin/env node

import { runCli } from "./cli/index.js";
import { addDenpendancies } from "./helper/addDependencies.js";
import { logger } from "./utils/logger.js";

const main = async () => {
  try {
    const project = await runCli();
    console.log(project);
    // TODO: Add project creation logic here
    await addDenpendancies(project);
  } catch (err) {
    logger.error("Aborting installation...");
    if (err instanceof Error) {
      logger.error(err.message);
    } else {
      logger.error(
        "An unknown error has occurred. Please open an issue on github with the below:",
      );
      console.log(err);
    }
    process.exit(1);
  }
};

main();
