import React,{useState} from 'react';
import { SearchDiv,Bar } from './styles';

import { useAuth } from '../context/AuthContext';

import { User } from './User'
import { Modal } from './Modal/Modal';

import {GrAdd} from 'react-icons/gr'

function SearchBar (){
    
    const [profileInfo,setProfileInfo] = useState(false)
    const [modalState,setModalState] = useState(false)
    const today = new Date().toDateString()
    
    const {user} = useAuth()
    //const user = JSON.parse(localStorage.getItem('user'));
  
    

    const addIcon = {
        fontSize:"2rem",
        margin:"0 10px",
        cursor:"pointer"
        // position:"relative",
        // borderRadius: "50%",
        // textAlign:"center",
        // background: "#646CD9",
        // boxShadow: "inset 24px 24px 47px #4c52a5,inset -24px -24px 47px #7c86ff",
        // display:"block",
        // margin:"0 auto"
    }
    const userDisplay = {
        backgroundColor:"#F27171",
        width:"50px",
        height:"50px",
        borderRadius:"50%",
        position:"relative",
        cursor:"pointer",
        textAlign:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"2rem"
    }
 

    

     return (
        <SearchDiv>
            <div>
            {/* <Bar type="text" placeholder="Search"/> */}

           

            <h2>Welcome Back</h2>
            
            
            </div>
            <div>
            <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>          
            <GrAdd style={addIcon} onClick={()=>setModalState(!modalState)}/>
            <div style={userDisplay}>
            <p onClick={()=>setProfileInfo(!profileInfo)}>{user.name[0]}</p>
            
            </div>
            </div>
            {modalState && <Modal closeButton={()=>setModalState(false)}/>}
            </div>  
           
                
               
                {
                    profileInfo &&   <User/>
                }

            </div>
        </SearchDiv>
    )
}
export default SearchBar