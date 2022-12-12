import React, { useState,createContext,useEffect } from 'react';
import Axios from 'axios'
import Loader from "react-loader-spinner";
import styled from 'styled-components'
import { Container } from '../components/styles';



const AuthContext = createContext({})


export const AuthProvider = props => {
    const [loggedIn,setLoggedIn] = useState(false)
    const [user,setUser] = useState({})
    const [role,setRole] = useState('')
    const [loaded,setLoaded] = useState(false)


    
   
   

    // useEffect(()=>{
    //     (async ()=>{

    //         const response = await Axios.get("/users")   
    //         const userObject = response.data   
    //         setUser(userObject)
    //         setLoaded(true)
                     

    //     })()

    // },[user])

    const login= async()=>{
        const response = await Axios.get(`/users`)   
        const userObject = response.data   
        setUser(userObject)
        setLoaded(true)

        setLoggedIn(true)
       
        localStorage.setItem('user', JSON.stringify(user));

         }


    const signout= async()=>{
    setLoggedIn(false)
    localStorage.removeItem('user');
        }




return( 
    <div>
         <AuthContext.Provider value ={{login,user,signout,role,loggedIn}}>
        {props.children}
        </AuthContext.Provider>
        {/* {!loaded ? <LoaderContainer>
           
                
            <Loader
        type="TailSpin"
        color="#646CD9"
        height={300}
        width={300}
       
         //3 secs
      />
      
        </LoaderContainer> : 
        <AuthContext.Provider value ={{login,user,signout,role,loggedIn}}>
        {props.children}
        </AuthContext.Provider>
        } */}
    </div>

    )
}

export const useAuth = () => React.useContext(AuthContext)




