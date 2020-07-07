import React from 'react';
//import './App.css'
import Navigation from './Navigation';

import UpperSection from './UpperSection';
import MidSection from './mid_section/MidSection';
import MidSectionServices from './Yeshuv/charts/MidSectionServices';
import Intro from './Intro';
import FeatureTop from './FeatureTop';
import FeatureBot from './FeatureBot';

import Counter from './Counter';
import Blog from './Blog';
import Subscrice from './Home/UserText';
import Pricing from './Pricing';
import Footer from './Footer';

class App extends React.Component {
    render() {
        return (         
            <div className="App">
     
                <Navigation />
                <div id="page">

                    <UpperSection />
                    <MidSection />
                    <MidSectionServices />
                    <Intro />
                      <div className="colorlib-work-featured colorlib-bg-white">
                      <div className="container"> 
                        <FeatureTop />
                        <FeatureBot />
                      </div>
                      </div>

                    <Counter />
                    <Blog />
                    <Subscrice />
                    <Pricing />
                    <Footer />                    
                </div>
                <div className="gototop js-top">
                    <a href="#" className="js-gotop"><i className="icon-arrow-up2"></i></a>
                </div>

            </div>
        );






    }




}



export default App;