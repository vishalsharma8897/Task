import React from 'react'
import {useNavigate} from 'react-router-dom'
import './HomePage.css';
const HomePage = () => {
   const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1 className='my-heading'>Welcome to Talkie...</h1>
       <div className="homePage-container">
        <div className="container-item">
          <button className='btn' onClick={()=>navigate('/login/ai')}>
            Talk to bot
          </button>
        </div>
        <div className="container-item">
         <button className='btn' onClick={()=>navigate('/real-chat')}>
          Talk to real users
         </button>
        </div>
      </div>
    </div>
     
  )
}

export default HomePage
