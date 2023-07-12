import React from 'react';

const Minus = ({height, width, fill, className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={className}
         fill="none"
         width={width || '20px'}
         height={height || '20px'}
         viewBox="0 0 20 20">
      <path fill={fill || 'black'} fillRule="evenodd" d="M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z"/>
    </svg>
  )
};

export default Minus;