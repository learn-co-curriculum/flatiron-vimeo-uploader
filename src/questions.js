import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import { getFolders } from "./api/vimeo.js";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

async function getAnswers() {
  // Get folder list from Vimeo
  const { data } = await getFolders();
  const folderList = data.map((folder) => ({
    name: folder.name,
    value: folder.uri,
  }));

  return inquirer.prompt([
    {
      type: "file-tree-selection",
      name: "filePath",
      message:
        "Select video file (use arrows to navigate; tab to enter directory)",
    },
    {
      type: "list",
      message: "Select a folder to upload to",
      choices: folderList,
      name: "folderUri",
    },
    {
      type: "list",
      name: "discipline",
      message: "What discipline?",
      choices: ["SE", "DS", "CSA", "CSE"],
    },
    {
      type: "list",
      name: "program",
      message: "Live or Flex?",
      choices: ["Live", "Flex"],
    },
    {
      type: "input",
      name: "cohort",
      message: "Enter the cohort start date (i.e. 031521)",
    },
    {
      type: "list",
      name: "phase",
      message: "What phase is the video for?",
      choices: [1, 2, 3, 4, 5].map((n) => `Phase ${n}`),
    },
    {
      type: "input",
      name: "lesson",
      message: "Enter the lesson name (i.e. 1. Intro to React)",
    },
    {
      type: "list",
      name: "coast",
      message: "Coast?",
      choices: ["East", "Central", "West"],
    },
    {
      type: "list",
      name: "time",
      message: "AM or PM?",
      choices: ["AM", "PM"],
    },
  ]);
}

export { getAnswers };
