import React, {   useState, useEffect} from "react";
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import makeKalfiData from './makeKalfiData'
import { RadialProgress } from 'react-radial-progress-indicator';
import YeshuvTable from "./YeshuvTable";
import styled from 'styled-components'
import ReactTooltip from "react-tooltip";
import './prog.css'
import './table.css'
import CounterHook from "../../components/Countup";
import Zfifot from "../../components/Zfifot";
const Styles = styled.div`
padding: 1rem;
table {
  border-spacing: 0;
  float:right;
  margin-right:5px;
  margin-bottom:15px;
  margin-top:5px;


  background-color: #50597b;
  font-family: Arial, verdana, 'sans serif';
  border-radius: 10px;
   
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th


  ,
  
  td {

    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
   
    :last-child {
      border-right: 0;
    }
  }
}
`



function YeshuvTableWrapper(props) {
  const [chartDataInput, setChartDataInput] = useState(props.chartRawData);

    const columns = [
       
            {
              Header: 'נגישות',           
              accessor: 'accessible',
            },
            {
              Header: 'בז"ב',
              accessor: 'BZB',
            },
            {
              Header: 'מצביעים',
              accessor: 'Voters',
            },

            {
              Header: 'מיקום',
              accessor: 'location'
             
            },
            {
              Header: "כתובת",
              accessor: 'address',
            },
            {
              // Make an expander cell
              Header: () => null, // No header
              width: 65,
              id: 'expander', // It needs an ID
              Cell: ({ row }) => (
                // Use Cell to render an expander for each row.
                // We can use the getToggleRowExpandedProps prop-getter
                // to build the expander.
                <span {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? '-' : '+'}
                </span>
              ),
            },


          ]
 
    
    
  

  
    const renderPieVP = (value) => {

      return (
        <div  className = "radial-prog radial-prog-vp"
      >
        <RadialProgress       
          backgroundTransparent
          duration={5000}
          fontRatio={4}
          height="100%"
          ringBgColour="#EDCA8A"
          ringFgColour="#e39409"
          ringIntermediateColour="#AA8239"
          ringThickness={0.3}      
          showIntermediateProgress={false}
          startStep={0}
          step={value}
          steps={100}
          text={function text(steps,proportion){var step=Math.floor(steps*proportion);return"".concat(step,"%").concat("")}}
          width="100%"
        />
      </div>


      );
     
    }
    

    const renderRowSubComponent = React.useCallback(
      ({ row }) => (
        <div>
     
        <pre
          style={{
            fontSize: '10px',
          }}
        >
          <code>{JSON.stringify({ values:row.original }, null, 2)}</code>
        </pre>

         <ul className="expanded-horizontal-list block">
        <li className="facebook">
          <p className="number">אחוז הצבעה</p>
        {renderPieVP(row.original.Vote_Percent)}
        </li>

        <li className="facebook">
          <p className="number">הצבעות פסולות</p>
          <div className="error-count-up">
          <CounterHook count={row.original.Error_Voters}/>
          </div>
    
     
        </li>

        <li className="facebook ">
        


        <p className="number">
        מדד צפיפות
        </p>        
        <a className="tool-tip-zfifot"   data-tip data-for='global'>?</a >        
        <ReactTooltip id='global' aria-haspopup='true' type="dark" place="top"  role='example'>
      
          <p style ={{lineHeight: "40%"}}>ניקוד צפיפות עבור קלפיות</p>    
          <p style ={{lineHeight: "40%",color:"#e04343"}}>100 - צפוף ביותר</p>   
          <p style ={{lineHeight: "40%",color:"#1c7026"}}>0 - ריק</p>  
     
     
       </ReactTooltip>
        <Zfifot oldValue={row.original.Voters}/>
      </li>
  

        </ul>
        </div>
   
   

 
     
          


     
       
      ),
      []
    )

    const renderTables  = () => {
        if (chartDataInput.display === "All"){
           const data = makeKalfiData({chartDataInput},"All");

return (

    <div className="table-single">
    
    <Styles>
    <YeshuvTable  columns={columns} data={data}  renderRowSubComponent={renderRowSubComponent}

    />
  </Styles>
    </div>
     

          )
          
        }


        else if (chartDataInput.display === "TopN"){
          const dataTop = makeKalfiData({chartDataInput},"Top");
          const dataBot = makeKalfiData({chartDataInput},"Bot");
          return (
            <div>
        

            <div className="table-single">
            <h2 className="table-headlines">קלפיות הפנויות ביותר </h2>
            <Styles>
            <YeshuvTable  columns={columns} data={dataBot}  renderRowSubComponent={renderRowSubComponent} />

            </Styles>          
            </div>

            <hr className="table-double-hr" />
            <div className="table-single">
            <h2 className="table-headlines">קלפיות הצפופות ביותר </h2>
            <Styles>
            <YeshuvTable  columns={columns} data={dataTop}  renderRowSubComponent={renderRowSubComponent} />
          </Styles>

          </div>
          </div>
          )
        }






    }

    return (
      <div className="tables-design">
      {renderTables()}
      
      </div>

    )
  }
  
  export default YeshuvTableWrapper
  