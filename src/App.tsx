import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

import Tiles from "./components/Tiles";
import { nanoid } from "nanoid";

const App = () => {
  const [time, setTime] = useState<string>("000.000");
  const [buttonState, setButtonState] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

  const startGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setButtonState(1);
    // let elm = document.querySelector(".start");
    // elm?.setAttribute("disabled", "");
    // elm?.classList.add("disabled");

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
  };

  const stopGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setButtonState(2);
    clearInterval(intervalID);
  };

  // const restartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   clearInterval(intervalID);
  //   startGame(e);
  // };

  const getNewNums = () => {
    let nums: number[] = [];

    for (let i = 0; i < 8; i++) {
      let random = Math.ceil(Math.random() * 8);

      while (true) {
        if (nums.includes(random)) {
          random = Math.ceil(Math.random() * 8);
        } else {
          nums.push(random);
          break;
        }
      }
    }

    return nums;
  };

  let randomNums: number[] = useMemo(() => getNewNums(), []);
  let tiles: React.ReactElement[] = randomNums.map((val) => {
    return <Tiles key={nanoid()} value={val} />;
  });

  return (
    <>
      <div className="timer">{time}</div>
      {buttonState !== 1 && (
        <button className="start" onClick={(e) => startGame(e)}>
          {buttonState === 0 ? "Start!" : "Restart"}
        </button>
      )}
      {buttonState === 1 && (
        <button className="stop" onClick={(e) => stopGame(e)}>
          Stop!
        </button>
      )}
      <div className="tile-container">{tiles}</div>
      <img src="/images/question.png" alt="" className="rules" />
    </>
  );
};

export default App;
