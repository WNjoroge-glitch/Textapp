import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {Link,useLocation} from 'react-router-dom'
import {AiFillDelete} from 'react-icons/ai';
import {IoPencil} from 'react-icons/io5';

import styled from 'styled-components'
import {toast} from 'react-toastify'


const StyledLink = styled(Link)`
text-decoration:none;
color:black;
`








function ListItem({item,index,deleteFunction}) {
    const location = useLocation()
    
    const [editForm,setEditForm] = useState(false)
    const [templateMessage,setTemplateMessage] = useState()
   
   

    useEffect (()=>{
        setTemplateMessage(item.Message)

    },[])
    const listStyle = {
        margin:"10px",
        fontSize:"25px",
        borderBottom:"1px solid black",
        width:"80%",
        listStyle:"none",
        display:"flex",
        justifyContent:"space-between"

    }
    const formStyle = {
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        margin:"10px"
     }
    const buttonStyle = {
        backgroundColor:"#646CD9",
        margin:"10px",
        padding:"10px 15px",
        border:"none",
        outline:"none",
        appearance:"none",
        borderRadius:"5px"
       

    }
    const input = {
        width:"35rem",
        height:"5rem",
        border:"none"
     }

   
    const editTemplate = async(e) =>{
        e.preventDefault()
        try {
            const updatedTemplate = Axios.post(`/template/edit/${item._id}`,{
                editedMessage:templateMessage,
                location:location
            })
            
            toast.success(`${updatedTemplate.data}`)
        } catch (error) {
            
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
        }
       


    }
    

    const showForm = () =>{
        setEditForm(!editForm)

    }
    return (
        <div>
             <div style={{display:"flex",alignItems:"center"}}>
                                    
        <li style={listStyle}>
        <StyledLink to={{
            
                                                     pathname:`/write-message/${item._id}`,
                                                     state:{
                                                         user:item,
                                                         from:location.pathname
                                                     }
                }} style={{textDecoration:"none"}}>{item.Message}</StyledLink>
                </li>
            <div>
        <AiFillDelete onClick={()=>
           deleteFunction(item._id)
        
        }/>
        
            <IoPencil onClick={showForm}/>
            {
                location.pathname === '/template'
            }
            
                
                <button style={buttonStyle}><StyledLink to={{pathname:`/write-message/${item._id}`, state:{user:item,from:location.pathname
                } }}  style={{textDecoration:"none"}}>{location.pathname === "/drafts" ? "Use Draft" : "Use template" }</StyledLink></button>

            
           
         </div>
        </div>
        {
            editForm && 
            <div>
 <form style={formStyle}>
                           
           <textarea type="text" style = {input} value={templateMessage} onChange={e => setTemplateMessage(e.target.value)}/>
       <div>
       <button style={buttonStyle} onClick={editTemplate}>Save</button>
           <button style={buttonStyle} onClick={()=>showForm(false)}>Cancel</button>
           </div>
                               
           </form>
            </div>

        }
        </div>
    )
}

export default ListItem
