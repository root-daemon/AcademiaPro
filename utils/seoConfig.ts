import type { ManifestOptions } from "vite-plugin-pwa";

export const seoConfig = {
  baseURL: "https://academia-pro.vercel.app",
  description: "University data, beautifully presented at your fingertips",
  type: "website",
  image: {
    url: "https://i.ibb.co/WPfgnSS/og.png", // Change this to your website's thumbnail.
    width: 1200,
    height: 630,
  },
  siteName: "AcademiaPro",
};

export const manifest: Partial<ManifestOptions> = {
  name: "AcademiaPro", // Change this to your website's name.
  short_name: "Academia", // Change this to your website's short name.
  description: "University data, beautifully presented at your fingertips", // Change this to your websites description.

  theme_color: "#D4D4D4",
  background_color: "#0a0d12", // Change this to your background color.
  display: "standalone",
  icons: [
    {
      src: "/public/favicon.svg",
      sizes: "192x192",
      type: "image/png",
    },
  ],
};
