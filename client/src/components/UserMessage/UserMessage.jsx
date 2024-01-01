import React from 'react'
import './UserMessage.css'
const UserMessage = ({message}) => {
  return (
    <div className='user-msg'>
        <p>Me</p>
        <div className="chat-user-box">
            <text-area>{message}</text-area>
        </div>
    </div>
  )
}

export default UserMessage
