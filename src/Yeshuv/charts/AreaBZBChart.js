import React, {   useState, useEffect } from 'react';
import {
  LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Brush,
  AreaChart, Area,
} from 'recharts';

import {AxisLabel} from './AxisDesign'




function  AreaBZBChart  (props)  {
    const [chartDataInput, setChartDataInput] = useState(props.chartRawData);
    
    const [thirdAreaChartData, setThirdAreaChartData] = useState(null);






      const buildThirdChartData = (data) => {
        console.log(data)
        let ans = [] 
        //  const jsonObject=JSON.parse(data);
      
         data.elections.map(row => {
          let temp = {}
          temp.name = row.knesset_num
          temp.BZB = row.BZB
          temp.num_kalfi = row.Kalfi_Num    
          ans.push(temp) 
        })
  
        return ans;
      }


      
      
      useEffect(() => {      
        let thirdAreaChartData = []
        thirdAreaChartData = buildThirdChartData(chartDataInput);
        setThirdAreaChartData(thirdAreaChartData);
      
      
      }, []);


    return (
      <div>     
     
      <ComposedChart
          width={580}
          height={300}
          data={thirdAreaChartData}
          syncId="anyId"
          margin={{
            top: 15, right: 15, left: 15, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
        <YAxis label={<AxisLabel axisType='yAxis'  x={30} y={135} width={0} height={0}>בעלי זכות בחירה</AxisLabel>} />
          <YAxis yAxisId="right" orientation="right" label={<AxisLabel axisType='yAxis'  x={550} y={135} width={0} height={0}>מספר קלפיות</AxisLabel>} interval = "preserveEnd"
           domain={[dataMin => Math.max(0,(0 - Math.abs(dataMin))), dataMax => (dataMax * 2)]} />
          <Tooltip />
          <Area  name="בעלי זכות בחירה"type="monotone" dataKey="BZB" stroke="#82ca9d" fill="#82ca9d" />
          <Bar name="מספר קלפיות" barSize={15} fill="#8acbe3" yAxisId="right" type="monotone" dataKey="num_kalfi" stroke="#a2a0e8" >
          <LabelList dataKey="num_kalfi" position="top"  />
          </Bar>

        </ComposedChart>
      </div>
    );
  
}


export default AreaBZBChart;