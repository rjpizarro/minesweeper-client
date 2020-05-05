const ENV = {
    development: {
        apiUrl: 'http://localhost:8000/api',
    },
    production: {
        apiUrl: "https://murmuring-basin-21822.herokuapp.com/api"
    }
};

const getEnvVars = (env = process.env.NODE_ENV) => {
    // @ts-ignore
    return ENV[env]
}

export default getEnvVars;