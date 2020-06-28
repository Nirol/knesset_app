import React, {  useState, useEffect} from "react";
import VP_AvgBZB from './VP_AvgBZB';
import AreaBZBChart from "./AreaBZBChart";
import ErrorChart from "./ErrorChart";
import TypeChart from "./TypeChart";

function  YeshuvCharts  (props)  {
  const [fetchingYeshuvData, setFetching] = useState(true);
  const [yeshuvData, setYeshuvData] = useState(null); 
  const [yeshuvName, setYeshuvName] = useState(props.yeshuvName);




async function fetchData() {
  const response = await fetch(`/api/yeshuv/${yeshuvName}`);
  const jsonData = await response.json()
  setYeshuvData(jsonData)
  setFetching(false)
  }



useEffect(() => {
  fetchData();
}, []);


const renderVP_AvgBZBChart = () => {
  return fetchingYeshuvData ? '' : <VP_AvgBZB chartRawData={yeshuvData}/> 
 
}

const renderVP_AreaBZBChart = () => {
  return fetchingYeshuvData ? '' : <AreaBZBChart chartRawData={yeshuvData}/> 
 
}
const renderErrorChart = () => {
  return fetchingYeshuvData ? '' : <ErrorChart chartRawData={yeshuvData}/> 
 
}
const renderTypeChart = () => {
  return fetchingYeshuvData ? '' : <TypeChart yesuvName={yeshuvName} chartRawData={yeshuvData} />
 
}




    return (
      <div>
      
      <h1>hi</h1>
      {renderTypeChart()}   
      {renderVP_AvgBZBChart()}   


      {renderVP_AreaBZBChart()}

      {renderErrorChart()}

      </div>

    );
  
}

export default YeshuvCharts;
