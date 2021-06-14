#!/usr/bin/env node
import fs from "fs";
import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import ProgressBar from "progress";
import { addLectureToSheet } from "./api/sheets.js";
import { uploadVideo } from "./api/vimeo.js";
import questions from "./questions.js";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

async function cli() {
  // Prompt user for video information
  const { discipline, program, cohort, phase, lesson, coast, time, filePath } =
    await inquirer.prompt(questions);

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
    const fileStats = fs.statSync(filePath);

    const bar = new ProgressBar(
      "📽  Uploading [:bar] :rate/bps :percent :etas :current / :total",
      {
        complete: "=",
        incomplete: " ",
        width: 20,
        total: fileStats.size,
      }
    );

    const uri = await uploadVideo(filePath, videoName, (bytesUploaded) =>
      bar.tick(bytesUploaded - bar.curr)
    );
    const vimeoId = uri.split("/").slice(-1);
    const vimeo = `https://vimeo.com/${vimeoId}`;
    console.log(`📽  Video uploaded to: ${vimeo}`);

    // Add video details to Google Sheet
    console.log();
    console.log("📃 Adding video details to Google Sheet...");

    const tags = [
      discipline,
      phase.replace(/\s/g, ""),
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

    console.log(
      `📃 View updated sheet: https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_LECTURE_SHEET_ID}`
    );

    // clean exit
    console.log("🤠 All done!");
    process.exit(0);
  } catch (err) {
    console.log(`🚫 Upload error: ${err}`);
    process.exit(1);
  }
}

export default cli;
