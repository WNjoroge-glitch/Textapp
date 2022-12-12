import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import { SideBar,Ul,Links,List,Button,MenuItems } from './styles';
import {AiOutlineDashboard,AiOutlineInbox} from 'react-icons/ai'
import {RiNumbersLine} from 'react-icons/ri'
import {GrTemplate} from 'react-icons/gr'
import {TiContacts} from 'react-icons/ti'
import styled from 'styled-components';

const Footer = styled.div`
position: sticky;
left: 0;
bottom:0;
width: 100%;
//text-align:center;
font-size:12px;
`

const Header = styled.div`
display:flex;
justify-content:center;
align-items:center;
font-size:15px;
color:#ffffff;


`





function Sidebar (){

const iconStyles = {
    fontSize:"2rem",
    marginInline:"20px",
    textAlign:"center"
    
}





return(
    <SideBar>
      
      <Header>
          
            
          <img src="/logo.png" alt="logo" style={{maxWidth:"100%",width:"40%",marginTop:"20px"}}/>
          <h2>Bulk Text App</h2>
          
    </Header>
       
        
            <Ul>
                
                <List>
                   
                    <MenuItems to ="/" exact={true}><span style={iconStyles}><AiOutlineDashboard/></span>Home</MenuItems>
                    
              </List>
              <List>
                <MenuItems to ="/drafts"><span style={iconStyles}><AiOutlineInbox/></span>Drafts</MenuItems>
            </List>
            <List>
                <MenuItems to ="/template"><span style={iconStyles}><GrTemplate/></span>Template</MenuItems>
            </List>
            <List>
                <MenuItems to ="/contacts"><span style={iconStyles}><TiContacts/></span>Contacts</MenuItems>
            </List>
            <List>
                <MenuItems to ="/report"><span style={iconStyles}><RiNumbersLine/></span>Reports</MenuItems>
            </List>
            
            
           
           
           
                   
           

            
  
   
          
            {/* <Button style={{margin:"10px 100px"}}><Links href="https://wa.me/752490444" target="_blank"> Contact Us </Links></Button> */}
          
          
            
        </Ul>
        <Footer>
    <p>&copy; 2022 Afritonics Systems, Implemented by 
    <a href="https://dasymanalytics.com" target="_blank"> Dasym
    Analytics LTD </a></p>
    </Footer>
       
    </SideBar>
   
)
}
export default Sidebar



