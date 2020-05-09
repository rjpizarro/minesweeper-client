import React, {createContext, useContext, useReducer} from 'react'
import { removeUsername, setJWT, setUsername, removeJWT } from '../AuthPersistLocalStorage'

interface saveUserInfoAction {
    type: 'saveUserInfo'
    username: string
    token: string
}

interface deleteUserInfoAction {
    type: 'deleteUserInfo'
}

type AuthAction = saveUserInfoAction | deleteUserInfoAction
type AuthDispatch = (action: AuthAction) => void
type AuthState = { username: string, token: string }

const AuthStateContext = createContext<AuthState | undefined>(undefined)
const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined)

const defaultState = {
    username: '',
    token: '',
}

function authReducer(state: AuthState = defaultState, action: AuthAction): AuthState {
    if (action.type === 'saveUserInfo') {
        return {
            username: action.username,
            token: action.token,
        }
    }

    if (action.type === 'deleteUserInfo') {
        return {
            username: '',
            token: '',
        }
    }

    return state
}

const AuthProvider = ({ children }: {children: React.ReactChildren | React.ReactChild}) => {
    const [state, dispatch] = useReducer(authReducer, defaultState)

    const proxyDispatch = (action: AuthAction): void => {
        if (action.type === 'saveUserInfo') {
            setJWT(action.token)
            setUsername(action.username)
        }

        if (action.type === 'deleteUserInfo') {
            removeJWT()
            removeUsername()
        }

        dispatch(action)
    }

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={proxyDispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

const useAuthContext = (): [AuthState, AuthDispatch] => {
    const stateContext = useContext(AuthStateContext)
    const dispatchContext = useContext(AuthDispatchContext)

    if (stateContext === undefined || dispatchContext === undefined) {
        throw new Error('useAuthContext need to be wrapped in a AuthProvider')
    }

    return [stateContext, dispatchContext]
}

export {
    AuthProvider,
    useAuthContext
}
