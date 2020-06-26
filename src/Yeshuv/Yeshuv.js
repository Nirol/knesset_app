import React from 'react';

import Subscribe from './Subscribe';
import YeshuvCharts from './charts/YeshuvCharts';

class Yeshuv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isYeshuvSelected: false,
            yeshuv: ""};
        this.handleYeshuvSelectionChange = this.handleYeshuvSelectionChange.bind(this);

    }

    handleYeshuvSelectionChange(yeshuv){

        this.setState({
            isYeshuvSelected: true,
            yeshuv: yeshuv
        });

     
    }

    render() {


  
        const renderCharts = () => {
          
            if(this.state.isYeshuvSelected){
                let a=     this.state.yeshuv;                  
                return   <YeshuvCharts yeshuvName={a}/> 
            }
           
        }

        return (        

            <div>          
            
        
            <Subscribe  onYeshuvSelectionChange= {this.handleYeshuvSelectionChange}/>

     {renderCharts()}
            



            </div>

            );






        }
    
    
    
    
    }
    
    
    
    export default Yeshuv;