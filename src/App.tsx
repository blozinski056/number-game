import React, { useState, useCallback } from "react";
import "./App.css";

import Tiles from "./components/Tiles";
import BlankTile from "./components/BlankTile";
import Timer from "./components/Timer";

import { nanoid } from "nanoid";

const App = () => {
  // const [time, setTime] = useState<string>("000.000");
  const [buttonState, setButtonState] = useState<number>(0);
  const [rules, setRules] = useState<boolean>(false);
  // const [intervalID, setIntervalID] = useState<NodeJS.Timer>();
  const [blankIndex, setBlankIndex] = useState<number>(8);
  const [play, setPlay] = useState<boolean>(false);

  // get random numbers between 1 and 8
  const getNewNums = useCallback(() => {
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
    // add -1 for the blank tile
    nums.push(-1);
    return nums;
  }, []);

  // state to keep track of numbers
  const [nums, setNums] = useState<number[]>(getNewNums());

  // swap tile with blank tile
  const swapTiles = (i: number) => {
    console.log(i, blankIndex);

    let iRem = i % 3;
    let bRem = blankIndex % 3;
    if (
      (iRem === bRem + 1 && i === blankIndex + 1) ||
      (iRem === bRem - 1 && i === blankIndex - 1) ||
      i === blankIndex + 3 ||
      i === blankIndex - 3
    ) {
      let tempNums = nums;
      let tempTile = tempNums[i];
      tempNums[i] = tempNums[blankIndex];
      tempNums[blankIndex] = tempTile;
      setBlankIndex(i);
      setNums(tempNums);
    }
  };

  // create tiles based on numbers
  const getNewTiles = () => {
    // turn all numbers into tiles
    return nums.map((val, i = -1) => {
      if (val === -1) {
        return <BlankTile key={nanoid()} value={val} index={i++} />;
      }
      return (
        <Tiles key={nanoid()} value={val} index={i++} swapTiles={swapTiles} />
      );
    });
  };

  // tiles based on numbers
  let tiles: React.ReactElement[] = getNewTiles();

  const startGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setButtonState(1);

    if (buttonState !== 0) {
      setNums(getNewNums());
      setBlankIndex(8);
      tiles = getNewTiles();
    }

    setPlay(true);

    // const startTime = new Date().getTime();
    // setIntervalID(
    //   setInterval(() => {
    //     let currTime = new Date().getTime();

    //     let timeChange = currTime - startTime;
    //     let timeNum1: number = Math.floor(timeChange / 1000);
    //     let timeNum2: number = timeChange % 1000;

    //     let timeString1: string = "";
    //     let timeString2: string = "";

    //     if (timeNum1 === 0) {
    //       timeString1 = "000";
    //     } else if (timeNum1 < 10) {
    //       timeString1 = `00${timeNum1}`;
    //     } else if (timeNum1 < 100) {
    //       timeString1 = `0${timeNum1}`;
    //     } else if (timeNum1 < 1000) {
    //       timeString1 = timeNum1.toString();
    //     } else {
    //       setTime("Still playing?");
    //       return;
    //     }

    //     if (timeNum2 < 10) {
    //       timeString2 = `.00${timeNum2}`;
    //     } else if (timeNum2 < 100) {
    //       timeString2 = `.0${timeNum2}`;
    //     } else if (timeNum2 < 1000) {
    //       timeString2 = `.${timeNum2.toString()}`;
    //     }

    //     setTime("".concat(timeString1, timeString2));
    //   })
    // );
    // clearInterval(intervalID);
  };

  const stopGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setButtonState(2);
    // clearInterval(intervalID);
    setPlay(false);
  };

  const showRules = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    setRules((prevRules) => !prevRules);
  };

  return (
    <>
      {/* <div className="timer">{time}</div> */}
      <Timer play={play} />
      {buttonState !== 1 && (
        <button className="start" onClick={(e) => startGame(e)}>
          {buttonState === 0 ? "Start!" : "Restart"}
        </button>
      )}
      {buttonState === 1 && (
        <button className="stop" onClick={(e) => stopGame(e)}>
          Stop
        </button>
      )}
      <div className="tile-container">{tiles}</div>
      <img
        src="/images/question.png"
        alt=""
        className="rules"
        onClick={(e) => showRules(e)}
      />
      {rules && (
        <div className="rules-dropdown">
          <ul>
            <li>
              Rearrange the numbers in order with "1" and the blank tile in
              opposite corners
            </li>
            <li></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default App;
