import { ImageResponse } from "@vercel/og";
import Timetabler from "../../components/Generator/TimeTableGenerator";

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
      fetch("https://academai-s-3.azurewebsites.net//course-user", {
        method: "POST",
        headers: {
          Connection: "keep-alive",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "x-access-token": decodeURIComponent(key as string),
          Host: "academai-s-3.azurewebsites.net",
          Origin: "https://a.srmcheck.me",
          Referer: "https://a.srmcheck.me/",
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
                headers: {
                  Connection: "keep-alive",
                  "Cache-Control": "no-cache",
                  "Accept-Encoding": "gzip, deflate, br, zstd",
                  "x-access-token": decodeURIComponent(key as string),
                },
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
