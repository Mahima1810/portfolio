import type { NextConfig } from "next";

// Static export so the site can be hosted for free on GitHub Pages.
// If you deploy to a project page (github.com/<user>/portfolio) instead of <user>.github.io,
// set NEXT_PUBLIC_BASE_PATH=/portfolio in the build environment.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
