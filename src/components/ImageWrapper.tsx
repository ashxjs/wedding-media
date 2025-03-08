"use client";
import { FunctionComponent, useState } from "react";
import { ImageOverlay } from "@/components/ImageOverlay";
import { ImageContainer } from "@/components/ImageContainer";

export const ImageWrapper: FunctionComponent<{ images: string[] }> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <ImageContainer
        images={images}
        onImageClick={handleImageClick}
        imageProps={{ height: 500, width: 500 }}
      />
      {selectedImage ? (
        <ImageOverlay
          isOpen={isOverlayOpen}
          imageSrc={selectedImage}
          onClose={handleCloseOverlay}
        />
      ) : null}
    </>
  );
};
