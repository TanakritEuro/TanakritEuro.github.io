// Generates public/og.png (social preview) and public/apple-touch-icon.png.
// Text comes from content/resume.json. Re-run after changing the name or headline:
//   npm run images
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const resume = JSON.parse(await readFile(new URL("content/resume.json", root), "utf8"));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fbfaf7"/>
  <rect x="0" y="0" width="16" height="630" fill="#22409f"/>
  <text x="96" y="250" font-family="${serif}" font-size="76" font-weight="700" fill="#1b1a18">${esc(resume.name)}</text>
  <text x="96" y="320" font-family="${sans}" font-size="34" fill="#5d5a54">${esc(resume.headline)}</text>
  <rect x="96" y="380" width="${Math.round(resume.availability.length * 15.2) + 80}" height="64" rx="32" fill="#e6eaf7"/>
  <circle cx="132" cy="412" r="9" fill="#22409f"/>
  <text x="158" y="423" font-family="${sans}" font-size="30" font-weight="600" fill="#1b1a18">${esc(resume.availability)}</text>
  <text x="96" y="550" font-family="${sans}" font-size="28" fill="#22409f">tanakriteuro.github.io</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(new URL("public/og.png", root).pathname.replace(/^\/(\w:)/, "$1"));

const favicon = await readFile(new URL("public/favicon.svg", root));
await sharp(favicon, { density: 400 })
  .resize(180, 180)
  .flatten({ background: "#22409f" })
  .png()
  .toFile(new URL("public/apple-touch-icon.png", root).pathname.replace(/^\/(\w:)/, "$1"));

console.log("Wrote public/og.png and public/apple-touch-icon.png");
