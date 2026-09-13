import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: `next build` writes the site to out/.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // A stray lockfile in the home directory otherwise becomes the workspace root.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
