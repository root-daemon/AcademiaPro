import { useStore } from "@nanostores/react";
import { cleanStores } from "nanostores";

import { useEffect, useState } from "react";
import { dayOrder } from "../stores/DayOrder";
import { dataJSON } from "../stores/DataStore";

import styles from "./styles/Timetable.module.css";
import { clearCookies, getCookie } from "../../utils/cookies";

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

const TimeTableComponent = () => {
  const [day, setDay] = useState<string | number | null>(1);
  const [data, setData] = useState<any>({});

  const [timetable, setTimeTable] = useState<any>({});

  const $dayOrder = useStore(dayOrder);
  const $data = useStore(dataJSON);

  useEffect(() => {
    const local = sessionStorage.getItem("do");
    if (local) {
      setDay(local);
    }
    if (JSON.parse($dayOrder).day_order) {
      setDay(
        JSON.parse($dayOrder).day_order.includes("No")
          ? null
          : JSON.parse($dayOrder).day_order[0]
      );
    }

    if (
      JSON.parse($data)["time-table"] ||
      (sessionStorage.getItem("data") &&
        JSON.stringify(sessionStorage.getItem("data")))
    ) {
      const d = JSON.parse($data)["time-table"]
        ? $data
        : sessionStorage.getItem("data");

      if (d) {
        setData(JSON.parse(d));
        setTimeTable(JSON.parse(d)["time-table"][Number(day) - 1]);
      }
    }
    fetch("https://academai-s-3.azurewebsites.net//course-user", {
      method: "POST",
      headers: {
        "x-access-token": getCookie("token") as string,
        Host: "academai-s-3.azurewebsites.net",
        Origin: "https://a.srmcheck.me",
        Referer: "https://a.srmcheck.me/",
        "Cache-Control": "max-age=604800 must-revalidate",
      },
    })
      .then((r) => r.text())
      .then((res) => {
        if (JSON.parse(res)?.message) return clearCookies();
        dataJSON.set(res);
        if (data !== JSON.parse(res)) {
          setData(JSON.parse(res));
          sessionStorage.setItem("data", res);
        }
      })
      .catch(() => {});

    window.addEventListener("beforeunload", unload);
  }, []);

  const unload = () => {
    cleanStores(dataJSON);
  };

  useEffect(() => {
    if (JSON.parse($data)?.message == "Token is invalid !!") {
      clearCookies();
      dataJSON.set("{}");
      window.location.href = "/login";
    }
  }, [day]);

  useEffect(() => {
    if (data?.message == "Token is invalid !!") {
      clearCookies();
      window.location.href = "/login";
    } else if (data["time-table"]) {
      setTimeTable(data["time-table"][Number(day) - 1]);
    }
  }, [data]);

  const [table, setTable] = useState<any[] | any>(null);

  useEffect(() => {
    const timeTableArr = Array(10).fill(null);
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

    setTable(timeTableArr);
  }, [timetable]);

  return (
    <>
      <tbody className={styles.body}>
        <tr className={styles.tr}>
          {$data &&
            table &&
            table.map((element: any, index: any) =>
              element ? (
                <td
                  key={index}
                  className={
                    String(element).includes("Theory")
                      ? styles.theory
                      : styles.lab
                  }
                >
                  {String(element).split("(")[0]}
                  <span className={styles.timeSlot}>
                    {startingTimesSlot[index]} - {endingTimesSlot[index]}
                  </span>
                </td>
              ) : (
                <td key={index} />
              )
            )}
        </tr>
      </tbody>
    </>
  );
};

export default TimeTableComponent;
