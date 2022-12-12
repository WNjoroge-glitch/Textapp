import React, { useEffect,useState } from 'react';
import { Container,ContainerDiv,SearchBarHolder} from '../components/styles';
import Sidebar from '../components/Sidebar';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { NotFound } from '../components/NotFound';
import SearchBar from '../components/SearchBar';
import { useLocation } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { useAuth } from '../context/AuthContext';
import { update } from 'lodash';



export const Draft = () =>{
    const [draft,setDraft] = useState([])
    const location = useLocation()
   
    
    const {user} = useAuth()
   
    
    useEffect(()=>{
        (async ()=>{
            const response = await Axios.get(`/drafts/${user._id}`)
            setDraft(response.data)
           
        })()

    },[])
    const deleteTemplate = async(id) =>{
        const deletedTemplate = await Axios.post(`/template/delete/${id}`)
       
       
    }
    const deleteDraft = async(id) =>{
        try{
            const deletedDraft = await Axios.post(`/drafts/delete/${id}`)
       
            const updatedDraft = draft.filter((draft)=> draft._id !== deletedDraft.data._id )
            setDraft(updatedDraft)
        } catch(error){
            console.log(error.messsage)
        }
        
       
    }
    const deleteFunction = (id) =>{
        location.pathname === '/drafts' ?
      deleteDraft(id)
        
        :
       deleteTemplate(id)
        

    }
    
    return(
     <Container>
    <Sidebar/>
    <ContainerDiv>
    <SearchBarHolder>
    <SearchBar/>
    
    </SearchBarHolder>

    {
        draft.length ?   <div style={{width:"100%"}}>
      
        {
            draft.map((draft,index)=>{
                return (
                    <ListItem key={index} item = {draft} deleteFunction = {deleteDraft}/>
                )
            })

        }
    </div> : <NotFound message="draft" addItem='write-message'/>
   
    }
 </ContainerDiv>

    </Container>
    )
}