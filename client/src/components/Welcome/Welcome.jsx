import React from 'react'
import './Welcome.css'
import logo from '../../assets/Group.png'

const Welcome = () => {
  return (
    <div className='welcome-container'>
    
        <img className='logo' src={logo} alt="logo" />
        <div className="message">
           <h2>Welcome to</h2>
           <h2>Goodspace Communication</h2>
        </div>
    </div>
  )
}

export default Welcome
