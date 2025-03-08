import { createClient } from "@/utils/server";

enum StorageBucket {
  IMAGES = "images",
}

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
      60 * 60 // 1 hour expiry
    );

  return urls?.map((url) => url.signedUrl);
};
