import React from 'react'
import './Welcome.css'
import logo from '../../assets/logo.svg'

const Welcome = () => {
  return (
    <div className='welcome-container'>
    
        <img className='logo2' src={logo} alt="logo" />
        <div className="message">
           <h1>Welcome to Talkie! 🎉</h1>
           <h1>Let the conversations begin!</h1>
        </div>
    </div>
  )
}

export default Welcome
