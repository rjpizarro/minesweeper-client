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
import Spinner from '../../components/spinner'
import {useAuthContext} from '../../libs/auth-store'

const NewGameContainer = () => {
    const [ authState ] = useAuthContext()
    const [, setGameState ] = useGameContext()
    const { isLoading, makeRequest: postGame } = useMakeRequest(
        endpoints.games.post,
        'post',
        { lazy: true, jwt: authState.token }
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
        <Spinner isLoading={isLoading} >
            <NewGameForm onSubmit={handleNewGameSubmit} />
        </Spinner>
    )
}

export default NewGameContainer