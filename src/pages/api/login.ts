
export async function POST({ request }: { request: Request }) {
  const body = await request.json();

  return new Promise((resolve) => {
    fetch("https://academai-s-3.azurewebsites.net//login", {
      method: "POST",
      headers: {
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        Host: "academai-s-3.azurewebsites.net",
        Origin: "https://a.srmcheck.me",
        Referer: "https://a.srmcheck.me/",
        "content-type": "application/json",
        "Cache-Control": "private, max-age 172800, must-revalidate, immutable",
      },
      body: JSON.stringify(body),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res.token) {
          resolve(
            new Response(JSON.stringify(res), {
              status: 200,
              headers: {
                "Cache-Control":
                  "private, max-age 172800, must-revalidate, immutable",
                Connection: "keep-alive",
              },
            })
          );
        } else if (!res.token) {
          resolve(
            new Response(JSON.stringify({ error: 'Wrong Password' }))
          )
        }
      });
  });
}
