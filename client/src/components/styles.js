import styled from 'styled-components';
import {Link,NavLink} from 'react-router-dom'


export const SideBar = styled.div`
background-color:#646CD9;
width:20%;
position:sticky;
top:0;
height:100%;
bottom:0;


`

export const Container = styled.div`
height:100vh;
overflow:auto;
width:100%;
display:flex; 
background-color:#ECEDFA;


`

export const Ul = styled.ul`
margin-top:1rem;
display:flex;
flex-direction:column;
//align-items:center;
//justify-content:space-around;
text:align:center;
height:100%;

width:100%;


`

export const Links=styled(Link)`
text-decoration:none;
display:inline-block;
width:100%;
color:#ECEDFA;
color:#000000;



`



export const SearchDiv = styled.div`
background-color:white;
height:10vh;
width:100%;
display:flex;
justify-content:space-between;
align-items:center;

`
export const Bar = styled.input`
background-color:#ECEDFA;
padding:1rem 4rem;
margin-left:20px;
border-radius:5px;
border:none;
position:relative;

`

export const SummaryDiv = styled.div`
display:flex;
justify-content:space-around;
margin-top:2rem;
`

export const SummaryBar = styled.div`
background-color:#ECEDFA;
height:200px;
width:200px;
border-radius: 21px;
box-shadow:  27px 27px 92px #c6c7d2,
             -27px -27px 92px #ffffff;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:20px 0;
`
export const SpanNumber = styled.span`
font-size:3rem;
font-style:italic;


`
export const MessageDiv = styled.div`
display:flex;
justify-content:space-around;
margin:20px;

width:100%;



`

export const InputDiv = styled.div`
display:flex;
flex-direction:column;
`

export const Form = styled.form`
display:flex;
flex-direction:column;
justify-content:space-between;
margin:20px 0;

`


export const Input = styled.input`
border:1px solid black;
outline:none;
appearance:none;
border-radius:5px;
padding:2rem 5rem;
margin:20px 20px 0;
background-color:transparent;
&:focus {
    background-color:#ECEDFA;
}
`
export const TextArea = styled.textarea`
border:1px solid black;
padding:2rem 10rem;
margin:20px 20px 0;
outline:none;
appearance:none;
border-radius:5px;
background-color:transparent;
`
export const Button = styled.button`
background-color:#22298D;
border:none;
border-radius:5px;
color:#ECEDFA;
padding:0.75rem;
cursor:pointer;
&:active{
    outline:#ECEDFA;
}

`

export const linkButton = styled(Link)`
background-color:#22298D;
border:none;
border-radius:5px;
color:#ECEDFA;
padding:0.75rem;
`

export const TableDiv = styled.div`
width:100%;
//min-height:100vh;

`

export const MenuItem = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex:1;
width:100%;


&:hover{
    background-color:#22298D;
    
}
`

export const List = styled.li`
list-style:none;
width:100%;
font-size:20px;

`

export const MenuItems = styled(NavLink)`
text-decoration:none;
display:block;
color:#000000;
padding:10px 0;
border-radius:5px;
margin:10px 0;
&:hover{
    background-color:#22298D;
}

&.active {
    background-color:#22298D ;
    
}
`

export const ImageDiv = styled.div`
flex-grow: 1;
flex-basis: 0;
min-width: 0;

`
export const SignInDiv = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:rgba(255, 255, 255, 0.17);
border: 1px solid rgba(209, 213, 219, 0);
backdrop-filter: blur(4px) saturate(86%);
border-radius: 5px;
flex-grow: 1;
flex-basis: 0;

position:relative;

`
export const SignInContainer = styled.div`
display:flex;
background-color:#646CD9;
min-height:100vh;
`
export const Circulars = styled.div`
width:200px;
height:200px;
background-color:#F27171;
border-radius:50%;
right:40%;
position:absolute;

filter: blur(100px);
`

export const CircularDiv = styled.div`
display:flex;
flex-direction:column;
height:80vh;
justify-content:space-between;
`
export const Footer = styled.div`
position: fixed;
left: 0;
bottom:25px;
width: 100%;
text-align:center;
font-size:1rem;



`
export const ContainerDiv = styled.div`
width:100%;
`

export const SearchBarHolder = styled.div`
width:100%;
`
