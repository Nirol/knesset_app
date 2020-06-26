import React, {   useState, useEffect } from 'react';
import {
  LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Brush,
  AreaChart, Area,
} from 'recharts';






function  AreaBZBChart  (props)  {
    const [chartDataInput, setChartDataInput] = useState(props.chartRawData);
    
    const [thirdAreaChartData, setThirdAreaChartData] = useState(null);






      const buildThirdChartData = (data) => {
        console.log(data)
        let ans = [] 
        // const jsonObject=JSON.parse(data);
      
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
          width={500}
          height={300}
          data={thirdAreaChartData}
          syncId="anyId"
          margin={{
            top: 5, right: 58, left: 35, bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis  label={{ value: 'בז"ב', position: 'insideLeft', offset: -10 }}  />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'מספר קלפיות', position: 'insideRight', offset: -55 } } interval = "preserveEnd"
           domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} />
          <Tooltip />
          <Area type="monotone" dataKey="BZB" stroke="#82ca9d" fill="#82ca9d" />
          <Bar name="מספר קלפיות" barSize={15} fill="#8acbe3" yAxisId="right" type="monotone" dataKey="num_kalfi" stroke="#a2a0e8" />
        </ComposedChart>
      </div>
    );
  
}


export default AreaBZBChart;