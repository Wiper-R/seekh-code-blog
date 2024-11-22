// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import { nodePolyfills } from "vite-plugin-node-polyfills";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://seekhcode.me",
  // base: "/seekh-code-blog",
  integrations: [
    tailwind(),
    react({ experimentalReactChildren: true }),
    mdx(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    sitemap()
  ],
  markdown: {
    shikiConfig: { theme: "slack-dark" },
  },
  vite: {
    plugins: [
      nodePolyfills()
    ]
  }

});