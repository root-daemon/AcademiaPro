import { useState, useEffect } from "react";

export default function DayOrder() {
  const [day, setDay] = useState<{ day_order: string } | null>(null);

  useEffect(() => {
    fetch("https://academai-s-3.azurewebsites.net//do", {
      method: "POST",
      headers: {
        Host: "academai-s-3.azurewebsites.net",
        Origin: "https://a.srmcheck.me",
        Referer: "https://a.srmcheck.me/",
        "content-type": "application/json",
        "x-access-token": localStorage.getItem("access") as string,
      },
    })
      .then((r) => r.text())
      .then((res) => {
        setDay(JSON.parse(res));
      });
  }, []);

  if (day) {
    return (
      <>
        <span
          className={day.day_order.includes("No") ? "badge holiday" : "badge"}
        >
          {day.day_order.includes("No")
            ? "Holiday"
            : `Day Order: ${day.day_order[0]}`}
        </span>
        <style>
          {`
            .badge {
                background: #171d26;
                padding: 8px 12px;
                border-radius: 500px;
                color: var(--accent);
                font-weight: 500;
                font-size: 18px;
              }

              .holiday {
                background: #261717 !important;
                color: var(--red) !important;
              }
              `}
        </style>
      </>
    );
  } else return null;
}
