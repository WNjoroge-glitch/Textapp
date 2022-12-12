import React, { useState,useRef } from 'react';
import {Button,Container } from '../components/styles';
import Axios, { CancelToken,isCancel } from 'axios'
import Sidebar from '../components/Sidebar';
import {BiRadioCircle} from 'react-icons/bi'
import SearchBar from '../components/SearchBar';
import { ProgressBar } from '../components/ProgressBar';
import { AiOutlineUpload } from 'react-icons/ai'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import {useAuth} from '../context/AuthContext'



const UploadDiv = styled.div`
width:500px;
height:200px;
border:3px dotted #646CD9;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const Upload = styled.div`
margin:20px auto;
`

const Contact = styled.div`
display:flex;
justify-content:space-between;
height:80vh;
align-items:center;

`
const DownloadLink = styled.div`
display:flex;
justify-content:flex-end;
`

export const AddContact = () =>{
    const {user} = useAuth()
    const [fileName,setFileName] = useState("")
    const [uploadPercentage,setUploadPercentage] = useState(0)
  
    const cancelFileUpload = useRef(null)
    const fileUpload = useRef(null)
    const [contactFile,setContactFile] = useState('')

    
    const Link = {
        textDecoration:"none",
        color:"#ECEDFA",
        backgroundColor:"#22298D",
        border:"none",
        borderRadius:"5px",
        padding:"0.75rem",
        cursor:"pointer"
        }
    const Icon = {
        fontSize:"3rem"
    }

    const browseFiles = (e) =>{
        e.preventDefault()
        fileUpload.current.click()

    }
   
    const uploadFile = async(e) =>{
        e.preventDefault()
        

        try {
            const data = new FormData()
        data.append("contactFile",contactFile)
        data.append("fileName",fileName)
        const options = {

                onUploadProgress:(progressEvent) =>{
                    const { loaded,total } = progressEvent;
                    let percent = Math.floor(((loaded / 1000) * 100) / (total / 1000))

                    setUploadPercentage(percent)
            
                },
                cancelToken : new CancelToken( cancel => cancelFileUpload.current = cancel)
            }
            const response = await Axios.post(`/contacts/save/${user._id}`,data,options)
            console.log(response)
            setUploadPercentage(100)
            setTimeout(() => {
                setUploadPercentage(0);
            }, 10000);
        } catch (err) {
            if(isCancel(err)){
                
               toast.info('Upload Cancelled')

               
                setUploadPercentage(0)
            }
            
        }

      
        
        
        }

        const cancelUpload = () =>{
            if(cancelFileUpload.current){
                cancelFileUpload.current('user has cancelled the request')
            }
           
            
        }

    
    const contactDiv = {
        fontSize:"1.25rem",
        lineHeight:"3"
        

    }
    return(
        <Container>
            <Sidebar/>
            <div>
            <div>
                <SearchBar/>
                <DownloadLink>

    <a href="/Contacts Sample File - Sheet1.csv" style={Link} download>Download sample  File</a>
       
           
                </DownloadLink>
            </div>
            <Contact>
            <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
                <div style={contactDiv}>
                <h1 style={{textAlign:"center"}}>Import Contacts</h1>

                <p><span><BiRadioCircle/></span>Your file should be in CSV format</p>
                <p><span><BiRadioCircle/></span>Your fields should be written as such : Name, PhoneNumber</p>
                <p>Your data will not be processed accordignly if these are not followed</p>
                    </div>
                    <div style={{marginLeft:"50px"}}>
    
      
                <UploadDiv>
        <AiOutlineUpload style={Icon}/>
                <input type="file" 
                style={{display:"none"}} 
                ref={fileUpload} 
                onChange={(e)=>setContactFile(e.target.files[0])}
                accept='csv/*'
                />
        <Button onClick={browseFiles}>Browse files</Button>
        </UploadDiv>

        

        
        <Upload>
        <Button onClick={uploadFile}>Upload File</Button>
        </Upload>
        
        
        <div>
            
            
     
        {
            uploadPercentage > 0 && <ProgressBar max='100' value={uploadPercentage} cancelUpload={cancelUpload} file={contactFile.name}/>
        }
       
        </div>
        </div>
       
       
      
        </div>
       
        </Contact>
        </div>
        </Container>
    )
}