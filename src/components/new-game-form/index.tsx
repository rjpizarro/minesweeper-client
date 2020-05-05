// VENDOR
import React from 'react'
import { Formik, Form, FormikValues, FormikHelpers } from 'formik'
import { number, object } from 'yup'

// COMPONENTS
import Button from '../button'
import InputField from '../input-field'

import './style.scss'

interface NewGameFormProps {
    onSubmit: (values: FormikValues, helpers: FormikHelpers<any>) => void
}

const validationSchema = object().shape({
    rows: number()
        .positive()
        .integer()
        .required()
        .min(2)
        .typeError('value must be a number'),
    columns: number()
        .positive()
        .integer()
        .required()
        .min(2)
        .typeError('value must be a number'),
    mines: number()
        .positive()
        .integer()
        .required()
        .min(2)
        .typeError('value must be a number'),
})

const initialValues = {
    rows: '',
    columns: '',
    mines: '',
}

const NewGameForm = (props: NewGameFormProps) => {
    return (
        <div className='new-game-form'>
            <Formik validationSchema={validationSchema} onSubmit={props.onSubmit} initialValues={initialValues}>
                {({ handleSubmit }) => (
                    <Form>
                        <InputField label="Rows" name="rows" />
                        <InputField label="Columns" name="columns" />
                        <InputField label="Mines" name="mines" />
                        <Button label="create game" onClick={handleSubmit} type="submit" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewGameForm