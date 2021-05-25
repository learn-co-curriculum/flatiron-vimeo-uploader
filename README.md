# Flatiron Vimeo Uploader

## Setup

Clone/download, then install dependencies:

```sh
npm i
```

Next, install CLI app globally:

```sh
npm i -g
```

## Environment Variables

The CLI looks for certain API credentials in your environment variables to
authenticate with Vimeo. Make sure these are set up in ENV variables:

```sh
echo "$(export 'VIMEO_API_CLIENT_ID=<client-id>' | cat - ~/.zshrc)" > ~/.zshrc
echo "$(export 'VIMEO_API_CLIENT_SECRET=<client-secret>' | cat - ~/.zshrc)" > ~/.zshrc
echo "$(export 'VIMEO_API_ACCESS_TOKEN=<access-token>' | cat - ~/.zshrc)" > ~/.zshrc
```

Then run `source ~/.zshrc` to make these variables available.

## Usage

Run:

```sh
flatiron-vimeo-uploader
```

And follow the prompts!
