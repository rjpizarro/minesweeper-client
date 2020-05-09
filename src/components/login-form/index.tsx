// VENDOR
import React from 'react'
import { Formik, Form, FormikValues, FormikHelpers } from 'formik'
import { string, object } from 'yup'

// COMPONENTS
import Button from '../button'
import InputField from '../input-field'

import './style.scss'

interface RegisterFormProps {
    onSubmit: (values: FormikValues, helpers: FormikHelpers<any>) => void
}

const validationSchema = object().shape({
    username: string()
        .required(),
    password: string()
        .required(),
})

const initialValues = {
    username: '',
    password: '',
}

const LoginForm = (props: RegisterFormProps) => {
    return (
        <div className='login-form'>
            <h2>Login</h2>
            <Formik validationSchema={validationSchema} onSubmit={props.onSubmit} initialValues={initialValues}>
                {({ handleSubmit }) => (
                    <Form>
                        <InputField label="Username" name="username" />
                        <InputField label="Password" name="password" type='password' />
                        <Button label="Login" onClick={handleSubmit} type="submit" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm