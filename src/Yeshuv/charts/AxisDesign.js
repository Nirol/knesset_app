
import React from 'react';

export  const AxisLabel = ({ axisType, x, y, width, height,value }) => {
   
    const isVert = axisType === 'yAxis';

    const cx = isVert ? x : x + (width / 2);
 
    const cy = isVert ? (height / 2) + y : y + height + 10;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
      <text x={cx} y={cy}   fontSize={16} letterSpacing= {2} fontWeight={300} transform={`rotate(${rot})`} textAnchor="middle"    fill={"white"}
      stroke={"white"} >
       {value}
      </text>
    );
  };
 