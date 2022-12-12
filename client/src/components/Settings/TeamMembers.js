import React,{useState,useEffect} from 'react'
import {AiOutlineDelete,AiOutlineUser} from 'react-icons/ai'
import { List,DivList} from './UserProfile.styles'
import { Button} from '../styles'

import { useAuth } from '../../context/AuthContext'
import styled from 'styled-components'
import Axios from 'axios'
import { toast } from 'react-toastify'

const Input = styled.input`
border:1px solid black;
outline:none;
appearance:none;
border-radius:5px;
padding:1rem 2rem;
margin:20px 20px 0;
background-color:transparent;
`

const InputHolder = styled.div`
display:flex;
flex-direction:column;
`
const BtnContainer = styled.div`
display:flex;
justify-content:center;
`

function TeamMembers() {
    const {user} = useAuth()
    const [modal,setModal] = useState(false)
    const [userNameValue,setuserNameValue] = useState("")
    const [email,setEmail] = useState("")
    const [passwordValue,setPasswordValue] = useState("")
    const [role,setRole] = useState("")  
    const [users,setUsers] = useState([]) 
    const [response,setResponse] = useState(false)
    const [responseMessage,setResponseMessage] = useState('')
   
   
   

    const formStyle = {
        display:"flex",
       
        justifyContent:"center",
        alignItems:"center"
    }
     
    const addUser = async(e) =>{
        e.preventDefault()
            setuserNameValue('')
            setPasswordValue('')
            setEmail('')
            setRole('')
        try {
           
            const newUser = {
                username:userNameValue,
                password:passwordValue,
                email:email,
                role:role
            }
            const response = await Axios.post(`/users/team/${user._id}`,newUser)
            const team = response.data.data.users
           
            const updatedUsers = team.filter(team=>team.user._id !== user._id)
           
           setModal(false)
          
            setUsers(updatedUsers)
            toast.success(`${response.data.status}`)
           
        } catch (error) {
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
            
        }
      
       
        
        
    }
    
    const deleteUser = async(id)=>{
        const response = await Axios.post(`/users/delete/${id}`)
    
        const updatedUser = users.filter((user)=>user.user._id !== response.data.data._id)

        setUsers(updatedUser)
       // setResponse(true)
        setResponseMessage(response.data.data.status)
        toast.info(response)
               
        
    }

    useEffect(()=>{
        (async ()=>{
            const response = await Axios.get(`/users/team/${user._id}`)
            
            const teamMembers = response.data.filter(team=>team.user._id !== user._id)
           
            setUsers(teamMembers)
        }
        )()

    },[])

    return (
        <div style={{width:"100%"}}>
           
                <div style={{display:"flex",marginBottom:"20px",alignItems:"center",width:"100%"}}>
                <div style={{width:"100%",textAlign:"end",transform:"translateX(25%)"}}>
               
            <h1>Team Members</h1>
            <p>Manage your team permissions here </p>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end",width:"100%",height:"50px",marginRight:"20px"}}>
<Button onClick={()=>setModal(!modal)}>Add User</Button>
</div>
</div>
{
    modal && <div>
        <form>
           <InputHolder>
          <div>
          <label>UserName</label>
                <Input type="text" name="user" onChange={e=>setuserNameValue(e.target.value)}/>
                <label>Email</label>
                <Input type="email" name="email" onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div>
          <label>Password</label>
                <Input type="password" name="password" onChange={e=>setPasswordValue(e.target.value)}/>
           
            
            <select style={{margin:"10px 0"}} name ="role" value={role} onChange={e=>setRole(e.target.value)}>
                <option defaultValue="Select Role">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Basic">Basic</option>
            </select>
          </div>
          </InputHolder>
         
           
                
            <BtnContainer>
            <Button style={{margin:"10px 15px"}} onClick={addUser}>Create User</Button>
            <Button style={{margin:"10px 15px"}} onClick={()=>setModal(false)}>Cancel</Button>
            </BtnContainer>


           
        </form>
      
        </div>
        
        
}
        
               {
               users.map(user =>(
                   

                <div style={{display:"flex",justifyContent:"center"}}>
                <DivList>
               
                 <List> <span><AiOutlineUser/></span> {user.user.name}</List>
                 <p>{user.role}</p>
                

                 <p><AiOutlineDelete onClick={() => deleteUser(user.user._id)}/></p>
                </DivList>
                 </div>
                
               ))
           }
           
        </div>
    )
}

export default TeamMembers
