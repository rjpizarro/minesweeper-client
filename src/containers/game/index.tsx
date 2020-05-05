// VENDOR
import React from 'react'
import get from 'lodash/get'

// LIBS
import { useGameContext } from '../../libs/game-store'

// COMPONENTS
import Board from '../../components/board'

const GameContainer = () => {
    const [gameState] = useGameContext()
    const matrix = get(gameState, 'game.maskedBoard', [])

    return (
        <Board
            matrix={matrix}
            onLeftClick={(row, col) => console.log(">> click", row, col)}
            onRightClick={(row, col) => console.log(">> right click", row, col)}
        />
    )
}

export default GameContainer