import React,{useEffect} from 'react';
import GlobalStyle from './GlobalStyles';
import { RoutePath } from './RoutePath';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';



export const App = () => {
  
  useEffect(()=>{
   
   
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
   
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/620491c89bd1f31184dbdca9/1frgtiv09';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
   
   
  },[])
  return (
    
    <div className="App">
      <GlobalStyle />
      <AuthProvider>
      <RoutePath/>
      <ToastContainer/>
      </AuthProvider>
   </div>
   
  );
}

