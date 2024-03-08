import { useStore } from "@nanostores/react";
import { dataJSON } from "../stores/DataStore";
import MarksCard from "./MarksCard";

const Marks = () => {
  const $data = useStore(dataJSON);

  return (
    <>
      <div
        className="markGrid"
        style={{
          borderRadius: 34,
          background: 'var(--background)',
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
          gridTemplateRows: "min-content",
          marginBottom: 32
        }}
      >
        {JSON.parse($data)["internal_marks"] ? (
          JSON.parse($data).courses.map(
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
                key={index} 
                code={element.subject_code}
                name={element.subject_name}
                marks={element.internal_marks[0]}
              />
            )
          )
        ) : (
          <h4 style={{ opacity: "0.6", fontSize: '16px' }}>
            No Marks have been updated. You can do this.
          </h4>
        )}
      </div>
    </>
  );
};

export default Marks;
