// Runs after `next build`. Next 16.3's static export writes route-segment
// prefetch files in nested folders (book/__next.book/__PAGE__.txt), but its
// client requests them by flat name (book/__next.book.__PAGE__.txt). A static
// host like GitHub Pages can't map one to the other, so those prefetches 404.
// Copy each nested file to the flat name the client asks for.
import { copyFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

let copied = 0;
for await (const file of walk(root)) {
  const parts = relative(root, file).split(sep);
  const segment = parts.findIndex((part) => part.startsWith("__next."));
  // Only files that sit inside a __next.* folder need a flat copy.
  if (segment === -1 || segment === parts.length - 1) continue;
  const target = join(root, ...parts.slice(0, segment), parts.slice(segment).join("."));
  await copyFile(file, target);
  copied += 1;
}

console.log(`flatten-rsc: copied ${copied} prefetch file(s) to their flat names`);
