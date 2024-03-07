import { useState, useEffect } from "react";

import { dayOrder } from "../../stores/DayOrder";
import { useStore } from "@nanostores/react";
import { dataJSON } from "../../stores/DataStore";

import styles from "../styles/Badge.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Hour() {
  const [day, setDay] = useState<{ day_order: string } | null>(null);
  const [hour, setHour] = useState<any>(0);

  const $dayOrder = useStore(dayOrder);
  const $data = useStore(dataJSON);

  useEffect(() => {
    if (JSON.parse($dayOrder).day_order) setDay(JSON.parse($dayOrder));

    setTimeout(() => {
      if (JSON.parse($data)["time-table"] && JSON.parse($dayOrder).day_order) {
        console.log(
          JSON.parse($data)["time-table"][
            Number(JSON.parse($dayOrder).day_order[0]) - 1
          ]
        );
        setHour(
          Object.values(
            JSON.parse($data)["time-table"][
              Number(JSON.parse($dayOrder).day_order[0]) - 1
            ]
          ).length
        );
      }
    }, 100);
  }, [$dayOrder, $data]);

  return (
    <>
      {day?.day_order && hour !== 0 ? (
        day.day_order.includes("No") ? null : (
          <span className={styles.badge}>{hour} hours</span>
        )
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
}
