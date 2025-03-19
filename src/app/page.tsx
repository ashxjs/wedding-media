import { FadeScreen } from "@/components/FadeScreen";
import { ImageWrapper } from "@/components/ImageWrapper";
import { GetBucketFiles, GetVideoUrl } from "@/services/storage.service";

import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("../components/VideoPlayer"));

const BG_IMAGE_PATH = "/main_image.webp";

export default async function Home() {
  const images = await GetBucketFiles("images");

  return (
    <>
      <FadeScreen bgImagePath={BG_IMAGE_PATH} />
      <VideoPlayer />
      <ImageWrapper images={images ?? []} />
    </>
  );
}
