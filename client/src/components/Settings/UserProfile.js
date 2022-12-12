import React,{useState,useEffect} from 'react'
import Axios from 'axios';







export default function UserProfile() {
  
    const [users,setUsers] = useState([]) 
    
   
    
    
    
   
    useEffect(()=>{
        (async ()=>{
            const response = await Axios.get(`/users/basic`)
            console.log(response)
            setUsers(response.data)
        }
        )()

    },[])
    return (
       
             <div style={{width:"100%",marginTop:"50px"}}>
                
        {/* {
            users ? <TeamMembers users = {users}/> :<NotFound/>
        } */} 

        </div>
        
    )
}