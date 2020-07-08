import React from 'react';
import '../headline/headline.css'
import AutoCompYeshuvMini from './AutoCompYeshuvMini';


class MiniSearch extends React.Component {
constructor(props) {
    super(props);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
}


handleSelectionChange(selection) {
    this.props.onYeshuvSelectionChange(selection);
  }

    render () {
        return (              
            <form className="header-subscribe-mini">                 
                <AutoCompYeshuvMini onSelectionChange={(selection) =>this.handleSelectionChange(selection)}  />   
        </form>   
            );
}}
export default MiniSearch;