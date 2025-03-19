const isDev = process.env.NODE_ENV === "development";
const keyFile = isDev
  ? process.env.GOOGLE_CLOUD_KEY_FILE
  : JSON.parse(process.env.GOOGLE_CLOUD_KEY_FILE ?? "");

export const googleCloudConfig = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID ?? "",
  keyFilename: keyFile,
  bucketName: process.env.GOOGLE_CLOUD_BUCKET_NAME ?? "",
};
