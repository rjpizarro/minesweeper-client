import React from 'react'
import './style.scss'

interface AppHeaderProps {
    title: string,
    onTitleClick?: () => void
    rightAction?: React.ReactChild
}

const AppHeader = (props: AppHeaderProps) => {
    const {
        title,
        onTitleClick,
        rightAction
    } = props

    return (
        <div className='app-header'>
            <h1 className='app-header__title' onClick={onTitleClick}>
                {title}
            </h1>
            {rightAction && <div className='app-header__actions'>{ rightAction }</div>}
        </div>
    )
}

export default AppHeader