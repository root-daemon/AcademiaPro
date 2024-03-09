import { useState, useEffect } from "react";

import { dayOrder } from "../../stores/DayOrder";
import { useStore } from "@nanostores/react";
import { dataJSON } from "../../stores/DataStore";

import styles from "../styles/Badge.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const startingTimesSlot = [
  "08:00",
  "08:50",
  "09:45",
  "10:40",
  "11:35",
  "12:30",
  "13:25",
  "14:20",
  "15:10",
  "16:00",
];
const endingTimesSlot = [
  "08:50",
  "09:40",
  "10:35",
  "11:30",
  "12:25",
  "13:20",
  "14:15",
  "15:10",
  "16:00",
  "16:50",
];

export default function Hour() {
  const [day, setDay] = useState<{ day_order: string } | null>(null);
  const [hour, setHour] = useState<any>(0);

  const timeTableArr = Array(10).fill(null);

  const $dayOrder = useStore(dayOrder);
  const $data = useStore(dataJSON);

  useEffect(() => {
    if (JSON.parse($dayOrder).day_order) setDay(JSON.parse($dayOrder));

    setTimeout(() => {
      if (JSON.parse($data)["time-table"] && JSON.parse($dayOrder).day_order) {
        if(JSON.parse($dayOrder).day_order.includes("No")) return null;
        
        const timetable =
          JSON.parse($data)["time-table"][
            Number(JSON.parse($dayOrder).day_order[0]) - 1
          ];

        const usedTimes = Object.keys(timetable).filter((key) => key);

        usedTimes.forEach((usedTime) => {
          const startTime = usedTime.slice(0, 5);
          const endTime = usedTime.slice(-5);
          const startIndex = startingTimesSlot.indexOf(startTime);
          const endIndex = endingTimesSlot.indexOf(endTime);

          const safeEndIndex = Math.min(endIndex, startingTimesSlot.length - 1);

          for (let i = startIndex; i <= safeEndIndex; i++) {
            timeTableArr[i] = timetable[usedTime];
          }
        });

        setHour(Object.values(timeTableArr).filter((a) => a != null).length - 1);
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
        !day?.day_order.includes("No") ? <Skeleton
          style={{
            width: "100px",
            height: "30px",
            borderRadius: "12px",
            opacity: 0.6,
          }}
        /> : null
      )}
    </>
  );
}
