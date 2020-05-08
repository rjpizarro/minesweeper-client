// VENDOR
import React from 'react'
import { useHistory } from 'react-router'
import { FormikValues } from 'formik'

// COMPONENTS
import NewGameForm from '../../components/new-game-form'

// LIBS
import useMakeRequest from '../../libs/make-request'
import { useGameContext } from '../../libs/game-store'
import endpoints from '../../config/endpoints'

const NewGameContainer = () => {
    const [gameState, setGameState] = useGameContext()
    const { makeRequest: postGame } = useMakeRequest(
        endpoints.games.post,
        'post',
        { lazy: true }
    )
    const history = useHistory()

    const handleNewGameSubmit = async (values: FormikValues) => {
        const { rows, columns, mines } = values

        postGame(
            { rows, cols: columns, mines },
            { onComplete: ( createdGame ) => {
                    // @ts-ignore
                    setGameState(createdGame)
                    history.push(`/game/${createdGame._id}`)
                }}
            )
    }

    return (
        <NewGameForm onSubmit={handleNewGameSubmit} />
    )
}

export default NewGameContainer