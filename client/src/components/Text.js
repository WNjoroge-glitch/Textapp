import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import { MessageDiv,InputDiv,Form,Input,TextArea,Button } from './styles';
import { Upload } from './Upload';
import { useLocation,useHistory } from 'react-router';
import {useAuth} from '../context/AuthContext';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import styled from 'styled-components';


const SelectedHeading = styled.h1`
cursor:pointer;
&:hover{
border-bottom:2px solid #646CD9;
}
${props =>{
    if(props.border){
        return `
        text-decoration:1px solid black;
        `
    } else {
        return `
        text-decoration:none;
        `
    }
}}

`


// const url = 'https://bulktxtapp.herokuapp.com' || 'http://localhost:3002'
// const socket = io.connect(url)

export const Text = () =>{
    
const {user} = useAuth()

const history = useHistory()
const [phoneValue,setPhoneValue] = useState('')
const [msgValue,setMsgValue] = useState('')
const [recurValue,setRecurValue] = useState('')
const [scheduleValue,setScheduleValue] = useState(new Date())
const [selected,setSelected] = useState(0)
const [underlined,setUnderlined] = useState(false)
const [successMsg,setSuccessMsg] = useState('')




const location = useLocation()


let contactArray = []


// useEffect(()=>{
    
//     socket.on('status',data=>{
//        console.log(data)
//         setSuccess(true)
//         setSuccessMsg(data)
//     })
   
   
//     return () => socket.disconnect();

      

// },[])

useEffect(()=>{
    if(location.state){
        const {contactsData} = location.state
        if(contactsData){
          
 contactsData.map((contact)=>{
     
            contactArray.push(`+254${contact.PhoneNumber}`)
          
            setPhoneValue(contactArray.toString())
            
            window.history.replaceState({}, document.title)
        })
        } else {
            console.log('not connected')
        }
        
       
    }
    
},[])

const selectedOption1 = () =>{
    setSelected(1)
    setUnderlined(!underlined)
}
const selectedOption = () =>{
    setSelected(0)
    setUnderlined(!underlined)
}








const saveDraft = async(e) =>{
    e.preventDefault()
    try{
        const draft = {
            contacts:phoneValue,
            message:msgValue,
            recur:recurValue,
            schedule:scheduleValue
        }
        let response = await Axios.post(`/drafts/${user._id}`,draft)
        
       
      
       toast.success(`${response.data}`)
        history.push({pathname:'/drafts',newDraft:draft})
       
    }catch(error){
        console.log(error.message)
    }

    
    
}

const saveTemplate = async(e) =>{
    e.preventDefault()
    let response = await Axios.post(`/template/${user._id}`,{
        message:msgValue
    })
    const msg = 
   toast.success(`${response.data}`)
    history.push('/template')
}

const onClickHandler = async (e) =>{
e.preventDefault()
setMsgValue('')
setPhoneValue('')
setRecurValue('')
setScheduleValue('')




try{
    const response = await Axios.post(`/msg`,{
        contacts:phoneValue,
        message:msgValue,
        recur:recurValue,
        date:scheduleValue,
        user:user._id
    
    
    })
     toast.info(`${response.data}`)
 }

catch(error){
    console.log(error)
  if(error.response){
        toast.error(`${error.response.data.message}`)
    } else if(error.request){
        toast.error(`${error.request}`)

    } else {
        toast.error(`${error.message}`)
    }
   
}

}


    return(
        <MessageDiv>
             
        <InputDiv>
            {/* <SelectedHeading border={underlined} onClick={() => setSelected(0)}>input details</SelectedHeading> */}
            <SelectedHeading border={underlined} onClick={selectedOption}>input details</SelectedHeading>
           
            
            {selected === 0 &&
            <form>
                
            <Form>
                <div style={{margin:"10px 0"}}>
                <p>Your number should be in an international format </p>
           <p>If more than one, Comma Separate your numbers</p>
                    </div>
         
            <label htmlFor="phone">Phone Number</label>
            <Input type = "text" name="phone" id="phone" value={phoneValue}
            onChange={e=>setPhoneValue(e.target.value)}/>
            </Form>
            <Form>
            <label htmlFor="msg">Message</label>
                <TextArea name="msg" value={msgValue} id="msg" onChange={e => setMsgValue(e.target.value)}
                />
            
            </Form>
            <MessageDiv>
            <Form>
            <label htmlFor="scheduleMsg">Schedule</label>              
            <input type="datetime-local" name="scheduleMsg" id="scheduleMsg" value={scheduleValue} onChange={e => setScheduleValue(e.target.value)}/>
            
            </Form>
            <Form>
            <label htmlFor="recur">Recurrence </label>
            <select name="recur" id="recur" value={recurValue} onChange={e => setRecurValue(e.target.value)}> Recurrence
            <option selected>Select Recurrence</option>
            <option>72 hours</option>
            <option>1 week</option>
            <option>1 month</option>
        </select>
        
        </Form>
 </MessageDiv>
 <MessageDiv>
        <Button onClick={onClickHandler}>Send Message</Button>
                
        <Button onClick={saveDraft}>Save as Draft</Button>
        <Button onClick={saveTemplate}>Save as Template</Button>
        </MessageDiv>
        </form>
            }
            

        </InputDiv>
            <div>
            <SelectedHeading border={underlined} onClick={selectedOption1}>Import Details</SelectedHeading>
            {(selected === 1) &&
            <Upload/>
           

            }
            </div>
        

        </MessageDiv>
    )
}