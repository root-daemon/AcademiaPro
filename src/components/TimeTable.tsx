import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { dayOrder } from "../stores/DayOrder";
import { dataJSON } from "../stores/DataStore";

const TimeTableComponent = () => {
  const [day, setDay] = useState<string | number | null>(1);
  const [data, setData] = useState<any>({});

  const [timetable, setTimeTable] = useState<any>({});

  const $dayOrder = useStore(dayOrder);
  const $data = useStore(dataJSON);

  useEffect(() => {
    const local = localStorage.getItem("do");
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
  }, []);

  useEffect(() => {
    if (JSON.parse($data)?.message == "Token is invalid !!") {
      localStorage.removeItem("access");
      dataJSON.set('{}')
      window.location.href = "/login";
    }

    if (
      JSON.parse($data)["time-table"] ||
      (localStorage.getItem("data") &&
        JSON.stringify(localStorage.getItem("data")))
    ) {
      const d = JSON.parse($data)["time-table"]
        ? $data
        : localStorage.getItem("data") || "{}";

      setData(JSON.parse(d));

      setTimeTable(JSON.parse(d)["time-table"][Number(day) - 1]);
    }
    
    fetch("https://academai-s-3.azurewebsites.net//course-user", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("access") as string,
        Host: "academai-s-3.azurewebsites.net",
        Origin: "https://a.srmcheck.me",
        Referer: "https://a.srmcheck.me/",
        "Cache-Control": "max-age=604800 must-revalidate",
      },
    })
      .then((r) => r.text())
      .then((res) => {
        dataJSON.set(res);
        if (data !== JSON.parse(res)) {
          setData(JSON.parse(res));
          localStorage.setItem("data", res);
        }
        setTimeTable(data.timetable[Number(day) - 1]);
      });
  }, [day]);

  useEffect(() => {

    if (data?.message == "Token is invalid !!") {
      localStorage.removeItem("access");
      window.location.href = "/login";
    }
  }, [data]);

  const [table, setTable] = useState<any[] | any>([]);

  useEffect(() => {
    const timeTableArr = Array(10).fill(null);
    const usedTimes = Object.keys(timetable).filter((key) => key);
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

    usedTimes.forEach((usedTime) => {
      const startTime = usedTime.slice(0, 5);
      const endTime = usedTime.slice(-5);
      const startIndex = startingTimesSlot.indexOf(startTime);
      const endIndex = endingTimesSlot.indexOf(endTime);

      // Ensure the endIndex is not out of bounds
      const safeEndIndex = Math.min(endIndex, startingTimesSlot.length - 1);

      // Fill the slots from startIndex to safeEndIndex
      for (let i = startIndex; i <= safeEndIndex; i++) {
        timeTableArr[i] = timetable[usedTime];
      }
    });

    setTable(timeTableArr);
  }, [timetable]);

  return (
    <>
      <tr className="tr">
        {table.map((element: any, index: any) =>
          element ? (
            <td
              key={index}
              id={String(element).includes("Theory") ? "theory" : "lab"}
            >
              {String(element).split("(")[0]}
            </td>
          ) : (
            <td key={index} />
          )
        )}
      </tr>

      <style>
        {`
          #theory {
            background: var(--theory);
          }

          #lab {
            background: var(--practical);
          }

          #theory, #lab {
            color: #0a0d12;
            font-weight: 700;
            font-size: 12px;
            text-align: left;
          }

          .tr {
            border: 0px none;
            display: flex;
          }

          .tr td:first-child {
            border-radius: 12px 0 0 12px;
          }

          .tr td:last-child {
            border-radius: 0 12px 12px 0;
          }
          .tr td{
            width: 9.7%;
          }
        `}
      </style>
    </>
  );
};

export default TimeTableComponent;
