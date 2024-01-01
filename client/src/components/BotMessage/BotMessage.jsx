import React from 'react'
import './BotMessage.css'

const BotMessage = ({message}) => {
  return (
    <div className='bot-msg'>
         <p>Bot</p>
        <div className="chat-bot-box">
            <text-area>{message}</text-area>
        </div>
    </div>
  )
}

export default BotMessage
