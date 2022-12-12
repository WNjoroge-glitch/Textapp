import React from 'react';
import Axios from 'axios';
import {useAuth} from '../context/AuthContext';
import {AiOutlineLogout} from 'react-icons/ai'
import {Link} from 'react-router-dom';
export const User = () =>{
    const {user} = useAuth()
  
    //const user = JSON.parse(localStorage.getItem('user'));
    const {signout} = useAuth()


        async function logout(){
            const response = await Axios.post('/users/logout')
            signout()
            
         }

         const profileStyles = {
             backgroundColor:"#ECEDFA",
             width:"80px",
             height:"80px",
             display:"flex",
             flexDirection:"column",
             justifyContent:"space-between",
             margin:"20px",
            
             position:"absolute",
             top:"35px",
             right:"0",
             textAlign:"center"
         }

         const linkStyle = {
             textDecoration:"none"
         }


   

    return (
        <div style={profileStyles}>
            {
            user.role === 'SuperUser' ? 
            <Link style={linkStyle} to="/admin">Profile </Link>
            :
            <Link style={linkStyle} to="/profile">Profile</Link>
            }
            
            <p style ={{cursor:"pointer"}} onClick={logout}>
                <span><AiOutlineLogout/></span>
                Logout
            </p>
        </div>
    )
}