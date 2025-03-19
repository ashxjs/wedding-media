"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VIDEO_URL = "/api/videos/stream.mpd";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isShakaLoaded, setIsShakaLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [shaka, setShaka] = useState<any>(null);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === "undefined") return;

    // Set shaka after it's dynamically imported
    import("shaka-player/dist/shaka-player.ui.js").then((shakaModule) => {
      setShaka(shakaModule);
    });
  }, []);

  useEffect(() => {
    // Only initialize player when shaka is loaded and we're on client side
    if (!videoRef.current || !shaka) return;

    const player = new shaka.Player(videoRef.current);

    player
      .load(VIDEO_URL)
      .then(() => {
        console.log("Shaka Player is playing!");
        setIsShakaLoaded(true);
      })
      .catch((error) => {
        console.error("Shaka Player failed:", error);
        setUseFallback(true);
      });

    return () => {
      player.destroy();
    };
  }, [shaka]); // Only run when shaka is loaded

  return (
    <section className="w-full min-h-screen py-4 sm:py-6 md:py-10 sticky top-0 bg-black flex flex-col justify-center items-center gap-y-10">
      <h1 className="text-white text-4xl font-bold">Vidéo du mariage</h1>
      {useFallback ? (
        <ReactPlayer
          url={VIDEO_URL}
          controls
          playsinline
          width="90%"
          height="auto"
          className="rounded-lg shadow-lg overflow-hidden"
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
              forceDASH: true,
              forceSafariHLS: true,
            },
          }}
        />
      ) : (
        <video
          controls
          playsInline
          ref={videoRef}
          poster={"/main_image.webp"}
          className="w-full h-full rounded-lg shadow-lg overflow-hidden md:w-[90%] md:h-[90%]"
        />
      )}
    </section>
  );
};

export default VideoPlayer;
