import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import Timetabler from "../components/Generator/TimeTableGenerator";
import type { APIRoute } from "astro";

export async function POST({ request }: { request: Request }) {
  const body = await request.json();

  const Inter = fs.readFileSync(path.resolve("./fonts/Inter.ttf"));

  return new ImageResponse(JSON.parse(JSON.stringify(Timetabler({ body }))), {
    width: 2400,
    height: 920,
    fonts: [
      {
        name: "Inter",
        data: Inter.buffer,
        style: "normal",
      },
    ],
  });
}

export const GET = (window: any) => {
  return new Promise((resolve) => {
    const urlSearchParams = new URLSearchParams(window.url.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const Inter = fs.readFileSync(path.resolve("./fonts/Inter.ttf"));

    fetch("https://academai-s-3.azurewebsites.net//course-user", {
      method: "POST",
      headers: {
        "x-access-token": decodeURIComponent(params.key as string),
        Host: "academai-s-3.azurewebsites.net",
        Origin: "https://a.srmcheck.me",
        Referer: "https://a.srmcheck.me/",
        "Cache-Control": "max-age=604800 must-revalidate",
      },
    })
      .then((r) => r.text())
      .then((res) => {
        const body = JSON.parse(res);

        resolve(
          new ImageResponse(JSON.parse(JSON.stringify(Timetabler({ body }))), {
            width: 2400,
            height: 920,
            fonts: [
              {
                name: "Inter",
                data: Inter.buffer,
                style: "normal",
              },
            ],
          })
        );
      });
  });
};
