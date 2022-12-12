import React from 'react'
import { ModalDiv,List,Button,Ul } from './Modal.style'
import {Links} from '../styles'
import {GrClose} from 'react-icons/gr'

export const Modal = ({closeButton}) =>{
   
    return(
        
        <ModalDiv>
       
        <Button onClick={closeButton}><GrClose/></Button>
        <Ul>
        <List><Links to = "/send-sms"> Send SMS </Links></List>
        <List><Links to = "/send-whatsapp"> Send WhatsApp </Links></List>
        <List><Links to = "/add-contact"> Add Contact </Links></List>
        <List><Links to = "/write-message"> Add Template </Links></List>
        <List><Links to = "/write-message">Add Draft</Links></List>
        <List><Links to = "/import-messages">Bulk Import Messages</Links></List>
        
        </Ul>
        </ModalDiv>
        
    )
}