import styled from 'styled-components'


export const List = styled.li`
list-style:none;
`

export const DivList = styled.div`
width:80%;
display:flex;
justify-content:space-between;
align-items:center;
border-radius: 5px;
background: #ECEDFA;
height:50px;
margin:1.5px 0;

box-shadow:  7px 7px 36px #acadb7,
             -7px -7px 36px #ffffff;
`

export const Button = styled.button`
background-color: #ECEDFA;
box-shadow:  7px 7px 36px #acadb7,
             -7px -7px 36px #ffffff;
border:none;
padding:10px 20px;
border-radius:5px;

`

export const Input = styled.input`
background-color: #ECEDFA;
box-shadow:  7px 7px 36px #acadb7,
             -7px -7px 36px #ffffff;
border:none;
padding:15px 25px;
border-radius:5px;
outline:none;
`

export const Form = styled.div`
display:flex;

align-items:center;
margin:20px 20px;
`
export const Uldiv = styled.div`
display:flex;
height:80vh;
align-items:center;
margin-left:0;
font-size:2rem;


`
export const ProfileDiv = styled.div`
display:flex;
justify-content:space-between;

`

export const ProfileOption = styled.div`
margin:20px 20px 20px 10px;
cursor:pointer;
display:flex;


&:hover{
    background-color:#646CD9;
    
}
`
export const PasswordInput = styled.input`
background-color: #ECEDFA;
box-shadow:  7px 7px 36px #acadb7,
             -7px -7px 36px #ffffff;
border:none;
padding:1rem 0;
width:20rem;
border-radius:5px;
outline:none;
margin:10px 10px;

`

export const PasswordDiv = styled.div`
display:flex;
align-items:center;
justify-self:flex-start;
width:100%;
height:100%;


`