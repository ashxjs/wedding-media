import { createClient } from "@/utils/server";

enum StorageBucket {
  IMAGES = "images",
}

const ONE_MONTH = 60 * 60 * 24 * 30;

export const GetAllImages = async () => {
  const supabase = await createClient();
  const { data: files, error } = await supabase.storage
    .from(StorageBucket.IMAGES)
    .list();

  if (error || !files) return null;

  const { data: urls } = await supabase.storage
    .from(StorageBucket.IMAGES)
    .createSignedUrls(
      files.map((file) => file.name),
      ONE_MONTH
    );

  return urls?.map((url) => url.signedUrl);
};
