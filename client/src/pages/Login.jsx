import React, { useEffect, useState  } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import {loginRoute} from '../utils/api';

const Login = () => {
  const navigate= useNavigate();
  const [values, setValues] = useState({
     username:'',
     password:'',
  })

 const options = {
   position:"bottom-right",
   autoClose:4000,
   pauseOnHover : true,
   draggable: true,
   theme:"dark"
 }

  useEffect(()=>{
  //   setTimeout(() => {
  //     console.log("okk now u can go");
  //  }, 2000);

  if(localStorage.getItem('chat-app-user'))
  {
    navigate('/real-chat');
  }
  },[])


  const handleOnChange= (e)=>{
   setValues({...values, [e.target.name]:e.target.value});
  }
  
   const handleValidation = ()=>{
      const { password ,username} = values;

       if (password.length<8){
        toast.error("Password must be atleast 8 characters",options);
        return false;
      }
      else if(username.length <3)
      {
        toast.error("Username must be atleast 8 characters",options);
        return false;
      }
      else {
        return true;
      }
   }



    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(handleValidation()) 
        {
          const { password ,username} = values;

           try {
            
            const {data} = await axios.post(loginRoute,{
              username,password
            });

            console.log(data);
            if(data.success===false)
            {
              toast.error(data.message,options);
            }
            
            if(data.success === true)
            {
              localStorage.setItem("chat-app-user",JSON.stringify(data.userWithoutPassword));
              navigate("/real-chat");
            }

           } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred during login. Please try again later.", options);
           }


        }
        
    }
  

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Mylogo" />
            <h1>Talkie</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={handleOnChange}    required/>
          <input type="password" placeholder='Password' name='password' onChange={handleOnChange}    required/>
         
        <button type="submit">Login</button>
        <span>
            Don't have an account <Link to="/register">Sign Up</Link>
        </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;



export default Login
