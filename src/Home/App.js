import React from 'react';
import { Element } from 'react-scroll'
import Subscribe from './UserText';
import YeshuvCharts from '../Yeshuv/YeshuvCharts';
import Navigation from '../components/navigator/Navigation';
import Footer from '../components/footer/Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isYeshuvSelected: false,
            sn: -1,
            yeshuv: ""};
        this.handleYeshuvSelectionChange = this.handleYeshuvSelectionChange.bind(this);

    }

    handleYeshuvSelectionChange(yeshuv_obj){
        console.log(yeshuv_obj)
        this.setState({
            isYeshuvSelected: true,
            yeshuv: yeshuv_obj.label,
            sn: yeshuv_obj.sn

        });

     
    }

    render() {  
        const renderCharts = () => {          
            if(this.state.isYeshuvSelected){
                          
                return  <YeshuvCharts yeshuvName={this.state.yeshuv} yeshuvSN={this.state.sn}/> 
                 
             
                
            }
            else{
                return <Subscribe  onYeshuvSelectionChange= {this.handleYeshuvSelectionChange}/>
            }           
        }

        return (
         
           
            <div>          
           
      <Navigation/>
     {renderCharts()}
     <Element id='my-footer' name='my-footer'>
            <Footer  id='my-footer'/>
            </Element>
          
            </div>
       
            );






        }
    
    
    
    
    }
    
    
    
    export default App;