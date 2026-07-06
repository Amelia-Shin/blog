import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "www.notion.so" },
    ],
    localPatterns: [{ pathname: "/api/notion-image" }],
  },
};

export default nextConfig;
