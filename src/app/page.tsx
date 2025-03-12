import { FadeScreen } from "@/components/FadeScreen";
import { ImageWrapper } from "@/components/ImageWrapper";
import { GetBucketFiles } from "@/services/storage.service";

const BG_IMAGE_PATH = "/main_image.webp";

export default async function Home() {
  const images = await GetBucketFiles("images");

  return (
    <>
      <FadeScreen bgImagePath={BG_IMAGE_PATH} />
      <ImageWrapper images={images ?? []} />
    </>
  );
}
