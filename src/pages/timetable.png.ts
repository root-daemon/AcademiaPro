import { ImageResponse } from "@vercel/og";
import Timetabler from "../components/Generator/TimeTableGenerator";
import type { APIContext } from "astro";

const req = await fetch(
  "https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff"
);

const req2 = await fetch("https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff");

const Inter = await req.arrayBuffer();
const InterBold = await req2.arrayBuffer();

export async function POST({ request }: { request: Request }) {
  const body = await request.json();

  return new ImageResponse(JSON.parse(JSON.stringify(Timetabler({ body }))), {
    width: 2400,
    height: 920,
    fonts: [
      {
        name: "Inter",
        data: Inter,
        style: "normal",
      },
      {
        name: "Inter-Bold",
        data: InterBold,
        style: "normal",
      },
    ],
  });
}

export const GET = async ({ request, params }: APIContext) => {
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
      fetch("https://academia-pro.vercel.app/api/academia", {
        method: "POST",
        headers: {
          Connection: "keep-alive",
          "x-access-token": decodeURIComponent(key as string),
          body: JSON.stringify({ token: decodeURIComponent(key as string) }),
          "Cache-Control":
            "private, max-age 21600, stale-while-revalidate 7200, must-revalidate",
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
                    data: Inter,
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
