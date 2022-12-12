import React,{useState} from 'react'
import Axios from 'axios'
import {Form,Input,MessageDiv,Button} from './styles'
import { useAuth } from '../context/AuthContext'
import {toast} from 'react-toastify'

export const Upload = () => {
    const {user} = useAuth()
   const[file,setFile] = useState('')
   const[date,setDate] = useState(new Date())
   const [message,setMessage] = useState('')
   const [recur,setRecur] = useState('')


   const submitFile = async(e) =>{
    e.preventDefault()
   
    setFile('')
    setMessage('')
    setDate('')
    setRecur('')
    try{
        const data = new FormData()
        data.append("file",file)
        data.append("message",message)
        data.append("date",date)
        data.append("recur",recur)

        const response = await Axios.post(`/contacts/upload`,data)
        
        toast.success(`${ response.data}`)
    } catch(error){
        if(error.response){
            toast.error(`${error.response.data.message}`)
        } else {
            toast.error(`${error.message}`)
        }
      
        
        
    }
    }

    const saveDraft =async(e) =>{
        e.preventDefault()
        try{
            const data = new FormData()
            data.append("file",file)
            data.append("message",message)
            data.append("date",date)
            data.append("recur",recur)
            const response = await Axios.post(`/drafts/upload/${user._id}`,data)
             
            toast.success(`${response.data}`)
        } catch(error){
          
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
        }


    }


    return (
        <div>  
          

           
            <form>
            <Form>
            <label for="file"></label>
            <Input type="file" name="file" accept=".csv" onChange={e => setFile(e.target.files[0])}></Input>
            </Form>
            <Form>
            <label for="message">Write Message</label>
            <Input type="text" name ="message" onChange={e => setMessage(e.target.value)} placeholder="Message here"/>
            </Form>
            <MessageDiv>
            <Form>
            <label for="date">Schedule</label>
            <input type="datetime-local" name="date" onChange={e => setDate(e.target.value)}/>
            </Form>
            <Form>
            <label for="recur">Recurrence</label>
            <select name="recur" id="recur" value={recur} onChange={e => setRecur(e.target.value)}> Recurrence
                <option defaultValue="Select Recurrence">Select Recurrence</option>
                <option>72 hours</option>
                <option>1 week</option>
                <option>1 month</option>
            </select>
            </Form>
            </MessageDiv>
           
            <Button style={{margin:"0 10px"}} onClick={submitFile}>Send Message</Button>
            
            <Button style={{margin:"0 10px"}} onClick={saveDraft}>Save as Draft</Button>
            <Button style={{margin:"0 10px"}}>Save Template</Button>
           
            
           
           </form>

            
            
        </div>
    )
}