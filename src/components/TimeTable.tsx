import React, { useEffect, useState } from 'react';
import data from '../data/data.json';
const TimeTableComponent = () => {
  const [day, setDay] = useState<string | number>(1);
  const [data, setData] = useState<any>({});

  const [timetable, setTimeTable] = useState<any>({});

  useEffect(() => {
    const local = localStorage.getItem('do');
    if (local) {
      setDay(local);
    }

    fetch('https://academai-s-3.azurewebsites.net//do', {
      method: 'POST',
      headers: {
        Host: 'academai-s-3.azurewebsites.net',
        Origin: 'https://a.srmcheck.me',
        Referer: 'https://a.srmcheck.me/',
        'content-type': 'application/json',
        'Cache-Control': 'max-age=604800 must-revalidate',
        'x-access-token': localStorage.getItem('access') as string,
      },
    })
      .then((r) => r.text())
      .then((res: any) => {
        setDay(
          JSON.parse(res).day_order.includes('No')
            ? null
            : JSON.parse(res).day_order[0]
        );
        localStorage.setItem(
          'do',
          JSON.parse(res).day_order.includes('No')
            ? null
            : JSON.parse(res).day_order[0]
        );
      });
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('data') &&
      JSON.stringify(localStorage.getItem('data'))
    ) {
      setData(JSON.parse(localStorage.getItem('data') || ''));
      console.log(data);
      //@ts-ignore
      setTimeTable(
        JSON.parse(localStorage.getItem('data') || '{}')['time-table'][0]
      );
    }

    fetch('https://academai-s-3.azurewebsites.net//course-user', {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('access') as string,
        Host: 'academai-s-3.azurewebsites.net',
        Origin: 'https://a.srmcheck.me',
        Referer: 'https://a.srmcheck.me/',
        'Cache-Control': 'max-age=604800 must-revalidate',
      },
    })
      .then((r) => r.text())
      .then((res) => {
        console.log(JSON.parse(res));
        if (data !== JSON.parse(res)) {
          setData(JSON.parse(res));
          localStorage.setItem('data', res);
        }
        setTimeTable(data.timetable[0]);
      });
  }, [day]);

  const [table, setTable] = useState<any[] | any>([]);
  useEffect(() => {
    const timeTableArr = Array(10).fill(null);
    const usedTimes = Object.keys(timetable).filter(key => key);
    const startingTimesSlot = ['08:00', '08:50', '09:45', '10:40', '11:35', '12:30', '13:25', '14:20', '15:10', '16:00'];
    const endingTimesSlot = ['08:50', '09:40', '10:35', '11:30', '12:25', '13:20', '14:15', '15:10', '16:00', '16:50'];
   
    usedTimes.forEach(usedTime => {
       const startTime = usedTime.slice(0, 5);
       const endTime = usedTime.slice(-5);
       const startIndex = startingTimesSlot.indexOf(startTime);
   
       if (startIndex !== -1 && endingTimesSlot[startIndex] === endTime) {
         timeTableArr[startIndex] = timetable[usedTime];
       } else {
         let app = 0;
         while (startIndex + app < endingTimesSlot.length) {
           if (endingTimesSlot[startIndex + app] === endTime) {
             timeTableArr[startIndex + app] = timetable[usedTime];
             break;
           }
           app += 1;
         }
       }
    });
   
    console.log(timeTableArr);
    setTable(timeTableArr);
   }, [timetable]);
   
   

  return (
    <>
      <tr className="tr">
        {table.map((element: any, index: any) =>
          element ? (
            <td
              key={index}
              id={String(element).includes('Theory') ? 'theory' : 'lab'}
            >
              {String(element).split('(')[0]}
            </td>
          ) : (
            <td key={index} />
          )
        )}
      </tr>

      <style>
        {`
          #theory {
            background: var(--theory);
          }

          #practical {
            background: var(--practical);
          }

          #theory, #practical {
            color: #0a0d12;
            font-weight: 700;
            max-width: 2vw;
            font-size: 12px;
            text-align: left;
          }

          .tr {
            border: 0px none;
          }

          .tr td:first-child {
            border-radius: 12px 0 0 12px;
          }

          .tr td:last-child {
            border-radius: 0 12px 12px 0;
          }
        `}
      </style>
    </>
  );
};

export default TimeTableComponent;
