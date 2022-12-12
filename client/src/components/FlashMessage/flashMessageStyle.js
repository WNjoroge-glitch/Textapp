import styled, { keyframes } from 'styled-components'


const FlashAnimation = keyframes`
to {
    visibility: hidden;
    width: 0;
    height: 0;
  }


`
export const Flash = styled.div`
width:40rem;
height:50px;
background-color:#FFFFFF;
color:000000;
border-radius:5px;
border:1px solid white;
border-left:5px solid #FF0033;
position:relative;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
position:absolute;
top:10px;
font-size:1rem;
text-align:center;
animation:${FlashAnimation} 1s linear 5s 1 forwards;
// animation-name:${FlashAnimation};
// animation-duration:0s;
// animation-delay:5s;
// animation-iteration-count:1;


// animation: flash,1s,linear,5s,1,forwards};
//animation-timing-function:linear;



`
export const ErrorMessage = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width:100%;
`

