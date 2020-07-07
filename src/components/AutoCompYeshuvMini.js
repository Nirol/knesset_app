import React from "react";
import { Typeahead } from 'react-bootstrap-typeahead';


import yeshuv_list from '../data/yeshuv_list.js';
import './mini.css'


class AutoCompYeshuvMini extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selected: []};
  
  }


handleChange(selection){

   
    this.props.onSelectionChange(selection.selected[0]);
}

render () {
    const selected = this.props.selected;

return (

  <Typeahead pullRight  
  id="basic-typeahead-example2"
  onChange={(selected) => this.handleChange({selected})}
  minLength={2}
  options={yeshuv_list}
  selected={this.state.selected}
  placeholder="ישוב...">
  
</Typeahead>
  



);


}
}


export default AutoCompYeshuvMini;

