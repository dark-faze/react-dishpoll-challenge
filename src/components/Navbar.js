import React from 'react'
import Logout from './Logout'
import {NavLink} from 'react-router-dom'
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className='main_nav'>
        <div className='navlinks'>
            <NavLink style={{textDecoration: "none"}} to="">Home</NavLink>
            <NavLink style={{textDecoration: "none"}} to="dishlist">Dishlist</NavLink>
            <NavLink style={{textDecoration: "none"}} to="leaderboard">Leaderboard</NavLink>
        </div>
        <div>
        <Logout/>
        </div>
    </div>
  )
}

export default Navbar