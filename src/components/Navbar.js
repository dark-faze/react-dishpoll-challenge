import React from 'react'
import Logout from './Logout'
import {Link} from 'react-router-dom'
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className='main_nav'>
        <div className='navlinks'>
            <Link style={{textDecoration: "none"}} to="/">Home</Link>
            <Link style={{textDecoration: "none"}} to="dishlist">Dishlist</Link>
            <Link style={{textDecoration: "none"}} to="leaderboard">Leaderboard</Link>
        </div>
        <div>
        <Logout/>
        </div>
    </div>
  )
}

export default Navbar