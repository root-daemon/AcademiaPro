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

import styles from "./styles/Card.module.css";

const Card = ({ percent, title, code, data, category }: Props) => {
  return (
    <>
      <tr className={[styles.card, 'attCard'].join(' ')}>
        <td>
          <h4>{title}</h4>
        </td>
        <td>
          <span
            title={category}
            className={
              category == "Theory"
                ? styles.subjectCode
                : [styles.subjectCode, styles.practical].join(" ")
            }
          >
            {code}
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
