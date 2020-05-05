import React, { createContext, useContext, useState } from 'react'

type GameState = { game: any }
type GameDispatch = (game: any) => void

const GameStateContext = createContext<GameState | undefined>(undefined)
const GameDispatchContext = createContext<GameDispatch | undefined>(undefined)

const GameProvider = ({ children}: {children: React.ReactChildren | React.ReactChild}) => {
    const [game, setGame] = useState({})

    return (
        <GameStateContext.Provider value={{game: game}}>
            <GameDispatchContext.Provider value={setGame}>
                {children}
            </GameDispatchContext.Provider>
        </GameStateContext.Provider>
    )
}

const useGameContext = () => {
    const stateContext = useContext(GameStateContext)
    const dispatchContext = useContext(GameDispatchContext)

    if (stateContext === undefined || dispatchContext === undefined) {
        throw new Error('useGameContext need to be wrapped in a GameProvider')
    }

    return [stateContext, dispatchContext]
}

export {
    GameProvider,
    useGameContext
}

