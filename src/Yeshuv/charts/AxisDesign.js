
import React from 'react';

export  const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
    console.log(axisType);
    const isVert = axisType === 'yAxis';
    console.log(isVert);
    const cx = isVert ? x : x + (width / 2);
    console.log(`${cx}`);
    const cy = isVert ? (height / 2) + y : y + height + 10;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
      <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
        {children}
      </text>
    );
  };
