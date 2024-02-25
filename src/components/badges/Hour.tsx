import { useState, useEffect } from "react";
import data from "../../data/data.json";

export default function DayOrder() {
  const [day, setDay] = useState<{ day_order: string } | null>(null);
  const [hour, setHour] = useState<any>(0);

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
      

        setHour(Object.values(data.timetable[Number(JSON.parse(res).day_order[0]) - 1]).length);
      });
  }, []);

  return (
    <>
      {day &&
        (day.day_order.includes("No") ? null : (
          <span className="badge">{hour} hours</span>
        ))}
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
              `}
      </style>
    </>
  );
}
