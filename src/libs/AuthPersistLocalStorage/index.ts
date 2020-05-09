const BASE_KEY = 'minesweeper_app'



const setJWT = (jwt: string): void => {
    localStorage.setItem(`${BASE_KEY}_jwt`, jwt)
}

const getJWT = (): string | null => {
    return localStorage.getItem(`${BASE_KEY}_jwt`)
}

const removeJWT = (): void => {
    localStorage.removeItem(`${BASE_KEY}_jwt`)
}

const setUsername = (username: string): void => {
    localStorage.setItem(`${BASE_KEY}_username`, username)
}

const getUsername = (): string | null => {
    return localStorage.getItem(`${BASE_KEY}_username`)
}

const removeUsername = (): void => {
    localStorage.removeItem(`${BASE_KEY}_username`)
}

export {
    setJWT,
    getJWT,
    removeJWT,
    setUsername,
    getUsername,
    removeUsername
}