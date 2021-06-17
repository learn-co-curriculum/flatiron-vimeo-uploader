# Flatiron Vimeo Uploader

## Setup

Install CLI app globally:

```sh
npm i -g @learn-co-curriculum/flatiron-vimeo-uploader
```

To run:

```sh
flatiron-vimeo-uploader
```

## Environment Variables

The CLI looks for certain API credentials in your environment variables to
authenticate with Vimeo and Google Sheets. Make sure these are set up in ENV
variables in your `.zshrc` or `.bash_profile`:

```sh
export VIMEO_API_CLIENT_ID=<vimeo-client-id>
export VIMEO_API_CLIENT_SECRET=<vimeo-client-secret>
export VIMEO_API_ACCESS_TOKEN=<vimeo-access-token>
export GOOGLE_SERVICE_ACCOUNT_EMAIL=<google-service-account-email>
export GOOGLE_PRIVATE_KEY="<google-private-key(keep in quotes for multi-line)>"
export GOOGLE_LECTURE_SHEET_ID=<google-lecture-sheet-id>
```

Then run `source ~/.zshrc` to make these variables available.

## Usage

Run:

```sh
flatiron-vimeo-uploader
```

And follow the prompts! 

After you've filled them in for the first time, you'll see a print out to the console that looks something like this:

```bash
If you'd like to set these choices as defaults, add these exports to your .bash_profile or .zshrc
export FVU_FOLDER_URI=/users/106070186/projects/4269902
export FVU_DISCIPLINE=SE
export FVU_PROGRAM=Live
export FVU_COHORT=042621
export FVU_PHASE="Phase 3"
export FVU_COAST=Central
```

If you copy these Environment Variables to your `.bash_profile` or `.zshrc`, then next time you run the importer they'll be selected by default and you won't have to choose them again.

## Contributing

The two key tools this CLI uses are the Vimeo API and Google Sheets API.

### Google Sheets

Google Sheets API access is handled with the
[`google-spreadsheet`](https://theoephraim.github.io/node-google-spreadsheet) npm
package. It's set up using a Service Account:

- [https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account)

Whatever Google Sheet you are updating needs to provide edit access to the
service account that is associated with the `GOOGLE_SERVICE_ACCOUNT_EMAIL`
environment variable.

### Vimeo API

Vimeo uploads are handled using the [`vimeo`](https://www.npmjs.com/package/vimeo) npm package.

The setup guides are here:

- [https://developer.vimeo.com/api/guides/videos/upload](https://developer.vimeo.com/api/guides/videos/upload)

The credentials for the API were created as follows:

- Create an API application with upload access associated with the Vimeo account
- Generate an authorized access token with the `upload` scope
