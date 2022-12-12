import React,{useState} from 'react';
import {useLocation,Redirect } from 'react-router-dom';
import Axios from 'axios';
import {SignInContainer,ImageDiv,Form,Input,SignInDiv,Button,Circulars,CircularDiv,Footer} from '../components/styles';
import { useAuth } from '../context/AuthContext';
import { Flashmessage } from '../components/FlashMessage/Flashmessage';
import { toast } from 'react-toastify';






export const SignIn = () => {
 
   const {state} = useLocation()
    
    
    const [errorMessage,setErrorMessage] = useState('')
    const[error,setError] = useState(false)
   
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPasswordValue] = useState('')

    const {login,loggedIn} = useAuth()

    Axios.defaults.withCredentials = true

    

    const onLogInClicked = async (e) =>{ 
        
    
        
      e.preventDefault()
      try {
       
        const response = await Axios.post(`/users/test`,{
            email:emailValue,
            password:passwordValue
         })
         
        
        
         if(response.data === 'Authenticated User'){
           login()     
         
         
         } 
         
         
      } catch (err) {
          // console.log(err)
          if(err.response){
            
            toast.error(`${err.response.data.msg}`)
        } else if(err.request){
          toast.error(`${err.request}`)
        } else{
          toast.error(`${err.message}`)
        }
      }
    
      

    }
    if(loggedIn){
      return (
        <Redirect to={state?.from.pathname || '/'}/>
      )
    }
    return(
        <SignInContainer>
        <CircularDiv>
        <Circulars/>
        <Circulars/>
        </CircularDiv>
        <ImageDiv>
      
<img src="/Images/heroImage.svg" alt ="Vector image of a message being sent"/>
        </ImageDiv>
        <SignInDiv>
           
           {
               error && <Flashmessage message={errorMessage} type='Error'/>
           }
         
        <div>
          <div>
          <form>
        <h1 style={{textAlign:"center"}}>Welcome Back</h1>
       <Form>
        <label for="email">Email</label>
        <Input type="text" name="email" placeholder="Email"
        value={emailValue}
        onChange ={e => setEmailValue(e.target.value)}
        ></Input>
        </Form>
        <Form>
        <label for="password">Password</label>
        <Input type="password" name="password" placeholder="Password"
         value={passwordValue}
         onChange ={e => setPasswordValue(e.target.value)}
        ></Input>
        </Form>
        <Button style={{display:"block",margin:"0 auto",padding:"15px 30px"}}
        disabled={!emailValue || !passwordValue}
         onClick={onLogInClicked}>Log In
         </Button>
       
         {/* <button
        onClick={()=>navigate('/forgot-password')}>
         </button> */}
    </form>
          </div>
       
    <Footer>
    <p>&copy; 2022 Afritonics Systems, Implemented by Dasym Analytics LTD</p>
    </Footer>
        </div>
       
   
    
        </SignInDiv>
  
    </SignInContainer>
   
    )
        
}

