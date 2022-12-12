import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {Container} from '../components/styles'
import Axios from 'axios'
import Sidebar from '../components/Sidebar'
import { PasswordDiv,PasswordInput,ProfileOption,Form,Uldiv,Button,ProfileDiv } from '../components/Settings/UserProfile.styles'
import TeamMembers from '../components/Settings/TeamMembers'
import {IoIosArrowForward} from 'react-icons/io'
import SearchBar from '../components/SearchBar'
import Error from '../components/Error'
import { Companies } from '../components/Companies'
import { toast } from 'react-toastify'



export const Admin = () =>{
    const {user} = useAuth()
    //const user = JSON.parse(localStorage.getItem('user'));
    const [logo,setLogo] = useState("")
    const [email,setEmail] = useState('')
   
    const [changeLogoModal,setChangeLogoModal] = useState(false)
    
    const [username,setUsername] = useState('')
   
    const [userModal,setUserModal] = useState(true)
    const [passwordModal,setPasswordModal] = useState(false)
    const [teamModal,setTeamModal] = useState(false)
    const [companiesModal,setCompaniesModal] = useState(false)
    const [formerpassword,setFormerPassword] = useState('')
    const [resetpassword,setResetPassword] = useState('')
    const [companyName,setCompanyName] = useState("")
    const [customers,setCustomers] = useState([])
 
    
    
   
   const updatePost = async(e) =>{
    e.preventDefault()
    try {
        const data = new FormData()
        data.append("logo",logo)
        data.append("companyName",companyName)
       
        const postUpdated = await Axios.post(`/users/update/image/${user._id}`,data)
        const msg = postUpdated.data
        toast.success(msg)
    } catch (error) {
        if(error.response){
            toast.error(`${error.response.data.message}`)
        } else {
            toast.error(`${error.message}`)
        }
    }
   
    
   
   
}



   const updateUserInfo = async(e) =>{
    e.preventDefault()
    try {
        const response = await Axios.post(`/users/update/info/${user._id}`,{
            username:username,
            email:email,
          
        })
        const msg = response.data
        toast.success(msg)
    } catch (error) {
        if(error.response){
            toast.error(`${error.response.data.message}`)
        } else {
            toast.error(`${error.message}`)
        }
    }
    
}

  useEffect(()=>{
(async ()=>{
    const response = await Axios.get(`/users/aggregate`)
    
}
    )()
  },[])


const profileStyles = {
  width:"70px",
  borderRadius:"50%"
}






const changePassword =async(e)=>{
    e.preventDefault()
    try {
        const response = await Axios.post(`/users/update/password/${user._id}`,{
            formerPassword:formerpassword,
            resetpassword:resetpassword
        })
        
        toast.success(`${response.data}`)
    } catch (error) {
        
        if(error.response){
            toast.error(`${error.response.data.message}`)
        } else {
            toast.error(`${error.message}`)
        }
    }
    

}
useEffect(()=>{
    setEmail(user.email)
    
    setUsername(user.name)
},[])

const showUserComponent = () =>{
    setUserModal(!userModal)
    setPasswordModal(false)
    setTeamModal(false)
    setCompaniesModal(false)

}
const showTeamComponent = () =>{
    setUserModal(false)
    setPasswordModal(false)
    setCompaniesModal(false)
    setTeamModal(!teamModal)
}
const showPasswordComponent = () =>{
    setUserModal(false)
    setPasswordModal(!passwordModal)
    setTeamModal(false)
    setCompaniesModal(false)
}
const showCompaniesComponent = () =>{
    setUserModal(false)
    setPasswordModal(false)
    setTeamModal(false)
    setCompaniesModal(!companiesModal)
}
   



    
  
   
      return (
   
       
 <Container> 
           
             
      <Sidebar/>
      {user.role === "SuperUser" ? 
         <div style={{width:'100%'}}>
         <SearchBar/>
         
         <ProfileDiv>
         <Uldiv>
         <ul>
             <ProfileOption>
             <p onClick={showTeamComponent}><span><IoIosArrowForward/></span>Team</p>
             </ProfileOption>
             <ProfileOption>
             <p onClick={showUserComponent}><span><IoIosArrowForward/></span>Profile</p>
             </ProfileOption>
             <ProfileOption>
             <p><IoIosArrowForward/></p>
            <p onClick={showPasswordComponent}>Password</p>
             </ProfileOption>
             <ProfileOption>
                <p><IoIosArrowForward/></p>
             <p onClick={showCompaniesComponent}>Companies</p>
             </ProfileOption>
         </ul>
         </Uldiv>
         <div style={{width:"100%"}}>
           
         <div style={{height:"100%"}}>
             <div style={{display:"flex",justifyContent:"space-around",height:"100%"}}>
                 {
                     userModal && 
                   <PasswordDiv>
                     <div style={{width:"100%"}}>
                         <div>
                            <div style={{display:"flex"}}>
                                <div>
                                   
                                    
                                
                         <img src={`/public/uploads/${user.profileImage}`}  style={profileStyles} alt="company logo"/>
                         </div>
                         <div>
 
                         <Button onClick={()=>setChangeLogoModal(!changeLogoModal)}>Change Logo</Button>
                         </div>
                         </div>
                         {
                         changeLogoModal && <div>
                     <input type="file" name="logo" onChange={(e)=>setLogo(e.target.files[0])}/>
                   
                    
                     <Button onClick={updatePost}>Update</Button>
                         </div>
                        
                     }
                         </div>
                         <div>
                         <form>
                             <Form>
                             <label>UserName</label>
                             <PasswordInput type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                             </Form>
                             <Form>
                             <label>Email Address</label>
                             <PasswordInput type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                             </Form>
                             
                             <Button onClick={updateUserInfo}>Save Changes</Button>
                         </form>
                         </div>
             
        
                   
                     
                    
                    
                     
                     
                     </div>
                    </PasswordDiv>
                 }
          {
             teamModal &&  <TeamMembers/>
         }
           {
             passwordModal && <PasswordDiv>
                 <form>
                     <Form>
                 <label>Current Password</label>
                 <PasswordInput type="password" onChange={e=>setFormerPassword(e.target.value)}/>
                 </Form>
                 <Form>
                 <label>New Password</label>
                 <PasswordInput type="password" onChange={e=>setResetPassword(e.target.value)}/>
                 </Form>
                 <Button onClick={changePassword}>Change Password</Button>
                 </form>
                 </PasswordDiv>
         }
         {
             companiesModal && <Companies/>
         }
         </div>
       
       
        
         </div>
         </div>
 </ProfileDiv>
        </div> 
        :
<Error/>
      }
      
     
    </Container> 
      
      
    
      )
    

      
     


    

    
      
      
       
    
}