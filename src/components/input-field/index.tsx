import React from 'react'
import omit from 'lodash/omit'
import {Field, ErrorMessage, FieldConfig} from 'formik'

import './style.scss'

interface InputFieldProps extends FieldConfig {
    label: string,
    name: string
}

const InputField = (props: InputFieldProps) => {
    return (
        <div className='input-field'>
            <div className='input-field__container'>
                <p className='input-field__label'>{props.label}</p>
                <Field name={props.name} className='input-field__input' {...omit(props, ['label'])}  />
            </div>
            <ErrorMessage name={props.name} component="p" className='input-field__error' />
        </div>
    )
}

export default InputField