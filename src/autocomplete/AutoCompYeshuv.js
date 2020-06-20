import React, {  useState, useEffect} from "react";
import { Typeahead } from 'react-bootstrap-typeahead';


import './ac.css';



const AutoCompYeshuv = () => {
  //state
const [yeshuvData, setYeshuvData] = useState([]);
const [selected, setSelected] = useState([]);



//fecth yeshuvData
const fetchYeshuvData = () => {
    fetch("/api/yeshuvHebrewList").then(result => result.json())
    .then(data => { 
      let ans =[]
      console.log(data);
      console.log(typeof(data));
      data.map((yeshuv) =>
      ans.push({"label" :yeshuv}));   
      console.log(ans);
      
      setYeshuvData(data);
    }
      )
    .catch(error => console.log(error));
  
};

useEffect(() => {
fetchYeshuvData();

}, []);






return (


  <Typeahead
  id="basic-typeahead-example"
  className="custom-typehead"
  onChange={setSelected}
  minLength={2}
  options={yeshuvData}
  selected={selected}
  placeholder="Choose a state...">
  
</Typeahead>


);
};


export default AutoCompYeshuv;

