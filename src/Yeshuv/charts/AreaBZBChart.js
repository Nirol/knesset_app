import React, {   useState, useEffect } from 'react';
import {
  LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, 
   Area,
} from 'recharts';

import {AxisLabel} from './AxisDesign'
import './chart_design.css';


function CustomTooltipArea (props){


  const { active } = props;

  if (active) {
    const { payload, label } = props;

    return (
      <div className="tooltip-type">
 
        <p className="tooltip-type-text area-bzb ">{`${payload[0].name} : ${payload[0].value}`}</p>
  

      <br/>



        <p className="tooltip-type-text area-kalfi">{`${payload[1].name} : ${payload[1].value}`}</p>    


        <br/>
        <p className="tooltip-type-text  ">{label} :בחירות לכנסת</p>

    
    


      </div>
    );

};

return null;
}


function  AreaBZBChart  (props)  {
    const [chartDataInput, ] = useState(props.chartRawData);
    
    const [thirdAreaChartData, setThirdAreaChartData] = useState(null);








      
      
      useEffect(() => {     
        
      const buildThirdChartData = (data) => {
       
    
       
      
         let ans = data.elections.map(row => {
          let temp = {};
          temp.name = row.knesset_num;
          temp.BZB = row.BZB;
          temp.num_kalfi = row.Kalfi_Num;  
         return temp;
        })
  
        return ans;
      }
        





        let thirdAreaChartData = []
        thirdAreaChartData = buildThirdChartData(chartDataInput);
        setThirdAreaChartData(thirdAreaChartData);
      
      
      }, [chartDataInput]);


    return (
      <div>     
  
      <ComposedChart
      width={500}
          height={300}
          data={thirdAreaChartData}
          syncId="anyId"
          margin={{
            top: 10, right: 10, left: 10, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis  tick={{ fill: 'white' }}  dataKey="name" />
        <YAxis label={<AxisLabel axisType='yAxis'  x={17} y={161} width={0} height={0}  value= 'ממוצע בז"ב לקלפי'></AxisLabel>} />
        
        
        <YAxis yAxisId="right" orientation="right" label={<AxisLabel axisType='yAxis'  x={475} y={161} width={0} height={0}value= "מספר קלפיות"></AxisLabel>} 
           domain={[dataMin => Math.max(0,(0 - Math.abs(dataMin))), dataMax => (dataMax * 2)]} />
           <Tooltip                

           content={<CustomTooltipArea/>}
           
          />
        
        
          <Area  name="בעלי זכות בחירה"type="monotone" dataKey="BZB" stroke="#c5c949" fill="#c9cc7c" />
          <Bar name="מספר קלפיות" barSize={18} fill="#8acbe3" yAxisId="right" type="monotone" dataKey="num_kalfi" stroke="#a2a0e8" >
          <LabelList dataKey="num_kalfi" position="top" style={{ fill:"white"}}/>
          </Bar>

        </ComposedChart>
      </div>
    );
  
}


export default AreaBZBChart;