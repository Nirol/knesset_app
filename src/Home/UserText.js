import React from 'react';

import AutoCompYeshuv from '../components/AutoCompYeshuv';
import BackgroundImage from './images/knesete.png'

class UserText extends React.Component {
constructor(props) {
    super(props);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
}


handleSelectionChange(selection) {
    this.props.onYeshuvSelectionChange(selection);
  }

    render () {
        return (  
          
            <div id="colorlib-subscribe" className="colorlib-subscribe" style={{ backgroundImage: `url(${BackgroundImage})`}} data-stellar-background-ratio="0.1">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1 text-center colorlib-heading animate-box">
                        <h2>נתוני בחירות לכנסת ה22 ישראל</h2>
                        <p>הקלד את שם הישוב להצגת נתונים כללים ונתוני  קלפיות </p>
                    </div>
                </div>
                <div className="row animate-box">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="row">
                            <div className="col-md-12">
                                <form className="form-inline qbstp-header-subscribe">
                                    <div className="col-three-forth">
                                           <div className="col-one-third">
                                               <div className="form-group">
                                                   <  button type="submit" className="btn btn-primary">טען</button>
                                                 </div>
                                            </div>
                                        <div className="form-group">
                                                 <AutoCompYeshuv onSelectionChange={this.handleSelectionChange}  />
                                          
                                        </div>
                                    </div>
                       
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




            
            );






}




}



export default UserText;