import React, {useState} from 'react';
import './App.css';
import Board from './components/board'

const matrix = [
    ["1", "[]", "[]", "[]"],
    ["[]", "[]", 3, "E"],
    ["[]", "E", "E", "[]"],
    ["[]", "E", "E", "[]"],
]

const App = () => {
  return (
    <div className="App">
      <Board
          matrix={matrix}
          onLeftClick={(row, col) => console.log(">> click", row, col)}
          onRightClick={(row, col) => console.log(">> right click", row, col)}
      />
    </div>
  );
}

export default App;
