// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://seekhcode.me",
  integrations: [
    tailwind(),
    react({ experimentalReactChildren: true }),
    mdx(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    sitemap({filter: (page) => !page.startsWith("https://seekhcode.me/blog/tags")})
  ],
  markdown: {
    shikiConfig: { theme: "slack-dark",  langs: []},
  }
});