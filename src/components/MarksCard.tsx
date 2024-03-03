import { useEffect } from 'react';
import styles from './styles/MarksCard.module.css';

interface Props {
  name: string;
  code: string;
  category: 'Theory' | 'Practical' | string;
  marks: any[];
}

const MarksCard = ({ name, code, category, marks }: Props) => {
  useEffect(() => {
    marks.forEach((element) => {
      console.log(element);
    });
  }, [marks]); // Added marks to the dependency array

  return (
    <>
      <div className={[styles.card, 'm-3', 'p-1', 'container'].join(' ')}>
        <div className="row">
          <div className={[styles.title, 'm-1'].join(' ')}>{name}</div>
        </div>

        <div className="row">
          {marks.map((element, index) => (
            <div
              key={index}
              className="d-flex justify-content-around  mt-1 p-1"
            >
              <div className={[styles.muted_title, 'col-6'].join(' ')}>
                {element[0].slice(0, element[0].indexOf('/'))}
              </div>
              <div className="col-3">
                <div className={[styles.attendance].join(' ')}>
                  <span className={[styles.present, styles.green].join(' ')}>
                    {element[1]}
                  </span>
                  <span className={[styles.absent, styles.red].join(' ')}>
                    {element[0].slice(element[0].indexOf('/'))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarksCard;
