// VENDOR
import React, { useEffect, useState } from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { useParams, useHistory } from 'react-router-dom'

// LIBS
import { useGameContext } from '../../libs/game-store'

// COMPONENTS
import Board from '../../components/board'
import useMakeRequest from '../../libs/make-request'
import endpoints from '../../config/endpoints'
import { BoardValuesEnum } from '../../enums'
import Button from '../../components/button'
import Spinner from '../../components/spinner'

const GameContainer = () => {
    const { id } = useParams()
    const history = useHistory()
    const [gameState, setGameState] = useGameContext()
    const baseMatrix = get(gameState, 'game.maskedBoard', [])
    const [matrix, setMatrix] = useState(baseMatrix)
    const [gameOver, setGameOver] = useState(false)
    const [gameResult, setGameResult] = useState('')
    const { isLoading: gameIsLoading, makeRequest: getGameById } = useMakeRequest(
        `${endpoints.games.get}/${id}`,
        'get',
        { lazy: true }
        )
    const {isLoading: postMoveIsLoading, makeRequest: postMove } = useMakeRequest(
        endpoints.moves.post,
        'post',
        { lazy: true }
    )
    useEffect(() => {
        // @ts-ignore
        if (isEmpty(gameState.game)) {
            getGameById(undefined, {
                onComplete: (res) => {
                    const gameIsOver = Boolean(res.finishedAt)
                    const matrix = gameIsOver ? res.revealedBoard : res.maskedBoard
                    const message = gameIsOver ? `Your score: ${res.score}` : ''

                    // @ts-ignore
                    setGameState(res)
                    setGameOver(gameIsOver)
                    setMatrix(matrix)
                    setGameResult(message)
                }
            })
        }
    }, [])

    const handleClick = (row: number, col: number, clickType: 'left' | 'right', value?: BoardValuesEnum | null) => {
        if (clickType === 'left') {
            postMove({ gameId: id, row, col }, { onComplete: onMoveComplete })
        } else {
            if (value) {
                postMove({ gameId: id, row, col, value}, { onComplete: onMoveComplete })
            }
        }
    }

    const onMoveComplete = (response: { maskedBoard: [], gameOver: boolean, message: string }) => {
        let nextBoard = get(response, 'maskedBoard', [])

        if (response.gameOver) {
            setGameOver(true)
            setGameResult(response.message)
            nextBoard = get(response, 'revealedBoard', nextBoard)
        }

        setMatrix(nextBoard)
    }

    const isLoading = gameIsLoading || postMoveIsLoading

    return (
        <div>
            <div>
                <Spinner isLoading={isLoading} >
                    <Board
                        boardBlocked={gameOver}
                        matrix={matrix}
                        onLeftClick={(row, col) => handleClick(row, col, 'left')}
                        onRightClick={(row, col, value) => handleClick(row, col, 'right', value)}
                    />
                </Spinner>
                { gameOver && <h2>Game Over</h2> }
                { gameResult && <p> {gameResult} </p> }
                { gameOver && <Button label="Play Again!" onClick={() => history.push('/new-game')} /> }
            </div>
        </div>
    )
}

export default GameContainer