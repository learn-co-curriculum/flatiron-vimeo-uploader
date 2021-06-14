import { Vimeo } from "vimeo";

const CLIENT_ID = process.env.VIMEO_API_CLIENT_ID;
const CLIENT_SECRET = process.env.VIMEO_API_CLIENT_SECRET;
const ACCESS_TOKEN = process.env.VIMEO_API_ACCESS_TOKEN;

const client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

const noop = () => {};

// folderUri should be the path for the folder, ie
// /users/{user_id}/projects/{project_id}
function addToFolder(folderUri, videoId) {
  return new Promise((resolve, reject) => {
    client.request(
      {
        path: `${folderUri}/videos/${videoId}`,
        method: "PUT",
      },
      function (error, body, status_code, headers) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
}

function getFolders() {
  return new Promise((resolve, reject) => {
    client.request(
      {
        path: "/me/projects",
        query: {
          page: 1,
          per_page: 100,
        },
      },
      function (error, body, status_code, headers) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
}

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

export { uploadVideo, getFolders, addToFolder };
