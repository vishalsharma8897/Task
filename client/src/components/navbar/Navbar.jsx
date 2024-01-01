import React from 'react'
import './Navbar.css'
import vector from '../../assets/Vector.png'
import { useLocation,useNavigate } from 'react-router-dom'
import logout from '../../assets/logout.png'



const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isChatRoute = location.pathname === '/';

  const handleOnClick = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className='navbar-container'>
      <img src={vector} className='navbar-vector' alt="Logo" />

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
