import React from 'react';

import { useCountUp } from 'react-countup';



function CounterHook (props) {
    const { countUp } = useCountUp({ end: props.count });
    return <div>{countUp}</div>;
  };
  

export default CounterHook;
