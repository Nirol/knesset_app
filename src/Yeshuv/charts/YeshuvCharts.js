import React, {  useState, useEffect} from "react";
import VP_AvgBZB from './VP_AvgBZB';
import AreaBZBChart from "./AreaBZBChart";

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



    return (
      <div>
      
      <h1>hi</h1>
      {renderVP_AvgBZBChart()}
    
      </div>

    );
  
}

export default YeshuvCharts;
