import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.svg'
import { useLocation,useNavigate } from 'react-router-dom'
import logout from '../../assets/logout.png'



const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isChatRoute = location.pathname === '/ai/chat';

  const handleOnClick = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className='navbar-container'>
      <div className="brand">
      <img src={logo} className='logo1' alt="Logo" />
      <span className='talkie'>Talkie</span>
      </div>

      {isChatRoute && <div className="start-btn" >
        <button onClick={handleOnClick}>
          <img src={logout} alt="" />
        </button>
        <p className='btn-text'>Logout</p>
      </div>}
    </div>
  )
}

export default Navbar
