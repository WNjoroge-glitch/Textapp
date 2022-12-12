import React,{useState,useEffect} from 'react'
import { Container,ContainerDiv,SearchBarHolder} from '../components/styles'
import Sidebar from '../components/Sidebar'
import Axios from 'axios'
import SearchBar from '../components/SearchBar'
import ListItem from '../components/ListItem';
import { NotFound } from '../components/NotFound'
import { useAuth } from '../context/AuthContext';





export const Template = () =>{
    
    const {user} = useAuth()
    
    const [templates,setTemplates] = useState([])
    
   

    useEffect(() => {
        (async() =>{
            try {
                const response = await Axios.get(`/template/${user._id}`)
                
                setTemplates(response.data)
            } catch (error) {
                console.log(error)
            }          
            
        })()        
    }, [])
    const deleteTemplate = async(id) =>{
        const deletedTemplate = await Axios.post(`/template/delete/${id}`)
        const updatedTemplates = templates.filter((template)=>template._id !== deletedTemplate.data._id)
       setTemplates(updatedTemplates)
       
    }

    

  
   


    return (
        <Container>
            <Sidebar/>
            <ContainerDiv>
                <SearchBarHolder>
                    <SearchBar/>
                    </SearchBarHolder>
                    {
                        templates.length ?  <div>
                        {
                          templates.map((template,index)=>{
                            return (
                              <ListItem item={template} index={index} deleteFunction={deleteTemplate}/>
                            )
                          })
                            
                        }
                 
                       
                    </div> : <NotFound message="templates" addItem="write-message"/>
                    }
                   
            </ContainerDiv>

        </Container>

    )
}