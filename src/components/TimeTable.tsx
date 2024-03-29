import { useStore } from '@nanostores/react';
import { cleanStores } from 'nanostores';

import { useEffect, useState } from 'react';
import { dataJSON } from '../stores/DataStore';
import { dayOrder } from '../stores/DayOrder';

import styles from './styles/Timetable.module.css';

const startingTimesSlot = [
  '08:00',
  '08:50',
  '09:45',
  '10:40',
  '11:35',
  '12:30',
  '13:25',
  '14:20',
  '15:10',
  '16:00',
];
const endingTimesSlot = [
  '08:50',
  '09:40',
  '10:35',
  '11:30',
  '12:25',
  '13:20',
  '14:15',
  '15:10',
  '16:00',
  '16:50',
];

const TimeTableComponent = () => {
  const [table, setTimetable] = useState<any>(null);

  const timeTableArr = Array(10).fill(null);

  const $dayOrder = useStore(dayOrder);
  const $data = useStore(dataJSON);

  useEffect(() => {
    setTimeout(() => {
      if (JSON.parse($data)['time-table'] && JSON.parse($dayOrder).day_order) {
        if (JSON.parse($dayOrder).day_order.includes('No')) return null;

        const timetable =
          JSON.parse($data)['time-table'][
            Number(JSON.parse($dayOrder).day_order[0]) - 1
          ];

        const usedTimes = Object.keys(timetable).filter((key) => key);

        usedTimes.forEach((usedTime) => {
          const startTime = usedTime.slice(0, 5);
          const endTime = usedTime.slice(-5);
          const startIndex = startingTimesSlot.indexOf(startTime);
          const endIndex = endingTimesSlot.indexOf(endTime);

          const safeEndIndex = Math.min(endIndex, startingTimesSlot.length - 1);

          for (let i = startIndex; i <= safeEndIndex; i++) {
            timeTableArr[i] = timetable[usedTime];
          }
        });

        setTimetable(timeTableArr);
      }
    }, 100);
  }, [$dayOrder, $data]);

  function openGen() {
    window.location.href = `/timetable/${JSON.parse($data)['user']['section']}.png`;
  }

  return (
    <>
      <tbody onClick={() => openGen()} className={styles.body}>
        <tr className={styles.tr}>
          {$data &&
            table &&
            table.map((element: any, index: any) =>
              element ? (
                <td
                  key={index}
                  className={
                    String(element).includes('Theory')
                      ? styles.theory
                      : styles.lab
                  }
                >
                  {String(element).split('(')[0]}
                  <span className={styles.timeSlot}>
                    {startingTimesSlot[index]} - {endingTimesSlot[index]}
                  </span>
                </td>
              ) : (
                <td key={index} />
              )
            )}
        </tr>
      </tbody>
    </>
  );
};

export default TimeTableComponent;
