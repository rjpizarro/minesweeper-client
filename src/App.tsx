// VENDOR
import React, {useEffect, useState} from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom'
import { FaBomb } from 'react-icons/fa'

// COMPONENTS
import AppContainer from './components/app-container'
import Avatar from './components/avatar'
import Button from './components/button'
import Footer from './components/footer'

// CONTAINERS
import GameContainer, { UserGamesContainer } from './containers/game'
import AuthContainer from './containers/auth'
import AppHeader from './components/app-header'

// LIBS
import { useAuthContext } from './libs/auth-store'
import { getJWT, getUsername } from './libs/auth-persist-local-storage'
import { ErrorProvider } from './libs/error-store'

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
                    ? <AppContainer>
                        <ErrorProvider>
                            <Switch>
                                <Route path="/game" component={GameContainer} />
                                <Route path="/auth" component={AuthContainer} />
                                <Route path="/">
                                    <div>
                                        <FaBomb size={250} />
                                    </div>
                                    <Button
                                        label="New game"
                                        onClick={() => {
                                            history.push('/game/new')
                                        }}
                                    />
                                    { token && <hr style={{width: '85%' }}  />}
                                    { token && <UserGamesContainer />}
                                </Route>
                            </Switch>
                        </ErrorProvider>
                    </AppContainer>
                    : null
            }
            <Footer />
        </div>
    );
}

export default App;
