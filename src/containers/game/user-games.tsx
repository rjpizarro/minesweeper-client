// VENDOR
import React from 'react'
import { useHistory } from 'react-router-dom'

// COMPONENTS
import GameCardGallery from '../../components/game-card-gallery'

// LIBS
import endpoints from '../../config/endpoints'
import { useAuthContext } from '../../libs/auth-store'
import useMakeRequest from '../../libs/make-request'

const UserGamesContainer = () => {
    const history = useHistory()
    const [ authState ] = useAuthContext()
    const { data } = useMakeRequest(
        endpoints.games.get,
        'get',
        { lazy: false, jwt: authState.token }
        )

    if (data) {
        return (
            <div>
                <h2>User Games</h2>
                <GameCardGallery data={data} onCardClick={(id) => history.push(`/game/${id}`)}/>
            </div>
        )
    }

    return null
}

export default UserGamesContainer