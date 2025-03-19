export const googleCloudConfig = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID ?? "",
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE ?? "",
  bucketName: process.env.GOOGLE_CLOUD_BUCKET_NAME ?? "",
};
