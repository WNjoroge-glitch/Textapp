import React from 'react'
import Sidebar from '../components/Sidebar';
import { Container } from '../components/styles';
import {Text} from '../components/Text';
import SearchBar from '../components/SearchBar'

export const Message = () =>{
   
    return(
        <Container>
            <Sidebar/>
            <div style={{width:'100%'}}>
                <SearchBar/>
                <Text/>
            </div>

            
        </Container>
    )
}

