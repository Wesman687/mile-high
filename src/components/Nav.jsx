import React from 'react'
import './Nav.css'
import logo from '../assetts/THCA.webp'

const Nav = () => {
  return (
    <div className='nav__container'>
        <div className="logo__container">
        <h1 className="logo__text">MILE HIGH HEMP CO</h1>
        </div>

        <div className="nav__wrapper">
            <ul className='links'>
                <li className="Shop link shadoww">Shop</li>
                <li className="home link shadoww">Home</li>
            <li className="link shadoww cart">Cart</li>
            <li className="link shadoww login">Login</li>
            <li className="link shadoww contact">Contact Us</li>
        </ul>
        </div>
    </div>
  )
}

export default Nav
