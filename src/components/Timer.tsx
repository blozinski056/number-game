import React, { useState, useEffect, useCallback } from "react";

// interface Props {
//   time: string;
// }

interface Props {
  play: boolean;
}

// const Timer: React.FC<Props> = ({ time }) => {
const Timer: React.FC<Props> = ({ play }) => {
  const [time, setTime] = useState<string>("000.000");
  const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (play) {
      const startTime = new Date().getTime();
      setIntervalID(
        setInterval(() => {
          let currTime = new Date().getTime();

          let timeChange = currTime - startTime;
          let timeNum1: number = Math.floor(timeChange / 1000);
          let timeNum2: number = timeChange % 1000;

          let timeString1: string = "";
          let timeString2: string = "";

          if (timeNum1 === 0) {
            timeString1 = "000";
          } else if (timeNum1 < 10) {
            timeString1 = `00${timeNum1}`;
          } else if (timeNum1 < 100) {
            timeString1 = `0${timeNum1}`;
          } else if (timeNum1 < 1000) {
            timeString1 = timeNum1.toString();
          } else {
            setTime("Still playing?");
            return;
          }

          if (timeNum2 < 10) {
            timeString2 = `.00${timeNum2}`;
          } else if (timeNum2 < 100) {
            timeString2 = `.0${timeNum2}`;
          } else if (timeNum2 < 1000) {
            timeString2 = `.${timeNum2.toString()}`;
          }

          setTime("".concat(timeString1, timeString2));
        })
      );
    } else {
      clearInterval(intervalID);
    }
  }, [play]);

  return <div className="timer">{time}</div>;
};

export default Timer;
