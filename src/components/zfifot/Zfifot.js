import React from 'react';


import './zfifot.css'



function Zfifot (props) {
    const oldMax = 738;
    const oldMin =12;
    const oldRange = (oldMax - oldMin);
    const newRange = 100;
    const newValue = Math.round((((props.oldValue - oldMin) * newRange) / oldRange));
    const prefix ="zfifot "
    let className="";
    if (newValue <=15){
        className="zfifot-green"
    }
    else if(newValue <=30){
      className="zfifot-greenYellow"
    }
    else if(newValue <=50){
      className="zfifot-yellow"
    }
    else if(newValue <=75){
      className="zfifot-yellowOrange"
    }
    else if(newValue <=90){
      className="zfifot-orange"
    }
    else{
      className="zfifot-red"
    }
    const final = prefix.concat(className);


    return <div className={final}>{newValue}</div>;
  };
  

export default Zfifot;
