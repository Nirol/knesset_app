import React, { useState, useEffect, useCallback } from "react";
import VP_AvgBZB from './charts/VP_AvgBZB';
import AreaBZBChart from "./charts/AreaBZBChart";
import ErrorChart from "./charts/VPErrorChart";
import TypeChart from "./charts/TypeChart";



import YeshuvTableWrapper from "./table/YeshuvTableWrapper";
import './yeshuv-charts.css'

import HeadLineYeshuv from "../components/headline/HeadLineYeshuv";


function YeshuvCharts(props) {

  const [fetchingYeshuvData, setFetching] = useState(true);
  const [yeshuvData, setYeshuvData] = useState(null);
  const [yeshuvName, setYeshuvName] = useState(props.yeshuvName);
  const [yeshuvSN, setYeshuvSN] = useState(props.yeshuvSN);
  const [yeshuvType, setYeshuvType] = useState(null);



  const handleYeshuvSelectionChange = useCallback((yeshuv_obj) => {

    setFetching(true);
    setYeshuvName(yeshuv_obj.label);
    setYeshuvSN(yeshuv_obj.sn)

  }, []);



  async function fetchData() {
    console.log("fetching:");
    console.log({ yeshuvName });
    const response = await fetch(`/api/yeshuv/sn/${yeshuvSN}`);
    const jsonData = await response.json();
    const parsedDataJson = JSON.parse(jsonData);
    setYeshuvData(parsedDataJson);
    setYeshuvType(parsedDataJson.type);
    setFetching(false);
  }

  useEffect(() => {

    fetchData();
  }, [yeshuvName]);




  const renderVP_AvgBZBChart = () => {
    return fetchingYeshuvData ? '' : <VP_AvgBZB chartRawData={yeshuvData} />

  }

  const renderVP_AreaBZBChart = () => {
    return fetchingYeshuvData ? '' : <AreaBZBChart chartRawData={yeshuvData} />

  }
  const renderErrorChart = () => {
    return fetchingYeshuvData ? '' : <ErrorChart chartRawData={yeshuvData} />

  }
  const renderTypeChart = () => {
    return fetchingYeshuvData ? '' : <TypeChart yeshuvName={yeshuvName} chartRawData={yeshuvData} />

  }



  const renderKlafiTable = () => {
    return fetchingYeshuvData ? '' : <YeshuvTableWrapper yesuvName={yeshuvName} chartRawData={yeshuvData} />

  }


  const renderHeadLine = () => {
    return fetchingYeshuvData ? '' : <HeadLineYeshuv yeshuvName={yeshuvName} yeshuvType={yeshuvType} onSelectionChange={(yeshuv_obj) => handleYeshuvSelectionChange(yeshuv_obj)} />

  }



  return (




    <div className="container box main-container">
      <div className="box">
        {renderHeadLine()}

      </div>

      <div className="box-cell  expand-container-left">


      <div className="menu-box-second block">
        <h2 className="titular">{yeshuvName}: הצבעה</h2>
        <div className="type-chart"  >

          {renderErrorChart()}
        </div>
      </div>








        <div className="menu-box-third block">
          <h2 className="titular">ממוצע בז"ב לקלפי ומספר קלפיות</h2>
          <div className="type-chart"  >
            {renderVP_AreaBZBChart()}
          </div>
        </div>






        <div className="menu-box block">
          <h2 className="titular">כנסת 22: השוואת סוגי ישוב</h2>
          <div className="type-chart"  >
            {renderTypeChart()}
          </div>
        </div>








      </div>







      <div className="box-cell expand-container-right">
        <div className="weather block clear">
          <h2 className="titular">קלפיות</h2>
          {renderKlafiTable()}
        </div>
      </div>




    </div>


  );

}

export default YeshuvCharts;
