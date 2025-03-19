import Image from "next/image";

type ImageContainerProps = {
  images: string[];
  onImageClick: (image: string) => void;
  imageProps: {
    height: number;
    width: number;
  };
};

const blurDataUrl =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84OC8xOi8tQVBCNzhLPS0yRVhJTlNiXV9hZmFkYUVmbWVtZWb/2wBDARUXFyAeIBohHB8mIiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJib/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

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
              priority={i < 8}
              fetchPriority="low"
              className="object-cover h-full w-full hover:scale-105 transition-all duration-300"
              height={imageProps.height}
              width={imageProps.width}
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
