import React from "react";
import { Typeahead } from 'react-bootstrap-typeahead';


import yeshuv_list from './data/yeshuv_list.js';



class AutoCompYeshuv extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selected: []};
  
  }


handleChange(selection){
    console.log(selection.selected);
    console.log(selection.selected[0]);
   
    this.props.onSelectionChange(selection.selected[0]);
}

render () {
    const selected = this.props.selected;

return (
  <Typeahead pullRight
  id="basic-typeahead-example"
  className="custom-typehead"
  onChange={(selected) => this.handleChange({selected})}
  minLength={2}
  options={yeshuv_list}
  selected={this.state.selected}
  placeholder="...ישוב">
  
</Typeahead>


);


}
}


export default AutoCompYeshuv;

