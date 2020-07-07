import React, {  useState, useEffect} from "react";
import {
  Bar,LabelList, ComposedChart,XAxis, YAxis, CartesianGrid, Tooltip, Area
} from 'recharts';


import {AxisLabel} from './AxisDesign'


function CustomTooltipVP (props){


  const { active } = props;

  if (active) {
    const { payload, label } = props;

    return (
      <div className="tooltip-type">
 
        <p className="tooltip-type-text vperror-vp ">{`${payload[0].name} : ${payload[0].value}%`}</p>  

      <br/>

      <p className="tooltip-type-text vperror-error ">{`${payload[1].name} : ${payload[1].value}%`}</p>  

      <br/>
      <p className="tooltip-type-text  ">{label} :בחירות לכנסת</p>



      </div>
    );

};

return null;
}









const formatter = (value) => `${value}%`;

  function  VPErrorChart  (props)  {
    const [chartDataInput, setChartDataInput] = useState(props.chartRawData);
    const [chartData, setChartData] = useState(null);
  




const buildChartData = (data) => {
  let ans = [] 


  
   data.elections.map(row => {
    let temp = {}
    temp.name = row.knesset_num
    const voters = row.Voters
    temp.Vote_Percent = row.vote_percent
    if (voters > 0) {
        const unrounder_percent = (row.Error_Voters / row.Voters)*100
        temp.Error_Voters_Percent = Math.round((unrounder_percent + Number.EPSILON) * 1000) / 1000
        temp.Error_Voters_Percent_Label = ((Math.round((unrounder_percent + Number.EPSILON) * 100) / 100).toString(10)).concat("%")
    } else {
        temp.Error_Voters_Percent =0
        temp.Error_Voters_Percent_Label = ((0).toString(10)).concat("%")

    }   
    ans.push(temp) 
  })

  return ans;
}


useEffect(() => {
  
  let chartDataReady = []

  chartDataReady = buildChartData(chartDataInput);
  setChartData(chartDataReady);



}, []);






    return (

      <div>
      <ComposedChart
      width={500}
          height={300}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10, right: 10, left: 10, bottom: 10,
          }}
      >
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={{ fill: 'white' }}  dataKey="name"  />
        <YAxis  yAxisId="left" orientation="left" label={<AxisLabel axisType='yAxis'  x={17} y={161} width={0} height={0}  value= 'אחוז הצבעה'></AxisLabel>} />
        
        <YAxis yAxisId="right" orientation="right" label={<AxisLabel axisType='yAxis'  x={475} y={161} width={0} height={0} value= "הצבעה פסולה"></AxisLabel>} 
           />
 
        
        <Tooltip 
        content={<CustomTooltipVP/>}        
       />

       <Area  name="אחוז הצבעה" yAxisId="left"  type="monotone" dataKey="Vote_Percent" stroke="#82ca9d" fill="#82ca9d" />
        <Bar name="הצבעה פסולה" barSize={18} yAxisId="right" type="monotone"  dataKey="Error_Voters_Percent" fill="#e64c65">
        
        <LabelList dataKey="Error_Voters_Percent_Label" position="top" style={{ fill:"white"}} />
        </Bar>
        
      
        </ComposedChart>


  
  
    
      </div>

    );
  
}



export default VPErrorChart;
