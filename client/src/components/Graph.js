import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend);




function Graph ({data}){

    return(
       <div style={{width:"350px",margin:"0 auto"}}>
        <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Message Status"
            },
            legend: {
              display: true,
              position: "top"
           }
          }
        }}
        />
        </div>
    )
}

export default Graph