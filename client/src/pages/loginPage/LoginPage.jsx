import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './LoginPage.css'
import Login from '../../components/login/Login'
import Welcome from '../../components/Welcome/Welcome'


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
