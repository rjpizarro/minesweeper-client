import React from 'react'
import './style.scss'

interface AppContainerProps {
    children?: React.ReactChild
}

const AppContainer = (props: AppContainerProps) => {
    return (
        <div className='app-container'>
            { props.children }
        </div>
    )
}

export default AppContainer