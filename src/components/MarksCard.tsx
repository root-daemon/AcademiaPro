import { useEffect, useState } from "react";
import styles from "./styles/MarksCard.module.css";

interface Props {
  name: string;
  category: string;
  marks: any[];
  code: string;
}

const MarksCard = ({ name, marks, code, category }: Props) => {
  const [arr, setArr] = useState<any[]>([]);

  useEffect(() => {
    setArr([...marks]);
  }, [marks]);

  return (
    <>
      {arr[0] ? (
        <div
          title={`${code} (${category})`}
          className={[styles.card, "markCard"].join(" ")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
              width: "-webkit-fill-available",
            }}
          >
            <h4 className={styles.title}>{name}</h4>

            <div
              className={
                category == "Theory"
                  ? styles.circle
                  : [styles.circle, styles.greenCircle].join(" ")
              }
            ></div>
          </div>

          <div className={styles.marks}>
            {marks.map((element, index) => (
              <div key={index} className={styles.row}>
                <span className={[styles.muted_title, "col-6"].join(" ")}>
                  {element[0].slice(0, element[0].indexOf("/"))}
                </span>

                <div className={styles.markPill}>
                  <span
                    className={
                      element[1] == "Abs" ||
                      parseFloat(
                        element[0]
                          .slice(element[0].indexOf("/"))
                          .split(".")[0]
                          .replaceAll("/", "")
                      ) /
                        2 >
                        parseFloat(element[1])
                        ? styles.red
                        : styles.mark
                    }
                  >
                    {element[1]}
                  </span>
                  <span className={styles.total}>
                    {element[0]
                      .slice(element[0].indexOf("/"))
                      .split(".")[0]
                      .replaceAll("/", "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MarksCard;
