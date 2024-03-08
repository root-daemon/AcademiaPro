import type { ManifestOptions } from "vite-plugin-pwa";

export const seoConfig = {
  baseURL: "https://academia-pro.vercel.app",
  description: "University data, beautifully presented at your fingertips",
  type: "website",
  image: {
    url: "https://i.ibb.co/WPfgnSS/og.png",
    width: 1200,
    height: 630,
  },
  siteName: "AcademiaPro",
};

export const manifest: Partial<ManifestOptions> = {
  name: "AcademiaPro",
  short_name: "Academia", 
  description: "University data, beautifully presented at your fingertips",

  theme_color: "#D4D4D4",
  background_color: "#0a0d12",
  display: "standalone",
  icons: [
    {
      src: "/favicons/192.png",
      sizes: "192x192",
      type: "image/png",
    },
		{
			src: "/favicons/256.png",
			sizes: "256x256",
			type: "image/png"
		},
		{
			src: "/favicons/android-launchericon-512-512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any maskable"
		}
  ],
};
