import { Command } from "commander";
import * as p from "@clack/prompts";
import chalk from "chalk";

export interface CliOptions {
  CI?: boolean;
  typescript?: boolean;
  javascript?: boolean;
  prisma?: boolean;
  drizzle?: boolean;
  tailwind?: boolean;
  express?: boolean;
  fastify?: boolean;
  prettier?: boolean;
  eslint?: boolean;
  db?: string;
}

export interface ProjectConfig {
  name: string;
  language: "typescript" | "javascript";
  typeOfApp: "frontend" | "backend" | "fullstack";
  styling: "css" | "tailwind";
  apiFramework?: "express" | "fastify";
  orm?: "prisma" | "drizzle" | "none";
  databaseProvider?: "mysql" | "postgres"; // TODO: MongoDB, SQLite
  prettier: boolean;
  eslint: boolean;
}

export const runCli = async () => {
  const command = new Command();
  command
    .name("Create baba app")
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create",
    )
    .option("--CI", "Flag to indicate running in CI mode")
    .option(
      "--typescript [boolean]",
      "Use TypeScript",
      (value) => !!value && value !== "false",
    )
    .option(
      "--javascript [boolean]",
      "Use JavaScript",
      (value) => !!value && value !== "false",
    )
    .option(
      "--prisma [boolean]",
      "Install Prisma ORM",
      (value) => !!value && value !== "false",
    )
    .option(
      "--drizzle [boolean]",
      "Install Drizzle ORM",
      (value) => !!value && value !== "false",
    )
    .option(
      "--tailwind [boolean]",
      "Use Tailwind CSS",
      (value) => !!value && value !== "false",
    )
    .option(
      "--express [boolean]",
      "Use Express.js",
      (value) => !!value && value !== "false",
    )
    .option(
      "--fastify [boolean]",
      "Use Fastify",
      (value) => !!value && value !== "false",
    )
    .option(
      "--prettier [boolean]",
      "Use Prettier",
      (value) => !!value && value !== "false",
    )
    .option(
      "--eslint [boolean]",
      "Use Eslint",
      (value) => !!value && value !== "false",
    )
    .option("--db <type>", "Database type (sqlite, mysql, postgres, mongodb)")
    .parse(process.argv);

  const options: CliOptions = command.opts();
  const appName = command.args[0];

  return getProjectConfig(options, appName);
};

export async function getProjectConfig(
  options: CliOptions,
  appName?: string,
): Promise<ProjectConfig> {
  if (options.CI) {
    return getCIConfig(options, appName);
  } else {
    return getInteractiveConfig(appName);
  }
}

function getCIConfig(options: CliOptions, appName?: string): ProjectConfig {
  return {
    name: appName ?? "baba-app",
    language: options.typescript ? "typescript" : "javascript",
    typeOfApp: "fullstack", // Default to fullstack in CI mode
    styling: options.tailwind ? "tailwind" : "css",
    apiFramework: options.fastify ? "fastify" : "express",
    orm: options.prisma ? "prisma" : options.drizzle ? "drizzle" : "none",
    databaseProvider:
      (options.db as ProjectConfig["databaseProvider"]) ?? "postgres",
    prettier: options.prettier !== undefined ? options.prettier : true,
    eslint: options.eslint !== undefined ? options.eslint : true,
  };
}

async function getInteractiveConfig(appName?: string): Promise<ProjectConfig> {
  return p.group({
    name: () =>
      p.text({
        message: "What is the name of the project?",
        defaultValue: appName,
        // TODO: put a validater here
      }),
    typeOfApp: () => {
      return p.select({
        message: "What type of app are you building?",
        options: [
          { value: "frontend", label: "Frontend" },
          { value: "backend", label: "Backend" },
          { value: "fullstack", label: "Fullstack" },
        ],
        initialValue: "fullstack",
      });
    },
    language: () => {
      return p.select({
        message: "Will you be using TypeScript or JavaScript?",
        options: [
          { value: "typescript", label: "TypeScript" },
          { value: "javascript", label: "JavaScript" },
        ],
        initialValue: "typescript",
      });
    },
    _: ({ results }) =>
      results.language === "javascript"
        ? p.note(chalk.redBright("Wrong answer, using TypeScript instead"))
        : undefined,
    styling: () => {
      return p.select({
        message: "Which styling solution would you like to use?",
        options: [
          { value: "css", label: "Plain CSS" },
          { value: "tailwind", label: "Tailwind CSS" },
        ],
        initialValue: "tailwind",
      });
    },
    apiFramework: ({ results }) => {
      if (results.typeOfApp !== "frontend") {
        return p.select({
          message: "Which API framework would you like to use?",
          options: [
            { value: "express", label: "Express" },
            { value: "fastify", label: "Fastify" },
          ],
          initialValue: "express",
        });
      }
    },
    orm: ({ results }) => {
      if (results.typeOfApp !== "frontend") {
        return p.select({
          message: "Which ORM would you like to use?",
          options: [
            { value: "drizzle", label: "Drizzle ORM" },
            { value: "prisma", label: "Prisma" },
            { value: "none", label: "No ORM (Want to do it your self)" },
          ],
          initialValue: "drizzle",
        });
      }
    },
    databaseProvider: ({ results }) => {
      if (results.typeOfApp !== "frontend") {
        return p.select({
          message: "What database provider would you like to use?",
          options: [
            { value: "mysql", label: "MySQL" },
            { value: "postgres", label: "PostgreSQL" },
            // TODO: Add them later
            // { value: "sqlite", label: "SQLite" },
            // { value: "mongodb", label: "MongoDB" },
          ],
          initialValue: "postgres",
        });
      }
    },
    prettier: () => {
      return p.confirm({
        message: "Would you like to use Prettier?",
        initialValue: true,
      });
    },
    eslint: () => {
      return p.confirm({
        message: "Would you like to use eslint?",
        initialValue: true,
      });
    },
  }) as Promise<ProjectConfig>;
}
