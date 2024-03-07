interface Props {
  title: string;
  code: string;
  percent: string;
  data: {
    present: number;
    absent: number;
    total: number;
  };
  category: "Theory" | "Practical" | string;
}

import { useEffect, useState } from "react";
import styles from "./styles/Card.module.css";

const Card = ({ percent, title, code, data, category }: Props) => {
  const [margin, setMargin] = useState(0);
  useEffect(() => {
    setMargin(calculateMargin(data.present, data.total));
  }, []);
  const calculateMargin = (present: number, total: number) => {
    const p_min = 75;
    if ((present / total) * 100 >= p_min) {
      return Math.floor((present - 0.75 * total) / 0.75);
    } else {
      let requiredClassesToAttend = 0;
      while (
        ((present + requiredClassesToAttend) /
          (total + requiredClassesToAttend)) *
          100 <
        p_min
      ) {
        requiredClassesToAttend++;
      }
      return -requiredClassesToAttend;
    }
  };
  return (
    <>
      <tr className={[styles.card, "attCard"].join(" ")} title={code}>
        <td style={{ height: "10vh" }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <h4>{title}</h4>

            <div
              className={
                category == "Theory"
                  ? styles.circle
                  : [styles.circle, styles.greenCircle].join(" ")
              }
            >
            </div>
          </div>
        </td>
        <td>
          <span className={styles.margin}>
            Margin:{" "}
            <span className={margin > 0 ? styles.blue : styles.red}>
              {margin}
            </span>
          </span>
        </td>

        <td>
          <div className={styles.attendance}>
            <span className={[styles.present, styles.green].join(" ")}>
              {data.present}
            </span>
            <span className={[styles.absent, styles.red].join(" ")}>
              {data.absent}
            </span>
            <span className={styles.total}>{data.total}</span>
          </div>
        </td>
        <td>
          <h3
            className={
              Number(percent.split(".")[0]) === 100
                ? styles.green
                : Number(percent.split(".")[0]) < 75
                ? styles.red
                : styles.percent
            }
          >
            {percent}%
          </h3>
        </td>
      </tr>
    </>
  );
};

export default Card;
