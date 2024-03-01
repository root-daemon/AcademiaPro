import React, { useEffect, useState } from 'react';

const TimeTableComponent = () => {
  const [day, setDay] = useState<string | number>(1);
  const [data, setData] = useState<any>({});

  const [timetable, setTimeTable] = useState<any>({});

  useEffect(() => {
    const local = localStorage.getItem('do')
    if(local) {setDay(local)}

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
      setTimeTable(
        JSON.parse(localStorage.getItem('data') || '{}')['time-table'][Number(day) - 1]
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
        };
        setTimeTable(day ? data.timetable[0] : null);
      });
  }, [day]);

  const [table, setTable] = useState<any[] | any>([]);

  useEffect(() => {
    const time_table_arr: any[] = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    var used_times: string[] = [];
    var starting_times = [];
    var end_times: any[] = [];
    const starting_times_slot = [
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
    const ending_times_slot = [
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

    Object.keys(timetable).forEach((key) => used_times.push(key));
    used_times.pop();
    for (var i = 0; i < used_times.length; i++) {
      starting_times.push(used_times[i].slice(0, 4 + 1));
      end_times.push(used_times[i].slice(used_times.length - 7));
    }
    starting_times.map(function (time, index) {
      if (
        ending_times_slot[starting_times_slot.indexOf(time)] == end_times[index]
      ) {
        time_table_arr[starting_times_slot.indexOf(time)] =
          timetable[used_times[index]];
      } else {
        var app = 0;
        var flag = false;
        while (!flag) {
          if (
            ending_times_slot[starting_times_slot.indexOf(time) + app] ==
            end_times[index]
          ) {
            flag = true;
            time_table_arr[starting_times_slot.indexOf(time) + app] =
              timetable[used_times[index]];
          } else {
            time_table_arr[starting_times_slot.indexOf(time) + app] =
              timetable[used_times[index]];
            app += 1;
          }
        }
      }
    });
    console.log(time_table_arr);
    setTable(time_table_arr);
  }, [timetable]);

  return (
    <>
      <tr className="tr">
        {table.map((element: any, index: React.Key | null | undefined) =>
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
