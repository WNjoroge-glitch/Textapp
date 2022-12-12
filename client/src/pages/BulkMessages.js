import React,{useState} from 'react';
import { Container,Button,Form,Input } from '../components/styles';
import Sidebar from '../components/Sidebar'
import Axios from 'axios';
import SearchBar from '../components/SearchBar';
import { BiRadioCircle } from 'react-icons/bi';
import styled from 'styled-components'
import { toast } from 'react-toastify';


const DownloadLink = styled.div`
display:flex;

justify-content:flex-end;
`


export default function BulkMessages() {
    const [bulkMessage,setBulkMessage] = useState('')
    const sendBulkMessage = async(e) =>{
        e.preventDefault()
        try {
            const data = new FormData()
       
            data.append("invoice",bulkMessage)
            const response = await Axios.post(`/invoice`,data)
           
            toast.success(`${response.data}`)
        } catch (error) {
          
            if(error.response){
                toast.error(`${error.response.data.message}`)
            } else {
                toast.error(`${error.message}`)
            }
        }
       

    }
    const contactDiv = {
        fontSize:"1.25rem",
        lineHeight:"3"
        

    }
    const Link = {
        textDecoration:"none",
        color:"#ECEDFA",
        backgroundColor:"#22298D",
        border:"none",
        borderRadius:"5px",
        padding:"0.75rem",
        cursor:"pointer"
        }
    return (
        <Container>
            <Sidebar/>
            <div>
                <div>
                    {/* <h1 style={{border:'1px solid black'}}>Hello Doe</h1> */}
<SearchBar/>
<DownloadLink>

    <a href="/Bulk Message Sample File - Sheet1.csv" style={Link} download>Download sample  File</a>
       
           
                </DownloadLink>

                </div>
                <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%",height:"100%"}}>
               
                    <div style={contactDiv} >
                <h4>Bulk import your messages and send them in a click</h4>
                <p><span><BiRadioCircle/></span>Your file should be in CSV format</p>
                <p><span><BiRadioCircle/></span>Your fields should be written as such
                <li>Name</li>
                <li>phoneNumber</li>
                <li>Message</li>
                <li>Reccurence.<span>Specify how many times you want your messages to run e.g:3 days</span></li>
                <li>DateSchedule.<span>Schedule when you want your messages to be sent using this format YYYY-mm-ddTHH:MM:ss</span></li>
                
                </p>
                </div>
                <form>
                    <Form>
                    <Input type="file" onChange={e=>setBulkMessage(e.target.files[0])}/>
                    </Form>
               
            
            <Button onClick={sendBulkMessage}>Send Messages</Button>
            </form>
          
                </div>

            </div>
           
        </Container>
    )
}
