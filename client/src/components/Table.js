import React, { useState,useEffect } from 'react'
import MaterialTable from 'material-table'
import Axios from 'axios'
import {TableDiv} from './styles'


Axios.defaults.withCredentials = true


function Table(){
    const columns = [
        {title:"Phone Number" ,field:"phoneNumber",filtering:false},
        {title:"retryCount" ,field:"retryCount",filtering:false},
        {title:"Status" ,field:"Status"},
        {title:"failureReason" ,field:"failureReason"},
        {title:'date',field:"createdAt",type:'date',dateSetting:{format:'dd/MM/yyyy'}}
    ]
    const [reportData,setReportData] = useState([])

    useEffect(()=>{
        (async ()=>{
            const response = await Axios.get(`/report`)
            console.log(response)
            
           setReportData(response.data)
           
        })()


    },[])


    

    return(
        <TableDiv>
<MaterialTable columns={columns} data={reportData} 
style={{width:"80vw",border:"none",outline:"none",appearance:"none"}}
title='Messages status'
// actions={[
//     {icon:()=><linkButton to ="/report">SEE ALL</linkButton>,
//     isFreeAction:true
// }
// ]}
options={{
    filtering:true,pageSizeOptions:[,2,5,10,20,30,40,50,100],
    exportButton: true

}}
    />
    
        </TableDiv>
        
    )
}

export default Table