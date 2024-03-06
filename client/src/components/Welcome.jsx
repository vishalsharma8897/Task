import React, {  } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./LogOut";



export default function Welcome({currentUser}) {

  return (
   <>
      
      <Container>
        <div className="mylogout">
        <Logout/>
        </div>
       
     <img src={Robot} alt="" />
     <h1>
       Welcome, <span>{currentUser.username}!</span>
     </h1>
     <h3>Please select a chat to Start messaging.</h3>
   </Container>
   </>
 
  )

}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  position: relative;
  .mylogout{
    position: absolute;
    right: 10px;
    top:0;
    }
  }
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

