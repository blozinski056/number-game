import React, { useState, useMemo } from "react";
import "./App.css";

import Tiles from "./components/Tiles";
import { nanoid } from "nanoid";

const App = () => {
  const [play, setPlay] = useState<boolean>(false);

  const startGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPlay(true);
    let elm = document.querySelector(".start");
    elm?.setAttribute("disabled", "false");
    elm?.classList.add("disabled");
  };

  const restartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPlay(true);
    // let elm = document.querySelector(".start");
    // elm?.setAttribute("disabled", "false");
    // elm?.classList.add("disabled");
  };

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
      <div className="timer">0000</div>
      {play ? (
        <button className="start" onClick={(e) => restartGame(e)}>
          Restart
        </button>
      ) : (
        <button className="start" onClick={(e) => startGame(e)}>
          Start!
        </button>
      )}

      <div className="tile-container">{tiles}</div>
      <img src="/images/question.png" alt="" className="rules" />
    </>
  );
};

export default App;
