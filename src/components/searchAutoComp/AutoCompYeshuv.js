import React from "react";
import { Typeahead } from 'react-bootstrap-typeahead';




import name_sn_array from '../../data/yeshuv_json.js'

class AutoCompYeshuv extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { selected: [] };

  }


  handleChange(selection) {

    this.props.onSelectionChange(selection.selected[0]);
  }

  render() {


    return (
      <Typeahead pullRight
        id="basic-typeahead-example"
        className="Input"
        onChange={(selected) => this.handleChange({ selected })}
        minLength={2}

        options={name_sn_array}
        selected={this.state.selected}
      >

      </Typeahead>


    );


  }
}


export default AutoCompYeshuv;

