import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

import Tiles from "./components/Tiles";
import BlankTile from "./components/BlankTile";
import Timer from "./components/Timer";

import { nanoid } from "nanoid";

const App = () => {
  const [buttonState, setButtonState] = useState<number>(0);
  const [rules, setRules] = useState<boolean>(true);
  const [blankIndex, setBlankIndex] = useState<number>(8);
  const [play, setPlay] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);

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
  // const [nums, setNums] = useState<number[]>([1, 4, 7, 2, 5, 8, 3, 6, -1]);

  // swap tile with blank tile
  const swapTiles = (i: number) => {
    if (play) {
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
        checkWin();
      }
    }
  };

  // check if win
  const checkWin = () => {
    if (
      // 1 at i=0, right
      (nums[0] === 1 &&
        nums[1] === 2 &&
        nums[2] === 3 &&
        nums[3] === 4 &&
        nums[4] === 5 &&
        nums[5] === 6 &&
        nums[6] === 7 &&
        nums[7] === 8 &&
        nums[8] === -1) ||
      // 1 at i=0, down
      (nums[0] === 1 &&
        nums[1] === 4 &&
        nums[2] === 7 &&
        nums[3] === 2 &&
        nums[4] === 5 &&
        nums[5] === 8 &&
        nums[6] === 3 &&
        nums[7] === 6 &&
        nums[8] === -1) ||
      // 1 at i=2, left
      (nums[0] === 3 &&
        nums[1] === 2 &&
        nums[2] === 1 &&
        nums[3] === 6 &&
        nums[4] === 5 &&
        nums[5] === 4 &&
        nums[6] === -1 &&
        nums[7] === 8 &&
        nums[8] === 7) ||
      // 1 at i=2, down
      (nums[0] === 7 &&
        nums[1] === 4 &&
        nums[2] === 1 &&
        nums[3] === 8 &&
        nums[4] === 5 &&
        nums[5] === 2 &&
        nums[6] === -1 &&
        nums[7] === 6 &&
        nums[8] === 3) ||
      // 1 at i=6, right
      (nums[0] === 7 &&
        nums[1] === 8 &&
        nums[2] === -1 &&
        nums[3] === 4 &&
        nums[4] === 5 &&
        nums[5] === 6 &&
        nums[6] === 1 &&
        nums[7] === 2 &&
        nums[8] === 3) ||
      // 1 at i=6, up
      (nums[0] === 3 &&
        nums[1] === 6 &&
        nums[2] === -1 &&
        nums[3] === 2 &&
        nums[4] === 5 &&
        nums[5] === 8 &&
        nums[6] === 1 &&
        nums[7] === 4 &&
        nums[8] === 7) ||
      // 1 at i=8, left
      (nums[0] === -1 &&
        nums[1] === 8 &&
        nums[2] === 7 &&
        nums[3] === 6 &&
        nums[4] === 5 &&
        nums[5] === 4 &&
        nums[6] === 3 &&
        nums[7] === 2 &&
        nums[8] === 1) ||
      // 1 at i=8, up
      (nums[0] === -1 &&
        nums[1] === 6 &&
        nums[2] === 3 &&
        nums[3] === 8 &&
        nums[4] === 5 &&
        nums[5] === 2 &&
        nums[6] === 7 &&
        nums[7] === 4 &&
        nums[8] === 1)
    ) {
      setPlay(false);
      setButtonState(2);
      setWin(true);
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
    if (buttonState !== 0) {
      setNums(getNewNums());
      setBlankIndex(8);
      tiles = getNewTiles();
      setWin(false);
    }
    setButtonState(1);
    setPlay(true);
  };

  const stopGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setButtonState(2);
    setPlay(false);
  };

  return (
    <>
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
        onClick={() => setRules((prevRules) => !prevRules)}
      />
      {rules && (
        <div className="rules-dropdown">
          <p>
            Goal: <br />
            Re-arrange the tiles so that they are in order with "1" and the
            blank tile in opposite corners. Solutions can be any rotation of the
            examples below ("1" can start in any corner).
          </p>
          <div>
            <img src="/images/solution1.jpg" alt="" />
            <img src="/images/solution2.jpg" alt="" />
          </div>
          <p>
            How: <br />
            Click on a tile to move it to the blank space. The tile must be
            adjacent to the blank space, not including diagonal adjacency
          </p>
        </div>
      )}
      {rules && (
        <div
          className="overlay"
          onClick={() => setRules((prevRules) => !prevRules)}
        ></div>
      )}
      {win && <div className="win">You Won!</div>}
    </>
  );
};

export default App;
