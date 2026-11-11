import type { NextConfig } from "next";

// For a user/organisation site (shobhit-v15.github.io) the base path is empty.
// If you ever deploy to a project page (username.github.io/repo), set
// NEXT_PUBLIC_BASE_PATH=/repo at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  reactStrictMode: true,
};

export default nextConfig;
