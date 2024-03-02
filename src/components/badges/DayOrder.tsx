import { useState, useEffect } from "react";

import { useStore } from "@nanostores/react";
import { dayOrder } from "../../stores/DayOrder";

import styles from "../styles/Badge.module.css";

export default function DayOrder() {
  const [day, setDay] = useState<{ day_order: string } | null>(null);

  const $dayOrder = useStore(dayOrder);

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
        dayOrder.set(res);
        setDay(JSON.parse(res));
      });
  }, []);

  if (day) {
    return (
      <>
        <span
          className={
            day.day_order.includes("No")
              ? [styles.badge, styles.holiday].join(" ")
              : styles.badge
          }
        >
          {day.day_order.includes("No")
            ? "Holiday"
            : `Day Order: ${day.day_order[0]}`}
        </span>
      </>
    );
  } else return null;
}
