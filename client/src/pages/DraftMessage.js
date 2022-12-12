import React, { useEffect, useState } from 'react'
import { useParams,useLocation,useHistory} from 'react-router'
import {Container,Button,MessageDiv,InputDiv,Form,Input,TextArea} from '../components/styles'
import Sidebar from '../components/Sidebar'
import Axios from 'axios'
import {toast } from 'react-toastify';

import SearchBar from '../components/SearchBar'


toast.configure()
export const DraftMessage = () =>{
    
    const {id} = useParams()
    const location = useLocation()
    const history = useHistory()
    const pathname = location.state.from
    const state = location.state.user  
    
    const [file,setFile] = useState('')

   
    const [draft,setDraft] = useState({})
    const [msg,setMsg] = useState('')
    const [phone,setPhone] = useState('')
    const [schedule,setSchedule] = useState('')
    const [recur,setRecur] = useState('')
    const [csv,setCsv] = useState(false)
    
   
    

   useEffect(()=>{
       if(state.contact){
        if(state.contact.endsWith('csv')){
            setCsv(true)
           
        }
       }
     

   },[])

    useEffect(()=>{
      (async ()=>{
            const response = await Axios.get(`/drafts/send/${id}`)
            if(pathname === '/drafts'){
                setDraft(response.data)
                setMsg(state.Message)
                
                setPhone(state.contact)
                setSchedule(state.sendDate)
                setRecur(state.recur)
               

            } else {
                setMsg(state.Message)
            }          
      
           
        })()

    },[id])



    const sendDraft = async(e) =>{
        
        e.preventDefault()
        setPhone('')
        setMsg('')
        setSchedule('')
        setRecur('')
        try {
            const data = new FormData()
            data.append('file',file)
            data.append('contact',phone)
            data.append('message',msg)
            data.append('date',schedule)
            data.append('recur',recur)
            data.append('id',id)
            const sentDraft = await Axios.post(`/drafts/send`,data)
           
          
            toast.success(`${sendDraft.data}`)
            pathname === '/drafts' ? history.push('/drafts') : history.push('/template')
            
        } catch (error) {
            
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
        }
        }
   
    return(
        <Container>
            <Sidebar/>
            <div>
                <div>
                    <SearchBar/>
                </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                
             
        <InputDiv>
        
        {
            state && 
            <form>
            <Form>
           
            <label for="phone">Phone Number</label>
            {
                csv ? <Input type = "file" name="file" id="file" onChange={e => setFile(e.target.files[0])}
                /> :
            <Input type = "text" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)}
            />
            }
           
            
           
        
           
            </Form>
            <Form>
            <label for="msg">Message</label>
                <TextArea name="msg" id="msg" value={msg} onChange={e => setMsg(e.target.value)}
                />
            
            </Form>
            <MessageDiv>
            <Form>
            <label for="scheduleMsg">Schedule</label>              
            <input type="datetime-local" name="scheduleMsg" id="scheduleMsg" value={schedule} onChange={e => setSchedule(e.target.value)}/>
            
            </Form>
            <Form>
            <label for="recur">Recurrence </label>
            <select name="recur" id="recur" value={recur} onChange={e => setRecur(e.target.value)}> Recurrence
            <option selected>Select Recurrence</option>
            <option>72 hours</option>
            <option>1 week</option>
            <option>1 month</option>
        </select>
        
        </Form>
 </MessageDiv>
 <MessageDiv>
        <Button onClick={sendDraft}>Send Message</Button>
       
        
        </MessageDiv>
        </form>
        }
            
          
           

        </InputDiv>
                  

        </div>
        </div>
        </Container>
    )
}