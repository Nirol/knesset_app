import React, {  useState, useEffect} from "react";
import {
  Bar,LabelList, BarChart,XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


import {AxisLabel} from './AxisDesign'












const formatter = (value) => `${value}%`;

  function  ErrorChart  (props)  {
    const [chartDataInput, setChartDataInput] = useState(props.chartRawData);
    const [chartData, setChartData] = useState(null);
  




const buildChartData = (data) => {
  let ans = [] 
//   const jsonObject=JSON.parse(data);

  data.elections.map(row => {
    let temp = {}
    temp.name = row.knesset_num
    const voters = row.Voters
    if (voters > 0) {
        const unrounder_percent = (row.Error_Voters / row.Voters)*100
        temp.Error_Voters_Percent = Math.round((unrounder_percent + Number.EPSILON) * 1000) / 1000
        temp.Error_Voters_Percent_Label = ((Math.round((unrounder_percent + Number.EPSILON) * 100) / 100).toString(10)).concat("%")
    } else {
        temp.Error_Voters_Percent =0

    }   
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
      <BarChart
        width={580}
        height={300}
        data={chartData}
        barSize={20}
        margin={{
          top: 5, right: 15, left: 15, bottom: 15,
        }}
      >
    
        <XAxis label={{ value: "בחירות לכנסת", position: 'insideBottom', offset: -15 }} dataKey="name"  />
        <YAxis yAxisId="left" tickFormatter={formatter} label={<AxisLabel axisType='yAxis'  x={20} y={135} width={0} height={0}>אחוז הצבעה פסולה</AxisLabel>}
        domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />    
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar name="אחוז הצבעה" yAxisId="left" type="monotone"  dataKey="Error_Voters_Percent" stroke="#8884d8" background={{ fill: '#eee' }}>
        
        <LabelList dataKey="Error_Voters_Percent_Label" position="top"  />
        </Bar>
        
      
        </BarChart>


  
  
    
      </div>

    );
  
}



export default ErrorChart;
