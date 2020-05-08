// @ts-ignore
import React from 'react'
import { FaCog as SpinnerIcon, FaBomb } from 'react-icons/fa'
import './style.scss'


const Spinner = (props: any) => {
    const { isLoading, children } = props

    if (!isLoading) {
        return children
    }

    return (
        <div className='spinner'>
            <div className='spinner__spin-container'>
                <SpinnerIcon size={25} className='spinner__spin-icon' color="#e2e2e2" />
                <FaBomb size={15} color="#e2e2e2" />
            </div>
            { props.children }
        </div>
    )
}

export default Spinner