import React from 'react'
// import Home from './pages/home/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Chat from './pages/chat/Chat'
import RegisterPage from './pages/registerPage/RegisterPage'
import LoginPage from './pages/loginPage/LoginPage'


const App = () => {
  return (
    <BrowserRouter>

          <Routes>
            
            <Route exact path="/" element={<Chat/>}></Route>
            <Route exact path="/login" element={<LoginPage/>}></Route>
            <Route exact path="/register" element={<RegisterPage/>}></Route>
            
          </Routes>
      
      </BrowserRouter>
  )
}

export default App
