import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { dataJSON } from '../stores/DataStore';
import MarksCard from './MarksCard';

const Marks = () => {
  const $data = useStore(dataJSON);
  useEffect(() => {
    console.log(JSON.parse($data).courses);
  }, [$data]);
  return (
    <>
      <table>
        {JSON.parse($data)['internal_marks']
          ? JSON.parse($data).courses.map(
              (
                element: {
                  subject_name: any;
                  subject_code: any;
                  category: any;
                  internal_marks: any;
                },
                index: any
              ) => (
                <MarksCard
                  name={element.subject_name}
                  code={element.subject_code}
                  category={element.category}
                  marks={element.internal_marks[0]}
                />
              )
            )
          : null}
      </table>
    </>
  );
};

export default Marks;
