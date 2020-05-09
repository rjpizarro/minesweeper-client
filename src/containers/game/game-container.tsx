// VENDOR
import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

// COMPONENTS
import NewGameContainer from './new-game'
import PlayGameContainer from './play-game'

const GameContainer = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/new`} component={NewGameContainer} />
            <Route exact path={`${path}/:id`} component={PlayGameContainer} />
        </Switch>
    )
}

export default GameContainer