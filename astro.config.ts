import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import { VitePWA } from "vite-plugin-pwa";
import metaTags from "astro-meta-tags";
import { manifest, seoConfig } from "./utils/seoConfig";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,
  output: 'server',
  integrations: [react(), metaTags(), sitemap(), compress()],
  vite: {
    plugins: [VitePWA({
      registerType: "autoUpdate",
      manifest,
      workbox: {
        globDirectory: "dist",
        globPatterns: ["**/*.{ts,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,tsx,js}"],
        navigateFallback: null
      }
    })]
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});