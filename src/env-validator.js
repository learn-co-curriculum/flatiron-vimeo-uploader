const requiredKeys = [
  "GOOGLE_LECTURE_SHEET_ID",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "VIMEO_API_CLIENT_ID",
  "VIMEO_API_CLIENT_SECRET",
  "VIMEO_API_ACCESS_TOKEN",
];

function validateEnvironmentVariables() {
  const missingKeys = requiredKeys.filter((envKey) => !(envKey in process.env));
  if (missingKeys.length) {
    console.log("Missing the following required environment variables:");
    console.log();
    console.log(missingKeys.join("\n"));
    console.log();
    console.log(
      "Please make sure they are exported and available (run `echo $KEY_NAME` to verify),"
    );
    console.log("then try again.");
    console.log(
      "More details: https://github.com/learn-co-curriculum/flatiron-vimeo-uploader#environment-variables"
    );
    process.exit(1);
  }
}

export { validateEnvironmentVariables };
