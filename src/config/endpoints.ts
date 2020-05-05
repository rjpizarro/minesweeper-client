import getEnvVars from './envConfig'

const { apiUrl } = getEnvVars()

export default {
    games: {
        get: `${apiUrl}/games`,
        post: `${apiUrl}/games`
    },
    moves: {
        post: `${apiUrl}/moves`
    },
    users: {
        post: `${apiUrl}/users`
    },
    auth: {
        login: `${apiUrl}/auth/login`,
        register: `${apiUrl}/auth/register`
    },
}