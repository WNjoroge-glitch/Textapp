import React from 'react'

import { Link } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
function Error() {
    const {user} = useAuth()
    //const user = JSON.parse(localStorage.getItem('user'));

    const errorImage = {
        width:"50%"
    }
    const errorDiv = {
        display:"flex",
        alignItems:"center",
        border:"1px solid black",
        maxWidth:"80%"
    }
    const errorMessage = {
        fontSize:"2rem",
        lineHeight:"2"
    }
    const homeLink ={
        backgroundColor:"#646CD9",
        padding:"20px 20px",
        display:"inline-block",
        margin:"10px auto",
        border:"0",
        outline:"none",
        borderRadius:"5px",
        textDecoration:"none"
    }
    return (
        
        <div style={errorDiv}>
            
            <img src='/Images/Unauthorized.png' alt="unathorized sign" style={errorImage}/>
            <div>
            <p style={errorMessage}>You are not authorized to view this page. Contact <a href={`mailto:${user.email}`}>Support</a> if this is an error</p>

            <Link to="/" style={homeLink}>Go back to Homepage</Link>
            </div>
        </div>
    )
}

export default Error
