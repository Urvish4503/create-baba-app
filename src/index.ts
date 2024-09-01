#!/usr/bin/env node

import { Command } from "commander";
import * as p from "@clack/prompts";
import chalk from "chalk";

const command = new Command();

// console.clear();

command
  .name("Create baba app")
  .argument(
    "[dir]",
    "The name of the application, as well as the name of the directory to create",
  )
  .parse(process.argv);

let isDir = false;

if (command.args[0]) {
  isDir = true;
}

let appName = command.args[0];

const project = await p.group({
  ...(!isDir && {
    name: () =>
      p.text({
        message: "What is the name of the project?",
        // validate(value) {
        // //TODO: put a path validation here to check if the given path is valid or not
        //   if (!value) {
        //     return appName;
        //   }
        //   return value;
        // },
        defaultValue: appName,
      }),
  }),
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
  typeOfApp: () => {
    return p.select({
      message: "What type of app are you building?",
      options: [
        { value: "frontend", label: "Frontend" },
        { value: "backend", label: "Backend" },
        { value: "fullstack", label: "Fullstack" },
      ],
      initialValue: "backend",
    });
  },
  onCancel() {
    console.log("Cancelled");
    process.exit(0);
  },
});

if (project.name) appName = project.name;

console.log(project);
