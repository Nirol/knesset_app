import React, {  useState, useEffect} from "react";


function  Tryit  (props)  {
  const [fetchingYeshuvData, setFetching] = useState(true);
  const [yeshuvData, setYeshuvData] = useState(null); 





async function fetchData() {
  const response = await fetch(`/api/yeshuv/type/120`);
  const jsonData = await response.json()

  setYeshuvData(jsonData)
  setFetching(false)
  }



useEffect(() => {
  fetchData();
}, []);





    return (
      <div>
      
      <h1>hi</h1>
    
    
      </div>

    );
  
}

export default Tryit;
