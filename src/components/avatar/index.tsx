import React from 'react'
import './style.scss'

interface AvatarProps {
    username: string
}

const Avatar = (props: AvatarProps) => {
    const { username } = props

    return (
        <div className='avatar'>
            <p className='avatar__label'>{ username }</p>
            <img
                className='avatar__adorable'
                src={`https://api.adorable.io/avatars/40/${username}.png`}
                alt={username}
            />
        </div>
    )
}

export default Avatar