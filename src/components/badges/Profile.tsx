import { useStore } from "@nanostores/react";
import { dataJSON } from "../../stores/DataStore";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "../styles/Profile.module.css";

export default function Profile() {
  const $data = useStore(dataJSON);
  console.log(JSON.parse($data));

  const name = JSON.parse($data)
    .user.name.toLowerCase()
    .split(" ")
    .filter((a: string) => a.length != 1)
    .join(" ");

  return (
    <>
      {JSON.parse($data) && JSON.parse($data).user ? (
        <div className={styles.pill}>
          <div className={styles.pic}>
            <span>{JSON.parse($data).user.name[0]}</span>
          </div>
          <h3 className={styles.name}>
            {name.slice(0, 20) +
              (name.length == name.slice(0, 20).length ? "" : "...")}
          </h3>
          <button
            className={styles.logout}
            title="Log out"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M192 277.4h189.7l-43.6 44.7L368 352l96-96-96-96-31 29.9 44.7 44.7H192v42.8z"></path>
              <path d="M255.7 421.3c-44.1 0-85.5-17.2-116.7-48.4-31.2-31.2-48.3-72.7-48.3-116.9 0-44.1 17.2-85.7 48.3-116.9 31.2-31.2 72.6-48.4 116.7-48.4 44 0 85.3 17.1 116.5 48.2l30.3-30.3c-8.5-8.4-17.8-16.2-27.7-23.2C339.7 61 298.6 48 255.7 48 141.2 48 48 141.3 48 256s93.2 208 207.7 208c42.9 0 84-13 119-37.5 10-7 19.2-14.7 27.7-23.2l-30.2-30.2c-31.1 31.1-72.5 48.2-116.5 48.2zM448.004 256.847l-.849-.848.849-.849.848.849z"></path>
            </svg>
          </button>
        </div>
      ) : (
        <Skeleton
          style={{
            width: "100%",
            height: "64px",
            borderRadius: "12px",
            opacity: 0.6,
          }}
        />
      )}
    </>
  );
}