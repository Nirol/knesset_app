import React, {  useState, useEffect} from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';














const formatter = (value) => `${value}%`;

  function  VP_AvgBZB  (props)  {
    const [chartDataInput, setChartDataInput] = useState(props.chartRawData);
    const [chartData, setChartData] = useState(null);
  




const buildChartData = (data) => {
  let ans = [] 
  const jsonObject=JSON.parse(data);

  jsonObject.elections.map(row => {
    let temp = {}
    temp.name = row.knesset_num
    temp.Avereage_BZB = row.Avg_BZB
    temp.Vote_Percent = row.vote_percent
    ans.push(temp) 
  })
  console.log(ans);
  return ans;
}


useEffect(() => {
  let chartDataReady = []
  chartDataReady = buildChartData(chartDataInput);
  setChartData(chartDataReady);



}, []);






    return (

      <div>
      <LineChart
        width={580}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 70, left: 90, bottom: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis label={{ value: "בחירות לכנסת", position: 'insideBottom', offset: -15 }} dataKey="name"  />
        <YAxis yAxisId="left" tickFormatter={formatter} label={{ value: 'אחוז הצבעה', position: 'insideLeft', offset: -65 }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'ממוצע בז"ב', position: 'insideRight', offset: -55 }} />
        <Tooltip />
     
        <Line name="אחוז הצבעה" yAxisId="left" type="monotone"  dataKey="Vote_Percent" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line name="ממוצע בעלי זכות בחירה" yAxisId="right" type="monotone" dataKey="Avereage_BZB" stroke="#82ca9d" legendType="diamond" activeDot={{ r: 8 }}/>
      </LineChart>


  
  
    
      </div>

    );
  
}



export default VP_AvgBZB;
