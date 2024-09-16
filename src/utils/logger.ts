import chalk from "chalk";

export const logger = {
  error: (...args: unknown[]) => console.error(chalk.red(...args)),
  warn: (...args: unknown[]) => console.warn(chalk.yellow(...args)),
  info: (...args: unknown[]) => console.log(chalk.blue(...args)),
  success: (...args: unknown[]) => console.log(chalk.green(...args)),
};