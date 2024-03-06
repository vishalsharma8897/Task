import React, { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerAIRoute } from '../../utils/api'
import axios from 'axios'
import './Register.css'


const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: '',
    password: '',
    confirmPassword: '',
  })

  const options = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/ai/chat');
    }
  }, []);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should match each other", options);
      return false;
    }
    else if (username.length < 4) {
      toast.error("Name must be atleast 4 characters", options);
      return false;
    }
    else if (password.length < 8) {
      toast.error("Password must be atleast 8 characters", options);
      return false;
    }
    else if (email.length === 0) {
      toast.error("Please Enter Email", options);
      return false;
    }
    else {
      return true;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;

      try {
        const { data } = await axios.post(registerAIRoute, { username, email, password });

        if (data.success === false) {
          toast.error(data.message, options);
        } else {
          localStorage.setItem("user", JSON.stringify(data.userWithoutPassword));
          navigate("/ai/chat");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An error occurred during registration. Please try again later.", options);
      }
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form'>
        <h2 className='heading'>Signup</h2>

        <div className="user-info">
          <div className="element">
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" onChange={handleOnChange} />
          </div>

          <div className="element">
            <label htmlFor="email">Your Email Id</label>
            <input type="email" name="email" id="email" onChange={handleOnChange} />
          </div>

          <div className="element">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" onChange={handleOnChange} />
          </div>

          <div className="element">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleOnChange} />
          </div>

        </div>

        <button type="submit" className='btn'>
          <h3>Let's Go!!</h3>
        </button>
        <h4 className='routeChange-register'>Already have an account  <span><Link to='/'>Login</Link></span></h4>

      </form>
      <ToastContainer />
    </div>
  )
}

export default Register
