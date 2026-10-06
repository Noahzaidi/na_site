import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: `next build` writes the site to out/.
  output: "export",
  trailingSlash: true,
  // Only set (e.g. "/na_site") when serving from a sub-path such as a GitHub project page.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
  // A stray lockfile in the home directory otherwise becomes the workspace root.
  turbopack: { root: process.cwd() },
  // English (app/(en)) and the translated sites (app/[lang]) are separate root
  // layouts, so the 404 page is its own document: app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

export default nextConfig;
