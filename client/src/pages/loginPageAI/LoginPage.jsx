import React from 'react'
import Navbar from '../../components/navbarAI/Navbar'
import './LoginPage.css'
import Login from '../../components/loginAI/Login'
import Welcome from '../../components/WelcomeAI/Welcome'


const LoginPage = () => {
  return (
    <div className='home-container'>
      <Navbar/>
      <div className="container">
          <Welcome/>
          <Login/>
      </div>

    </div>
  )
}

export default LoginPage
