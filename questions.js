const QUESTIONS = [
  {
    type: "input",
    name: "filePath",
    message:
      "Enter the path to the video file (i.e. ./videos/phase-1-intro-react.mov)",
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
    message: "East or West Coast?",
    choices: ["East Coast", "West Coast"],
  },
  {
    type: "list",
    name: "time",
    message: "AM or PM?",
    choices: ["AM", "PM"],
  },
];

export default QUESTIONS;
