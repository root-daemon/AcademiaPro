import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import Timetabler from "../components/Generator/TimeTableGenerator";

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

export const GET = async ({ request }: { request: Request }) => {
  return new Promise((resolve) => {
    const key = getToken(request.headers.get("cookie") as string);

    if (!key)
      resolve(
        new Response(
          JSON.stringify({
            error: "Not signed in!",
            message:
              "Cannot find a user token! Most probably you didn't login. Try again after logging in.",
            url: "https://academia-pro.vercel.app/login",
          }),
          {
            status: 401,
            statusText: "Unauthorized",
          }
        )
      );
    else {
      const Inter = fs.readFileSync(path.resolve("./fonts/Inter.ttf"));

      fetch("https://academai-s-3.azurewebsites.net//course-user", {
        method: "POST",
        headers: {
          "x-access-token": decodeURIComponent(key as string),
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
            new ImageResponse(
              JSON.parse(JSON.stringify(Timetabler({ body }))),
              {
                width: 2400,
                height: 920,
                fonts: [
                  {
                    name: "Inter",
                    data: Inter.buffer,
                    style: "normal",
                  },
                ],
              }
            )
          );
        });
    }
  });
};

function getToken(cookie: string) {
  var i,
    x,
    y,
    ARRcookies = cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == "token") {
      return unescape(y);
    }
  }
}