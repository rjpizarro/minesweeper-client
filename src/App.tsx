// VENDOR
import React, {useEffect, useState} from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom'

// COMPONENTS
import Button from './components/button'
import Avatar from './components/avatar'

// CONTAINERS
import NewGameContainer from './containers/new-game'
import GameContainer from './containers/game'
import AuthContainer from './containers/auth'
import AppHeader from './components/app-header'

// LIBS
import { useAuthContext } from './libs/auth-store'
import { getJWT, getUsername } from './libs/AuthPersistLocalStorage'

const App = () => {
    const history = useHistory()
    const [ authState, dispatch ] = useAuthContext()
    const [ appReady, setAppReady ] = useState(false)
    const { token, username } = authState

    useEffect(() => {
        if (!token || !username) {
            const storedToken = getJWT()
            const storedUsername = getUsername()

            if (storedToken && storedUsername) {
                // @ts-ignore
                dispatch({
                    type: 'saveUserInfo',
                    username: storedUsername,
                    token: storedToken
                })
            }

            setAppReady(true)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="App">
            <AppHeader
                title="Minesweeper"
                onTitleClick={() => history.replace('/')}
                rightAction={
                    <>
                        {token && username
                            ? <>
                                <Avatar username={username} />
                                <Button label='logout' onClick={() => {
                                    dispatch({type: 'deleteUserInfo'})
                                    history.replace('/')
                                }} />
                            </>
                            : <>
                                <Button label='Register' onClick={() => history.push('/auth/register')} />
                                <Button label='Login' onClick={() => history.push('/auth/login')} />
                            </>
                        }
                    </>
                }
            />
            {
                appReady
                    ? <div>
                        <Switch>
                            <Route path="/new-game" component={NewGameContainer} />
                            <Route path="/game/:id" component={GameContainer} />
                            <Route path="/auth" component={AuthContainer} />
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
                    : null
            }

        </div>
    );
}

export default App;
