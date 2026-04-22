import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://ayush.blog",
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: false,
    },
  },
  build: { format: "directory" },
});
