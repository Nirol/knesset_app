import React, {  useState, useEffect} from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


import {AxisLabel} from './AxisDesign'
import yeshuv_type_data from '../../YeshuvType/yeshuv_type_data2'
import total_data from '../../YeshuvType/totalYeshuvData'




const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


const findYeshuvTypeObj = (yeshuv_type) => {
  let ans = {}
  yeshuv_type_data.map(row => {
    if (yeshuv_type===row.type_sn){  
      console.log("bbbbb")

  ans = row
    }
})

return ans
}




  function  TypeChart  (props)  {
    const [chartDataInput, setChartDataInput] = useState(props.chartRawData);
    const [yeshuvName, setYeshuvName] = useState(props.yeshuvName);
    const [chartData, setChartData] = useState(null);
  



   function buildChartData  (data)  {
   let ansByPop = [] 
   let ans = [] 
    const jsonObject=JSON.parse(data);

let type_data = {}
yeshuv_type_data.map(row => {
  if (data.type===row.type_sn){  
    type_data = row


  }})
  
  let elec22 = {}
  elec22.name =  {yeshuvName}
  
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
  typeData.name = `סוג ישוב: ${typeName}`
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


  console.log(ansByPop)







let avg_bzb = {}
avg_bzb.name = "avg_bzb"
avg_bzb.elec22 = data.elections[4].Avg_BZB
avg_bzb.type = type_data.type_avg_bzb
avg_bzb.total = total_data.avg_bzb
ans.push(avg_bzb) 

let vote_percent = {}
vote_percent.name = "vote_percent"
vote_percent.elec22 = data.elections[4].vote_percent
vote_percent.type = type_data.type_vote_percent
vote_percent.total = total_data.voting_percent
ans.push(vote_percent) 



let error_vote = {}
error_vote.name = "error_vote_percent"

if (data.elections[4].Voters > 0) {
  const unrounder_percent = (data.elections[4].Error_Voters / data.elections[4].Voters)*100
  error_vote.elec22 = Math.round((unrounder_percent + Number.EPSILON) * 1000) / 1000
  error_vote.elec22Label = ((Math.round((unrounder_percent + Number.EPSILON) * 100) / 100).toString(10)).concat("%")
} else {
  error_vote.elec22 =0

}   

error_vote.type = type_data.type_error_vote_percent
error_vote.total = total_data.error_vote
ans.push(error_vote) 

  
  return ansByPop;
}


useEffect(() => {
  let chartDataReady = []
  chartDataReady = buildChartData(chartDataInput);
  console.log(chartDataReady)
  setChartData(chartDataReady);



}, []);

  



        return (
          <BarChart
            width={700}
            height={420}

            data={chartData}
            barGap={6}
            barCategoryGap={15}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right"  domain={[dataMin => Math.max(0,(0 - Math.abs(dataMin))), dataMax => (dataMax * 2)]}  />
            <Tooltip />
            
            <Bar name="ממוצע בעלי זכות בחירה" yAxisId="left" dataKey="avg_bzb" fill="#8884d8" />
            <Bar name="אחוז הצבעה" yAxisId="left" dataKey="vote_percent" fill="#82ca9d" />
            <Bar name="אחוז הצבעה פסולה" yAxisId="right" dataKey="error_vote" fill="#a89f3b" />
          </BarChart>
        );
      }
    
    


export default TypeChart;
