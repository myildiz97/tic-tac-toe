import { useState } from "react";

const GameBoard = () => {
  const [isX, setIsX] = useState(true);
  const [playerOne, setPlayerOne] = useState([]);
  const [playerSecond, setPlayerSecond] = useState([]);
  const [winner, setWinner] = useState(null);

  const winnerArr = ["123", "147", "159", "258", "357", "369", "456", "789"];

  const getComb = (arr) => {
    const combinations = [];
  
    const findCombinations = (currentComb, startIndex) => {
      if (currentComb.length === 3) {
        combinations.push(currentComb.slice());
        return;
      }
  
      for (let i = startIndex; i < arr.length; i++) {
        currentComb.push(arr[i]);
        findCombinations(currentComb, i + 1);
        currentComb.pop();
      }
    }
  
    findCombinations([], 0);
    return combinations.map(arr => arr.sort((a, b) => a - b).join(""));
  };

  const winnerChecker = (arr, player) => {
    let combArr = getComb(arr);
    combArr.forEach(num => {
      if (winnerArr.includes(num)) setWinner("Winner is " + player); 
    });
    if (arr.length === 5 && !winner) setWinner("Tie");
  };

  const handleClick = (e) => {
    if (!e.target.textContent && !winner) {
      let id = e.target.id.at(-1);
      if (isX) {
        e.target.textContent = "X";
        const newState = [...playerOne];
        newState.push("X-" + id);
        setPlayerOne(newState);
        if (newState.length > 2) {
          winnerChecker(newState.map(move => move.at(-1)), "X");
        };
      } else {
        e.target.textContent = "O";
        const newState = [...playerSecond];
        newState.push("O-" + id);
        setPlayerSecond(newState);
        if (newState.length > 2) {
          winnerChecker(newState.map(move => move.at(-1)), "O");
        };
      };
      setIsX(prev => !prev);
    };
  };

  const handleResetClick = () => {
    setWinner(null);
    setIsX(true);
    setPlayerOne([]);
    setPlayerSecond([]);
  };

  return (
      <>
        { !winner && 
        <>
          <div className="player">
            <h1>Player X</h1>
            <span>Moves: <span>{playerOne.join(", ")}</span></span>
          </div>
          <div className="table">
            <div className="grid" id="grid1" onClick={handleClick}></div>
            <div className="grid" id="grid2" onClick={handleClick}></div>
            <div className="grid" id="grid3" onClick={handleClick}></div>
            <div className="grid" id="grid4" onClick={handleClick}></div>
            <div className="grid" id="grid5" onClick={handleClick}></div>
            <div className="grid" id="grid6" onClick={handleClick}></div>
            <div className="grid" id="grid7" onClick={handleClick}></div>
            <div className="grid" id="grid8" onClick={handleClick}></div>
            <div className="grid" id="grid9" onClick={handleClick}></div>
          </div>
          <div className="player">
            <h1>Player O</h1>
            <span>Moves: <span>{playerSecond.join(", ")}</span></span>
          </div>
        </>
        }
        {winner && 
          <div>
            <h1>{winner}</h1>
            <button onClick={handleResetClick}>Play Again</button>
          </div>
        }
      </>
      
  );
};

export default GameBoard;