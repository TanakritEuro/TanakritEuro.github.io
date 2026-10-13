import type { ImageMetadata } from "astro";

// Every image the content can reference. Astro optimizes these at build time;
// files in public/ would be shipped as-is, so images live under src/assets/.
const files = import.meta.glob<{ default: ImageMetadata }>("/src/assets/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

/** Resolve a file name from resume.json, e.g. image("projects", "gb-emu.png"). */
export function image(dir: "projects" | "images", file: string): ImageMetadata {
  const mod = files[`/src/assets/${dir}/${file}`];
  if (!mod) throw new Error(`Missing image src/assets/${dir}/${file}`);
  return mod.default;
}
