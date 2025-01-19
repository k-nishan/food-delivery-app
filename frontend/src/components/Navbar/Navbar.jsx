import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const navbar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="logo" className="logo" />
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt='search-icon'/>
        <div className="navbar-search-icon">
            <img src={assets.bag_icon}/>
            <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  )
}

export default navbar
