import React from 'react'
import map from "lodash/map"
import './style.scss'

import GameCard from '../game-card'

interface GameCardGalleryProps {
    data: [any] | null
    onCardClick: (id: string) => void
}

const GameCardGallery = (props: GameCardGalleryProps) => {
    const {
        data,
        onCardClick
    } = props

    return (
        <div className='game-card-gallery'>
            { map(data, (game: any) => (
                <div className='game-card-gallery__card' key={game._id}>
                    <GameCard
                        id={game._id}
                        gameOver={Boolean(game.finishedAt)}
                        createdAt={game.createdAt}
                        onClick={onCardClick}
                        score={game.score || 0}
                    />
                </div>
            ))}
        </div>
    )
}

export default GameCardGallery