import { useEffect, useState } from "react";

const View = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const d = localStorage.getItem("data");
    if (d) setData(JSON.parse(d));
  }, []);

  return data ? (
    <a href={`/timetable/${data["user"]["section"]}.png`} className="download">
      View all
    </a>
  ) : null;
};

export default View;
