import { Redirect,Route} from "react-router-dom";
import {useAuth} from '../context/AuthContext';



export const PrivateRoute = ({children,...rest}) => {
  
 
  const{loggedIn} = useAuth()
    return (
        <>
          
            <Route
              {...rest}
              render={({location}) =>{
                return loggedIn ? children
              
                
               
                : <Redirect to={{
                  pathname:'/signin',
                  state:{from:location}
                }}/>
              }            
                
              }
            />
         
        </>
      );
}