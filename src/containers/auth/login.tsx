// VENDOR
import React from 'react'
import { FormikValues } from 'formik'
import { useHistory } from 'react-router-dom'
import get from "lodash/get"

// COMPONENTS
import Spinner from '../../components/spinner'
import LoginForm from '../../components/login-form'

// LIBS
import { useAuthContext } from '../../libs/auth-store'
import useMakeRequest from '../../libs/make-request'
import endpoints from '../../config/endpoints'
import {useErrorContext} from '../../libs/error-store'

const Login = () => {
    const history = useHistory()
    const [, dispatch] = useAuthContext()
    const [, dispatchError] = useErrorContext()
    const { isLoading, makeRequest: login } = useMakeRequest(
        endpoints.auth.login,
        'post',
        { lazy: true }
    )

    const handleSubmit = async (values: FormikValues) => {
        const { username, password } = values

        dispatchError({ type: 'clean-all-errors' })
        login(
            { username, password },
            {
                onComplete: ( user ) => {
                    // @ts-ignore
                    dispatch({
                        type: 'saveUserInfo',
                        username: user.username,
                        token: user.token
                    })

                    history.replace('/')
                },
                onError: ( error => {
                    dispatchError({
                        type: 'add-error',
                        message: get(error, 'message', ''),
                        code: get(error, 'code', ''),
                    })
                })
            }
        )
    }

    return (
        <Spinner isLoading={isLoading}>
            <LoginForm onSubmit={handleSubmit} />
        </Spinner>
    )
}

export default Login