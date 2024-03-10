import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

import AstroPWA from "@vite-pwa/astro";

import metaTags from "astro-meta-tags";
import { manifest, seoConfig } from "./utils/seoConfig";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,
  output: "server",
  integrations: [
    react(),
    metaTags(),
    sitemap(),
    compress(),
    AstroPWA({
      includeAssets: ['favicon.svg'],
      registerType: "autoUpdate",
      manifest: manifest,
      workbox: {
        navigateFallback: "/404",
        globDirectory: "dist",
        globPatterns: [
          "**/*.{ts,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,tsx,js,astro}",
        ],
        
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
