import React, {  useState, useEffect} from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';



import {AxisLabel} from './AxisDesign'














  function  VP_AvgBZB  (props)  {
    const [chartDataInput] = useState(props.chartRawData);
    const [chartData, setChartData] = useState(null);
  






useEffect(() => {
  const buildChartData = (data) => {
  
    console.log(data)

    //let ans = [] 
  
  
     let ans = data.elections.map(row => {
      let temp = {};
      temp.name = row.knesset_num;
      temp.Avereage_BZB = row.Avg_BZB;
      temp.Vote_Percent = row.vote_percent;
      //ans.push(temp) 
      return temp;
    })
  
    return ans;
  };
  
  let chartDataReady = []
  chartDataReady = buildChartData(chartDataInput);
  setChartData(chartDataReady);
}, [chartDataInput]);





const formatter = (value) => `${value}%`;
    return (

      <div>
      <LineChart
        width={580}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 15, left: 15, bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis label={{ value: "בחירות לכנסת", position: 'insideBottom', offset: -15 }} dataKey="name"  />
        <YAxis yAxisId="left" tickFormatter={formatter} label={<AxisLabel axisType='yAxis'  x={25} y={135} width={0} height={0}>אחוז הצבעה </AxisLabel>} />
        <YAxis yAxisId="right" orientation="right" label={<AxisLabel axisType='yAxis'  x={560} y={135} width={0} height={0}>ממוצע בז"ב לקלפי</AxisLabel>}/>
        <Tooltip />
     
        <Line name="אחוז הצבעה" yAxisId="left" type="monotone"  dataKey="Vote_Percent" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line name="ממוצע בעלי זכות בחירה" yAxisId="right" type="monotone" dataKey="Avereage_BZB" stroke="#82ca9d" legendType="diamond" activeDot={{ r: 8 }}/>
      </LineChart>


  
  
    
      </div>

    );
  
}



export default VP_AvgBZB;
