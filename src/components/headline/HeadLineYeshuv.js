import React, { useState, useCallback } from "react";
import MiniSearch from "../searchAutoComp/MiniSearch";

import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import './headline.css'
import yeshuv_type_data from '../../data/yeshuv_type_data_full'

function HeadLineYeshuv(props) {
    const [yeshuvName, ] = useState(props.yeshuvName);
    const [yeshuvType, ] = useState(props.yeshuvType);


    const handleYeshuvSelectionChange = useCallback((yeshuv) => {
        props.onSelectionChange(yeshuv);
    }, [props]);


    const getTypeText = () => {

        let type = yeshuv_type_data.find(row => row.type_sn === yeshuvType);


        return type.type_name;
    }
    return (


        <header className="block">

            <div className="yeshuv-name-right">
                <h1 className="headline-text" >{yeshuvName} </h1>
            </div>
            <div className="headline-border"></div>
            <div className="yeshuv-name-center">
                <DirectionProvider direction={DIRECTIONS.RTL}>
                    <h3 className="headline-type-text" >סוג: {getTypeText()}</h3>
                </DirectionProvider>
            </div>
            <div className="headline-border"></div>

            <div className="mini-search-menu">
                <DirectionProvider direction={DIRECTIONS.RTL}>

                    <MiniSearch onYeshuvSelectionChange={(selection) => handleYeshuvSelectionChange(selection)} />
                </DirectionProvider>
            </div>

        </header>


    );


}



export default HeadLineYeshuv;