import React from 'react'
import './style.scss'

interface ButtonProps {
    label: string,
    onClick: () => void
    type?: "button" | "submit" | "reset" | undefined
}

const Button = (props: ButtonProps) => {
    const { label, onClick, type } = props

    return (
        <button className="button" onClick={onClick} type={type}>
            {label}
        </button>
    )
}

export default Button