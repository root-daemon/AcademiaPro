const styled = {
  color: "#0a0d12",
  fontWeight: "700",
  border: "0px",
  height: "40px",
  textAlign: "left",
  fontSize: "6px",
  padding: "2px 4px",
  width: "100%",
};
const startingTimesSlot = [
  "08:00",
  "08:50",
  "09:45",
  "10:40",
  "11:35",
  "12:30",
  "13:25",
  "14:20",
  "15:10",
  "16:00",
];
const endingTimesSlot = [
  "08:50",
  "09:40",
  "10:35",
  "11:30",
  "12:25",
  "13:20",
  "14:15",
  "15:10",
  "16:00",
  "16:50",
];

export default function TimetableGen({ body }: { body: any }) {
  const timetableAll = body["time-table"];
  const tt: any[][] = [];

  timetableAll.forEach((timetable: any, index: any) => {
    const timeTableArr = Array(10).fill(null);
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

    tt.push(timeTableArr);
  });

  const ten = Array(10).fill(null);
  return (
    <div
      style={{
        background: '#0a0d12',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: '100vh',
        width: '100vw',
        transform: 'scale(3.8)'
      }}
    >
      <div
        style={{
          margin: 0,
          width: "610px",
          display: "flex",
          flexDirection: "column",
          background: "#12171e",
          borderRadius: 8,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: 2,
        }}
      >
        <div
          style={{
            height: 30,
            color: "white",
            fontWeight: 600,
            display: "flex",
          }}
        >
          {ten.map((e, i) => (
            <div
              key={i + 1}
              style={{
                padding: "0.2rem 0.5rem",
                width: "10%",
                fontSize: 14,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#04070b",
            borderRadius: "6px",
          }}
        >
          {tt.map((row, i) => (
            <div style={{ display: "flex" }} key={i}>
              {row.map((elem, j) =>
                elem ? (
                  <div
                    style={{
                      border: "0px",
                      display: "flex",
                      width: "10%",
                    }}
                  >
                    <td style={constructStyles(i, j, elem[0])}>
                      {elem[0].split("(")[0]}
                    </td>
                  </div>
                ) : (
                  <div style={{ width: "10%" }} />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function constructStyles(i: number, j: number, name: string) {
  let obj: any = { ...styled };

  if (name.includes("Theory")) obj = { background: "#f3d86a", ...obj };
  else if (name.includes("Lab")) obj = { background: "#70fa70", ...obj };

  if (i == 0 && j == 0) obj = { borderTopLeftRadius: "6px", ...obj };
  else if (i == 0 && j == 9) obj = { borderTopRightRadius: "6px", ...obj };
  else if (i == 4 && j == 0) obj = { borderBottomLeftRadius: "6px", ...obj };
  else if (i == 4 && j == 9) obj = { borderBottomRightRadius: "6px", ...obj };

  return obj;
}
