import React from 'react'
import './Sidebar.css'
import logo from '../assetts/THCA.webp'

const Sidebar = () => {
  return (
    <div className='sb__container'>
      <ul className="sb__links">
        <li className="flower click sb__link">FLOWER</li>
        <li className="accessories click sb__link">ACCESSORIES</li>
        <li className="wholesale click sb__link">WHOLESALE</li>
        <li className="what click sb__link">WHAT IS THCA?</li>
        <li className="states sb_link click">Ship States</li>
      </ul>
      
      <img src={logo} alt="" className="thca" />
    </div>
  )
}

export default Sidebar
