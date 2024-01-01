import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './RegisterPage.css'
import Register from '../../components/register/Register'
import Welcome from '../../components/Welcome/Welcome'


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
