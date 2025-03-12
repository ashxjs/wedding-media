import type { NextConfig } from "next";

const ONE_HOUR = 60 * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: ONE_MONTH,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "iwxadmbvwmdcvdmfveri.supabase.co",
      },
    ],
  },
};

export default nextConfig;
