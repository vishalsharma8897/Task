import React from 'react'
import Navbar from '../../components/navbarAI/Navbar'
import './RegisterPage.css'
import Register from '../../components/registerAI/Register'
import Welcome from '../../components/WelcomeAI/Welcome'


const RegisterPage = () => {
  return (
    <div className='home-container'>
      <Navbar/>
      <div className="container">
          <Welcome/>
          <Register/>
      </div>

    </div>
  )
}

export default RegisterPage
