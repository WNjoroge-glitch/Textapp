import React from 'react';
import { Container,tableDiv } from '../components/styles';
import Sidebar from '../components/Sidebar'; 
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';


export const Report = () =>{
    return (
        <Container>
<Sidebar/>
<div>
    <div>
    <SearchBar/>
    </div>
    <tableDiv>
<Table/>
</tableDiv>
    </div>

        </Container>

    )
}