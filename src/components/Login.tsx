import { useState } from "react";
import LoginButton from "./Login/LoginButton";
import LoginInput from "./Login/LoginInput";

import styles from "../components/styles/Login.module.css";
import { setCookie } from "../../utils/cookies";

export default function Login() {
  const [uid, setUid] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState(0);

  function push() {
    setError(-1);
    fetch("https://academai-s-3.azurewebsites.net//login", {
      method: "POST",
      headers: {
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        Host: "academai-s-3.azurewebsites.net",
        Origin: "https://a.srmcheck.me",
        Referer: "https://a.srmcheck.me/",
        "content-type": "application/json",
        "Cache-Control": "public, max-age 172800, must-revalidate, immutable",
      },
      body: JSON.stringify({
        username: uid,
        password: pass,
      }),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res.token) {
          setError(2);
          setCookie("token", res.token);

          window.location.href = "/academia";
        } else if (!res.token) {
          setError(1);
        }
      });
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.login}>
          <div className={styles.lefty}>
            <div className={styles.titles}>
              <div className={styles.name}>
                <h1>Academia</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="36"
                  viewBox="0 0 45 36"
                  fill="none"
                >
                  <path
                    d="M42.1294 0.936277C37.9437 1.17382 29.6243 2.03846 24.4884 5.18232C24.134 5.39925 23.9331 5.78497 23.9331 6.18827V33.9812C23.9331 34.8634 24.8978 35.421 25.7112 35.0116C30.9953 32.352 38.6373 31.6264 42.4159 31.4278C43.7059 31.3598 44.7088 30.3256 44.7088 29.0859V3.28119C44.7096 1.92847 43.5364 0.85684 42.1294 0.936277ZM20.9343 5.18232C15.7992 2.03846 7.47974 1.17459 3.29403 0.936277C1.88709 0.85684 0.713867 1.92847 0.713867 3.28119V29.0867C0.713867 30.3271 1.71676 31.3613 3.00684 31.4285C6.78696 31.6271 14.4327 32.3535 19.7168 35.0146C20.528 35.4233 21.4896 34.8665 21.4896 33.9865V6.17452C21.4896 5.77046 21.2895 5.40001 20.9343 5.18232Z"
                    fill="#D4D4D4"
                  />
                </svg>
              </div>
              <p>University data, beautifully presented at your fingertips</p>
            </div>
            <button
              onClick={() =>
                window.location.replace("https://better-lab.vercel.app")
              }
            >
              Better-Lab
            </button>
          </div>

          <form className={styles.inputs}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <LoginInput
                onChange={(e) => {
                  setError(0);
                  setUid(e.target.value);
                }}
                error={error}
                uid={uid}
                type="UID"
              />
              <LoginInput
                onChange={(e) => {
                  setError(0);
                  setPass(e.target.value);
                }}
                error={error}
                uid={pass}
                type="Password"
              />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <LoginButton error={error} onClick={push} />
            </div>
          </form>
          <p className={styles.credits}>
            Made by <a href="https://marban.is-a.dev">Marban</a> and{" "}
            <a href="https://www.linkedin.com/in/srivishal-sivasubramanian-1a09b9240/">
              root-daemon
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
