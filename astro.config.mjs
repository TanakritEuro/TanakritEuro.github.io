// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tanakriteuro.github.io",
  output: "static",
  trailingSlash: "ignore",
  build: { inlineStylesheets: "always" },
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
});
