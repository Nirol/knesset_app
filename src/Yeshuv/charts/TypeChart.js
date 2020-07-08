import React, {  useState, useEffect} from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


import {AxisLabel} from './AxisDesign'
import yeshuv_type_data from '../../data/yeshuv_type_data_full'
import total_data from '../../data/totalYeshuvData'
import './chart_design.css';




function CustomTooltip (props){


  const { active } = props;

  if (active) {
    const { payload } = props;

    return (
      <div className="tooltip-type">
 
        <p className="tooltip-type-text type-bzb ">{`${payload[0].name} : ${payload[0].value}`}</p>
  

      <br/>



        <p className="tooltip-type-text type-vote-percent">{`${payload[1].name} : ${payload[1].value}%`}</p>    


      <br/>

    
    


      </div>
    );

};

return null;
}





  function  TypeChart  (props)  {
    console.log(props);
    const [chartDataInput, setChartDataInput] = useState(props.chartRawData);
    const [yeshuvName, setYeshuvName] = useState(props.yeshuvName);
    const [chartData, setChartData] = useState(null);
  



   function buildChartData  (data)  {

   let ansByPop = [] 
   

let type_data = {}
yeshuv_type_data.map(row => {
  if (data.type===row.type_sn){  
    type_data = row


  }})
  
  let elec22 = {}

  elec22.name =  yeshuvName
  
  elec22.avg_bzb = data.elections[4].Avg_BZB
  elec22.vote_percent = data.elections[4].vote_percent
  if (data.elections[4].Voters > 0) {
    const unrounder_percent = (data.elections[4].Error_Voters / data.elections[4].Voters)*100
    elec22.error_vote = Math.round((unrounder_percent + Number.EPSILON) * 1000) / 1000
    elec22.error_vote_label = ((Math.round((unrounder_percent + Number.EPSILON) * 100) / 100).toString(10)).concat("%")
  } else {
    elec22.error_vote =0
  
  }   
  ansByPop.push(elec22) 




  let typeData = {}
  const typeName = type_data.type_name
  typeData.name =  typeName
  typeData.avg_bzb = type_data.type_avg_bzb
  typeData.vote_percent =type_data.type_vote_percent
  typeData.error_vote = type_data.type_error_vote_percent
  ansByPop.push(typeData) 




  let totalData = {}
  totalData.name = "סה\"כ"
  totalData.avg_bzb = total_data.avg_bzb
  totalData.vote_percent =total_data.voting_percent
  totalData.error_vote = total_data.error_vote
  ansByPop.push(totalData) 
  
  return ansByPop;
}


useEffect(() => {

  let chartDataReady = []
  chartDataReady = buildChartData(chartDataInput);
  
  setChartData(chartDataReady);



}, []);



        return (


          <BarChart
          width={500}
          height={300}

            data={chartData}
            barGap={6}
            barCategoryGap={15}
            margin={{
              top: 10, right: 10, left: 10, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  tick={{ fill: 'white' }} dataKey="name" />

            <YAxis yAxisId="left" orientation="left" label={<AxisLabel axisType='yAxis'  x={475} y={161} width={0} height={0}  value="אחוז הצבעה"></AxisLabel>}/>
            <YAxis yAxisId="right" orientation="right"  domain={[30, 100]} 
            label={ <AxisLabel axisType='yAxis'  x={17} y={161} width={0} height={0} value='ממוצע בז"ב לקלפי'></AxisLabel>}/>
            <Tooltip                

            content={<CustomTooltip/>}
            
           />
         
     
            <Bar name="ממוצע בעלי זכות בחירה" yAxisId="left" dataKey="avg_bzb" fill="#e64c65" />
            <Bar name="אחוז הצבעה" yAxisId="right" dataKey="vote_percent" fill="#11a8ab" />
            
            
          </BarChart>

      
        );
      }
    
    


export default TypeChart;
