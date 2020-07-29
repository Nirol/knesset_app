import React from 'react';
import './footer.css'
class Footer extends React.Component {
    render () {
        return (  


            <footer id="colorlib-footer">
            <hr className="footer-hr" />
            <div className="container">
                <div className="row">
                     <div className="col-lg-7">
                            <h4>About Knesset</h4>
                            <p>Knesset is an example app showcasing the last five elections data. The app focuses on Yeshuv's voting
                             pattern and the comparison to the Yeshuv type group results as well as the general results.  
                             </p>

                             <p>
                             The app shows either full kalfi list for the selected Yeshuv, sorted by minimum voters (least crowded) or
                             the top and buttom most kalfis by voters for big yeshuv containg large number of kalfis.
                             </p>

                             <p>
                             For a full data analysys of the elections results with a focus on comparasion of different yeshuv types,
                             please check out <a className="footer-a" href="https://github.com/Nirol/elections_data">this</a> github reamde page
                             </p>
                           
                            <span>
                             
                                <ul className="colorlib-social-icons">
                                    <li><a href="https://twitter.com/bukka777"><i className="icon-twitter"></i></a></li>
                             
                                    <li><a href="https://www.linkedin.com/in/giladnir/"><i className="icon-linkedin"></i></a></li>
                                    <li><a href="https://github.com/Nirol"><i className="icon-github"></i></a></li>
                                    <li><a href="https://nirol.github.io"><i className="icon-globe"></i></a></li>
                                </ul>
                              
                            </span>
                     </div>
             


                
                     <div className="col-sm footer-contact">
                            <h4>Contact Info</h4>
                            <ul className="colorlib-footer-links">                          
                                <li><a href="mailto:nir.gilad777@gmail.com"><i className="icon-envelope"></i> nir.gilad777@gmail.com</a></li>
                                <li><a href="https://nirol.github.io"><i className="icon-location4"></i>nirol.github.io</a></li>
                                <li><a href="https://www.linkedin.com/in/giladnir/"><i className="icon-linkedin"></i>Nir Gilad</a></li>
                            </ul>
                 
                     </div>
              
                </div>
            </div>
            <div className="copy">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p>
                                Copyright &copy;2020 All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank"  rel="noopener noreferrer">Colorlib</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

            );
        }          
        }   
        export default Footer; 