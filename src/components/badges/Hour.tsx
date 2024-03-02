import { useState, useEffect } from "react";

import { dayOrder } from "../../stores/DayOrder";
import { useStore } from "@nanostores/react";
import { dataJSON } from "../../stores/DataStore";

export default function DayOrder() {
  const [day, setDay] = useState<{ day_order: string } | null>(null);
  const [hour, setHour] = useState<any>(0);

  const $dayOrder = useStore(dayOrder);
  const $data = useStore(dataJSON);

  useEffect(() => {
    if (JSON.parse($dayOrder).day_order) setDay(JSON.parse($dayOrder));

    if (JSON.parse($data)['time-table'])
      setHour(
        Object.values(
          JSON.parse($data)["time-table"][
            Number(JSON.parse($dayOrder).day_order[0]) - 1
          ]
        ).length
      );
  }, [$dayOrder, $data]);

  return (
    <>
      {day &&
        (day.day_order.includes("No") ? null : (
          <span className="badge">{hour} hours</span>
        ))}
      <style>
        {`
            .badge {
                background: #171d26;
                padding: 8px 12px;
                border-radius: 500px;
                color: var(--accent);
                font-weight: 500;
                font-size: 18px;
              }
              `}
      </style>
    </>
  );
}
