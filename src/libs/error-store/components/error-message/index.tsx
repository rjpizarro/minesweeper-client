import React from 'react'
import { FaTimesCircle as CloseIcon } from 'react-icons/fa'
import './style.scss'

interface ErrorMessageProps {
    message: string
    code: string
    onCloseIconClick: () => void
}

const ErrorMessage = (props: ErrorMessageProps) => {
    const { message, code, onCloseIconClick } = props

    return (
        <div className="error-message">
            <CloseIcon color="#FFF" className="error-message__close-icon" onClick={onCloseIconClick} />
            <span className="error-message__title">
                Oops, something went wrong.
            </span>
            <span className="error-message__message">
                {message}
            </span>
            <span className="error-message__code">
                Code: {code}
            </span>
        </div>
    )
}

export default ErrorMessage