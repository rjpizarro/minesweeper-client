import React, {createContext, useContext, useReducer } from 'react'
import map from 'lodash/map'
import ErrorMessage from './components/error-message'

type ErrorType = {
    message: string
    code: string
}

interface addErrorAction {
    type: 'add-error'
    message: string
    code: string
}

interface cleanErrorAction {
    type: 'clean-error',
    errorIndex: number
}

interface cleanAllErrorsAction {
    type: 'clean-all-errors'
}

type ErrorAction = addErrorAction | cleanErrorAction | cleanAllErrorsAction
type ErrorDispatch = (action: ErrorAction) => void
type ErrorState = ErrorType[]

const ErrorStateContext = createContext<ErrorState | undefined>(undefined)
const ErrorDispatchContext = createContext<ErrorDispatch | undefined>(undefined)

const defaultState: ErrorState = []

function errorReducer(state: ErrorState = defaultState, action: ErrorAction) {
    if (action.type === 'add-error') {
        return [
            ...state,
            {
                code: action.code,
                message: action.message,
            }
        ]
    }

    if (action.type === 'clean-error') {
        return state.filter((error, idx) => idx !== action.errorIndex)
    }

    if (action.type === 'clean-all-errors') {
        return defaultState
    }

    return state
}

const ErrorProvider = ({ children }: {children: React.ReactChildren | React.ReactChild}) => {
    const [state, dispatch] = useReducer(errorReducer, defaultState)

    const handleCloseError = (idx: number) => {
        dispatch({
            type: 'clean-error',
            errorIndex: idx
        })
    }

    return (
        <ErrorStateContext.Provider value={state}>
            <ErrorDispatchContext.Provider value={dispatch}>
                {
                    map(state, (error, idx) => (
                        <ErrorMessage
                            key={`${error.message}-${idx}`}
                            message={error.message}
                            code={error.code}
                            onCloseIconClick={() => handleCloseError(idx)}
                        />
                    ))
                }
                {children}
            </ErrorDispatchContext.Provider>
        </ErrorStateContext.Provider>
    )
}

const useErrorContext = (): [ErrorState, ErrorDispatch] => {
    const stateContext = useContext(ErrorStateContext)
    const dispatchContext = useContext(ErrorDispatchContext)

    if (stateContext === undefined || dispatchContext === undefined) {
        throw new Error('useAuthContext need to be wrapped in a AuthProvider')
    }

    return [stateContext, dispatchContext]
}

export {
    ErrorProvider,
    useErrorContext
}
