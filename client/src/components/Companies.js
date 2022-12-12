import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { List,DivList } from './Settings/UserProfile.styles';
import {AiOutlineDelete,AiOutlineUser} from 'react-icons/ai'
import { Flashmessage } from './FlashMessage/Flashmessage';
import {toast} from 'react-toastify'


const Button = styled.button`
margin:20px 10px;
background-color:#22298D;
border:none;
border-radius:5px;
color:#ECEDFA;
padding:0.75rem;
`

const FormDiv = styled.div`
display:flex;

align-content:center;
justify-content:center;
`

const Company = styled.div`
width:100%;


`
const Input = styled.input`
border:1px solid black;
outline:none;
appearance:none;
border-radius:5px;
padding:1rem 2rem;
margin:20px 20px 0;
background-color:transparent;
`
const BtnContainer = styled.div`
display:flex;
justify-content:center;
margin-top:10px;
`

export function Companies() {

    const [addUserModal,setAddUserModal] = useState(false)
    const [companies,setCompanies] = useState([])
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
   

    const signUpUser = async(e) =>{
        e.preventDefault()
        setName('')
        setEmail('')
        setPassword('')
        try {
            const response = await Axios.post(`/users/signup-admin`,{
                name:name,
                email:email,
                password:password
    
            })
            
            setCompanies([...companies,response.data.data])
           
            toast.success(`${response.data.status}`)
            
        } catch (error) {
          
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
            
        }
       

    }
    useEffect(()=>{
        (async()=>{
const response = await Axios.get('/users/companies')
setCompanies(response.data)
        })()

    },[])

    const deleteCompany = async(id)=>{
        try {
            const response = await Axios.post(`/users/delete/${id}`)
        const updatedCompanies = companies.filter((company)=>company._id !== response.data.data._id)

        setCompanies(updatedCompanies)
        } catch (error) {
            
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
        }
        
               
        
    }

    
  return (
  <Company>

      <h1>Companies</h1>
      <p>A list of companies enrolled on your platform</p>
     
      <Button onClick={()=>setAddUserModal(!addUserModal)}>Add Company</Button>
         {
             addUserModal && 
            <FormDiv>
             <form>
                 <div>
                 <label>UserName</label>
                     <Input onChange={e=>setName(e.target.value)}/>
                
                     <label>Email</label>
                     <Input onChange={e=>setEmail(e.target.value)}/>
                 </div>
                 <div>
                 <label>Password</label>
                     <Input onChange={e=>setPassword(e.target.value)}/>
                 </div>
                     
                 
                     
                
                
              
               <BtnContainer>
                <Button onClick={signUpUser}>Save</Button>
                <Button onClick={()=>setAddUserModal(false)}>Cancel</Button>
                </BtnContainer>
 
             </form>
             </FormDiv>
         }
         <div>

{
    companies.map((company)=>(
        <div style={{display:"flex",justifyContent:"center"}}>
        <DivList>
       
         <List> <span><AiOutlineUser/></span> {company.name}</List>
        

         <p><AiOutlineDelete onClick={() => deleteCompany(company._id)}/></p>
        </DivList>
         </div>
        
    ))
}
       </div>

    
   
        
             
  </Company>
  );
}


