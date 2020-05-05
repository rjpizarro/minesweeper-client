import React from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import Board from './components/board'
import Button from './components/button'
import NewGameForm from './components/new-game-form'

const matrix = [
    ["1", "[]", "[]", "[]"],
    ["[]", "[]", 3, "E"],
    ["[]", "E", "E", "[]"],
    ["[]", "E", "E", "[]"],
]

const App = () => {
    const history = useHistory()

    return (
        <div className="App">
            <h1>Minesweeper</h1>
            <div>
                <Switch>
                    <Route path="/new-game">
                        <NewGameForm onSubmit={console.log} />
                    </Route>
                    <Route path="/game">
                        <Board
                            matrix={matrix}
                            onLeftClick={(row, col) => console.log(">> click", row, col)}
                            onRightClick={(row, col) => console.log(">> right click", row, col)}
                        />
                    </Route>
                    <Route path="/">
                        <Button
                            label="New game"
                            onClick={() => history.push('/new-game')}
                        />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
