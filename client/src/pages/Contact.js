import React, {useState,useEffect } from 'react';
import { Container,Button,ContainerDiv,SearchBarHolder } from '../components/styles';
import Sidebar from '../components/Sidebar'; 
import Axios from 'axios';
import MaterialTable from 'material-table';
import SearchBar from '../components/SearchBar';
import {NotFound} from '../components/NotFound';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';



const Links=styled(Link)`
text-decoration:none;
display:inline-block;
width:100%;
color:#ECEDFA;


`



export const Contact = () =>{
    const selectedRowIds = []
    const columns = [
        {title:"Name",field:"Name"},
        {title:"Phone Number",field:"phoneNumber"},
        {title:'id',field:'id',hidden:'true'}
   
    ]
    const [contacts,setContacts] = useState([])
    const [rowData,setRowData] = useState([])   
    
    const tableStyles = {
        width:"80vw",
        border:"none",
        outline:"none",
        appearance:"none"
    }

    useEffect(()=>{
        (async () =>{
            const response = await Axios.get(`/contacts/upload`)
            if(response.data){
                let contact = response.data
                
               
                let contacts=contact.map(function(ele){
       
                    return {...ele.contact,id:ele._id};
                  })
                //const contacts = contact.reduce((r, obj) => r.concat(obj.contact), []);
                setContacts(contacts)
                }
            
        }) ()

    },[])
    return(
<Container>
        <Sidebar/>
        <div>
            <SearchBar/>
            
           {
               contacts.length ? 
               
               <MaterialTable columns={columns} data={contacts} title='Contacts' 
               style={tableStyles}
       
       
               onSelectionChange ={(data)=>setRowData(data)}
               options={{
                   selection:true,
                   search:true
               }}
               actions={[
                   {icon:()=><Button>
                       <Links to={{ pathname: '/write-message', state: {contactsData: rowData }}}> Write Message 
                       </Links
                       ></Button>
                       },
                       rowData =>({
                           icon:'delete',
                           tooltip:"Delete contact",
                           onClick:async(event,row)=> { 
                          
                        
                             const ids = row.map((row)=>{
                                 return row.id
                             })
                             
                            const deletedRow = await Axios.post(`/contacts/delete/${ids}`)
                            const updatedContacts = contacts.filter((contact)=>!row.includes(contact))
                            setContacts(updatedContacts)
                           }
                       })
                       
                     
               ]}
               /> :  <NotFound message="contacts" link="add-contact"/>
           }
       
        
        
        
       
        </div>
       
    </Container>
    )
    
}