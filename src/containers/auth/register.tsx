// VENDOR
import React from 'react'
import get from 'lodash/get'
import {FormikValues} from 'formik'
import { useHistory } from 'react-router'

// COMPONENTS
import Spinner from '../../components/spinner'
import RegisterForm from '../../components/register-form'

// LIBS
import useMakeRequest from '../../libs/make-request'
import endpoints from '../../config/endpoints'
import { useAuthContext } from '../../libs/auth-store'
import {useErrorContext} from '../../libs/error-store'

const Register = () => {
    const history = useHistory()
    const [, dispatch] = useAuthContext()
    const [, dispatchError] = useErrorContext()
    const { isLoading, makeRequest: register } = useMakeRequest(
        endpoints.auth.register,
        'post',
        { lazy: true }
    )

    const handleSubmit = async (values: FormikValues) => {
        const { username, password } = values

        dispatchError({type: 'clean-all-errors'})
        register(
            { username, password },
            {
                onComplete: ( user ) => {
                    // @ts-ignore
                    dispatch({
                        type: 'saveUserInfo',
                        username: user.username,
                        token: user.token
                    })

                    history.replace('/game/new')
                },
                onError: error => {
                    dispatchError({
                        type: 'add-error',
                        message: get(error, 'message', ''),
                        code: get(error, 'code', ''),
                    })
                }
            }
        )
    }

    return (
        <Spinner isLoading={isLoading}>
            <RegisterForm onSubmit={handleSubmit} />
        </Spinner>
    )
}

export default Register