import { useStore } from '@nanostores/react';
import { dataJSON } from '../stores/DataStore';
import Card from './Card';

import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { clearCookies, getCookie } from '../../utils/cookies';
import { dayOrder } from '../stores/DayOrder';
import styles from './styles/Attendance.module.css';

const AttendanceTable = () => {
  const $data = useStore(dataJSON);
  const $dayOrder = useStore(dayOrder);

  useEffect(() => {
    const localDay = localStorage.getItem('day_order');
    const localData = localStorage.getItem('data');
    if (localData) dataJSON.set(JSON.stringify(localData));
    if (localDay) dayOrder.set(JSON.stringify(localDay));

    fetch('https://academai-s-3.azurewebsites.net//course-user', {
      method: 'POST',
      headers: {
        'x-access-token': getCookie('token') as string,
        Host: 'academai-s-3.azurewebsites.net',
        Origin: 'https://a.srmcheck.me',
        Referer: 'https://a.srmcheck.me/',
        'Cache-Control': 'max-age=604800 must-revalidate',
      },
    })
      .then((r) => r.text())
      .then((res) => {
        if (JSON.parse(res)?.message) return clearCookies();
        dataJSON.set(res);
        localStorage.setItem('data', res);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <table style={{ width: '-webkit-fill-available' }}>
        <thead />
        <thead />
        <tbody className={[styles.attr, 'attTable'].join(' ')}>
          {$data && JSON.parse($data)['time-table'] ? (
            JSON.parse($data).courses.map(
              (
                element: {
                  subject_name: any;
                  subject_code: any;
                  category: any;
                  conducted_hours: any;
                  absent_hours: any;
                },
                index: any
              ) => (
                <Card
                  key={index}
                  title={element.subject_name}
                  code={element.subject_code}
                  category={element.category}
                  data={{
                    present:
                      Number(element.conducted_hours) -
                      Number(element.absent_hours),
                    absent: Number(element.absent_hours),
                    total: Number(element.conducted_hours),
                  }}
                  percent={(
                    ((Number(element.conducted_hours) -
                      Number(element.absent_hours)) /
                      Number(element.conducted_hours)) *
                    100
                  )
                    .toFixed(2)
                    .toString()}
                />
              )
            )
          ) : (
            <>
              <Skeleton
                style={{ width: '60vw', height: '64px', borderRadius: '12px' }}
              />
              <Skeleton
                style={{
                  width: '60vw',
                  height: '64px',
                  borderRadius: '12px',
                  opacity: 0.1,
                }}
              />
              <Skeleton
                style={{ width: '60vw', height: '64px', borderRadius: '12px' }}
              />

              <Skeleton
                style={{
                  width: '60vw',
                  height: '64px',
                  borderRadius: '12px',
                  opacity: 0.1,
                }}
              />

              <Skeleton
                style={{ width: '60vw', height: '64px', borderRadius: '12px' }}
              />
              <Skeleton
                style={{
                  width: '60vw',
                  height: '64px',
                  borderRadius: '12px',
                  opacity: 0.1,
                }}
              />
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default AttendanceTable;
