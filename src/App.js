import React, {useState} from "react";
import "./App.css";
import Board from "./components/Board";
// import Square from "./components/Square";

function App() {
  const [history, setHistory] = useState(
    [
      {
        squares: Array(9).fill(null)
      }
    ]
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const calcurateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,5]
    ];

    for(let index=0; index < lines.length; index++){
      const [a,b,c] = lines[index];

      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }
  const current = history[stepNumber];
  const winner = calcurateWinner(current.squares);

  let status;
  if(winner){
    status = "Winner:" + winner;
  }
  else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();

    if(calcurateWinner(newSquares) || newSquares[i]){
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...history, {squares: newSquares}]);
    setXIsNext(xIsNext => !xIsNext);

    setStepNumber(newHistory.length);
  }

  const moves = history.map((step, move) => {
    const  desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button className="move-button" onClick={ () => jumpTo(move) }>{desc}</button>
      </li>
    )
  })

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  } 

  return (
    // game 전체 부분
    <div className="game">
      {/* 게임 보드 */}
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>

      {/* 게임 정보 */}
      <div className="game-info">
        {status}
        <ol style={{listStyle:"none"}}>
          {moves}
        </ol>
      </div>
    </div>
  );
}

export default App;
