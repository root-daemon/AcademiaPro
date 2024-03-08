import { useState, useEffect } from "react";

import { useStore } from "@nanostores/react";
import { dayOrder } from "../../stores/DayOrder";

import styles from "../styles/Badge.module.css";
import { cleanStores } from "nanostores";


import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        dayOrder.set(res);
        setDay(JSON.parse(res));
      });
    window.addEventListener("beforeunload", unload);
  }, []);

  const unload = () => {
    cleanStores(dayOrder);
  };

  if (day) {
    return (
      <>
        {day.day_order ? (
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
            </span>{" "}
          </>
        ) : (
          <Skeleton
            style={{
              width: "100px",
              height: "30px",
              borderRadius: "12px",
              opacity: 0.6,
            }}
          />
        )}
      </>
    );
  } else return null;
}
