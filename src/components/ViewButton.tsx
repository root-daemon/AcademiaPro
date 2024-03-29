import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { dataJSON } from "../stores/DataStore";

const View = () => {
  const [data, setData] = useState(null);
  const $data = useStore(dataJSON);

  useEffect(() => {
    const d = localStorage.getItem("data");
    if (d) setData(JSON.parse(d));
    else setData(JSON.parse($data));
  }, [$data]);

  return data ? (
    <a href={`/timetable/${data["user"]["section"]}.png`} className="download">
      View all
    </a>
  ) : null;
};

export default View;
