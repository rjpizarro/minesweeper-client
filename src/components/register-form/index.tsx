// VENDOR
import React from 'react'
import { Formik, Form, FormikValues, FormikHelpers } from 'formik'
import { string, object, ref } from 'yup'

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
    confirmPassword: string()
        .oneOf([ref('password'), null], 'Passwords must match')
        .required('Confirm password is a required field'),
})

const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
}

const RegisterForm = (props: RegisterFormProps) => {
    return (
        <div className='register-form'>
            <h2>Register</h2>
            <Formik validationSchema={validationSchema} onSubmit={props.onSubmit} initialValues={initialValues}>
                {({ handleSubmit }) => (
                    <Form>
                        <InputField label="Username" name="username" />
                        <InputField label="Password" name="password" type='password' />
                        <InputField label="Confirm Password" name="confirmPassword" type='password' />
                        <Button label="Register" onClick={handleSubmit} type="submit" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default RegisterForm