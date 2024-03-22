export async function POST({ request }: { request: Request }) {
  const body = await request.json();

  return new Promise((resolve) => {
    fetch("https://academai-s-3.azurewebsites.net//course-user", {
      method: "POST",
      headers: {
        "x-access-token": body.token,
        Host: "academai-s-3.azurewebsites.net",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        Origin: "https://a.srmcheck.me",
        Referer: "https://a.srmcheck.me/",

        "Cache-Control":
          "private, max-age 21600, stale-while-revalidate 7200, must-revalidate",
      },
    })
      .then((r) => r.text())
      .then((res) => {
        const response = JSON.parse(res);
        if (response) {
          resolve(
            new Response(JSON.stringify(response), {
              status: 200,
              headers: {
                "Cache-Control":
                  "private, max-age 21600, stale-while-revalidate 7200, must-revalidate",

                Connection: "keep-alive",
              },
            })
          );
        } else if (!response) {
          resolve(new Response(JSON.stringify({ error: "Log out" })));
        }
      });
  });
}
