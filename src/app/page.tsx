import { FadeScreen } from "@/components/FadeScreen";
import { ImageWrapper } from "@/components/ImageWrapper";
import { GetAllImages } from "@/services/storage.service";

export default async function Home() {
  const images = await GetAllImages();

  return (
    <>
      <FadeScreen bgImagePath="https://iwxadmbvwmdcvdmfveri.supabase.co/storage/v1/object/public/images//DSC08113.webp" />
      <ImageWrapper images={images ?? []} />
    </>
  );
}
