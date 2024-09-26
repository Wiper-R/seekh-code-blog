// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "http://seekhcode.me",
  integrations: [tailwind(), react({ experimentalReactChildren: true }), mdx()],
  markdown: {
    shikiConfig: { theme: "slack-dark" },
  },
});
