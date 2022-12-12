import React, { useState,useEffect } from 'react'
import SearchBar from './SearchBar'
import Table from './Table'
import Graph from './Graph'
import { SummaryBar,SummaryDiv,SpanNumber,Button } from './styles'
import Axios from 'axios'
import styled from 'styled-components'

const Heading = styled.h3`
text-align:center;
`




function Dashboard(){
    const [sentMessages,setSentMessages] = useState('')
    const [deliveredMessages,setDeliveredMessages] = useState('')
    const [failedMessages,setFailedMessages] = useState('')
    const [toggleChart,setToggleChart] = useState(true)
    
    const chartData = {
        labels: ['Sent','Delivered','Failed'],
        datasets: [
          {
            data: [sentMessages,deliveredMessages,failedMessages],
            backgroundColor: [
              "#646CD9",
              "#ECEDFA",
              "#F27171",
              
            ]
          }
        ]
      };

    useEffect(()=>{
        
            (async ()=>{
                const response = await Axios.get(`/report/daily`)
                let data = response.data
                
               setSentMessages(data.reduce((acc, cur) => cur.Status === "Sent" ? ++acc : acc, 0))  
               setDeliveredMessages(data.reduce((acc, cur) => cur.Status === "Success" ? ++acc : acc, 0)) 
               setFailedMessages(data.reduce((acc, cur) => cur.Status === "Failed" ? ++acc : acc, 0))             

              
    
            })()        
     },[])


    return(
        <div>
        <div>
            <SearchBar/>
           
        </div>
       
        <Button onClick={()=>setToggleChart(!toggleChart)}>
        
         { toggleChart ? "See Chart" : "See Text"}
        </Button>
        <Heading>Daily Messages Report</Heading>
       
        {
            toggleChart ? (<SummaryDiv>
     
            <SummaryBar>
          
                <SpanNumber>{sentMessages}</SpanNumber>
                
               <p>Sent Messages</p>
                
            </SummaryBar>
            <SummaryBar>
                <SpanNumber>{deliveredMessages}</SpanNumber>
               
                <p>Delivered Messages</p>
            </SummaryBar>
            <SummaryBar>
                <SpanNumber>{failedMessages}</SpanNumber>
            
                <p>Failed Messages</p>
            </SummaryBar>
          
            </SummaryDiv>) :(<Graph data={chartData}/>)
        }      
      
        <Table/>
        
        </div>
    )
}

export default Dashboard