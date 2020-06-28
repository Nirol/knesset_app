import React from 'react';
import VP_AvgBZB from './VP_AvgBZB';

import AreaBZBChart from './AreaBZBChart';
import ErrorChart from './ErrorChart';
import TypeChart from './TypeChart';


class TryParse extends React.Component {



    render () {

    const sampleJSON ={"elections": [{"Kalfi_Num": 0, "BZB": 0, "Voters": 0, "Error_Voters": 0, "vote_percent": 0.0, "Avg_BZB": 0.0, "knesset_num": "18"}, {"Kalfi_Num": 1, "BZB": 170, "Voters": 138, "Error_Voters": 0, "vote_percent": 81.18, "Avg_BZB": 170.0, "knesset_num": "19"}, {"Kalfi_Num": 1, "BZB": 271, "Voters": 228, "Error_Voters": 2, "vote_percent": 84.13, "Avg_BZB": 271.0, "knesset_num": "20"}, {"Kalfi_Num": 1, "BZB": 550, "Voters": 416, "Error_Voters": 2, "vote_percent": 75.64, "Avg_BZB": 550.0, "knesset_num": "21"}, {"Kalfi_Num": 1, "BZB": 574, "Voters": 418, "Error_Voters": 1, "vote_percent": 72.82, "Avg_BZB": 574.0, "knesset_num": "22"}], "display": "All", "data": [{"Kalfi_Num": 1, "BZB": 574, "Voters": 418, "Error_Voters": 1, "Vote_Percent": 72.8223, "Error_Vote_Percent": 0.239234}], "meta": [{"sub_kalfi_num": 0, "address": "\u05d1\u05d0\u05e8 \u05d0\u05d5\u05e8\u05d4", "location": "\u05de\u05d6\u05db\u05d9\u05e8\u05d5\u05ea", "accessible": 1, "special_accessible": 1, "arabic_printing": 0}], "type": 330};

            

         
        return (  

            <div> 
         
            <h1> hello </h1>
       
        
            
            <TypeChart chartRawData={sampleJSON} />

            </div>
          
          
          

            );

}




}



export default TryParse;