#!/usr/bin/env node
import inquirer from "inquirer";
import { uploadVideo } from "./api/index.js";
import QUESTIONS from "./questions.js";

(async () => {
  // Prompt user for video information
  const answers = await inquirer.prompt(QUESTIONS);

  const ui = new inquirer.ui.BottomBar();
  ui.log.write("Uploading video");

  try {
    const videoName = `${answers.discipline} | ${answers.program} | ${answers.cohort} | ${answers.phase} | ${answers.lesson} | ${answers.coast} | ${answers.time}`;
    const filePath = answers.filePath;

    // Upload to Vimeo
    const uri = await uploadVideo(
      filePath,
      videoName,
      function onProgress(bytesUploaded, bytesTotal) {
        // display progress bar
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        ui.updateBottomBar(`${percentage}% uploaded...`);
      }
    );
    const vimeoId = uri.split("/").slice(-1);
    ui.log.write(`Video uploaded to: https://vimeo.com/${vimeoId}`);
    process.exit(0);
  } catch (err) {
    ui.log.write(`Upload error: ${err}`);
    process.exit(1);
  }
})();
