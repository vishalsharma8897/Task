import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginAIRoute } from '../../utils/api'
import axios from 'axios';
import './Login.css'


const Login = () => {
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

      const navigate = useNavigate();

      useEffect(()=>{
        if(localStorage.getItem('user'))
        {
          navigate('/ai/chat');
        }
        },[]);

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
              
              const {data} = await axios.post(loginAIRoute,{
                username,password
              });
  
              console.log(data);
              if(data.success===false)
              {
                toast.error(data.message,options);
              }
              
              if(data.success === true)
              {
                localStorage.setItem("user",JSON.stringify(data.userWithoutPassword));
                navigate("/ai/chat");
              }
  
             } catch (error) {
              console.error("Error during login:", error);
              toast.error("An error occurred during login. Please try again later.", options);
             }
  
  
          }
          
      }


    return (
        <div className='form-container-login'>
            <form onSubmit={handleSubmit} className='form'>
                <h2  className='heading-login'>Login</h2>

                <div className="user-info">
                    <div className="element-login">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" onChange={handleOnChange}/>
                    </div>

                     <div className="element-login">
                     <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={handleOnChange}/>
                     </div>


                </div>

               <button type="submit" className='btn-login'>
                 <h3>Let's Go!!</h3>
               </button>

               <h4  className='routeChange-login'>Don't have an account  <span><Link to='/register/ai'>Sign Up</Link></span></h4>

            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login
