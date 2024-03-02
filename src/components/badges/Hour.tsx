import { useState, useEffect } from "react";

import { dayOrder } from "../../stores/DayOrder";
import { useStore } from "@nanostores/react";
import { dataJSON } from "../../stores/DataStore";

import styles from '../styles/Badge.module.css'

export default function DayOrder() {
  const [day, setDay] = useState<{ day_order: string } | null>(null);
  const [hour, setHour] = useState<any>(0);

  const $dayOrder = useStore(dayOrder);
  const $data = useStore(dataJSON);

  useEffect(() => {
    if (JSON.parse($dayOrder).day_order) setDay(JSON.parse($dayOrder));

    if (JSON.parse($data)['time-table'])
      setHour(
        Object.values(
          JSON.parse($data)["time-table"][
            Number(JSON.parse($dayOrder).day_order[0]) - 1
          ]
        ).length
      );
  }, [$dayOrder, $data]);

  return (
    <>
      {day &&
        (day.day_order.includes("No") ? null : (
          <span className={styles.badge}>{hour} hours</span>
        ))}
    </>
  );
}
