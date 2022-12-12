import React from 'react'
import {Link} from 'react-router-dom'



export const NotFound = ({message,addItem}) =>{
const imageDiv = {
    width:"80vw",
   
}


    return(
        <div style={imageDiv}>
        <img src="/Images/Empty.svg" style={{width:"70%"}} alt="vector image showing an empty box"/>
        
        <p style={{fontSize:"2rem",textAlign:"center"}}>You do not have any {message} yet.
        Click <Link to={`/${addItem}`}>Here</Link> to add
        </p> 
        
        </div>
    )
}