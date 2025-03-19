"use server";
import { googleCloudConfig } from "../../lib/config";
import { Storage } from "@google-cloud/storage";

const ONE_MONTH = 60 * 60 * 24 * 30;
const storage = new Storage({
  projectId: googleCloudConfig.projectId,
  keyFilename: googleCloudConfig.keyFilename,
});

export const GetBucketFiles = async (path: string) => {
  const [files] = await storage
    .bucket(googleCloudConfig.bucketName)
    .getFiles({ prefix: path });

  const imageFiles = files.filter((file) =>
    file.metadata?.contentType?.includes("image")
  );

  const signedUrls = await Promise.all(
    imageFiles.map(async (file) => {
      const [signedUrl] = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + ONE_MONTH, // 30 days
      });

      return signedUrl;
    })
  );

  return signedUrls;
};

export const GetVideoUrl = async (file: string) => {
  const [signedUrl] = await storage
    .bucket(googleCloudConfig.bucketName)
    .file(file)
    .getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + ONE_MONTH,
    });

  return signedUrl;
};
