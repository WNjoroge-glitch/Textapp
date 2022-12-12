import React from 'react';
import styled from 'styled-components'
import {FcCheckmark} from 'react-icons/fc'

import {AiOutlineClose,AiFillFileText} from 'react-icons/ai'

const Bar = styled.div`
margin-top:20px;
background-color: #ECEDFA;
display:flex;
flex-direction:column;
justify-content:center;

width:700px;
align-items:center;
box-shadow:  7px 7px 36px #acadb7,
             -7px -7px 36px #ffffff;

progress{
    appearance:none;

}
progress[value]{
    width:500px;
}
progress[value]::-webkit-progress-bar {
    height:10px;
    border-radius:10px;
    background-color:#ECEDFA;


}
progress[value]::-webkit-progress-value {
    height:10px;
    border-radius:10px;
    background-color:#646CD9;
}
`

const Progress = styled.div`
display:flex;
align-items:center;

justify-content:space-between;
width:100%;
`

const Percentage = styled.p`
width:100%;

display:flex;
justify-content:flex-end;
`
const Icon = {
    fontSize:"2rem",

}


export const ProgressBar = ({max,value,cancelUpload,file}) =>{
   
    
    return (
        <Bar>
            <div>
            <p>{file}</p>
            </div>
            
            <div style={{width:"100%"}}>
            <Progress>
                <div>
                <AiFillFileText style={Icon}/>
                </div>
                
            <progress max={max} value={value}/>

 {
     value == '100' ? <FcCheckmark style={Icon}/> : <AiOutlineClose style={Icon} onClick={()=>cancelUpload()}/>
 }
 
            </Progress>
        <Percentage>
           
            {(Math.floor(value/max) * 100)}%
            </Percentage>
               
            
            </div>
 
        </Bar>
       
    )
}