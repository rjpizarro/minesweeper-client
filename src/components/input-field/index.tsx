import React from 'react'
import { Field, ErrorMessage } from 'formik'

import './style.scss'

interface InputFieldProps {
    label: string,
    name: string
}

const InputField = (props: InputFieldProps) => {
    return (
        <div className='input-field'>
            <div className='input-field__container'>
                <p className='input-field__label'>{props.label}</p>
                <Field name={props.name} className='input-field__input' />
            </div>
            <ErrorMessage name={props.name} component="p" className='input-field__error' />
        </div>
    )
}

export default InputField