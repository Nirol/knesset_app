import React from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import name_sn_array from '../../data/yeshuv_json.js'


class AutoCompYeshuvMini extends React.Component {
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
        id="basic-typeahead-example2"
        onChange={(selected) => this.handleChange({ selected })}
        minLength={2}
        options={name_sn_array}
        selected={this.state.selected}
        placeholder="ישוב...">

      </Typeahead>
    );

  }
}


export default AutoCompYeshuvMini;

