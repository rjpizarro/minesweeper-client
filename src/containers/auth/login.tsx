// VENDOR
import React from 'react'
import { FormikValues } from 'formik'
import { useHistory } from 'react-router-dom'

// COMPONENTS
import Spinner from '../../components/spinner'
import LoginForm from '../../components/login-form'

// LIBS
import { useAuthContext } from '../../libs/auth-store'
import useMakeRequest from '../../libs/make-request'
import endpoints from '../../config/endpoints'

const Login = () => {
    const history = useHistory()
    const [, dispatch] = useAuthContext()
    const { isLoading, makeRequest: login } = useMakeRequest(
        endpoints.auth.login,
        'post',
        { lazy: true }
    )

    const handleSubmit = async (values: FormikValues) => {
        const { username, password } = values

        login(
            { username, password },
            { onComplete: ( user ) => {
                    // @ts-ignore
                    dispatch({
                        type: 'saveUserInfo',
                        username: user.username,
                        token: user.token
                    })

                    history.replace('/')
                }}
        )
    }

    return (
        <Spinner isLoading={isLoading}>
            <LoginForm onSubmit={handleSubmit} />
        </Spinner>
    )
}

export default Login