// VENDOR
import React from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom'

// COMPONENTS
import Button from './components/button'

// LIBS
import NewGameContainer from './containers/new-game'
import GameContainer from './containers/game'

const App = () => {
    const history = useHistory()

    return (
        <div className="App">
            <h1>Minesweeper</h1>
            <div>
                <Switch>
                    <Route path="/new-game" component={NewGameContainer} />
                    <Route path="/game/:id" component={GameContainer} />
                    <Route path="/">
                        <Button
                            label="New game"
                            onClick={() => {
                                history.push('/new-game')
                            }}
                        />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
