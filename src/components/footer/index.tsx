import React from 'react'
import { FaGithub } from 'react-icons/fa'
import './style.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <FaGithub color="#FFF" />
            <a href="https://github.com/rjpizarro/minesweeper-client" className='footer__link'>
                Minesweeper: source code
            </a>
        </div>
    )
}

export default Footer