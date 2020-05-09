import React from 'react'
import format from 'date-fns/format'
import { FaBomb } from 'react-icons/fa'

import './style.scss'

interface GameCardProps {
    id: string
    gameOver: boolean
    createdAt: Date
    onClick: (id: string) => void
    score: number
}

const GameCard = (props: GameCardProps) => {
    const {
        id,
        gameOver,
        createdAt,
        onClick,
        score
    } = props

    const date = format( new Date(createdAt), 'MM/dd/yy')

    return (
        <div onClick={() => onClick(id)} className='game-card'>
            { gameOver
                ? <span className={`game-card__status-banner game-card__status-banner--game-over`}>
                    Game Over
                </span>
                :  <span className={`game-card__status-banner game-card__status-banner--continue`}>
                    Continue
                </span>
            }
            <span className='game-card__score'> Score: {score} </span>
            <span className='game-card__date'> Date: {date} </span>
            <div className='game-card__background'>
                <FaBomb size={125} />
            </div>
        </div>
    )
}

export default GameCard