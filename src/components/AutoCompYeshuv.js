import React from "react";
import { Typeahead } from 'react-bootstrap-typeahead';


import yeshuv_list from '../data/yeshuv_list.js';
import './mini.css'


class AutoCompYeshuv extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selected: []};
  
  }


handleChange(selection){
   
    this.props.onSelectionChange(selection.selected[0]);
}

render () {
  

return (
  <Typeahead pullRight
  id="basic-typeahead-example"
  className="Input"
  onChange={(selected) => this.handleChange({selected})}
  minLength={2}
  
  options={yeshuv_list}
  selected={this.state.selected}
  >
  
</Typeahead>


);


}
}


export default AutoCompYeshuv;

