import React from 'react';
import { Link } from 'react-scroll'
import './nav.css';

class Navigation extends React.Component {







    render () {
        return (   
<nav className="colorlib-nav" role="navigation">
<div className="top-menu">
    <div className="container">
        <div className="row">
            <div className="col-md-2">
            <div className="nav-icon-knesset"></div>
                <div id="colorlib-logo"><a href="index.html">Knesset</a></div>
            </div>
            <div className="col-md-10 text-right menu-3">
                <ul>
                    <li className="active"><a  href="index.html">Home</a></li>
                   
                    <li >                     
                    <Link 
                    to="my-footer" 
                    spy={true} 
                    smooth={true} 
                    duration={500} 
                    href="index.html">
              
                    Contact/About 
               
                     </Link>       
              
                </li>
                   
              
                  
                </ul>
            </div>
        </div>
    </div>
</div>
</nav>


);






}




}



export default Navigation;