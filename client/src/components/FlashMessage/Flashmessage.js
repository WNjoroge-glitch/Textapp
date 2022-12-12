import React,{useState} from 'react';
import {Flash,ErrorMessage} from './flashMessageStyle'
import {MdErrorOutline,MdClose,MdOutlineCheckCircleOutline} from 'react-icons/md'

export const Flashmessage = () =>{
    
}

// export const Flashmessage = ({message,type}) =>{
//     const [hide,setHidden] = useState(true)
//     const errorIconStyle = {
//         position:'absolute',
//         fontSize:'2rem',
//         left:0,
//         bottom:'20%',
//         color:'#FF0033'
//     }

    
//     return(
        
//             <Flash>
           
            
//             <p>{type}</p>
//             <div>
//                 {/* {type === 'Error' ? <MdErrorOutline style={errorIconStyle}/> : <MdOutlineCheckCircleOutline/>} */}
            
//             {message}
//             </div>

            
           
//             {/* <MdClose onClick={()=>setHidden(false)}/> */}
//         </Flash>
       
        
       
        
//     )
// }