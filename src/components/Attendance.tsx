import { dataJSON } from "../stores/DataStore";
import { useStore } from "@nanostores/react";
import Card from "./Card";

import styles from "./styles/Attendance.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AttendanceTable = () => {
  const $data = useStore(dataJSON);
  return (
    <>
      <table style={{width: '-webkit-fill-available'}} >
        <thead />
        <thead />
        <tbody className={[styles.attr, 'attTable'].join(' ')}>

        {$data && JSON.parse($data)["time-table"] ? (
          JSON.parse($data).courses.map(
            (
              element: {
                subject_name: any;
                subject_code: any;
                category: any;
                conducted_hours: any;
                absent_hours: any;
              },
              index: any
            ) => (
              <Card
                key={index}
                title={element.subject_name}
                code={element.subject_code}
                category={element.category}
                data={{
                  present:
                    Number(element.conducted_hours) -
                    Number(element.absent_hours),
                  absent: Number(element.absent_hours),
                  total: Number(element.conducted_hours),
                }}
                percent={(
                  ((Number(element.conducted_hours) -
                    Number(element.absent_hours)) /
                    Number(element.conducted_hours)) *
                  100
                )
                  .toFixed(2)
                  .toString()}
              />
            )
          )
        ) : (
          <>
            <Skeleton
              style={{ width: "60vw", height: "64px", borderRadius: "12px" }}
            />
            <Skeleton
              style={{
                width: "60vw",
                height: "64px",
                borderRadius: "12px",
                opacity: 0.1,
              }}
            />
            <Skeleton
              style={{ width: "60vw", height: "64px", borderRadius: "12px" }}
            />

            <Skeleton
              style={{
                width: "60vw",
                height: "64px",
                borderRadius: "12px",
                opacity: 0.1,
              }}
            />

            <Skeleton
              style={{ width: "60vw", height: "64px", borderRadius: "12px" }}
            />
            <Skeleton
              style={{
                width: "60vw",
                height: "64px",
                borderRadius: "12px",
                opacity: 0.1,
              }}
            />
          </>
        )}
        </tbody>
      </table>
    </>
  );
};

export default AttendanceTable;
