import React from 'react'
import './Sidebar.css'
import logo from '../assetts/THCA.webp'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sb__container'>
      <ul className="sb__links">
        <Link to='/wholesale'><li className="WHOLESALE click sb__link">WHOLESALE</li></Link>
        <Link to='/aboutus'><li className="aboutus click sb__link">About Us</li></Link>
        <Link to='/benefits'><li className="benefits click sb__link">THCA Benefits</li></Link>
        <Link to='/THCA'><li className="what click sb__link">WHAT IS THCA?</li></Link>
        <Link to='/shipstates'> <li className="states sb__link click">Ship States</li></Link>
      </ul>
      
      <img src={logo} alt="" className="thca" />
    </div>
  )
}

export default Sidebar
