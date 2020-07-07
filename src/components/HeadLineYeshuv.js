import React, {  useState, useEffect, useCallback} from "react";
import MiniSearch from "../components/MiniSearch";

import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import './mini.css'
import yeshuv_type_data from '../data/yeshuv_type_data_full'

function HeadLineYeshuv(props) {
    const [yeshuvName, setYeshuvName] = useState(props.yeshuvName);
    const [yeshuvType, setYeshuvType] = useState(props.yeshuvType);





    const handleYeshuvSelectionChange = useCallback((yeshuv) => {
        props.onSelectionChange(yeshuv);
    },[],);
    
    



    const getTypeText = () => {

        
const typeName = yeshuv_type_data.map(row => {
  if (yeshuvType===row.type_sn){  
    return row.type_name;


  }});
  
      
        return typeName;
        }
        


    return (  
        

        <header className="block">

        <div className="user-name">
        <h1 className="headline-text" >{yeshuvName} </h1>
        </div>
        <div className="headline-border"></div>
        <div className="user-name-center">
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <h3 className="headline-type-text" >סוג: {getTypeText()}</h3>
        </DirectionProvider>
        </div>
        <div className="headline-border"></div>

        <div className="profile-menu">
        <DirectionProvider direction={DIRECTIONS.RTL}>

        <MiniSearch  onYeshuvSelectionChange= {(selection) => handleYeshuvSelectionChange(selection)}/>
        </DirectionProvider>
        </div>

        </header>
                            

    );


}



export default HeadLineYeshuv;