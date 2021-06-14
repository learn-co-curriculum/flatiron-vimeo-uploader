#!/usr/bin/env node
import fs from "fs";
import ProgressBar from "progress";
import { addLectureToSheet } from "./api/sheets.js";
import { uploadVideo, addToFolder } from "./api/vimeo.js";
import { getAnswers } from "./questions.js";

async function cli() {
  // Prompt user for video information
  const {
    filePath,
    folderUri,
    discipline,
    program,
    cohort,
    phase,
    lesson,
    coast,
    time,
  } = await getAnswers();

  try {
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

    const videoName = [
      discipline,
      program,
      cohort,
      phase,
      lesson,
      coast,
      time,
    ].join(" - ");

    const uri = await uploadVideo(filePath, videoName, (bytesUploaded) =>
      bar.tick(bytesUploaded - bar.curr)
    );
    const [videoId] = uri.split("/").slice(-1);
    // Move video to correct Vimeo folder
    const res = await addToFolder(folderUri, videoId);
    console.log(res);

    const vimeoUrl = `https://vimeo.com/${videoId}`;
    console.log(`📽  Video uploaded to: ${vimeoUrl}`);

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
      vimeoUrl
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
