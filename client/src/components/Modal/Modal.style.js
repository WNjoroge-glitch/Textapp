import styled from 'styled-components'


export const ModalDiv = styled.div`
background-color:#ECEDFA;
position:absolute;
top:80px;
right:0;
z-index:1000;
display:flex;
justify-content:center;
align-items:center;
border-radius:5px;
width:20%;

`

export const List = styled.div`
list-style:none;
margin:10px 0;
&:hover{
    border-bottom:1px solid #22298D;
}   
`

export const Button = styled.button`
appearance:none;
outline:none;
background:none;
border:none;
font-size:2rem;
position:absolute;
top:0;
right:0;

`

export const Ul = styled.ul`
margin:30px 0;
display:flex;
flex-direction:column;
justify-content:space-around;

`