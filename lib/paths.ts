// Set when the site is served from a sub-path, e.g. the GitHub project page
// https://noahzaidi.github.io/na_site/ (NEXT_PUBLIC_BASE_PATH=/na_site).
// Empty once the site runs on its own domain.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public/ file (image, video, icon) with the base path. Links go through next/link, which adds it itself. */
export const asset = (path: string) => `${basePath}${path}`;
