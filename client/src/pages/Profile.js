import  Axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Container} from '../components/styles'
import {useAuth} from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import {Form,Uldiv,ProfileDiv,ProfileOption,Button,PasswordInput,PasswordDiv} from '../components/Settings/UserProfile.styles'
import TeamMembers from '../components/Settings/TeamMembers'
import {IoIosArrowForward} from 'react-icons/io'
import Error from '../components/Error';
import { toast } from 'react-toastify'



export const Profile = () =>{
    const {user} = useAuth()
    //const user = JSON.parse(localStorage.getItem('user'));
    const [logo,setLogo] = useState("")
    const [companyName,setCompanyName] = useState("")
    const [changeLogoModal,setChangeLogoModal] = useState(false)
    const [email,setEmail] = useState('')
    const [formerpassword,setFormerPassword] = useState('')
    const [resetpassword,setResetPassword] = useState('')
    const [username,setUsername] = useState('')
    const [userModal,setUserModal] = useState(true)
    const [passwordModal,setPasswordModal] = useState(false)
    const [teamModal,setTeamModal] = useState(false)
  
 
 
   
  
    //const user = JSON.parse(localStorage.getItem('user'))
   

    const updateImage = async(e) =>{
        e.preventDefault()
        try {
        const data = new FormData()
        data.append("logo",logo)
        data.append("companyName",companyName)
       
        const postUpdated = await Axios.post(`/users/update/image/${user._id}`,data)
     
        toast.success(`${postUpdated.data}`)

        } catch (error) {
           
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
        }
       
        
       
    }

    const profileStyles = {
        width:"70px",
        borderRadius:"50%"
    }

    const updateUserInfo = async(e) =>{
        e.preventDefault()
        try {
            const response = await Axios.post(`/users/update/info/${user._id}`,{
                username:username,
                email:email,
              
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

    }
    const showTeamComponent = () =>{
        setUserModal(false)
        setPasswordModal(false)
        setTeamModal(!teamModal)
    }
    const showPasswordComponent = () =>{
        setUserModal(false)
        setPasswordModal(!passwordModal)
        setTeamModal(false)
    }

   




    
    return (

        
        <Container>
        <Sidebar/>
        {
            user.role === 'Admin' || 'Basic' ?  <div style={{width:'100%'}}>
            <SearchBar/>
            <ProfileDiv>
            <Uldiv>
            <ul>
                <ProfileOption>
                <p><IoIosArrowForward/></p>
                <p onClick={showUserComponent}>Profile</p>
                </ProfileOption>
                {user.role !== 'Basic' &&
                <ProfileOption>
               <p><IoIosArrowForward/></p>
                <p onClick={showTeamComponent}>Team</p>
                </ProfileOption>
        }
                <ProfileOption>
                   
                <p><IoIosArrowForward/></p>
                <p onClick={showPasswordComponent}>Password</p>
                </ProfileOption>
            </ul>
            </Uldiv>
            <div style={{width:"80%"}}>
              
            <div style={{width:"100%",height:"100%"}}>
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
                      
                       
                        <Button onClick={updateImage}>Update</Button>
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
                user.role === 'Admin' && teamModal &&  <TeamMembers/>
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
            </div>
          
           
           
            </div>
            </div>
    </ProfileDiv>
           </div> : <Error/>
        }
       
        </Container>
    )
}