// VENDOR
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

// LIBS
import Register from './register'
import Login from './login'

const AuthContainer = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/register`} component={Register} />
            <Route exact path={`${path}/login`} component={Login} />
        </Switch>
    )
}

export default AuthContainer