import React,{useState} from 'react';
import {SignInContainer,ImageDiv,Form,Input,SignInDiv,Button,Circulars,CircularDiv} from '../components/styles'
import Axios from 'axios';




export const SignUp = () => {
    const [errorMessage,setErrorMessage] = useState('')
  
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPasswordValue] = useState('')
    const [confirmPasswordValue,setConfirmPasswordValue] = useState('')
    // const history = useHistory()

    const onSignUpClicked = async (e) =>{
        e.preventDefault()
        try {
            const response = await Axios.post(`/users/signup`,{
                email:emailValue,
                password:passwordValue,
                confirmPassword:confirmPasswordValue

            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <SignInContainer>
        <CircularDiv>
        <Circulars/>
        <Circulars/>
        </CircularDiv>
        <ImageDiv>
        <img src="/Images/heroImage.svg" alt ="vector image of an image being sent"/>
        </ImageDiv>
        <SignInDiv>
       
          
            {errorMessage && <div>{errorMessage} </div>}
        <form>
        <h1 style={{textAlign:"center"}}>Sign Up </h1>
          
            <Form>
            <label>Username</label>
        <Input type="text" placeholder="Email"
        value={emailValue}
        onChange ={e => setEmailValue(e.target.value)}
        ></Input>
            </Form>
            <Form>
            <label>Password </label>
        <Input type="password" placeholder="Password"
         value={passwordValue}
         onChange ={e => setPasswordValue(e.target.value)}
        ></Input>
            </Form>
            <Form>
            <label>Confirm Password</label>
        <Input type="password" placeholder="Confirm Password"
         value={confirmPasswordValue}
         onChange ={e => setConfirmPasswordValue(e.target.value)}
        ></Input>
            </Form>
      
        
      
        
        
        
        
        <Button  style={{display:"block",margin:"0 auto",padding:"15px 30px"}}
        disabled={!emailValue || !passwordValue}
         onClick={onSignUpClicked}>Log In
         </Button>
         {/* <button
        onClick={()=>history.push('/signin')}> Already have an Account 
         </button> */}
    </form>
     
    </SignInDiv>
  
  </SignInContainer>
   
    )
}

