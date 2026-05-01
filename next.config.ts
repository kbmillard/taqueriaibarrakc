import type { NextConfig } from "next";

/**
 * Allowlisted remote image hosts for next/image.
 * Hero/gallery use Unsplash; menu `imageUrl` from Google Sheets often uses Google CDNs.
 * Add more hostnames here if staff paste images from another domain (build will fail fast otherwise).
 */
const IMAGE_HOSTS = [
  "images.unsplash.com",
  "lh3.googleusercontent.com",
  "lh4.googleusercontent.com",
  "lh5.googleusercontent.com",
  "lh6.googleusercontent.com",
  "storage.googleapis.com",
] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
  },
};

export default nextConfig;
