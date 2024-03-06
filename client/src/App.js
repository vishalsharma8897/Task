import React from 'react'
// import Home from './pages/home/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import ChatAI from './pages/chatAI/Chat'
import RegisterPage from './pages/registerPageAI/RegisterPage'
import LoginPage from './pages/loginPageAI/LoginPage'
import Register  from './pages/Register.jsx';
import Login  from './pages/Login.jsx';
import SetAvatar  from './pages/SetAvatar.jsx';
import Chat  from './pages/Chat.jsx';
import HomePage from './pages/HomePage/HomePage.jsx'




const App = () => {
  return (
    <BrowserRouter>

          <Routes>
            
          <Route exact path="/" element={<HomePage/>}></Route>

            <Route exact path="/ai/chat" element={<ChatAI/>}></Route>
            <Route exact path="/login/ai" element={<LoginPage/>}></Route>
            <Route exact path="/register/ai" element={<RegisterPage/>}></Route>

            <Route exact path="/register" element={<Register/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/real-chat" element={<Chat/>}></Route>
            <Route exact path="/setAvatar" element={<SetAvatar/>}></Route>
            
          </Routes>
      
      </BrowserRouter>
  )
}

export default App
