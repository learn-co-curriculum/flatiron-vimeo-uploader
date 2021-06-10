#!/usr/bin/env node
import inquirer from "inquirer";
import { uploadVideo } from "./api/index.js";
import { addLectureToSheet } from "./api/sheets.js";
import QUESTIONS from "./questions.js";

(async () => {
  // Prompt user for video information
  const { discipline, program, cohort, phase, lesson, coast, time, filePath } =
    await inquirer.prompt(QUESTIONS);

  const ui = new inquirer.ui.BottomBar();
  ui.log.write("Uploading video");

  try {
    const videoName = [
      discipline,
      program,
      cohort,
      phase,
      lesson,
      coast,
      time,
    ].join(" - ");

    // Upload to Vimeo
    ui.log.write(`Uploading video...`);
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
    const vimeo = `https://vimeo.com/${vimeoId}`;
    ui.log.write(`Video uploaded to: ${vimeo}`);

    // Add video details to Google Sheet
    ui.log.write("📃 Adding video details to Google Sheet...");

    const tags = [
      discipline,
      phase,
      lesson.replace(/[^A-z]|pt./g, ""),
      coast,
      time,
    ]
      .map((tag) => "#" + tag.toLowerCase())
      .join(", ");
    const phaseNumber = phase.split(" ")[1];
    const coastWithTime = `${coast} ${time}`;

    await addLectureToSheet(
      program,
      cohort,
      phaseNumber,
      lesson,
      coastWithTime,
      tags,
      vimeo
    );

    ui.log.write(
      `📃 View updated sheet: https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_LECTURE_SHEET_ID}`
    );

    process.exit(0);
  } catch (err) {
    ui.log.write(`Upload error: ${err}`);
    process.exit(1);
  }
})();
