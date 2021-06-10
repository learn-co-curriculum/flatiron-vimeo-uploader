import { Vimeo } from "vimeo";

const CLIENT_ID = process.env.VIMEO_API_CLIENT_ID;
const CLIENT_SECRET = process.env.VIMEO_API_CLIENT_SECRET;
const ACCESS_TOKEN = process.env.VIMEO_API_ACCESS_TOKEN;

const client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

const noop = () => {};

function uploadVideo(filePath, videoName, onProgress = noop) {
  return new Promise((resolve, reject) => {
    client.upload(
      filePath,
      {
        name: videoName,
      },
      resolve,
      onProgress,
      reject
    );
  });
}

export { uploadVideo };
