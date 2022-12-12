import React,{useState} from 'react'
import { Container, InputDiv,TextArea,Form,Input,MessageDiv,Button } from '../components/styles'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import Axios from 'axios'
import {api} from '../utils/api'

function Whatsapp() {
    const[file,setFile] = useState('')
    const[date,setDate] = useState(new Date())
    const [selected,setSelected] = useState(0)
    const [phoneValue,setPhoneValue] = useState('')
const [msgValue,setMsgValue] = useState('')
const [recurValue,setRecurValue] = useState('')
const [scheduleValue,setScheduleValue] = useState(new Date())
    const sendWhatsappMessage = async (e) =>{
        e.preventDefault()
        
        const response = await Axios.post(`/whatsapp`,{
            contacts:phoneValue,
            message:msgValue,
            recur:recurValue,
            date:scheduleValue
        
        
        })
        window.location.reload()
        }
    const [recur,setRecur] = useState('')
    return (
        <Container>
            <Sidebar/>
            <div>
                <div>
                    <SearchBar/>
                </div>
               <MessageDiv>
                     
               
               <InputDiv>
               <h1 onClick={() => setSelected(0)}>input details</h1>
               {selected === 0 &&
                <form>
                <Form>
                <p>Your number should be in an international format </p>
                <p>Comma-Separate your numbers</p>
                 <label htmlFor="phone">Phone Number</label>
                 <Input type = "text" name="phone" id="phone" value={phoneValue}
                 onChange={e=>setPhoneValue(e.target.value)}/>
                 </Form>
                 <Form>
                 <label htmlFor="msg">Message</label>
                 <p>Paste your template-approved message here</p>
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
      <Button onClick={sendWhatsappMessage}>Send Message</Button>
                </form>
               }
              
               </InputDiv>
               <div>
               <h1 onClick={() => setSelected(1)}>Upload Contacts</h1>
              
                 {(selected === 1) &&
                 
           
           <form>
           <Form>
           <label for="file"></label>
           <Input type="file" name="file" accept=".csv" onChange={e => setFile(e.target.files[0])}></Input>
           </Form>
           <Form>
                <label htmlFor="msg">Message</label>
                <p>Paste your template-approved message here</p>
                    <TextArea name="msg" value={msgValue} id="msg" onChange={e => setMsgValue(e.target.value)}
                    />
                
                </Form>
           <MessageDiv>
           <Form>
           <label for="date">Schedule</label>
           <input type="datetime-local" name="date" onChange={e => setDate(e.target.value)}/>
           </Form>
           <Form>
           <label for="recur">Recurrence</label>
           <select name="recur" id="recur" value={recur} onChange={e => setRecur(e.target.value)}> Recurrence
               <option selected>Select Recurrence</option>
               <option>72 hours</option>
               <option>1 week</option>
               <option>1 month</option>
           </select>
           </Form>
           </MessageDiv>
          
          
           <Button style={{margin:"0 10px"}}>Send</Button>
           <Button style={{margin:"0 10px"}}>Save as Draft</Button>
           </form>

            }
               
               </div>
          

           
           
       

               </MessageDiv>
            </div>
           
            
        </Container>
    )
}

export default Whatsapp
