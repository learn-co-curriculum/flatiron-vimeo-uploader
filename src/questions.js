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

  const answers = await inquirer.prompt([
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
      default: process.env.FVU_FOLDER_URI,
    },
    {
      type: "list",
      name: "discipline",
      message: "What discipline?",
      choices: ["SE", "DS", "CSA", "CSE"],
      default: process.env.FVU_DISCIPLINE,
    },
    {
      type: "list",
      name: "program",
      message: "Live or Flex?",
      choices: ["Live", "Flex"],
      default: process.env.FVU_PROGRAM,
    },
    {
      type: "input",
      name: "cohort",
      message: "Enter the cohort start date (i.e. 031521)",
      default: process.env.FVU_COHORT,
    },
    {
      type: "list",
      name: "phase",
      message: "What phase is the video for?",
      choices: [1, 2, 3, 4, 5].map((n) => `Phase ${n}`),
      default: process.env.FVU_PHASE,
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
      default: process.env.FVU_COAST,
    },
    {
      type: "list",
      name: "time",
      message: "AM or PM?",
      choices: ["AM", "PM"],
    },
  ]);
  console.log(
    "If you'd like to set these choices as defaults, add these exports to your .bash_profile or .zshrc"
  );
  console.log(`export FVU_FOLDER_URI=${answers.folderUri}`);
  console.log(`export FVU_DISCIPLINE=${answers.discipline}`);
  console.log(`export FVU_PROGRAM=${answers.program}`);
  console.log(`export FVU_COHORT=${answers.cohort}`);
  console.log(`export FVU_PHASE="${answers.phase}"`);
  console.log(`export FVU_COAST=${answers.coast}`);
  return answers;
}

export { getAnswers };
