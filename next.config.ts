import type { NextConfig } from "next";

const ONE_HOUR = 60 * 60;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: ONE_HOUR,
    remotePatterns: [
      {
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
