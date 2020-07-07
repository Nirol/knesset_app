import React from 'react';

import Subscribe from './UserText';
import YeshuvCharts from '../Yeshuv/YeshuvCharts';
import Navigation from '../Navigation';

class App extends React.Component {
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
                return  <YeshuvCharts yeshuvName={a}/> 
                 
             
                
            }
            else{
                return <Subscribe  onYeshuvSelectionChange= {this.handleYeshuvSelectionChange}/>
            }           
        }

        return (
            <div>          
           
      <Navigation/>
     {renderCharts()}
            



            </div>

            );






        }
    
    
    
    
    }
    
    
    
    export default App;