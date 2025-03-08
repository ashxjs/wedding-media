import Image from "next/image";

type ImageContainerProps = {
  images: string[];
  onImageClick: (image: string) => void;
  imageProps: {
    height: number;
    width: number;
  };
};

export const ImageContainer = ({
  images,
  onImageClick,
  imageProps,
}: ImageContainerProps) => {
  return (
    <section className="w-full min-h-screen py-4 sm:py-6 md:py-10 sticky top-0 bg-black">
      <div className="mx-2 sm:mx-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {images.map((image: string, i: number) => (
          <div
            key={i}
            role="button"
            tabIndex={i}
            className="cursor-pointer overflow-hidden aspect-square"
            onClick={() => onImageClick(image)}
          >
            <Image
              src={image}
              alt={`Wedding photo ${i + 1}`}
              fetchPriority="low"
              priority={i < 8}
              className="object-cover h-full w-full hover:scale-105 transition-all duration-300"
              height={imageProps.height}
              width={imageProps.width}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
